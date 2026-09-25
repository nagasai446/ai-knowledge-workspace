from app.db.base import Base
from app.db.session import engine

from app.models.user import User
from app.models.workspace import Workspace
from app.models.refresh_session import RefreshSession


def init_db() -> None:
    Base.metadata.create_all(
        bind=engine
    )


if __name__ == "__main__":
    init_db()
    print(
        "Database tables created successfully."
    )