# Challenge-Demo

## Purpose

This is a WebApp which focuses on the creation of an AI-Driven Compliance Training platform. The WebApp gamifies the learning journey of the user while leveraging AI to enhance their experience.

## Setup

This demo creates a WebApp using Vite for the frontend. The demo uses React for the development of the frontend and express for the development of the backend.

**Running the frontend**
You will need to have `node`, `npm` and `Yarn` installed on the device.
Documentation to install `node` and `npm` can be found [here](https://nodejs.org/en/download).
Documentation to install `yarn` can be found [here](https://classic.yarnpkg.com/lang/en/docs/install/).
The command to start the Frontend are:
`cd groqify-demo`
`yarn install`
`yarn dev`
The frontend runs on the port `5173`

**Running the backend**
You will also need to create `.env` file which contains an API Key for the AI-Client. The client used is `together-api`, the content of the `.env` file are shown here temporarily for the sake of convenience.
`TOGETHER_API_KEY = eea259b98148d87451f1291a0fe7152a5d089be2fd835575f82cd8e122b5b3d2`
The commands to start the Backend are:
`cd backend`
`npm install`
`node app.js`
The backend runs on the port `3000`

**Running the Redis Server**
We will also need a runing `redis-server` to work as a database for this demo. The documentation to install the `redis-server` can be found [here](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/).
The command to start the `redis-server` is:
`redis-server`
The redis server is started with the default configuration and runs on the port `6379`

## Architecture

### Tech Stack

- **Frontend**: Vite + React (Fast, modern frontend framework)
- **Backend**: Express.js (Lightweight and scalable backend)
- **Database**: Redis (Key-value store for fast reads/writes)
- **AI Integration**: External API-based AI Assistant (TogetherAI)

### System Design

#### Frontend (Vite + React)

- **Component-Based UI**: Organized using React components with TailwindCSS Flowbite for styling.
- **Routing**: `react-router-dom` for handling multiple views.
- **API Communication**: Axios for backend requests.

---

#### Frontend Directory Structure

    /groqify-demo
    │── /src
    │   ├── /assets        	   # Static assets
    │   ├── /components        # Reusable UI components
    │   ├── /pages             # Application pages (HomePage, LessonPage)
    │   ├── /services          # API services (API handlers)
    │   ├── index.tsx          # Root file (React app entry)
    │   ├── App.tsx            # Main component
    │── /public                # Static assets
    │── vite.config.js         # Vite config file
    │── package.json           # Dependencies

---

### Backend (Express.js + Redis)

- **Express for REST API**: Handles routes and business logic.
- **Redis as a Database**: Stores messages, and AI interactions.
- **AI API Integration**: Calls external AI Assistant APIs for responses.
- **Rate Limiting**: Uses Redis for request throttling.

#### Backend Directory Structure

    /backend
    │── /src
    │   ├── /routes          # Express routes (AI, lessons, etc.)
    │   ├── /views           # Views
    │   ├── /redis           # Redis Integration
    │   ├── /config          # Config files (environment variables)
    │   ├── server.js        # Main Express server
    │── .env                 # Environment variables
    │── package.json         # Dependencies

---

### Database (Redis)

- Stores:
  - AI-generated responses
  - Chat history

---

### AI Assistant Integration

- Uses an **external AI API** (TogetherAI).
- Requests handled via a **backend service**.
- AI responses stored in Redis to maintain a history for future sessions.

---

### Communication Flow

1.  **Frontend (Vite + React)**
    - User submits a query in the app.
    - React calls the Express backend (`/api/chat`).
2.  **Backend (Express)**
    - Checks **Redis** for previous responses.
    - Use the history as context to generate a response for the current message
    - Stores AI response in Redis for future sessions.
3.  **Redis (Database)**
    - Manages **Chat History** (if needed).

---

## Decisions

### Vite + React (Frontend)

**Fast Development & Hot Reloading**

- **Vite** offers **instant builds & fast HMR (Hot Module Replacement)**.
- React’s **component-based architecture** allows for modular and reusable UI components.

**Optimized Performance**

- Vite **only bundles the required code** and supports **lazy loading** improving app load times compared to **Webpack-based setups**.

**Rich Ecosystem**

- Compatible with **Tailwind CSS and FLowbite** for rapid styling.
- Large **React community** allows for better support, libraries, and updates.

---

### Express.js (Backend)

**Minimal, Lightweight, and Fast**

- Has a **small footprint**, making it more efficient than heavier frameworks like Django or Rails.

**Seamless Integration with Redis & AI APIs**

- Easily connects with **Redis (for caching AI responses)**.
- Handles requests to AI **APIs like Together.AI**.

**Uses JavaScript**

- Since Express uses JavaScript, context switching between various languages is reduces, instead of using frameworks like Django, which would require switching of context to languages such as Python.

---

### Redis (Database & Cache)

**In-Memory Data Storage**

- **Redis is an in-memory database**, making it faster than traditional databases.

**Flexible & Scalable**

- Works as a **database (RedisJSON)** or a **cache layer** over SQL/NoSQL databases.

---

### **API-Based AI Assistant**

**On-Demand AI without Expensive Infrastructure**

- Calling an **external AI API (Together.AI)** avoids the need to host an expensive **LLM** model yourself.
- Pay **only for what you use** rather than managing servers.

**Flexible & Upgradable**

- The AI service can be **easily swapped or upgraded**.
- Supports **text-based AI chat, embeddings, and fine-tuning**.
