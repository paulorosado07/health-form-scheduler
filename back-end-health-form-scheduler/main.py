from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from data_base import getItems, insert_item
from email_sender import send_email


app = FastAPI()

# Allow CORS for all origins, all methods, and all headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/get_time_registered")
def read_item():
    items = getItems()
    return items


@app.post("/add_meet")
async def add_meet(request: Request):
    data = await request.json()
    result_schelud = insert_item(data)

    if result_schelud['status'] == True:
        send_email( data['email'], data['name'] )

    items = getItems()
    return items