import json
from pathlib import Path


_ROOT = Path(__file__).resolve().parent
_DATA_DIR = _ROOT / "data"


def _load_json(filename: str):
    with (_DATA_DIR / filename).open("r", encoding="utf-8") as fp:
        return json.load(fp)


def get_students():
    return _load_json("students.json")


def get_course_data():
    return _load_json("courses.json")


# Backward-compatible snapshots for modules that still import constants.
STUDENTS = get_students()
COURSE_DATA = get_course_data()
