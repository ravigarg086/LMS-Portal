# LearnHub LMS Portal

A MERN-ready Learning Management System (LMS) homepage built as a React Single Page Application with Bootstrap for responsive design.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React (Create React App), Bootstrap |
| Backend  | Express + MongoDB (planned)         |

## Project Structure

```
LMS-Project-Cursor/
├── client/                 # React SPA (homepage)
│   └── src/
│       ├── components/     # Navbar, Hero, Features, Courses, About, ContactUs, Footer
│       ├── App.js
│       └── App.css
└── README.md
```

## Homepage Sections

- **Hero** — Value proposition and course progress preview
- **Features** — Platform capabilities grid
- **Courses** — Popular course cards
- **About** — Institution stats and benefits
- **Contact Us** — Form with Name, Designation, Email, Location
- **Footer** — Links and newsletter signup

## Getting Started

From the project root:

```powershell
npm.cmd install --prefix client
npm.cmd start
```

Or from the `client` folder:

```powershell
cd client
npm.cmd install
npm.cmd start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Windows PowerShell note

If you see `running scripts is disabled on this system`, use `npm.cmd` instead of `npm` (or `npx.cmd` instead of `npx`). Do not use `npx start` — that is not how this app starts. Use `npm.cmd start` from the project root or `client` folder.

## Build for Production

```bash
cd client
npm run build
```

## Contact Form Fields

The Contact Us section includes validated fields:

- Name
- Designation
- Email
- Location
