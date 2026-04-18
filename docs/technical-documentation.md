# Technical Documentation

Project: 202282700-HussainAlsadah-assignment3

Date: 2026-04-18

Cloning link: https://github.com/HussainAlsadah/202282700-HussainAlsadah-assignment3.git

Overview
--------
This is the documentation for the portfolio assessment (Assignment 3), which builds on Assignment 2 by adding external API integrations, a login/logout system with session persistence, project filtering and sorting, a visitor timer, and a dedicated Interactive section. The site remains a static single-page portfolio built with HTML, CSS, and JavaScript.

Repository Structure
--------------------
assignment-3/
- README.md
- index.html
- css/
    - styles.css
- js/
    - script.js
- assets/
    - images/
        - AI-ProjectPlaceHolder.png
        - computer-stuff.jpg
        - CV-Example.png
        - task-manager-placeholder.png
- docs/
    - ai-usage-report.md
    - technical-documentation.md
- .gitignore

Key Files & Responsibilities
----------------------------
- `index.html`
    - Contains the page sections: About (tabbed), Projects, Hobbies, Interactive, Contact, and Footer.
    - The About section remains split into three tabs: About, Skills, and Experience.
    - A visitor timer bar sits below the header and is always visible, counting time spent on the page.
    - A welcome banner appears below the header when a user is logged in, showing their name.
    - The Projects section includes filter buttons and a sort dropdown above the project grid; each card has `data-category`, `data-date`, and `data-name` attributes used by the filter/sort logic.
    - The Interactive section contains the Tech Trivia widget and the Quote widget side by side.
    - The Contact form uses `novalidate` and custom JavaScript validation with inline error messages.
    - A login modal at the bottom of `<body>` handles the login flow with a live avatar preview.
    - The navbar includes a `.nav-auth` area that shows a login button when logged out and a user pill with initials and a logout icon when logged in.
    - The `<script>` tag is placed at the bottom of `<body>` to ensure the DOM is fully loaded before the script runs.

- `css/styles.css`
    - Global resets and system font stack.
    - Sectioned styles for header, timer bar, welcome banner, login modal, nav auth area, tabs, skill bars, experience timeline, projects, project controls, hobbies, interactive widgets, contact form, and footer.
    - Timer bar styles: `.timer-bar` — slim banner always visible below the header.
    - Nav auth styles: `.nav-auth`, `.login-btn`, `.user-pill`, `.user-avatar`, `.user-display-name`, `.logout-btn`.
    - Modal styles: `.modal-overlay`, `.modal`, `.modal-header`, `.modal-avatar-preview` with a `modalIn` scale/fade entry animation.
    - Project control styles: `.project-controls`, `.filter-btn`, `#sort-select` with active state for the selected filter.
    - Interactive grid styles: `.interactive-grid` as a flex container; `.trivia-widget` and `.quote-widget` share base styles via `.widget-title`, `.widget-btn`, and `.widget-error`.
    - Quote styles: `.quote-text` with CSS `::before`/`::after` pseudo-elements for decorative quotation marks.
    - Responsive rules under `@media (max-width: 768px)`; interactive grid stacks vertically, modal fits small screens.
    - Dark mode styles applied by toggling the `dark-mode` class on `<body>`, covering all new and existing components.

- `js/script.js`
    - Wrapped in `DOMContentLoaded` to ensure DOM nodes exist before attaching listeners.
    - Implements:
        - Smooth scrolling for internal navigation links.
        - Theme toggle (adds/removes `dark-mode` on `<body>`, updates SVG icon, saves preference to `localStorage`).
        - Theme persistence via `localStorage`: saved preference is restored on page load.
        - Mobile nav toggle (adds/removes `.open` on `.nav-links` and manages `aria-expanded`).
        - Visitor timer: uses `setInterval` to increment a counter every second from page load; `formatTime()` formats raw seconds into a readable string and updates the `#visit-timer` element.
        - Login/logout: `getInitials()` extracts up to two initials from a name; `applyLoggedInState()` and `applyLoggedOutState()` update the navbar pill, welcome banner, and login button; the user's name is saved to and restored from `localStorage` so the session persists across page refreshes; the modal closes on Cancel, backdrop click, or Escape key; a live avatar preview updates in real time as the user types their name.
        - Tab switching: activates the clicked tab panel, deactivates others, triggers skill bar animation when the Skills tab opens.
        - Skill bar animation: resets bar widths to 0% then animates to their `data-level` value using `requestAnimationFrame`.
        - Project filter & sort: snapshots all `.project-card` elements into an array on load; `applyFilterAndSort()` filters by category, sorts by the selected order, detaches all cards from the DOM, and re-appends them in the new order; shows an empty-state message if no cards are visible.
        - Tech Trivia: fetches 5 questions at a time from the Open Trivia DB API (category: Science & Computers), renders answer buttons, handles correct/wrong selection with visual feedback, shows a "Next Question" button after answering, refetches when the queue is empty, and displays a friendly error message if the API call fails.
        - Quotes widget: fetches a random quote from the Quotable API on load and on button click; falls back to a hardcoded list of 6 quotes if the API is unreachable, avoiding repeating the last shown quote.
        - Contact form validation: checks name, email (including format via regex), and message fields on submit; shows inline error messages and red borders on invalid fields; shows a green success message and resets the form on valid submission.

Assets
------
- `assets/images/AI-ProjectPlaceHolder.png` — used for the AI Study Assistant project card preview.
- `assets/images/task-manager-placeholder.png` — used for the Task Manager project card preview.
- `assets/images/computer-stuff.jpg` — used for the Portfolio Website project card preview.
- `assets/images/CV-Example.png` — present in assets but not currently used.

How to Run Locally
-------------------
1. Clone the repository:
   https://github.com/HussainAlsadah/202282700-HussainAlsadah-assignment3.git
2. Open `index.html` in a browser (static site, no server required).
3. An internet connection is required for the Tech Trivia and Quotes widgets to fetch data from their respective APIs. Both degrade gracefully if the APIs are unreachable.
4. Test responsive behavior by resizing the window or using DevTools device emulation.

Testing & Verification
----------------------
- Smooth scrolling: click navigation links to confirm smooth scroll to each section.
- Theme toggle: click the round button at bottom-right to switch dark/light mode; refresh the page to confirm the preference is restored from localStorage.
- Mobile nav: at narrow widths (<=768px), use the hamburger button to open/close the navigation dropdown.
- Visitor timer: confirm the timer starts at 0s on page load and increments every second; confirm it formats correctly after 60 seconds (e.g. "1m 05s").
- Login: click Log In, submit with an empty name to confirm validation; enter a name and confirm the user pill and welcome banner appear; refresh the page to confirm the session is restored; click logout to confirm the session clears.
- Project filter: click each filter button to confirm only matching cards are shown; confirm the empty-state message appears when no cards match.
- Project sort: select each sort option to confirm cards reorder correctly.
- Tabs: click About, Skills, and Experience tabs in the About section; confirm the Skills tab triggers the animated progress bars.
- Tech Trivia: confirm a question loads on page load, answer buttons highlight correctly/incorrectly on click, the Next Question button advances to the next question, and an error message appears if the API is unreachable.
- Quotes widget: confirm a quote loads on page load; click "New Quote" to confirm it refreshes.
- Contact form: submit with empty fields to confirm inline error messages appear; submit with an invalid email to confirm format validation; submit a valid form to confirm the success message appears and the form resets.