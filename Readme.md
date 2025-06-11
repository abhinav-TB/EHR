# EHR FHIR Project

A simple Electronic Health Record (EHR) system using a React (Next.js) frontend, FastAPI backend, and HAPI FHIR server with PostgreSQL. This project allows searching, adding, editing, and viewing patients using the FHIR standard.

---

## Features

- **Patient Search:** Search patients by name.
- **Add Patient:** Add new patients to the FHIR database.
- **Edit Patient:** Update patient details.
- **View Patient:** View patient details.
- **FHIR Standard:** All patient data is stored as FHIR Patient resources.
- **HAPI FHIR UI:** View and manage resources directly in the HAPI FHIR web interface.

---

## Architecture

```
[React Frontend]  <--->  [FastAPI Backend]  <--->  [HAPI FHIR Server (Docker + PostgreSQL)]
        |                        |                              |
    http://localhost:3000   http://localhost:8000         http://localhost:8080/fhir
```

---

## Project Structure

```
EHR/
│
├── ehr-frontend/           # Next.js React frontend
│   ├── app/
│   │   ├── page.js         # Home page (search/add patients)
│   │   └── patient/
│   │       ├── new/        # Add patient page
│   │       └── [id]/edit/  # Edit patient page
│   └── components/
│       └── PatientForm.js  # Patient add/edit form
│
├── backend/                # FastAPI backend
│   ├── main.py             # API routes (proxy to FHIR)
│   └── requirements.txt    # Python dependencies
│
├── fhir/                   # HAPI FHIR server (Docker)
│   ├── docker-compose.yaml
│   └── hapi.application.yaml
│
└── Readme.md
```

---

## Setup & Installation

### 1. Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Python 3.9+](https://www.python.org/)
- [pip](https://pip.pypa.io/en/stable/)

---

### 2. Clone the Repository

```sh
git clone https://github.com/abhinav-TB/EHR.git
cd EHR
```

---

### 3. Start the FHIR Server (Docker)

```sh
cd fhir
docker-compose up -d
```
- This will start HAPI FHIR on `http://localhost:8080/fhir` and PostgreSQL as the database.

---

### 4. Start the FastAPI Backend

```sh
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
- The backend runs at `http://localhost:8000`.

---

### 5. Start the React Frontend

```sh
cd ../ehr-frontend
npm install
npm run dev
```
- The frontend runs at `http://localhost:3000`.

---

## Usage

1. **Open the app:**  
   Go to [http://localhost:3000](http://localhost:3000) in your browser.

2. **Search Patients:**  
   Use the search bar to find patients by name.

3. **Add Patient:**  
   Click "Add New Patient", fill the form, and save.

4. **Edit Patient:**  
   Click "Edit" on a patient in the list, update details, and save.

5. **View in HAPI FHIR UI:**  
   Go to [http://localhost:8080](http://localhost:8080) to see all resources.

---

## API Endpoints

### FastAPI Backend

| Method | Endpoint                | Description                    |
|--------|-------------------------|--------------------------------|
| GET    | `/patients`             | List/search patients           |
| GET    | `/patients/{id}`        | Get patient by ID              |
| POST   | `/patients`             | Create new patient             |
| PUT    | `/patients/{id}`        | Update patient by ID           |
| GET    | `/practitioners`        | List/search practitioners      |

---

## FHIR Resource Structure

A minimal Patient resource:

```json
{
  "resourceType": "Patient",
  "id": "1",
  "name": [
    {
      "family": "Doe",
      "given": ["John"]
    }
  ],
  "gender": "male",
  "birthDate": "1990-01-01"
}
```

- **Required:** `resourceType`, `name` (with at least `family` or `given`)
- **Recommended:** `gender`, `birthDate`
- **For updates:** Always include `id` and (optionally) `meta`

---

## Troubleshooting

- **Cannot connect to FHIR DB:**  
  Ensure Docker containers are running and ports are not blocked.

- **PUT/Update not reflected:**  
  Make sure you include the `id` in the payload when updating a patient.

- **CORS errors:**  
  The backend enables CORS for `http://localhost:3000` by default.

- **Method Not Allowed:**  
  Use `POST /Patient` to create and `PUT /Patient/{id}` to update on the FHIR server.

---

## License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2025 Abhinav

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```