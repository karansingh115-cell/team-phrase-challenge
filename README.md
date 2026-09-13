# Team Phrase Challenge — 50 phrases

Shared random allocation of 50 predetermined workplace phrases.
Each phrase is removed from the live pool after allocation.

## Deploy
Use a Node web service on Render.
Build command: `npm install`
Start command: `npm start`
Add an environment variable named `ADMIN_KEY` with a private value.

## Reset before the activity
Send a POST request to:
`/api/reset?key=YOUR_ADMIN_KEY`

The app uses Render's assigned PORT automatically.
