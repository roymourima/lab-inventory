from database import SessionLocal, engine
import models, auth

def seed():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Add Admin
    admin_email = "admin@lab.com"
    if not db.query(models.User).filter(models.User.email == admin_email).first():
        admin = models.User(
            email=admin_email,
            full_name="Lab Admin",
            password_hash=auth.get_password_hash("admin123"),
            role="Admin"
        )
        db.add(admin)
    
    # Add Initial Items
    initial_items = [
        {"name": "Soldering Iron", "quantity": 10, "price": 1500, "description": "High quality soldering iron", "category": "Electronics"},
        {"name": "Arduino Uno", "quantity": 15, "price": 800, "description": "Microcontroller board", "category": "Microcontrollers"},
        {"name": "Multimeter", "quantity": 5, "price": 2500, "description": "Digital multimeter", "category": "Testing"},
        {"name": "Breadboard", "quantity": 50, "price": 100, "description": "830 point breadboard", "category": "Prototyping"}
    ]
    
    for item_data in initial_items:
        if not db.query(models.Item).filter(models.Item.name == item_data["name"]).first():
            item = models.Item(**item_data)
            db.add(item)
    
    db.commit()
    db.close()
    print("Database seeded!")

if __name__ == "__main__":
    seed()
