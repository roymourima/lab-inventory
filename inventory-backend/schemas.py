from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "Student"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class ItemBase(BaseModel):
    name: str
    quantity: int
    price: float
    description: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None

class ItemCreate(ItemBase):
    pass

class ItemResponse(ItemBase):
    id: int
    class Config:
        from_attributes = True

class RequestBase(BaseModel):
    item_id: int
    quantity: int
    purpose: Optional[str] = None
    return_date: Optional[str] = None

class RequestCreate(RequestBase):
    pass

class RequestUpdate(BaseModel):
    status: str
    admin_message: Optional[str] = None

class RequestResponse(BaseModel):
    id: int
    user_id: int
    item_id: int
    quantity: int
    purpose: Optional[str] = None
    return_date: Optional[str] = None
    status: str
    admin_message: Optional[str] = None
    timestamp: datetime
    
    class Config:
        from_attributes = True
