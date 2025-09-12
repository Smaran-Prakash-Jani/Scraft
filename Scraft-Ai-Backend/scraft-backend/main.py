from fastapi import FastAPI, WebSocket
from pydantic import BaseModel

app = FastAPI(title="Scraft Backend", description="AI APIs for Indian artisans")

class Product(BaseModel):
    name: str
    bullets: list[str]
    imageUrl: str
    price: int

@app.get("/products")
async def get_products():
    return [
        {
            "name": "Handwoven Kanjivaram Silk Saree",
            "bullets": ["Pure mulberry silk", "Zari border", "3 weeks to weave"],
            "imageUrl": "https://example.com/saree.jpg",
            "price": 8500,
            "languageStories": {
                "en": "Woven with devotion over 3 weeks by Meera in Kanchipuram.",
                "hi": "कांचीपुरम की मीरा द्वारा 3 सप्ताह तक भक्ति से बुना गया।",
                "ta": "காஞ்சிபுரத்தில் மீரா மூன்று வாரங்களாக அன்புடன் நெசவு செய்தது."
            }
        }
    ]

@app.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        if "special" in data.lower():
            response = "Every thread carries a blessing. Every color tells a story. This is more than a product — it’s heritage."
        else:
            response = "I’m Scraft’s AI companion. Ask me about the story, craft, or culture behind any product!"
        await websocket.send_text(response)
        