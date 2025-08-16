# PocketBudget (Starter)

This is a static MVP skeleton ready for GitHub + Vercel.

- `index.html` at repo root (prevents 404 on Vercel)
- ES Modules (`<script type="module" src="js/app.js">`)
- LocalStorage persistence for transactions, categories, goals
- Minimal dark UI

## Local Dev
```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy
- Push to GitHub
- Import on Vercel (no build step, output dir = root)
