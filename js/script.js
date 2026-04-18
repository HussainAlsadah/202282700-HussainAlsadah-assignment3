document.addEventListener('DOMContentLoaded', () => {

    // =============================
    // Smooth Scrolling
    // =============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });


    // =============================
    // Dark / Light Theme Toggle + localStorage persistence
    // =============================
    const sunIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`;

    const moonIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`;

    const themeButton = document.createElement("button");
    themeButton.id = "theme-toggle";
    themeButton.setAttribute("aria-label", "Toggle dark mode");
    themeButton.classList.add("theme-toggle-btn");
    document.body.appendChild(themeButton);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeButton.innerHTML = moonIcon;
    } else {
        themeButton.innerHTML = sunIcon;
    }

    themeButton.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        themeButton.innerHTML = isDark ? moonIcon : sunIcon;
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });


    // =============================
    // Mobile Nav Toggle
    // =============================
    const navToggle = document.getElementById('nav-toggle');
    const navLinks  = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }));
    }


    // =============================
    // Simulated Login / Logout State
    // =============================
    const loginBtn      = document.getElementById('login-btn');
    const welcomeBanner = document.getElementById('welcome-banner');
    const welcomeName   = document.getElementById('welcome-name');
    const logoutBtn     = document.getElementById('logout-btn');
    const loginModal    = document.getElementById('login-modal');
    const modalName     = document.getElementById('modal-name');
    const modalNameErr  = document.getElementById('modal-name-error');
    const modalCancel   = document.getElementById('modal-cancel');
    const modalConfirm  = document.getElementById('modal-confirm');

    // Track login state in memory
    let isLoggedIn = false;
    let currentUser = '';

    function openModal() {
        modalName.value = '';
        modalNameErr.textContent = '';
        modalName.classList.remove('input-error');
        loginModal.classList.remove('hidden');
        setTimeout(() => modalName.focus(), 50);
    }

    function closeModal() {
        loginModal.classList.add('hidden');
    }

    function doLogin(name) {
        isLoggedIn = true;
        currentUser = name;
        welcomeName.textContent = name;
        welcomeBanner.classList.remove('hidden');
        loginBtn.textContent = 'Log Out';
        loginBtn.classList.add('logged-in');
        closeModal();
    }

    function doLogout() {
        isLoggedIn = false;
        currentUser = '';
        welcomeBanner.classList.add('hidden');
        loginBtn.textContent = 'Log In';
        loginBtn.classList.remove('logged-in');
    }

    loginBtn.addEventListener('click', () => {
        if (isLoggedIn) {
            doLogout();
        } else {
            openModal();
        }
    });

    logoutBtn.addEventListener('click', doLogout);

    modalCancel.addEventListener('click', closeModal);

    // Close modal when clicking the backdrop
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) closeModal();
    });

    // Confirm login on button click
    modalConfirm.addEventListener('click', () => {
        const name = modalName.value.trim();
        if (!name) {
            modalNameErr.textContent = 'Please enter your name.';
            modalName.classList.add('input-error');
            return;
        }
        doLogin(name);
    });

    // Also confirm on Enter key
    modalName.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') modalConfirm.click();
    });


    // =============================
    // Tab Switching (About / Skills / Experience)
    // =============================
    const tabBtns   = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const target = document.getElementById(btn.dataset.tab);
            if (target) {
                target.classList.add('active');
                if (btn.dataset.tab === 'skills-tab') animateSkillBars();
            }
        });
    });

    function animateSkillBars() {
        document.querySelectorAll('.skill-fill').forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = '0%';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    bar.style.width = level + '%';
                });
            });
        });
    }


    // =============================
    // Project Filter & Sort
    // =============================
    const filterBtns    = document.querySelectorAll('.filter-btn');
    const sortSelect    = document.getElementById('sort-select');
    const projectGrid   = document.getElementById('project-grid');
    const noProjectsMsg = document.getElementById('no-projects-msg');

    // Snapshot all cards and their data from the DOM
    const allCards = Array.from(document.querySelectorAll('.project-card')).map(card => ({
        el:       card,
        category: card.dataset.category,
        date:     parseInt(card.dataset.date, 10),
        name:     card.dataset.name
    }));

    let activeFilter = 'all';
    let activeSort   = 'default';

    function applyFilterAndSort() {
        // Step 1: filter by category
        let visible = allCards.filter(c =>
            activeFilter === 'all' || c.category === activeFilter
        );

        // Step 2: sort
        if (activeSort === 'name-asc') {
            visible.sort((a, b) => a.name.localeCompare(b.name));
        } else if (activeSort === 'name-desc') {
            visible.sort((a, b) => b.name.localeCompare(a.name));
        } else if (activeSort === 'date-desc') {
            visible.sort((a, b) => b.date - a.date);
        } else if (activeSort === 'date-asc') {
            visible.sort((a, b) => a.date - b.date);
        }

        // Step 3: detach all cards, re-attach in new order
        allCards.forEach(c => {
            c.el.style.display = 'none';
            if (projectGrid.contains(c.el)) projectGrid.removeChild(c.el);
        });
        visible.forEach(c => {
            c.el.style.display = '';
            projectGrid.appendChild(c.el);
        });

        // Step 4: empty state message
        if (noProjectsMsg) {
            noProjectsMsg.classList.toggle('hidden', visible.length > 0);
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            applyFilterAndSort();
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            activeSort = sortSelect.value;
            applyFilterAndSort();
        });
    }


    // =============================
    // Tech Trivia — Open Trivia DB API
    // =============================
    const triviaLoading  = document.getElementById('trivia-loading');
    const triviaBlock    = document.getElementById('trivia-question-block');
    const triviaCategory = document.getElementById('trivia-category');
    const triviaQuestion = document.getElementById('trivia-question');
    const triviaAnswers  = document.getElementById('trivia-answers');
    const triviaFeedback = document.getElementById('trivia-feedback');
    const triviaNext     = document.getElementById('trivia-next');
    const triviaError    = document.getElementById('trivia-error');

    let triviaQueue = [];
    let answered    = false;

    function decodeHTML(str) {
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    }

    async function fetchTrivia() {
        const url = 'https://opentdb.com/api.php?amount=5&category=18&type=multiple';
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Bad response');
            const data = await res.json();
            if (data.response_code !== 0 || !data.results.length) throw new Error('No results');
            triviaQueue = data.results;
            showNextQuestion();
        } catch (err) {
            triviaLoading.classList.add('hidden');
            triviaError.classList.remove('hidden');
        }
    }

    function showNextQuestion() {
        if (triviaQueue.length === 0) {
            triviaBlock.classList.add('hidden');
            triviaLoading.classList.remove('hidden');
            triviaLoading.textContent = 'Loading more questions...';
            triviaError.classList.add('hidden');
            fetchTrivia();
            return;
        }

        answered = false;
        triviaFeedback.classList.add('hidden');
        triviaFeedback.className = 'trivia-feedback hidden';
        triviaNext.classList.add('hidden');
        triviaAnswers.innerHTML = '';

        const q = triviaQueue.shift();
        triviaCategory.textContent = decodeHTML(q.category);
        triviaQuestion.textContent = decodeHTML(q.question);

        const answers = [...q.incorrect_answers, q.correct_answer]
            .map(a => ({ text: decodeHTML(a), correct: a === q.correct_answer }))
            .sort(() => Math.random() - 0.5);

        answers.forEach(ans => {
            const btn = document.createElement('button');
            btn.classList.add('trivia-answer-btn');
            btn.textContent = ans.text;
            btn.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                const correctText = answers.find(a => a.correct).text;

                if (ans.correct) {
                    btn.classList.add('correct');
                    triviaFeedback.textContent = '✅ Correct!';
                    triviaFeedback.classList.remove('hidden', 'wrong');
                    triviaFeedback.classList.add('trivia-feedback', 'correct');
                } else {
                    btn.classList.add('wrong');
                    triviaFeedback.textContent = '❌ Wrong! The correct answer is: ' + correctText;
                    triviaFeedback.classList.remove('hidden', 'correct');
                    triviaFeedback.classList.add('trivia-feedback', 'wrong');
                    triviaAnswers.querySelectorAll('.trivia-answer-btn').forEach(b => {
                        if (b.textContent === correctText) b.classList.add('correct');
                    });
                }

                triviaAnswers.querySelectorAll('.trivia-answer-btn').forEach(b => b.disabled = true);
                triviaNext.classList.remove('hidden');
            });
            triviaAnswers.appendChild(btn);
        });

        triviaLoading.classList.add('hidden');
        triviaError.classList.add('hidden');
        triviaBlock.classList.remove('hidden');
    }

    triviaNext.addEventListener('click', showNextQuestion);
    fetchTrivia();


    // =============================
    // Quote Widget — Quotable API
    // =============================
    const quoteLoading = document.getElementById('quote-loading');
    const quoteBlock   = document.getElementById('quote-block');
    const quoteText    = document.getElementById('quote-text');
    const quoteAuthor  = document.getElementById('quote-author');
    const quoteError   = document.getElementById('quote-error');
    const quoteRefresh = document.getElementById('quote-refresh');

    async function fetchQuote() {
        // Show loading state
        quoteBlock.classList.add('hidden');
        quoteError.classList.add('hidden');
        quoteLoading.classList.remove('hidden');
        quoteRefresh.disabled = true;

        try {
            const res = await fetch('https://api.quotable.io/random?tags=technology|science|education');
            if (!res.ok) throw new Error('Bad response');
            const data = await res.json();

            quoteText.textContent   = data.content;
            quoteAuthor.textContent = '— ' + data.author;

            quoteLoading.classList.add('hidden');
            quoteBlock.classList.remove('hidden');
        } catch (err) {
            // Fallback: show a hardcoded quote if the API fails
            const fallbacks = [
                { content: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
                { content: "It's not a bug, it's an undocumented feature.", author: "Unknown" },
                { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
                { content: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" }
            ];
            const pick = fallbacks[Math.floor(Math.random() * fallbacks.length)];
            quoteText.textContent   = pick.content;
            quoteAuthor.textContent = '— ' + pick.author;

            quoteLoading.classList.add('hidden');
            quoteBlock.classList.remove('hidden');
        } finally {
            quoteRefresh.disabled = false;
        }
    }

    quoteRefresh.addEventListener('click', fetchQuote);
    fetchQuote();


    // =============================
    // Contact Form — Validation + Confirmation
    // =============================
    const form        = document.getElementById('contact-form');
    const nameInput   = document.getElementById('form-name');
    const emailInput  = document.getElementById('form-email');
    const msgInput    = document.getElementById('form-message');
    const nameError   = document.getElementById('name-error');
    const emailError  = document.getElementById('email-error');
    const msgError    = document.getElementById('message-error');
    const formSuccess = document.getElementById('form-success');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearErrors() {
        [nameError, emailError, msgError].forEach(el => el.textContent = '');
        [nameInput, emailInput, msgInput].forEach(el => el.classList.remove('input-error'));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();
        formSuccess.classList.add('hidden');

        let valid = true;

        if (!nameInput.value.trim()) {
            nameError.textContent = 'Please enter your name.';
            nameInput.classList.add('input-error');
            valid = false;
        }

        if (!emailInput.value.trim()) {
            emailError.textContent = 'Please enter your email.';
            emailInput.classList.add('input-error');
            valid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailInput.classList.add('input-error');
            valid = false;
        }

        if (!msgInput.value.trim()) {
            msgError.textContent = 'Please enter a message.';
            msgInput.classList.add('input-error');
            valid = false;
        }

        if (valid) {
            formSuccess.classList.remove('hidden');
            form.reset();
        }
    });

});