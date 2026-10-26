
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from google import genai
from google.genai import types

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite").strip()

app = FastAPI(
    title="IAF Knowledge Assistant API",
    description="LLM-powered assistant for aviation and IAF knowledge",
    version="1.0.0",
)

allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

SYSTEM_INSTRUCTION = """
You are IAF Knowledge Assistant, an educational aviation assistant.

Help users understand:
- Indian Air Force aircraft, helicopters, transport aircraft and trainers
- Aviation technology, engines, flight principles and aircraft systems
- Indian Air Force history, notable leaders, Air Chiefs and gallantry award recipients
- Publicly documented missions, ranks and aviation terminology

Rules:
1. Answer naturally, clearly and in useful detail.
2. Explain difficult aviation concepts in simple language when appropriate.
3. Never invent specifications, biographies, dates, awards or service status.
4. If uncertain, say so and recommend checking official Indian Air Force
   or Ministry of Defence sources.
5. Current officeholders and operational status can change. Do not claim
   live verification unless a reliable current source was actually consulted.
6. This is an educational assistant, not an official IAF service.
7. Do not provide classified information, sensitive operational details,
   targeting assistance, or instructions to harm people.
8. For unrelated questions, politely explain that this assistant focuses
   on aviation, the Indian Air Force and related general knowledge.
"""

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    history: list[dict[str, str]] = Field(default_factory=list)

class ChatResponse(BaseModel):
    answer: str

@app.get("/")
def home():
    return {
        "status": "online",
        "service": "IAF Knowledge Assistant",
        "model": MODEL_NAME,
    }

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    if not API_KEY:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY is missing. Add it to backend/.env and restart the server.",
        )

    question = request.message.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Please enter a question.")

    # Keep only a small amount of conversation history.
    safe_history = []
    for item in request.history[-12:]:
        role = item.get("role", "")
        content = item.get("content", "").strip()

        if role in ("user", "model") and content:
            safe_history.append({
                "role": role,
                "parts": [{"text": content[:4000]}],
            })

    contents = safe_history + [
        {"role": "user", "parts": [{"text": question}]}
    ]

    try:
        client = genai.Client(api_key=API_KEY)

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                temperature=0.4,
                max_output_tokens=1200,
            ),
        )

        answer = (response.text or "").strip()

        if not answer:
            answer = (
                "I couldn't generate an answer this time. "
                "Please try asking the question another way."
            )

        return ChatResponse(answer=answer)

    except Exception as exc:
        print("Gemini API error:", repr(exc))
        raise HTTPException(
            status_code=502,
            detail=(
                "The AI service could not answer right now. "
                "Check your API key, model availability and API quota."
            ),
        )

# ---------- AI-GENERATED QUIZ API ----------

import json
import uuid
from typing import Literal
from pydantic import BaseModel, Field

# In-memory storage for active quizzes.
# Quizzes reset if the backend server restarts.
quiz_sessions = {}


class QuizGenerateRequest(BaseModel):
    topic: str = Field(default="General IAF Knowledge", max_length=120)
    difficulty: Literal["Easy", "Medium", "Hard"] = "Medium"
    count: int = Field(default=10, ge=5, le=15)


class QuizSubmitRequest(BaseModel):
    quiz_id: str
    answers: dict[str, int]


@app.post("/api/quiz/generate")
def generate_quiz(request: QuizGenerateRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API key is missing.")

    prompt = f"""
You are an educational quiz creator specialising in the Indian Air Force,
military aviation, aircraft technology, aviation science, IAF history,
notable air warriors and aerospace knowledge.

Create exactly {request.count} DIFFERENT multiple-choice questions.
Topic: {request.topic}
Difficulty: {request.difficulty}

Requirements:
- Questions must be factually responsible and educational.
- Use four options per question.
- Each question must have exactly one best answer.
- Make plausible distractors; do not make the correct answer obvious.
- Do not repeat questions within this quiz.
- Avoid invented facts and unsupported current operational details.
- For historical or technical claims, prefer established facts.
- Keep explanations short and useful.
- Return ONLY valid JSON. No Markdown or code fences.

Use this exact JSON format:
{{
  "questions": [
    {{
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer_index": 0,
      "explanation": "Why this answer is correct."
    }}
  ]
}}
answer_index must be 0, 1, 2, or 3.
"""

    try:
        
        quiz_client = genai.Client(api_key=API_KEY)

        response = quiz_client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
        response_mime_type="application/json",
        temperature=0.9
        )
      )

        

        data = json.loads(response.text)
        questions = data.get("questions", [])

        if len(questions) != request.count:
            raise ValueError("The AI returned an unexpected number of questions.")

        clean_questions = []

        for question in questions:
            text = question.get("question")
            options = question.get("options")
            answer_index = question.get("answer_index")
            explanation = question.get("explanation", "")

            if (
                not isinstance(text, str)
                or not text.strip()
                or not isinstance(options, list)
                or len(options) != 4
                or not all(isinstance(option, str) and option.strip() for option in options)
                or type(answer_index) is not int
                or answer_index not in range(4)
            ):
                raise ValueError("The AI returned an invalid question.")

            clean_questions.append({
                "id": str(uuid.uuid4()),
                "question": text.strip(),
                "options": [option.strip() for option in options],
                "answer_index": answer_index,
                "explanation": str(explanation).strip()
            })

        quiz_id = str(uuid.uuid4())
        quiz_sessions[quiz_id] = clean_questions

        # Do not send correct answers to the browser before submission.
        public_questions = [
            {
                "id": q["id"],
                "question": q["question"],
                "options": q["options"]
            }
            for q in clean_questions
        ]

        return {
            "quiz_id": quiz_id,
            "topic": request.topic,
            "difficulty": request.difficulty,
            "questions": public_questions
        }

    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Could not generate a valid quiz. Please try again. Details: {str(exc)[:250]}"
        )


@app.post("/api/quiz/submit")
def submit_quiz(request: QuizSubmitRequest):
    questions = quiz_sessions.get(request.quiz_id)

    if questions is None:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found or expired. Generate a new quiz."
        )

    if set(request.answers.keys()) - {q["id"] for q in questions}:
        raise HTTPException(status_code=400, detail="Invalid question IDs.")

    results = []
    score = 0

    for question in questions:
        selected = request.answers.get(question["id"])
        valid_selection = type(selected) is int and selected in range(4)
        correct = valid_selection and selected == question["answer_index"]

        if correct:
            score += 1

        results.append({
            "id": question["id"],
            "question": question["question"],
            "options": question["options"],
            "selected_index": selected if valid_selection else None,
            "correct_index": question["answer_index"],
            "is_correct": bool(correct),
            "explanation": question["explanation"]
        })

    total = len(questions)

    # Consume the quiz so it cannot be submitted again for another score.
    del quiz_sessions[request.quiz_id]

    return {
        "score": score,
        "total": total,
        "percentage": round((score / total) * 100, 2),
        "results": results
    }

