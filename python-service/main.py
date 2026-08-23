from fastapi import FastAPI

app = FastAPI(title="Sales Python Service")


@app.get("/health")
def health_check():
    return {"status": "ok"}
