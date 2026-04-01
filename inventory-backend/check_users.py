from database import SessionLocal
import models
def check():
    db = SessionLocal()
    users = db.query(models.User).all()
    print(f"Total Users: {len(users)}")
    for user in users:
        print(f"User: {user.email}, Role: {user.role}")
    db.close()
if __name__ == "__main__":
    check()
