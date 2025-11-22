FROM python:3.13-alpine AS base

# Install necessary system and Python dependencies
RUN apk add --no-cache \
    gcc \
    musl-dev \
    libffi-dev \
    postgresql-dev \
    python3-dev \
    py3-pip \
    py3-virtualenv \
    build-base \
    linux-headers


# Set working directory
WORKDIR /compare

# Copy and install dependencies using a virtual environment
COPY requirements-prod.txt .
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir -r requirements-prod.txt

ENV PATH="/opt/venv/bin:$PATH"    

# Copy application files
COPY . .

# Set environment variables
ENV FLASK_ENV=production
ENV API_HOST=0.0.0.0
ENV API_PORT=8000
ENV PATH="/opt/venv/bin:$PATH"

EXPOSE 8000

CMD ["/opt/venv/bin/python", "main.py"]
