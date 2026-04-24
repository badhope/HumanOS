# =============================================================================
#  用户认证 API 路由
# =============================================================================
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import logging

logger = logging.getLogger(__name__)

from database.database import get_db
from database import models

load_dotenv()

router = APIRouter()

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 10080))

if not SECRET_KEY:
    if ENVIRONMENT == "production":
        raise RuntimeError("❌ 生产环境必须设置 SECRET_KEY 环境变量！")
    SECRET_KEY = "dev-secret-key-only-for-development"
    logger.warning("⚠️  使用开发默认密钥，仅用于本地开发！生产环境请设置 SECRET_KEY")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class UserCreate(BaseModel):
    username: str
    password: str
    email: str | None = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: str | None

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="无法验证凭据",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    result = await db.execute(
        select(models.User).where(models.User.username == token_data.username)
    )
    user = result.scalar_one_or_none()
    if user is None:
        raise credentials_exception
    return user

# =============================================================================
#  用户注册
# =============================================================================
@router.post("/register", response_model=UserResponse, summary="用户注册")
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    """新用户注册"""
    result = await db.execute(
        select(models.User).where(models.User.username == user.username)
    )
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=400,
            detail="用户名已存在",
        )
    
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    
    return UserResponse(
        id=db_user.id,
        username=db_user.username,
        email=db_user.email,
    )

# =============================================================================
#  用户登录
# =============================================================================
@router.post("/login", response_model=Token, summary="用户登录")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
):
    """用户登录获取访问令牌"""
    result = await db.execute(
        select(models.User).where(models.User.username == form_data.username)
    )
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="用户名或密码错误",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# =============================================================================
#  获取当前用户信息
# =============================================================================
@router.get("/me", response_model=UserResponse, summary="获取当前用户信息")
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    """获取当前登录用户信息"""
    return UserResponse(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email,
    )
