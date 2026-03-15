(function () {
  const pages = [
    { href: '/home.html', label: 'Home' },
    { href: '/week-1/week-1.html', label: 'Week 1: Python Basic' },
    { href: '/week-1/summary.html', label: 'Week 1: Summary' },
    { href: '/week-2/week-2.html', label: 'Week 2: Complexity, Sorting and Searching' },
    { href: '/week-2/summary.html', label: 'Week 2: Summary' },
    { href: '/week-3/week-3.html', label: 'Week 3: Basic Data Structures' },
    { href: '/week-3/summary.html', label: 'Week 3: Summary' },
    { href: '/week-3/open_session_1.html', label: 'Week 3: Open Session 1' },
    { href: '/week-4/week-4.html', label: 'Week 4: Graph Algorithms-1' },
    { href: '/week-4/summary.html', label: 'Week 4: Summary' },
    { href: '/week-5/week-5.html', label: 'Week 5: Graph Algorithms-2' },
    { href: '/week-5/summary.html', label: 'Week 5: Summary' },
    { href: '/week-6/week-6.html', label: 'Week 6: Tree, Heap, BST' },
    { href: '/week-6/summary.html', label: 'Week 6: Summary' },
    { href: '/week-7/week-7.html', label: 'Week 7: AVL Tree, Greedy Algorithms' },
    { href: '/week-7/summary.html', label: 'Week 7: Summary' },
    { href: '/week-8/week-8.html', label: 'Week 8: Divide and Conquer Algorithms' },
    { href: '/week-8/summary.html', label: 'Week 8: Summary' },
    { href: '/Week-9/week-9.html', label: 'Week 9: Dynamic Programming' },
    { href: '/Week-9/summary.html', label: 'Week 9: Summary' },
    { href: '/week-10/summary.html', label: 'Week 10: Summary' },
    { href: '/week-12/week-12.html', label: 'Week 12: String Matching Algorithms' },
    { href: '/Contribute1.html', label: 'Competitive Problems for Practice' }
  ];

  const sidebarStateKey = 'pdsa-sidebar-collapsed';

  function normalizePath(path) {
    if (!path) return '/';
    return path.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  }

  function currentPath() {
    const path = normalizePath(window.location.pathname || '/');
    if (path === '/') {
      return '/index.html';
    }
    return path;
  }

  function isActive(targetHref) {
    const now = currentPath().toLowerCase();
    const target = normalizePath(targetHref).toLowerCase();
    if (now === target) return true;

    if (now.endsWith('/index.html') && target === '/home.html') {
      return true;
    }

    return false;
  }

  function ensureStyles() {
    if (document.getElementById('pdsaSidebarStyles')) return;

    const style = document.createElement('style');
    style.id = 'pdsaSidebarStyles';
    style.textContent = `
      .topics-toolbar { display: none !important; }
      body { transition: margin-left 0.2s ease; }
      #pdsaSidebar {
        position: fixed;
        left: 0;
        top: 0;
        width: 300px;
        height: 100vh;
        background: #34495e;
        color: #fff;
        z-index: 1000;
        overflow-y: auto;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
      }
      #pdsaSidebar h2 {
        margin: 0;
        padding: 20px 14px;
        font-size: 20px;
        text-align: center;
        background: #2c3e50;
        border-bottom: 2px solid #1abc9c;
      }
      #pdsaSidebar ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      #pdsaSidebar li {
        border-bottom: 1px solid #3a4a58;
      }
      #pdsaSidebar a {
        display: block;
        color: #fff;
        text-decoration: none;
        padding: 12px 16px;
        font-size: 14px;
      }
      #pdsaSidebar a:hover,
      #pdsaSidebar a.selected {
        background: #1abc9c;
      }
      #pdsaSidebarToggle {
        position: fixed;
        top: 12px;
        left: 312px;
        z-index: 1001;
        border: none;
        border-radius: 6px;
        background: #1abc9c;
        color: #fff;
        padding: 8px 12px;
        cursor: pointer;
      }
      #pdsaShowSidebar {
        position: fixed;
        top: 12px;
        left: 12px;
        z-index: 1001;
        border: none;
        border-radius: 6px;
        background: #1abc9c;
        color: #fff;
        padding: 8px 12px;
        cursor: pointer;
        display: none;
      }
      body.pdsa-sidebar-visible {
        margin-left: 300px !important;
      }
      body.pdsa-sidebar-hidden #pdsaSidebar { display: none; }
      body.pdsa-sidebar-hidden #pdsaSidebarToggle { display: none; }
      body.pdsa-sidebar-hidden #pdsaShowSidebar { display: inline-block; }
      @media (max-width: 992px) {
        #pdsaSidebar { width: 250px; }
        #pdsaSidebarToggle { left: 262px; }
        body.pdsa-sidebar-visible {
          margin-left: 250px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function buildList(targetUl) {
    targetUl.innerHTML = '';
    pages.forEach((item) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.label;
      if (isActive(item.href)) {
        link.classList.add('selected');
      }
      li.appendChild(link);
      targetUl.appendChild(li);
    });
  }

  function applySidebarState(collapsed) {
    document.body.classList.toggle('pdsa-sidebar-hidden', collapsed);
    document.body.classList.toggle('pdsa-sidebar-visible', !collapsed);

    const toggle = document.getElementById('pdsaSidebarToggle') || document.getElementById('toggleButton');
    if (toggle) {
      toggle.textContent = collapsed ? 'Show Sidebar' : 'Hide Sidebar';
    }

    const restore = document.getElementById('pdsaShowSidebar') || document.getElementById('restoreSidebarButton');
    if (restore) {
      restore.style.display = collapsed ? 'inline-block' : 'none';
      if (restore.classList) {
        restore.classList.toggle('visible', collapsed);
      }
    }

    try {
      window.localStorage.setItem(sidebarStateKey, collapsed ? '1' : '0');
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function readCollapsedState() {
    try {
      return window.localStorage.getItem(sidebarStateKey) === '1';
    } catch (error) {
      return false;
    }
  }

  function wireControls() {
    const toggleButton = document.getElementById('pdsaSidebarToggle') || document.getElementById('toggleButton');
    const showButton = document.getElementById('pdsaShowSidebar') || document.getElementById('restoreSidebarButton');

    if (toggleButton) {
      toggleButton.onclick = function () {
        applySidebarState(!document.body.classList.contains('pdsa-sidebar-hidden'));
      };
    }

    if (showButton) {
      showButton.onclick = function () {
        applySidebarState(false);
      };
    }
  }

  function ensureSidebarShell() {
    const existingMenu = document.getElementById('sideMenu');
    if (existingMenu) {
      existingMenu.id = 'pdsaSidebar';
      let heading = existingMenu.querySelector('h2');
      if (!heading) {
        heading = document.createElement('h2');
        existingMenu.prepend(heading);
      }
      heading.textContent = 'Topics';

      let list = existingMenu.querySelector('ul');
      if (!list) {
        list = document.createElement('ul');
        existingMenu.appendChild(list);
      }
      buildList(list);

      const toggleButton = document.getElementById('toggleButton');
      if (toggleButton) {
        toggleButton.id = 'pdsaSidebarToggle';
      }
      const restoreButton = document.getElementById('restoreSidebarButton');
      if (restoreButton) {
        restoreButton.id = 'pdsaShowSidebar';
      }
      return;
    }

    const sidebar = document.createElement('aside');
    sidebar.id = 'pdsaSidebar';

    const heading = document.createElement('h2');
    heading.textContent = 'Topics';

    const list = document.createElement('ul');
    buildList(list);

    sidebar.appendChild(heading);
    sidebar.appendChild(list);

    const toggle = document.createElement('button');
    toggle.id = 'pdsaSidebarToggle';
    toggle.type = 'button';
    toggle.textContent = 'Hide Sidebar';

    const showButton = document.createElement('button');
    showButton.id = 'pdsaShowSidebar';
    showButton.type = 'button';
    showButton.textContent = 'Show Sidebar';

    document.body.appendChild(sidebar);
    document.body.appendChild(toggle);
    document.body.appendChild(showButton);
  }

  function init() {
    ensureStyles();
    ensureSidebarShell();
    wireControls();
    applySidebarState(readCollapsedState());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
