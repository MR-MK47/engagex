# Project Brief

## **EngageX — Adaptive Mastery & Engagement Platform (AMEP)**

### Tagline

**Turn passive video watching into active mastery.**

---

## 1. Overview

**EngageX** is a mobile-first web application built under the **Adaptive Mastery & Engagement Platform (AMEP)** framework.
It transforms long-form educational YouTube videos into **interactive, adaptive learning missions** using AI-generated questions, in-video checkpoints, and mastery-based progression.

Instead of letting learners *watch and forget*, EngageX ensures they **actively recall, adapt, and master concepts**—all without leaving the video environment.

The platform is designed to feel like a **mission control system for learning**, inspired by game-like interfaces (Kahoot, Duolingo) but optimized for **solo deep learning**, not speed or competition.

---

## 2. Problem Statement

Free educational content (YouTube, NPTEL, MOOCs) is abundant, but learning outcomes are poor because:

* Learners consume videos **passively**
* There is no **real-time feedback loop**
* Users don’t know *what they actually understand*
* Rewatching videos feels inefficient and demotivating

This leads to:

* Illusion of competence
* Low retention
* Playlist abandonment
* Frustration with “hard” subjects (DSA, Physics, Math, CS)

---

## 3. Proposed Solution

EngageX introduces a **closed-loop adaptive learning system** that sits *on top of YouTube videos*.

### Core Idea: **The Mastery Loop**

1. User pastes a YouTube video link
2. Video plays **inside EngageX**
3. The system:

   * Analyzes the transcript
   * Identifies conceptual checkpoints
4. Video **pauses at checkpoints**
5. AI asks **adaptive questions**
6. User answers
7. Mastery Progress updates
8. At the end, user completes a **single confidence check**
9. System decides what needs reinforcement later

This loop repeats until **concept mastery is achieved**, not just content completion.

---

## 4. Key Features

### 4.1 In-App Video Player (Core Feature)

* Embedded YouTube player (via `react-youtube`)
* Full playback control:

  * Play / pause
  * Seek
  * Timestamp-based interruption
* Questions appear **without redirecting the user**
* Eliminates distractions and tab-switching

> The video player is not optional — it is the heart of the product.

---

### 4.2 AI-Generated Adaptive Questions

* Questions generated from:

  * YouTube transcripts
  * Current playback context
* Primarily MCQs (hackathon-safe)
* Difficulty adapts based on:

  * Previous answers
  * Accuracy streak
* Distractors are concept-relevant, not random

> No “Did you guess this?” after each question
> → **Confidence check happens once at the end**

---

### 4.3 End-of-Session Confidence Check

At the end of a learning session, the user performs a **single reflective check**:

* Guessing
* Unsure
* Solid

This signal is used to:

* Adjust future question difficulty
* Re-queue concepts for reinforcement
* Avoid interrupting learning flow mid-session

---

### 4.4 Mastery Progress System (Flow State UI)

Inspired by the provided design:

* No stress-based countdown timers
* No red/green exam vibes
* Instead:

  * **Mastery Bar**
  * XP-like progress
  * Session streaks
* Encourages immersion and consistency

---

### 4.5 Knowledge Map (Concept-Level Tracking)

* Concepts extracted from transcript
* Stored as nodes in a lightweight graph
* Each node has a mastery state:

  * Unseen
  * Learning
  * Reinforcement Needed
  * Mastered

Displayed visually in a **Skill Tree / Knowledge Map**.

---

## 5. Design Philosophy (UI / UX)

### Visual Vibe (from design inspiration)

* Dark, immersive theme
* Sci-fi / mission-control aesthetic
* Minimal text, high contrast
* Clear hierarchy
* Touch-friendly components

### UX Principles

* **Mobile-first**
* Thumb-reachable controls
* Swipe and tap over typing
* Zero cognitive overload
* Learning feels like a “mission”, not a test

---

## 6. Technology Stack (100% Free Resources)

### Frontend

* React + Vite
* Tailwind CSS
* Mobile-first layout
* `react-youtube` for player control

### AI Layer

* **Google Gemini API**
* Model name abstracted in config
* Easy future swap to another LLM
* Prompt templates stored centrally

```ts
// example
const AI_MODEL = process.env.AI_MODEL || "gemini-1.5-flash";
```

### Backend / Infra

* Firebase Authentication
* Firebase Firestore (user data, mastery state)
* Firebase Hosting
* Firebase Cloud Functions (optional)

### External APIs

* YouTube Transcript API
* YouTube Embed Player API

---

## 7. Architecture Overview (High Level)

1. User submits YouTube link
2. Transcript fetched & cached
3. Transcript chunked into concepts
4. Gemini generates:

   * Questions
   * Distractors
   * Concept tags
5. Video playback monitored
6. At timestamps:

   * Video pauses
   * Question injected
7. Answers logged to Firestore
8. End-session confidence updates mastery model

---

## 8. What Makes EngageX Unique

* Not just “video → quiz”
* Not exam-centric
* Not speed-based gamification
* Focused on:

  * **Mastery**
  * **Retention**
  * **Flow**
* Designed for **solo learners**
* Built on **learning science**, not just UI tricks

---

## 9. Hackathon-Friendly Scope (Reality Check)

### Included

* YouTube links only
* MCQs
* Single-video flow
* Adaptive difficulty
* Mastery bar
* Confidence check
* Firebase backend
* Gemini AI

### Deferred (Future Vision)

* NPTEL playlists
* Multi-video courses
* Prerequisite auto-linking
* Conversational tutor
* Multiplayer / leaderboards

---

## 10. Vision Statement

> EngageX aims to become the **default way serious learners consume free educational content** —
> turning YouTube from a place you *watch* into a place you *master*.