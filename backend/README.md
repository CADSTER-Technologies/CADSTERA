### Get-Process | Sort-Object CPU -Descending

## Python upgrade
``python -m pip install --upgrade pip``

## Install the depandancy files

``pip install -r requirements-dev.txt``

## set enviroment for Windows
``set FLASK_ENV=development``

## set enviroment for MAC/Linux
``export FLASK_ENV=development``

## run the application
``python app/main.py``


### db config
  ## 1. Install Alembic
      ``pip install alembic``
  ## 2. Initialize Alembic in your project  
      ``python -m alembic init alembic``
  ## 3. Verify Alembic installation    
      ``pip show alembic``
  ## 4. Create a new migration    
      ``alembic revision --autogenerate -m "Increase ID length to 256"``
  ## 5. Apply the migration 
      ``alembic upgrade head``



# CT PDF Comparator API

## Overview
The **CT PDF Comparator API** is a Flask-based service that allows users to compare two PDF files and highlight differences. The API processes PDF files in memory without storing them and returns the modified PDF as a response.

## Features
- Upload two PDFs for comparison
- Extract text and coordinates from PDF pages
- Highlight missing and extra values in PDF1
- Return the modified PDF without saving it to disk

---

## Installation
### **Prerequisites**
Ensure you have **Python 3.13** (or later) installed.

### **Clone the Repository**
```bash
git clone https://github.com/your-repo/CT_Pdf_Compare_API.git
cd CT_Pdf_Compare_API
```

### **Set Up a Virtual Environment (Optional but Recommended)**
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

### **Install Dependencies Dev**
```bash
pip install -r requirements-dev.txt
```

### **Install Dependencies Prd**
```bash
pip install -r requirements-prod.txt
```

---

## Usage
### **Start the API Server**
```bash
python app/main.py
```
By default, the API runs on `http://127.0.0.1:5000`.


## Swagger Documentation
The API provides a **Swagger UI** for better exploration.
- **Swagger JSON:** `http://127.0.0.1:5000/swagger.json`
- **Swagger UI:** `http://127.0.0.1:5000/docs`

---


## Deployment
To deploy the API, consider using **Docker**, **Gunicorn**, or hosting on **AWS / Azure / Heroku**.

### **Run with Gunicorn**
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app.main:app
```

### **Docker Setup**
# Build the image securely
```docker build --pull --no-cache -t ct-pdf-compare .```

# Run the container with security flags
```docker run -d --read-only --memory=512m --cpus="1.0" \
  -p 8000:8000 --env-file=config/prod.env ct-pdf-compare
```
