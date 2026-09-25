import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    APP_ENV:str=os.getenv("APP_ENV","development")
    PORT:int=int(os.getenv("PORT",8000))
    CLIENT_URL:str=os.getenv("CLIENT_URL","http://localhost:5173")
    DATABASE_URL:str=os.getenv("DATABASE_URL","")
    JWT_ACCESS_SECRET:str=os.getenv("JWT_ACCESS_SECRET","")
    JWT_REFRESH_SECRET:str=os.getenv("JWT_REFRESH_SECRET","")
    ACCESS_TOKEN_EXPIRE_MINUTES:int=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES",15))
    REFRESH_TOKEN_EXPIRE_DAYS:int=int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS",7))

settings =Settings()