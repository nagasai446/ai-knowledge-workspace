import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    APP_ENV:str=os.getenv("APP_ENV","development")
    PORT:int=int(os.getenv("PORT",8000))
    CLIENT_URL:str=os.getenv("CLIENT_URL","http://localhost:5173")
    DATABASE_URL:str=os.getenv("DATABASE_URL","")

settings =Settings()