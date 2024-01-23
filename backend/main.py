from typing import Union
from controller.data import psqlEngine,Blog
from fastapi import FastAPI,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import update, delete
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_methods=["*"],
    allow_headers=["*"],

)

class RequestBody(BaseModel):
    title: str
    body: str


@app.get("/blogs")
async def read_root():
    with Session(psqlEngine) as session:
        blogs = session.query(Blog).all()
    return blogs


@app.get("/post/{post_id}")
def read_item(post_id: str):      
    with Session(psqlEngine) as session:
        try:
            blog = session.get(Blog,post_id)  
            return blog
        except NoResultFound:
            raise HTTPException(status_code = 404, details = "Blog not found")
        except MultipleResultsFound:
            raise HTTPException(status_code = 500, details = "Multiple Blogs found")
            

@app.post("/posts")
def postBlog(post : RequestBody):
    print("posting")
    with Session(psqlEngine) as session:
        try:
            createBlog = Blog(id= generate_uuid(), title= post.title, body = post.body)
            session.add(createBlog)
            session.commit()
            session.refresh(createBlog)
            return "blog created successfully"
        except Exception as e:
            raise HTTPException(status_code = 500, detail= str(e))    


@app.put("/post/{post_id}")
def editBlog(post_id: str, post: RequestBody):
    with Session(psqlEngine) as session:
        try:
            stmt = (
                update(Blog).where(Blog.id == post_id).values(title= post.title, body= post.body)
            )
            session.execute(stmt)
            session.commit()
        except Exception as e:
            raise HTTPException(status_code=500,detail = str(e))
    return "post modified"


@app.delete("/post/{post_id}")
def deleteBlog(post_id: str):
    with Session(psqlEngine) as session:
        try:
            stmt = (delete(Blog).where(Blog.id == post_id))
            response = session.execute(stmt)

            if response.rowcount == 0:
                raise HTTPException(status = 404, detail = "blog not found")
            
            session.commit()
        except Exception as e:
            raise HTTPException(status_code=500,detail = str(e))


def generate_uuid() -> str:
    return str(uuid.uuid4())
