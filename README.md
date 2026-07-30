# Todo List App

A simple static todo list application built with HTML, CSS, and JavaScript.

## Features

- Add new tasks
- Mark tasks as completed
- Filter tasks by all, active, or completed
- Delete tasks
- Clear completed tasks
- Persistent storage using `localStorage`

## Files

- `index.html` — main application page
- `styles.css` — responsive app styling
- `app.js` — todo list behavior and `localStorage` persistence

## Getting Started

1. Open `index.html` in your browser.
2. Add a task using the input field and press Add.
3. Use the filter buttons to view all, active, or completed tasks.
4. Click the clear button to remove completed tasks.

## Development

You can use a local web server for faster reloads and stable preview behavior.

Example using Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

- Tasks are saved in the browser's local storage.
- The app works offline once loaded.

## License

This project is available under the MIT License.

