# BIC502A Unit II Quiz

A simple mobile-friendly Linux mini-puzzle quiz.

## Files

- `index.html` — student quiz
- `style.css` — clean responsive layout
- `quiz.js` — questions, answer key, scoring, and local attempt storage
- `teacher.html` — local results viewer

## GitHub Pages

Upload this folder to your GitHub repository and enable GitHub Pages.

The student page can then be opened on phones and linked to a QR code.

## Important limitation

This version is deliberately self-contained and requires no server. Scores are stored in the browser's `localStorage`.

That means `teacher.html` will only show attempts made in the same browser/device. It does **not** collect the whole class's results into one online database.

For real class-wide collection, the next step is to connect the submission function to a hosted backend such as Google Sheets, Supabase, or Firebase. The quiz itself is already separated into `index.html`, `style.css`, and `quiz.js` so that connection can be added cleanly.
