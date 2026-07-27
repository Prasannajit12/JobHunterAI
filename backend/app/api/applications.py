from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.application_service import (
    get_applications,
    add_application,
    update_application_status
)

router = APIRouter(tags=["Applications"])


class Application(BaseModel):
    company: str
    title: str
    status: str
    applied_date: str


class StatusUpdate(BaseModel):
    status: str


@router.get("/applications")
def fetch_applications():

    return get_applications()


@router.post("/applications")
def create_application(application: Application):

    return add_application(application.model_dump())


@router.patch("/applications/{application_id}")
def update_status(application_id: int, update: StatusUpdate):

    result = update_application_status(
        application_id,
        update.status
    )

    if result is None:

        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    return result