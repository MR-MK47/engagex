# EngageX Execution Plan

This document outlines the step-by-step execution plan for building **EngageX**, based on the [Project Brief](./project-brief.md) and [UI Development Plan](./ui-dev-plan.md).

---

## Phase 1: Foundation & Setup
**Goal**: Establish the technical groundwork for the application.

### 1.1 Project Initialization
- [✅] Initialize React + Vite project (TypeScript).
- [✅] Configure Tailwind CSS v4 (or v3.4+) with custom design tokens (colors, typography) matching the "Mission Control" aesthetic.
- [✅] Setup ESLint, Prettier, and Husky for code quality.
- [✅] Initialize Git repository.

### 1.2 Architecture Setup
- [✅] Define directory structure (`/src/components`, `/src/pages`, `/src/services`, `/src/hooks`, `/src/context`).
- [✅] Install and configure `react-router-dom` for navigation.
- [✅] Create core route definitions (Auth, Dashboard, Mission, etc.).

### 1.3 Firebase Integration
- [✅] Create Firebase project (if not exists).
- [✅] Register web app in Firebase Console.
- [✅] Add Firebase SDK to project.
- [✅] Create `src/lib/firebase.ts` and initialize Authentication and Firestore services.

---

## Phase 2: Design System & UI Core
**Goal**: Build the visual language and reusable components.

### 2.1 Design Tokens & Global Styles
- [✅] Define CSS variables for theme colors (Dark, Neon accents).
- [✅] Setup typography hierarchy (Inter/Roboto/Outfit).
- [✅] Create base styles for dark mode optimization.

### 2.2 Atomic Components
- [✅] **Buttons**: Primary (Mission Action), Secondary, Ghost.
- [✅] **Inputs**: Text fields (Email, YouTube URL), Password fields.
- [✅] **Cards**: Mission cards, Stat cards.
- [✅] **Progress**: Mastery Bar component, XP bars.
- [✅] **layout**: Container, Grid system, mobile-first wrappers.

---

## Phase 3: Core Flows (Part 1 - Entry & Dashboard)
**Goal**: Enable user access and main dashboard navigation.

### 3.1 Authentication (Entry Portal)
- [✅] Implement **Entry Portal** [Screen 1].
- [✅] Integrate Firebase Auth (Email/Password, Google Sign-in).
- [✅] Create AuthProvider context for session management.
- [✅] Implement Protected Routes logic.

### 3.2 Command Deck (Dashboard)
- [✅] Implement **Command Deck** [Screen 2].
- [✅] Build Header with User Stats (Level, XP).
- [✅] Create "Current Mission" and "Mastery Queue" sections.
- [✅] Connect "Start New Mission" button to Mission Briefing.

---

## Phase 4: The Core Engine (Video & AI)
**Goal**: Build the Learning Mission player and AI integration.

### 4.1 Mission Briefing
- [✅] Implement **Mission Briefing** [Screen 3].
- [✅] Create YouTube URL input with validation.
- [✅] Integrate YouTube Data API (to fetch video metadata).

### 4.2 AI Service integration
- [✅] Setup Google Gemini API client.
- [✅] Create prompt templates for transcript analysis and question generation.
- [✅] Implement service functions to fetch/parse video transcripts (using third-party API or serverless function if needed).

### 4.3 Learning Mission Player
- [✅] Implement **Learning Mission** [Screen 4].
- [✅] Integrate `react-youtube` for embed control.
- [✅] Implement "Checkpoint" logic (monitoring timestamp).
- [ ] Create visual cues for upcoming checkpoints on the timeline (custom controls).

---

## Phase 5: The Mastery Loop
**Goal**: Implement the interactive questioning and progress tracking.

### 5.1 Training Grounds
- [✅] Implement **Training Grounds** [Screen 5] (Overlay/Modal or Page).
- [✅] Render Question text and Multiple Choice options.
- [✅] Handle answer selection and feedback (Correct/Incorrect visuals).
- [✅] "Lock Answer" interaction.

### 5.2 Confidence Check
- [✅] Implement **Flow State Arena** [Screen 6].
- [✅] Create confidence selection UI (Guessing/Unsure/Solid).
- [✅] Store simplified mastery data (0-1-2 scale) based on result.

### 5.3 Data Persistence
- [✅] Design Firestore schema:
    - `users/{uid}`
    - `missions/{missionId}`
    - `concepts/{conceptId}`
- [✅] Implement services to save progress, answers, and mastery stats.

---

## Phase 6: Visualization & Polish
**Goal**: Visual feedback, stats, and final UX refinements.

### 6.1 Knowledge Map
- [✅] Implement **Knowledge Map** [Screen 7].
- [✅] Visual graph or list of Concepts + Mastery status.

### 6.2 Hall of Progress
- [✅] Implement **Hall of Progress** [Screen 8].
- [✅] Display session history and aggregate stats.

### 6.3 Settings
- [✅] Implement **Settings & System Controls** [Screen 9].
- [✅] Account management and support links.

### 6.4 UX Refinement
- [ ] Add micro-animations (Framer Motion).
- [ ] Optimize transitions between Player and Question modes.
- [ ] Mobile responsiveness testing.
- [ ] Error handling and loading states.
