
from fastapi import FastAPI, Query, Body

from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Add this middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# FHIR_BASE = "http://localhost:8080/fhir"  # Use local FHIR server
FHIR_BASE = "http://hapi.fhir.org/baseR4"  # Use public FHIR server

@app.get("/patients")
def get_patients(name: str = Query(None)):
    params = {"name": name} if name else {}
    r = requests.get(f"{FHIR_BASE}/Patient", params=params)
    # print(r.json())  # Debugging line to see the response
    return r.json()

@app.put("/patients/{id}")
def update_patient(id: str, patient: dict = Body(...)):
    r = requests.put(f"{FHIR_BASE}/Patient/{id}", json=patient)
    return r.json()

@app.get("/patients/{id}")
def get_patient(id: str):
    r = requests.get(f"{FHIR_BASE}/Patient/{id}")
    return r.json()


@app.get("/practitioners")
def get_practitioners(name: str = Query(None)):
    params = {"name": name} if name else {}
    r = requests.get(f"{FHIR_BASE}/Practitioner", params=params)
    return r.json()
