# DevOps Command Reference

A GitHub Pages site for DevOps engineers — all your daily and debugging commands in one searchable, beautifully formatted reference.

## 🚀 Quick Setup (GitHub Pages)

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages** → set source to **Deploy from a branch** → select `main` / `root`.
3. Your site will be live at `https://YOUR_USERNAME.github.io/REPO_NAME/`

> **Important:** GitHub Pages serves files statically. The `fetch()` calls in `app.js` require a real HTTP server — they won't work if you open `index.html` directly as a `file://` URL. To test locally, run:
> ```bash
> npx serve .
> # or
> python3 -m http.server 8080
> ```

---

## ➕ Adding a New Tool / Category

### Option 1 — Add a category to an existing JSON file

Open e.g. `linux.json` and add a new object to the `categories` array:

```json
{
  "name": "My New Category",
  "description": "Optional description shown under the title",
  "commands": [
    {
      "name": "mycommand",
      "summary": "One-line description of what it does",
      "tags": ["day-to-day"],
      "options": [
        { "flag": "-v", "description": "Verbose output" }
      ],
      "examples": [
        { "description": "Run with verbose output", "code": "mycommand -v target" }
      ],
      "note": "Optional warning or tip shown in blue"
    }
  ]
}
```

### Option 2 — Add a completely new tool (new JSON file)

1. Create a new JSON file, e.g. `ansible.json`, following this schema:

```json
{
  "tool": "Ansible",
  "icon": "🔴",
  "description": "Automation and configuration management",
  "categories": [
    {
      "name": "Playbooks",
      "commands": [ ... ]
    }
  ]
}
```

2. Register it in `app.js` by adding an entry to the `REGISTRY` array at the top of the file:

```js
const REGISTRY = [
  { file: 'linux.json',      label: 'Linux'      },
  { file: 'docker.json',     label: 'Docker'     },
  { file: 'kubernetes.json', label: 'Kubernetes' },
  { file: 'github.json',     label: 'GitHub'     },
  { file: 'terraform.json',  label: 'Terraform'  },
  { file: 'ansible.json',    label: 'Ansible'    }, // ← add here
];
```

That's it. The sidebar updates automatically.

---

## 🏷 Tags

Tags appear as colored badges on each command card. Supported values:

| Tag          | Color  | Meaning                              |
|--------------|--------|--------------------------------------|
| `day-to-day` | Green  | Used regularly in normal operations  |
| `debug`      | Orange | Used when investigating issues       |
| `admin`      | Yellow | Administrative / privileged actions  |
| `network`    | Blue   | Network-specific commands            |

A command can have multiple tags: `"tags": ["day-to-day", "debug"]`

---

## 📁 File Structure

```
.
├── index.html          # App shell (no changes needed)
├── style.css           # All styles (no changes needed)
├── app.js              # App logic + REGISTRY (add new files here)
├── linux.json          # Linux commands
├── bash.json           # Bash scripting commands and patterns
├── docker.json         # Docker commands
├── kubernetes.json     # Kubernetes / kubectl commands
├── github.json         # Git + GitHub CLI commands
├── terraform.json      # Terraform commands
└── README.md           # This file
```

---

## 🔍 Features

- **Sidebar navigation** with collapsible categories and command counts
- **Click-to-expand** command cards showing flags, examples, and notes
- **Click-to-copy** any example command
- **Full-text search** across all commands, flags, and examples (press `/` to focus)
- **Zero build step** — pure HTML/CSS/JS, works on GitHub Pages out of the box
- **Easily extensible** — add new tools by dropping a JSON file and one line in `app.js`
