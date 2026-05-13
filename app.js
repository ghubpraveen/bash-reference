/**
 * DevOps CMD Reference — app.js
 *
 * HOW TO ADD A NEW TOOL/CATEGORY:
 *   1. Create a new JSON file (e.g. terraform.json) following the schema below.
 *   2. Add an entry to the REGISTRY array at the top of this file.
 *   That's it. The sidebar and content pane update automatically.
 *
 * JSON SCHEMA (see individual files for full examples):
 * {
 *   "tool": "Linux",
 *   "icon": "🐧",
 *   "description": "...",
 *   "categories": [
 *     {
 *       "name": "File System",
 *       "commands": [
 *         {
 *           "name": "ls",
 *           "summary": "List directory contents",
 *           "tags": ["day-to-day"],
 *           "options": [{ "flag": "-la", "description": "Long format, all files" }],
 *           "examples": [{ "description": "List all files", "code": "ls -la /var/log" }],
 *           "note": "Optional warning or tip"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */

// ─── REGISTRY ────────────────────────────────────────────────────────────────
// Add new JSON files here. Order determines sidebar order.
const REGISTRY = [
  { file: 'linux.json',      label: 'Linux'      },
  { file: 'bash.json',       label: 'Bash'       },
  { file: 'docker.json',     label: 'Docker'     },
  { file: 'kubernetes.json', label: 'Kubernetes' },
  { file: 'github.json',     label: 'GitHub'     },
  { file: 'terraform.json',  label: 'Terraform'  },
];

// ─── STATE ────────────────────────────────────────────────────────────────────
let allData   = [];   // loaded tool data
let activeKey = null; // "ToolName::CategoryName"

// ─── BOOT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await loadAllData();
  renderSidebar();
  renderWelcomeTags();
  setupSearch();
  setupKeyboardShortcut();
});

// ─── DATA LOADING ─────────────────────────────────────────────────────────────
async function loadAllData() {
  const results = await Promise.allSettled(
    REGISTRY.map(r => fetch(r.file).then(res => { if (!res.ok) throw new Error(); return res.json(); }))
  );

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      allData.push(result.value);
    } else {
      console.warn(`Could not load ${REGISTRY[i].file} — skipping.`);
    }
  });
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';

  if (allData.length === 0) {
    nav.innerHTML = '<p class="sidebar-loading">No data files found.</p>';
    return;
  }

  allData.forEach(tool => {
    const catEl = document.createElement('div');
    catEl.className = 'nav-category';
    catEl.dataset.tool = tool.tool;

    const header = document.createElement('div');
    header.className = 'nav-category-header';
    header.innerHTML = `
      <span class="cat-icon">${tool.icon || '📁'}</span>
      <span class="cat-name">${tool.tool}</span>
      <span class="cat-chevron">▶</span>
    `;
    header.addEventListener('click', () => {
      catEl.classList.toggle('open');
    });

    const subitems = document.createElement('div');
    subitems.className = 'nav-subitems';

    (tool.categories || []).forEach(cat => {
      const key = `${tool.tool}::${cat.name}`;
      const item = document.createElement('div');
      item.className = 'nav-subitem';
      item.dataset.key = key;
      item.innerHTML = `
        ${cat.name}
        <span class="nav-subitem-count">${(cat.commands || []).length}</span>
      `;
      item.addEventListener('click', () => navigate(key, tool, cat));
      subitems.appendChild(item);
    });

    catEl.appendChild(header);
    catEl.appendChild(subitems);
    nav.appendChild(catEl);
  });
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function navigate(key, tool, cat) {
  // Update active states
  document.querySelectorAll('.nav-subitem').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-category-header').forEach(el => el.classList.remove('active-parent'));

  const item = document.querySelector(`.nav-subitem[data-key="${CSS.escape(key)}"]`);
  if (item) {
    item.classList.add('active');
    const parentCat = item.closest('.nav-category');
    if (parentCat) {
      parentCat.classList.add('open');
      parentCat.querySelector('.nav-category-header')?.classList.add('active-parent');
    }
  }

  activeKey = key;

  // Clear search
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').classList.add('hidden');
  document.getElementById('welcome-screen').classList.add('hidden');

  // Render commands
  renderCommandView(tool, cat);
}

// ─── COMMAND VIEW ─────────────────────────────────────────────────────────────
function renderCommandView(tool, cat) {
  const view = document.getElementById('command-view');
  view.classList.remove('hidden');

  const commands = cat.commands || [];

  view.innerHTML = `
    <div class="view-header">
      <div class="view-breadcrumb">${tool.icon || ''} ${tool.tool} <span>/ ${cat.name}</span></div>
      <div class="view-title">
        <span>${cat.name}</span>
      </div>
      ${cat.description ? `<div class="view-desc">${cat.description}</div>` : ''}
      <div class="view-count">⬡ ${commands.length} command${commands.length !== 1 ? 's' : ''}</div>
    </div>
    <div class="commands-grid">
      ${commands.map((cmd, i) => renderCommandCard(cmd, i)).join('')}
    </div>
  `;

  // Wire up card toggles
  view.querySelectorAll('.cmd-card-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.cmd-card').classList.toggle('open');
    });
  });

  // Wire up copy-on-click for code examples
  view.querySelectorAll('.cmd-example-code').forEach(el => {
    el.addEventListener('click', () => copyCode(el));
  });
}

function renderCommandCard(cmd, index) {
  const tagsHtml = (cmd.tags || [])
    .map(t => `<span class="cmd-tag ${t}">${t.replace('-', ' ')}</span>`)
    .join('');

  const optionsHtml = (cmd.options || []).length > 0 ? `
    <div class="cmd-options">
      <div class="cmd-options-title">Options &amp; Flags</div>
      <table class="cmd-options-table">
        <thead>
          <tr><th>Flag</th><th>Description</th></tr>
        </thead>
        <tbody>
          ${cmd.options.map(o => `
            <tr>
              <td class="opt-flag">${escHtml(o.flag)}</td>
              <td class="opt-desc">${escHtml(o.description)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  ` : '';

  const examplesHtml = (cmd.examples || []).length > 0 ? `
    <div class="cmd-examples">
      <div class="cmd-examples-title">Examples</div>
      ${cmd.examples.map(ex => `
        <div class="cmd-example">
          ${ex.description ? `<div class="cmd-example-desc">${escHtml(ex.description)}</div>` : ''}
          <div class="cmd-example-code" title="Click to copy">
            <span>${escHtml(ex.code)}</span>
            <span class="copy-hint">click to copy</span>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  const noteHtml = cmd.note ? `<div class="cmd-note">${escHtml(cmd.note)}</div>` : '';

  const hasBody = optionsHtml || examplesHtml || noteHtml;

  return `
    <div class="cmd-card" data-index="${index}">
      <div class="cmd-card-header">
        <span class="cmd-name">${escHtml(cmd.name)}</span>
        <span class="cmd-summary">${escHtml(cmd.summary)}</span>
        <span class="cmd-tags">${tagsHtml}</span>
        ${hasBody ? '<span class="cmd-expand-btn">▼</span>' : ''}
      </div>
      ${hasBody ? `<div class="cmd-card-body">${optionsHtml}${examplesHtml}${noteHtml}</div>` : ''}
    </div>
  `;
}

// ─── WELCOME TAGS ─────────────────────────────────────────────────────────────
function renderWelcomeTags() {
  const container = document.getElementById('welcome-tags');
  const tags = [];
  allData.forEach(tool => {
    (tool.categories || []).forEach(cat => {
      tags.push({ label: `${tool.icon} ${tool.tool} / ${cat.name}`, tool, cat });
    });
  });

  container.innerHTML = tags.map((t, i) => `
    <span class="welcome-tag" data-idx="${i}">${t.label}</span>
  `).join('');

  container.querySelectorAll('.welcome-tag').forEach((el, i) => {
    el.addEventListener('click', () => {
      const t = tags[i];
      navigate(`${t.tool.tool}::${t.cat.name}`, t.tool, t.cat);
    });
  });
}

// ─── SEARCH ───────────────────────────────────────────────────────────────────
function setupSearch() {
  const input = document.getElementById('search-input');
  let debounceTimer;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => runSearch(input.value.trim()), 150);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      input.value = '';
      clearSearch();
    }
  });
}

function setupKeyboardShortcut() {
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      document.getElementById('search-input').focus();
    }
  });
}

function runSearch(query) {
  if (!query) { clearSearch(); return; }

  const q = query.toLowerCase();
  const results = [];

  allData.forEach(tool => {
    (tool.categories || []).forEach(cat => {
      const matched = (cat.commands || []).filter(cmd =>
        cmd.name.toLowerCase().includes(q) ||
        cmd.summary.toLowerCase().includes(q) ||
        (cmd.options || []).some(o => o.flag.toLowerCase().includes(q) || o.description.toLowerCase().includes(q)) ||
        (cmd.examples || []).some(ex => ex.code.toLowerCase().includes(q))
      );
      if (matched.length > 0) {
        results.push({ tool, cat, commands: matched });
      }
    });
  });

  renderSearchResults(query, results);
}

function renderSearchResults(query, results) {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('command-view').classList.add('hidden');

  const container = document.getElementById('search-results');
  container.classList.remove('hidden');

  const totalCmds = results.reduce((s, r) => s + r.commands.length, 0);

  if (results.length === 0) {
    container.innerHTML = `
      <div class="search-header">
        <h2>Search: "${escHtml(query)}"</h2>
        <p>No commands found.</p>
      </div>
      <div class="empty-state">
        <div class="empty-icon">⊘</div>
        <p>No commands match your query. Try a different term.</p>
      </div>
    `;
    return;
  }

  const groupsHtml = results.map(r => `
    <div class="search-result-group">
      <div class="search-group-label">${r.tool.icon || ''} ${r.tool.tool} / ${r.cat.name}</div>
      <div class="commands-grid">
        ${r.commands.map((cmd, i) => renderCommandCard(cmd, i)).join('')}
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="search-header">
      <h2>Search: "${escHtml(query)}"</h2>
      <p>${totalCmds} command${totalCmds !== 1 ? 's' : ''} found across ${results.length} categor${results.length !== 1 ? 'ies' : 'y'}.</p>
    </div>
    ${groupsHtml}
  `;

  // Wire events
  container.querySelectorAll('.cmd-card-header').forEach(header => {
    header.addEventListener('click', () => header.closest('.cmd-card').classList.toggle('open'));
  });
  container.querySelectorAll('.cmd-example-code').forEach(el => {
    el.addEventListener('click', () => copyCode(el));
  });
}

function clearSearch() {
  document.getElementById('search-results').classList.add('hidden');
  if (activeKey) {
    // Re-show last active view
    document.getElementById('command-view').classList.remove('hidden');
  } else {
    document.getElementById('welcome-screen').classList.remove('hidden');
  }
}

// ─── COPY ─────────────────────────────────────────────────────────────────────
function copyCode(el) {
  const code = el.querySelector('span:first-child')?.textContent || '';
  navigator.clipboard?.writeText(code).then(() => {
    el.classList.add('copied');
    const hint = el.querySelector('.copy-hint');
    if (hint) hint.textContent = 'copied!';
    setTimeout(() => {
      el.classList.remove('copied');
      if (hint) hint.textContent = 'click to copy';
    }, 1500);
  }).catch(() => {});
}

// ─── UTILS ────────────────────────────────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
