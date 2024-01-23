from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy import String
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

psqlEngine = create_engine(os.getenv("POSTGRESQL_URL"), echo=True)


class Base(DeclarativeBase):
    pass

class Blog(Base):
    __tablename__ = "Blog"

    id: Mapped[str] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100))
    body: Mapped[str] = mapped_column()

    def __repr__(self)->str:
        return f"Blog post with ID : {self.id} with title as {self.title}"


Base.metadata.create_all(bind = psqlEngine)
