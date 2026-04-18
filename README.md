# 202282700-HussainAlsadah-assignment3

Personal portfolio (Assignment 3) — an enhanced single-page site built on top of Assignment 2, adding API integrations, advanced logic, state management, and performance improvements.

Overview
--------
This repository contains a lightweight personal portfolio with the following sections: About, Projects, Hobbies, Interactive, and Contact. Assignment 3 builds on the previous work by integrating external APIs, adding a login/logout system with session persistence, project filtering and sorting, a visitor timer, and a dedicated Interactive section.

Features
--------
- Responsive layout using Flexbox
- Smooth scrolling for internal navigation
- Dark / Light theme toggle with localStorage persistence
- Mobile hamburger navigation
- Tabbed About section with animated skill bars
- Login / logout with localStorage session persistence and initials avatar
- Visitor timer showing time spent on the page
- Project filter by category and sort by name or date
- Tech Trivia widget powered by the Open Trivia DB API
- Quotes widget powered by the Quotable API with offline fallback
- Contact form with client-side validation

Run locally
-----------
1. Clone the repository: https://github.com/HussainAlsadah/202282700-HussainAlsadah-assignment3.git

```bash
git clone https://github.com/HussainAlsadah/202282700-HussainAlsadah-assignment3.git
cd 202282700-HussainAlsadah-assignment3
```

2. Open `index.html` in a browser (static site — no server required).
3. An internet connection is required for the Trivia and Quotes widgets. Both degrade gracefully if the APIs are unreachable.

Files & Structure
-----------------
- `index.html` — main single-page markup
- `css/styles.css` — all styles (responsive rules, dark mode, new components)
- `js/script.js` — all interactivity including login, timer, filter/sort, APIs
- `assets/images/` — project placeholder images and other assets
- `docs/ai-usage-report.md` — AI usage report
- `docs/technical-documentation.md` — technical documentation
- `.gitignore` — excludes OS and editor files from the repository

AI Usage (summary)
-------------------
I used Claude throughout Assignment 3 to generate and refine code for new features, suggest UI improvements, assist with debugging, and draft documentation. All outputs were manually reviewed, tested, and modified to fit the project and reflect my own understanding. Significant changes were needed in several places, and bugs found during testing were fixed manually.
See `docs/ai-usage-report.md` for details.