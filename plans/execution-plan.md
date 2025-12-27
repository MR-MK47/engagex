# EngageX Execution Plan

This document outlines the step-by-step execution plan for building **EngageX**, based on the [Project Brief](./project-brief.md) and [UI Development Plan](./ui-dev-plan.md).

---

## Phase 1: Foundation & Setup
**Goal**: Establish the technical groundwork for the application.

### 1.1 Project Initialization
- [x] Initialize React + Vite project (TypeScript).
- [x] Configure Tailwind CSS v4 (or v3.4+) with custom design tokens (colors, typography) matching the "Mission Control" aesthetic.
- [x] Setup ESLint, Prettier, and Husky for code quality.
- [x] Initialize Git repository.

### 1.2 Architecture Setup
- [x] Define directory structure (`/src/components`, `/src/pages`, `/src/services`, `/src/hooks`, `/src/context`).
- [x] Install and configure `react-router-dom` for navigation.
- [x] Create core route definitions (Auth, Dashboard, Mission, etc.).

### 1.3 Firebase Integration
- [x] Create Firebase project (if not exists).
- [x] Register web app in Firebase Console.
- [x] Add Firebase SDK to project.
- [x] Create `src/lib/firebase.ts` and initialize Authentication and Firestore services.

---

## Phase 2: Design System & UI Core
**Goal**: Build the visual language and reusable components.

### 2.1 Design Tokens & Global Styles
- [x] Define CSS variables for theme colors (Dark, Neon accents).
- [/] Setup typography hierarchy (Inter/Roboto/Outfit).
- [x] Create base styles for dark mode optimization.

### 2.2 Atomic Components
- [x] **Buttons**: Primary (Mission Action), Secondary, Ghost.
- [x] **Inputs**: Text fields (Email, YouTube URL), Password fields.
- [x] **Cards**: Mission cards, Stat cards.
- [x] **Progress**: Mastery Bar component, XP bars.
- [x] **layout**: Container, Grid system, mobile-first wrappers.

---

## Phase 3: Core Flows (Part 1 - Entry & Dashboard)
**Goal**: Enable user access and main dashboard navigation.

### 3.1 Authentication (Entry Portal)
- [x] Implement **Entry Portal** [Screen 1].
- [x] Integrate Firebase Auth (Email/Password, Google Sign-in).
- [x] Create AuthProvider context for session management.
- [x] Implement Protected Routes logic.

### 3.2 Command Deck (Dashboard)
- [x] Implement **Command Deck** [Screen 2].
- [ ] Build Header with User Stats (Level, XP).
- [ ] Create "Current Mission" and "Mastery Queue" sections.
- [ ] Connect "Start New Mission" button to Mission Briefing.

---

## Phase 4: The Core Engine (Video & AI)
**Goal**: Build the Learning Mission player and AI integration.

### 4.1 Mission Briefing
- [ ] Implement **Mission Briefing** [Screen 3].
- [ ] Create YouTube URL input with validation.
- [ ] Integrate YouTube Data API (to fetch video metadata).

### 4.2 AI Service integration
- [ ] Setup Google Gemini API client.
- [ ] Create prompt templates for transcript analysis and question generation.
- [ ] Implement service functions to fetch/parse video transcripts (using third-party API or serverless function if needed).

### 4.3 Learning Mission Player
- [ ] Implement **Learning Mission** [Screen 4].
- [ ] Integrate `react-youtube` for embed control.
- [ ] Implement "Checkpoint" logic (monitoring timestamp).
- [ ] Create visual cues for upcoming checkpoints on the timeline (custom controls).

---

## Phase 5: The Mastery Loop
**Goal**: Implement the interactive questioning and progress tracking.

### 5.1 Training Grounds
- [ ] Implement **Training Grounds** [Screen 5] (Overlay/Modal or Page).
- [ ] Render Question text and Multiple Choice options.
- [ ] Handle answer selection and feedback (Correct/Incorrect visuals).
- [ ] "Lock Answer" interaction.

### 5.2 Confidence Check
- [ ] Implement **Flow State Arena** [Screen 6].
- [ ] Create confidence selection UI (Guessing/Unsure/Solid).
- [ ] Store simplified mastery data (0-1-2 scale) based on result.

### 5.3 Data Persistence
- [ ] Design Firestore schema:
    - `users/{uid}`
    - `missions/{missionId}`
    - `concepts/{conceptId}`
- [ ] Implement services to save progress, answers, and mastery stats.

---

## Phase 6: Visualization & Polish
**Goal**: Visual feedback, stats, and final UX refinements.

### 6.1 Knowledge Map
- [ ] Implement **Knowledge Map** [Screen 7].
- [ ] Visual graph or list of Concepts + Mastery status.

### 6.2 Hall of Progress
- [ ] Implement **Hall of Progress** [Screen 8].
- [ ] Display session history and aggregate stats.

### 6.3 Settings
- [ ] Implement **Settings & System Controls** [Screen 9].
- [ ] Account management and support links.

### 6.4 UX Refinement
- [ ] Add micro-animations (Framer Motion).
- [ ] Optimize transitions between Player and Question modes.
- [ ] Mobile responsiveness testing.
- [ ] Error handling and loading states.
