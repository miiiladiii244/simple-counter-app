document.addEventListener('DOMContentLoaded', () => {
    // State
    let counters = JSON.parse(localStorage.getItem('counters')) || [];
    let contextMenuTargetId = null;

    // DOM Elements
    const counterListEl = document.getElementById('counter-list');
    const totalCountEl = document.getElementById('total-count');
    const emptyStateEl = document.getElementById('empty-state');
    const fabAdd = document.getElementById('fab-add');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const counterForm = document.getElementById('counter-form');
    const counterNameInput = document.getElementById('counter-name');
    const counterInitialInput = document.getElementById('counter-initial');
    const btnCancel = document.getElementById('btn-cancel');
    const contextMenu = document.getElementById('context-menu');
    const menuRename = document.getElementById('menu-rename');
    const menuReset = document.getElementById('menu-reset');
    const menuDelete = document.getElementById('menu-delete');

    // Helper: Save to LocalStorage
    const save = () => {
        localStorage.setItem('counters', JSON.stringify(counters));
        updateTotal();
        render();
    };

    // Helper: Update Total
    const updateTotal = () => {
        const total = counters.reduce((sum, c) => sum + c.value, 0);
        totalCountEl.textContent = total;
    };

    // Helper: Create Counter ID
    const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

    // Render Function
    const render = () => {
        // Clear list except empty state (which we toggle)
        counterListEl.innerHTML = '';
        counterListEl.appendChild(emptyStateEl);

        if (counters.length === 0) {
            emptyStateEl.style.display = 'block';
        } else {
            emptyStateEl.style.display = 'none';
            counters.forEach(counter => {
                const card = document.createElement('div');
                card.className = 'counter-card';
                card.dataset.id = counter.id;

                card.innerHTML = `
                    <div class="card-header">
                        <span class="counter-name">${escapeHtml(counter.name)}</span>
                        <button class="menu-btn" aria-label="Options" data-id="${counter.id}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="count-controls">
                            <button class="control-btn decrement" data-id="${counter.id}" aria-label="Decrement">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="count-display">${escapeHtml(String(counter.value))}</div>
                        <div class="count-controls">
                            <button class="control-btn increment" data-id="${counter.id}" aria-label="Increment">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
                counterListEl.appendChild(card);
            });
        }
    };

    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    // Event Listeners: Add Counter Flow
    fabAdd.addEventListener('click', () => {
        modalTitle.textContent = 'New Counter';
        counterNameInput.value = '';
        counterInitialInput.value = '0';
        counterForm.dataset.mode = 'create';
        modalOverlay.classList.add('active');
        setTimeout(() => counterNameInput.focus(), 100);
    });

    btnCancel.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    counterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = counterNameInput.value.trim();
        const initialValue = parseInt(counterInitialInput.value) || 0;

        if (!name) return;

        if (counterForm.dataset.mode === 'create') {
            counters.push({
                id: generateId(),
                name,
                value: initialValue
            });
        } else if (counterForm.dataset.mode === 'edit') {
            const id = counterForm.dataset.id;
            const counter = counters.find(c => c.id === id);
            if (counter) {
                counter.name = name;
                // We don't change value on rename usually, but if user wants to reset via edit they can use reset option
            }
        }

        save();
        modalOverlay.classList.remove('active');
    });

    // Event Listeners: Counter Actions (Delegation)
    counterListEl.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const id = btn.dataset.id;
        if (!id) return;

        if (btn.classList.contains('increment')) {
            const counter = counters.find(c => c.id === id);
            if (counter) {
                counter.value++;
                save();
                // Simple animation effect could go here
            }
        } else if (btn.classList.contains('decrement')) {
            const counter = counters.find(c => c.id === id);
            if (counter) {
                counter.value--;
                save();
            }
        } else if (btn.classList.contains('menu-btn')) {
            e.stopPropagation();
            showContextMenu(e, id);
        }
    });

    // Context Menu Logic
    const showContextMenu = (e, id) => {
        contextMenuTargetId = id;
        const rect = e.target.getBoundingClientRect();

        // Position menu near the button
        // Check if close to right edge
        const menuWidth = 150;
        let left = rect.left;
        if (left + menuWidth > window.innerWidth) {
            left = window.innerWidth - menuWidth - 10;
        }

        contextMenu.style.left = `${left + window.scrollX}px`;
        contextMenu.style.top = `${rect.bottom + 5 + window.scrollY}px`;
        contextMenu.hidden = false;
    };

    const hideContextMenu = () => {
        contextMenu.hidden = true;
        contextMenuTargetId = null;
    };

    document.addEventListener('click', (e) => {
        if (!contextMenu.hidden && !contextMenu.contains(e.target)) {
            hideContextMenu();
        }
    });

    // Menu Actions
    menuRename.addEventListener('click', () => {
        const counter = counters.find(c => c.id === contextMenuTargetId);
        if (counter) {
            modalTitle.textContent = 'Rename Counter';
            counterNameInput.value = counter.name;
            counterInitialInput.parentElement.style.display = 'none'; // Hide initial value for rename
            counterForm.dataset.mode = 'edit';
            counterForm.dataset.id = counter.id;
            modalOverlay.classList.add('active');
            setTimeout(() => counterNameInput.focus(), 100);
        }
        hideContextMenu();
    });

    // Reset visibility of initial value input when opening modal for create
    fabAdd.addEventListener('click', () => {
        counterInitialInput.parentElement.style.display = 'block';
    });

    menuReset.addEventListener('click', () => {
        const counter = counters.find(c => c.id === contextMenuTargetId);
        if (counter && confirm(`Reset "${escapeHtml(counter.name)}" to 0?`)) {
            counter.value = 0;
            save();
        }
        hideContextMenu();
    });

    menuDelete.addEventListener('click', () => {
        const counter = counters.find(c => c.id === contextMenuTargetId);
        if (counter && confirm(`Delete "${escapeHtml(counter.name)}"?`)) {
            counters = counters.filter(c => c.id !== contextMenuTargetId);
            save();
        }
        hideContextMenu();
    });

    // Initial Render
    updateTotal();
    render();
});
