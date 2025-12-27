# EngageX – Full UI Development Plan (Mobile-First Web App)

---

## GLOBAL UI PRINCIPLES (NON-VISUAL)

These rules apply to every screen:

* Mobile-first layout (single primary column)
* One primary action per screen
* All interactions reachable with one thumb
* No modal overload — prefer full-screen transitions
* All progress is persistent and visible
* Learning flow is never broken unintentionally

---

## SCREEN MAP (HIGH LEVEL)

1. Entry Portal (Auth)
2. Command Deck (Home / Dashboard)
3. Mission Briefing (Video Link Intake)
4. Learning Mission (In-App Video Player + Checkpoints)
5. Training Grounds (Active Question Screen)
6. Flow State Arena (End-of-Session Confidence Check)
7. Knowledge Map (Skill Tree)
8. Hall of Progress (History & Stats)
9. Settings & System Controls

---

## 1. Entry Portal (Authentication Screen)

### Purpose

Allow user access while keeping friction minimal.

### Components

* App Identifier Header
* User ID Input Field
* Password Input Field
* Primary Action Button (Enter System)
* Secondary Auth Option (Google Sign-In)
* Account Creation Link
* Credential Recovery Link

### Behavior

* Validates credentials
* Redirects authenticated users to Command Deck
* Maintains session persistence

Refer the html code for the exact layout and behavior: "/designs/the_entry_portal/code.html

---

## 2. Command Deck (Home Dashboard)

### Purpose

Central hub showing learning status and entry points.

### Components

#### Header Section

* User Identity Indicator
* Level / Rank Indicator
* XP / Progress Summary
* Settings Shortcut

#### Current Mission Card

* Active Video Title
* Subject / Domain Label
* Mastery Progress Indicator
* Resume Mission Button

#### Mastery Queue Section

* List of queued concepts needing reinforcement
* Each item shows:

  * Concept name
  * Priority indicator
  * Resume shortcut

#### Active Missions Section

* Scrollable list of:

  * Recently started videos
  * Saved missions
* Each card includes:

  * Title
  * Completion percentage
  * Resume action

#### Primary Action

* “Start New Mission” button

### Behavior

* Automatically surfaces highest-priority learning task
* Encourages continuation over starting new content

Refer the html code for the exact layout and behavior: "/designs/the_command_deck/code.html"
---

## 3. Mission Briefing (YouTube Link Intake)

### Purpose

Convert a YouTube video into a learning mission.

### Components

* Instructional Header
* Input Field (YouTube URL)
* Paste Shortcut
* Validation Feedback Area
* Initiate Scan Button
* Processing Status Indicator

### Behavior

* Validates URL
* Fetches transcript
* Prepares learning checkpoints
* On success → transitions to Learning Mission screen

Refer the html code for the exact layout and behavior: "/designs/the_mission_briefing/code.html"

---

## 4. Learning Mission (In-App Video Player)

### Purpose

Core learning experience with controlled playback.

### Components

#### Header

* Video Title
* Exit Mission Button (with confirmation)
* Progress Snapshot

#### Video Player Container

* Embedded YouTube Player
* Playback Controls (play, pause, seek)
* Timestamp Awareness (for checkpoints)

#### Session Progress Indicator

* Mastery Bar (fills during session)
* Current checkpoint indicator

### Behavior

* Video auto-pauses at checkpoints
* Triggers transition to Training Grounds screen
* Prevents skipping past unanswered checkpoints

---

## 5. Training Grounds (Question Interaction Screen)

### Purpose

Active recall and assessment.

### Components

#### Question Prompt

* Contextual question text
* Optional hint toggle

#### Answer Options

* Multiple selectable choices
* Single selection enforced

#### Feedback Area

* Shown only after answer submission
* Indicates correctness

#### Primary Action

* Lock Answer Button

#### Secondary Info

* Question count in session
* Remaining checkpoints

### Behavior

* Accepts user answer
* Records response
* Adjusts mastery model internally
* Returns user to Learning Mission after completion

Refer the html code for the exact layout and behavior: "/designs/the_training_grounds/code.html"

---

## 6. Flow State Arena (End-of-Session Confidence Check)

### Purpose

Capture metacognitive feedback once per session.

### Components

* Session Summary Header
* Brief explanation of confidence check
* Three selectable confidence options:

  * Guessing
  * Unsure
  * Solid
* Confirmation Button
* Skip Option (low emphasis)

### Behavior

* Applies confidence signal to mastery model
* Updates future question difficulty
* Redirects to Command Deck

Refer the html code for the exact layout and behavior: "/designs/the_flow_state_arena/code.html"

---

## 7. Knowledge Map (Skill Tree Screen)

### Purpose

Visualize concept-level mastery.

### Components

#### Header

* Subject Title
* Navigation Controls

#### Knowledge Graph Area

* Concept Nodes
* Connection Lines
* Current Focus Indicator

#### Concept Detail Panel

* Concept name
* Mastery status
* Last interaction time
* Resume learning shortcut

### Behavior

* Tap node to view details
* Highlights weak concepts
* Allows direct navigation to reinforcement

Refer the html code for the exact layout and behavior: "/designs/the_knowledge_map/code.html"

---

## 8. Hall of Progress (History & Stats)

### Purpose

Long-term motivation and self-awareness.

### Components

#### Summary Section

* Total sessions completed
* Active streak
* Average mastery gain

#### Timeline View

* Chronological session list
* Each entry includes:

  * Video title
  * Duration
  * Mastery outcome

#### Achievement Indicators

* Milestone completions
* Consistency markers

### Behavior

* Read-only analytics
* Reinforces progress without pressure

Refer the html code for the exact layout and behavior: "/designs/the_hall_of_progress/code.html"

---

## 9. Settings & System Controls

### Purpose

User preferences and system transparency.

### Components

#### Account Settings

* Profile info
* Sign out

#### Learning Preferences

* Question frequency
* Session length preference

#### System Info

* AI model currently in use
* Data usage notice

#### Support

* Feedback link
* Help documentation

### Behavior

* All changes applied immediately
* No critical learning data reset without confirmation

---

## UI STATE MANAGEMENT (IMPORTANT)

### Global States

* Authenticated / Unauthenticated
* Active Mission / Idle
* In-Session / Post-Session
* Offline / Online

### Persistence

* Last watched timestamp
* Pending checkpoints
* Mastery states
* Confidence history

---

## USER FLOW SUMMARY (ONE LINE)

**Login → Dashboard → Paste Video → Watch → Pause → Answer → Repeat → Confidence Check → Progress Review**