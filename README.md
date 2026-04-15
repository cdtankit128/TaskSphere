# TaskSphere

**TaskSphere** is an ultra-modern, high-performance, and beautifully designed full-stack task management dashboard. Tailored for students and professionals, it provides an exquisite UI (re-imagined with a dark glassmorphic scheme and vivid purple accents) alongside robust productivity tracking mechanisms like consistency streaks and personalized academic profiles. 

## Key Features
- **University Dataset Integration:** A seamless, password-less login experience utilizing institutional UIDs. The system instantly verifies details, mapping UIDs to real student names, admission years, and roll numbers via a tightly integrated JSON dataset extract.
- **Exquisite Dashboard:** A beautifully restructured dashboard tracking active tasks, overall task completion percentages, and longest day-to-day streaks.
- **Advanced Task Management:** A 'Focus List' featuring dynamic tag-filtering (All/Active/Completed), priority mappings, and an integrated DatePicker.
- **Deep Analytics:** A dedicated Insights page featuring animated, fluid CSS bar charts highlighting rolling 7-day completion consistency and tracking overall efficiency metrics.
- **Real-time Serverless Backend:** Employs ultra-fast Vercel serverless functions in the `/api` directory for rapid CRUD operations.
- **Zero-Friction CI/CD Deployment:** Every push successfully triggers automated GitHub Actions and Vercel pipeline updates for instantaneous zero-downtime deployments.

## Technology Stack
- **Frontend Framework:** React 18, Vite, React Router
- **Styling:** Tailwind CSS, Material-UI (MUI), custom glassmorphic utility ecosystems.
- **Fonts & Typography:** Inter, Space Grotesk, Manrope, plus Google Material Symbols.
- **Backend Architecture:** Vercel Serverless Functions (`api/todos.js`)
- **Data Integration:** Static JSON extraction via Python (`parse_students.py`) from PDF registers.

## How It Works
Users authenticate smoothly by merely entering their assigned UID (e.g. `23BCS...`). Upon valid entry, the server authenticates the dataset and provisions a session. From the dashboard, users manage their tasks while the front-end natively proxies `fetch` requests towards the serverless `/api/todos` endpoint—resolving listings, creations, updates, and cascading delete operations cleanly.

## Deployment Model
The project adopts a modern GitOps pipeline optimized specifically for **Vercel**. Pushing to the `main` branch on GitHub automatically kicks off the deployment cycle without the overhead complexity of Docker containers or manual Virtual Machines.

## Main Directory Structure
- `frontend/` — The React/Vite dashboard, containing all components, contexts, UI pages, and Tailwind configurations.
- `frontend/public/data/` — Contains isolated datasets like `students.json` for verified login matching.
- `api/` — The lightweight Vercel serverless backend interface endpoints.
- `.github/workflows/` — Continuous Integration check configurations.

---
*Note: The serverless API currently stores `todos` ephemerally in a demonstration cache. To achieve persistent cross-device production storage, integrate a managed NoSQL backend such as MongoDB or Supabase locally within the functions.*
