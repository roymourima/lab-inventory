from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta
import models, schemas, auth, database

# Init DB 
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Inventory Management API")

# 🌍 CORS (Adjust origins for production!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🎫 AUTH ROUTES
@app.post("/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = auth.get_password_hash(user.password)
    new_user = models.User(
        email=user.email,
        full_name=user.full_name,
        password_hash=hashed_pwd,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Note: Traditional OAuth2 uses OAuth2PasswordRequestForm, but using Pydantic for simplicity here.
    user = db.query(models.User).filter(models.User.email == form_data.email).first()
    if not user or not auth.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# 📦 ITEM ROUTES
@app.get("/items", response_model=List[schemas.ItemResponse])
def get_items(db: Session = Depends(database.get_db)):
    return db.query(models.Item).all()

@app.post("/items", response_model=schemas.ItemResponse)
def create_item(item: schemas.ItemCreate, admin: models.User = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/items/{item_id}", response_model=schemas.ItemResponse)
def get_item(item_id: int, db: Session = Depends(database.get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# 📝 REQUEST ROUTES
@app.post("/requests", response_model=schemas.RequestResponse)
def create_request(request: schemas.RequestCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    # Ensure item exists and has enough quantity
    item = db.query(models.Item).filter(models.Item.id == request.item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if item.quantity < request.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")
    
    new_request = models.Request(
        user_id=current_user.id,
        item_id=request.item_id,
        quantity=request.quantity,
        purpose=request.purpose,
        return_date=request.return_date,
        status="Pending"
    )
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request

@app.get("/requests/me", response_model=List[schemas.RequestResponse])
def get_my_requests(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    return db.query(models.Request).filter(models.Request.user_id == current_user.id).all()

@app.get("/requests", response_model=List[schemas.RequestResponse])
def get_all_requests(admin: models.User = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    return db.query(models.Request).all()

@app.patch("/requests/{request_id}", response_model=schemas.RequestResponse)
def update_request_status(request_id: int, update: schemas.RequestUpdate, admin: models.User = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_request = db.query(models.Request).filter(models.Request.id == request_id).first()
    if not db_request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # Logic to deduct stock when "Approved" (Mirroring frontend logic from context)
    if update.status == "Approved" and db_request.status != "Approved":
        item = db.query(models.Item).filter(models.Item.id == db_request.item_id).first()
        if item.quantity < db_request.quantity:
             raise HTTPException(status_code=400, detail="Insufficient quantity to approve")
        item.quantity -= db_request.quantity
    
    db_request.status = update.status
    if update.admin_message:
        db_request.admin_message = update.admin_message
    
    db.commit()
    db.refresh(db_request)
    return db_request

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
