FROM python:3.12-slim

WORKDIR /app

COPY ./python-service/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./python-service .

EXPOSE 8000

# --reload enables hot reload for dev; source is bind-mounted in docker-compose.yml
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
