from fastapi import APIRouter

from app.models.cover_letter import (
    CoverLetterRequest,
    CoverLetterResponse,
)

from app.services.cover_letter_service import (
    generate_cover_letter,
)

router = APIRouter(
    prefix="/cover-letter",
    tags=["Cover Letter"],
)


@router.post(
    "",
    response_model=CoverLetterResponse,
)
def create_cover_letter(request: CoverLetterRequest):

    letter = generate_cover_letter(request)

    return CoverLetterResponse(
        cover_letter=letter
    )