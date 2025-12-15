# CEFRify - English Proficiency Test App

CEFRify is a cross-platform mobile app built with React Native and Spring Boot for evaluating a user's English language proficiency level based on the CEFR (Common European Framework of Reference) scale. The app guides users through three interactive test rounds and provides comprehensive results with personalized feedback.

---

## ✨ Features

### 📱 Cross-Platform
- **React Native + Expo** for Android, iOS, and Web
- Responsive design with consistent UI/UX across platforms
- Tab and stack navigation using **Expo Router**

### 🧠 Comprehensive Testing
- **Text Repetition** – Tests short-term recall and pronunciation accuracy
- **Audio Comprehension** – Tests listening skills and verbal response
- **Free Speech** – Tests spontaneous speech, fluency, and vocabulary

### 📊 Advanced Evaluation
- AI-assisted or rules-based scoring system
- CEFR level classification (A1 to C2)
- Detailed performance breakdown by skill area
- Progress tracking and historical results

### 🔧 Backend Features
- **Spring Boot** REST API with JWT authentication
- **PostgreSQL** database for user data and test results
- Email integration for result delivery
- Secure audio file processing and storage

---

## 🏗️ Architecture

```
Frontend (React Native + Expo)
├── User Interface & Navigation
├── Audio Recording & Playback
├── Real-time Test Management
└── Result Visualization

Backend (Spring Boot + PostgreSQL)
├── RESTful API Endpoints
├── User Authentication & Management
├── Test Evaluation Engine
├── Email Service Integration
└── Database Management
```

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- **Node.js** (18.0+)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Java** (17+)
- **Maven** (3.8+)
- **PostgreSQL** (15+)
- **Git**

---

## 📁 Project Structure

```
CEFRify/
├── app/                          # Frontend source code
│   ├── _layout.tsx              # Root layout configuration
│   ├── (main)/                  # Stack Screens
│   │   └── instructions.tsx     # Test instructions
│   ├── (tabs)/                  # Tab Navigation Screens
│   │   ├── index.tsx           # Home screen
│   │   ├── profile.tsx         # User profile & results
│   │   └── aboutUs.tsx         # About the app
│   └── (tests)/                 # Test rounds and results
│       ├── round1.tsx          # Text Repetition
│       ├── round2.tsx          # Audio Comprehension
│       ├── round3.tsx          # Free Speech
│       └── result.tsx          # Test results
│
├── components/                   # Reusable UI components
│   ├── Header.tsx              # App header component
│   └── Footer.tsx              # App footer component
│
├── assets/                       # Static assets
│   ├── images/                 # Logos, illustrations
│   └── audios/                 # Audio clips for tests
│
├── backend/                      # Spring Boot backend
│   ├── src/main/java/com/cefr/Cefrify/
│   │   ├── CefrifyApplication.java
│   │   ├── controllers/        # REST controllers
│   │   ├── services/           # Business logic
│   │   ├── models/             # Entity models
│   │   ├── repositories/       # Data access layer
│   │   └── config/             # Configuration classes
│   └── src/main/resources/
│       └── application.properties
│
├── app.json                      # Expo configuration
├── package.json                  # NPM dependencies
├── tsconfig.json                # TypeScript configuration
├── eslint.config.js             # Linter rules
└── README.md                    # This file
```

---

## 🧪 Testing Workflow

### User Journey
1. **Home** - User provides name and email to start the test
2. **Instructions** - Overview of test structure and requirements
3. **Round 1: Text Repetition** - Read and repeat provided texts
4. **Round 2: Audio Comprehension** - Listen and respond to audio clips
5. **Round 3: Free Speech** - Speak freely on given topics
6. **Results** - Comprehensive CEFR level assessment with feedback and download the result as pdf.

### CEFR Levels
- **A1** (Beginner) - Basic everyday expressions
- **A2** (Elementary) - Simple personal information
- **B1** (Intermediate) - Familiar topics and situations
- **B2** (Upper Intermediate) - Complex texts and abstract topics
- **C1** (Advanced) - Implicit meaning and fluent expression
- **C2** (Proficient) - Native-like understanding and expression
---

## 📋 TODO List

### 🔥 High Priority
- [ ] **Backend Development**
  - [ ] Complete Spring Boot REST API implementation
  - [ ] User authentication and JWT token management
  - [ ] PostgreSQL database schema and migrations
  - [ ] Audio file upload and processing endpoints
  
- [ ] **Core Features**
  - [ ] Audio recording functionality in React Native
  - [ ] Audio playback and waveform visualization
  - [ ] Test timer and progress tracking
  - [ ] CEFR scoring algorithm implementation

### 🚀 Medium Priority
- [ ] **UI/UX Enhancements**
  - [ ] Dark mode support
  - [ ] Accessibility improvements (screen reader support)
  - [ ] Loading states and error handling
  - [ ] Onboarding tutorial for first-time users
  
- [ ] **Advanced Features**
  - [ ] Offline mode capabilities
  - [ ] Multi-language support (i18n)
  - [ ] Social sharing of results
  - [ ] Integration with learning platforms

### 📈 Future Enhancements
- [ ] **Analytics & Insights**
  - [ ] User behavior analytics
  - [ ] Performance metrics dashboard
  - [ ] A/B testing framework
  
- [ ] **AI Integration**
  - [ ] Speech-to-text accuracy improvements
  - [ ] Natural language processing for better evaluation
  - [ ] Personalized learning recommendations
  
- [ ] **Platform Expansion**
  - [ ] Desktop application (Electron)
  - [ ] Chrome extension for web testing
  - [ ] API for third-party integrations
---

**Made with ❤️ for language learners worldwide**
