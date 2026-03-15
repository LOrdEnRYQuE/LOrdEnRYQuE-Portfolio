# LOrdEnRYQuE Portfolio UX Rules

UI is how the portfolio **looks**.
UX is how the portfolio **behaves**.

This rulebook ensures the site remains elegant, premium, and functional as it evolves over time. 

---

## 1. Global Layout & Structure

*   **One Primary CTA:** Every page must have exactly one primary Call-To-Action (e.g., "Let's Build Together"). Do not confuse the user with competing primary buttons.
*   **Clear Hierarchy:** Use `H1` strictly for the page title/hero. Use `H2` for main sections, and `H3` for subsections.
*   **Spacing:** Use consistent vertical rhythm. Sections should breathe with generous padding (`py-24` on desktop, `py-16` on mobile).

## 2. Typography & Readability

*   **Line Length:** No paragraph should be wider than the readable limit (approx. 65-75 characters). Use `max-w-prose` or `max-w-2xl` for text blocks.
*   **Contrast:** Ensure text maintains high contrast against the background colors, especially the `muted` text tokens.

## 3. UI Components

*   **Button Constraint:** Maintain a maximum of 2 button variants (`Primary` for core actions, `Secondary`/`Outline` for alternative links).
*   **Card Consistency:** Every project card **must** show:
    *   Title
    *   One-line summary
    *   Tech Stack (as subtle badges)
    *   Call-To-Action (e.g., "View Case Study" or a link icon)
    *   *No half-empty zombie entries allowed.*

## 4. Interactions & Animations

*   **Subtlety is Key:** Animations must feel premium, subtle, and quick. Keep durations under 400ms.
*   **Hover States:** Interactive elements (buttons, cards, links) must have clear, consistent hover and focus states (e.g., slight lift, color shift, or glow).
*   **Performance:** Avoid heavy JavaScript animations where CSS transitions will surfice.

## 5. Mobile & Responsive Design

*   **Mobile First:** Design and test the mobile experience first, then polish for desktop. 
*   **Touch Targets:** Ensure all buttons and links are easily tappable (minimum 44x44px target size).
*   **Stacking:** Horizontal lists (like tech stack badges) should wrap gracefully on smaller screens. 

## 6. Forms & Accessibility

*   **Clear Feedback:** Forms (like contact forms) must always show success or error states clearly and immediately.
*   **Semantics:** Use standard semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<button>`, `<a>`).
*   **Alt Text:** All images must have descriptive `alt` tags. Decorative images should use `alt=""`.
