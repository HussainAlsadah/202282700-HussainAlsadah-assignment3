# AI Usage Report

Project: 202282700-HussainAlsadah-assignment3

Date: 2026-04-18

Tools Used & Use Cases
----------------------

- Claude :
    - Assisted in designing and implementing new features including the login/logout modal system, the Quotable API integration with fallback logic, the project filter and sort functionality, the visitor timer, and the Interactive section layout.
    - Suggested UI improvements such as the live avatar preview in the login modal, the user pill with initials in the navbar, and moving the trivia and quotes widgets into their own dedicated section.
    - Assisted in refactoring existing Assignment 2 code to cleanly accommodate the new features without breaking existing functionality.
    - Assisted in debugging — helped identify why filter/sort was not re-rendering cards correctly (cards needed to be fully detached and re-appended to the DOM rather than just shown/hidden).
    - Assisted in drafting documentation for README.md, technical-documentation.md, and this report.

Benefits & Challenges
---------------------
- Benefits:
    - Speed: quick and detailed responses allowed me to work on the application at a much faster pace than manually, especially for features like localStorage session persistence which would have taken significantly longer to research and implement from scratch.
    - Inspiration: suggested improvements I had not thought of, such as the Escape key closing the modal, disabling the refresh button while a quote fetch is in progress, and avoiding repeating the same fallback quote twice in a row.
    - Organization: consistently produced well-commented, clearly sectioned code that was easy to read and modify.
    - Documentation: substantially faster to produce structured documentation drafts, although careful review was still needed to make sure everything accurately reflected the final implementation.

- Challenges / Limitations:
    - Generated code sometimes assumed element IDs or class names that did not match the existing HTML, requiring manual corrections.
    - The first version of the filter/sort feature had a bug where cards would disappear after a second filter action. I had to identify this through testing and then explain it back to get a corrected version.
    - Documentation drafts occasionally described intermediate versions of features rather than the final state, requiring editing.

Learning Outcomes
-----------------
- Learned how localStorage can be used to persist meaningful application state such as user sessions across page refreshes, not just simple preferences like theme.
- Better understood the DOM manipulation pattern of detaching and re-appending elements to reorder them, as opposed to CSS-only show/hide approaches.
- Learned how to handle API failures gracefully using fallback content rather than only showing an error message.
- Understood the value of async/await with try/catch/finally for API calls, particularly using finally to re-enable UI elements regardless of whether a request succeeded or failed.
- Reinforced that AI-generated code always requires testing — features that look correct in isolation can break when combined with existing code.

Responsible Use & Modifications
-------------------------------
I have manually reviewed AI-generated content as follows:
- I understood the code and manually changed values and class names where they did not fit the existing structure.
- I thoroughly tested every new feature and caught and fixed bugs introduced by the generated code, particularly the filter/sort re-render issue.
- I iterated on the login implementation by asking for specific improvements rather than accepting the first version, ensuring the final result matched my vision.
- I made sure that all text content throughout the site reflects what I want to say and is not AI-generated.
- Documentation was reviewed line by line and edited to accurately reflect the actual code and my own understanding of it.