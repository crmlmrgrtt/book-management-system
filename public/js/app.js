(() => {
    'use strict';
    const API = '/api/v1';
    const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
    async function request(path, method = 'GET', data = null) {
        const opts = { method, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } };
        if (data !== null) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(data); }
        const res = await fetch(API + path, opts); let body; const ct = res.headers.get('content-type') || '';
        try { body = ct.includes('json') ? await res.json() : await res.text(); } catch { body = null; }
        if (!res.ok) { let msg = body?.message || (body?.errors ? Object.values(body.errors).flat().join(' ') : ''); throw new Error(msg || `Request failed (${res.status}).`); }
        return body;
    }
    function notice(el, msg, type = 'info') { if (!el) return; el.textContent = msg; el.hidden = false; el.className = 'notice notice-' + type; }
    function clearNotice(el) { if (el) { el.hidden = true; el.textContent = ''; } }
    function data(form) { return Object.fromEntries(new FormData(form).entries()); }
    function busy(form, on, label) { const b = form.querySelector('[type=submit]'); if (!b) return; if (!b.dataset.original) b.dataset.original = b.textContent; b.disabled = on; b.textContent = on ? 'Please wait…' : label || b.dataset.original; }
    async function loadBooks() {
        const tbody = document.getElementById('bookTableBody'), n = document.getElementById('bookNotice'); if (!tbody) return;
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Loading book records…</td></tr>'; clearNotice(n);
        try {
            const rows = await request('/books'); if (!Array.isArray(rows)) throw new Error('Expected a JSON array from /api/v1/books.');
            if (!rows.length) { tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No books found. Register the first book.</td></tr>'; return; }
            tbody.innerHTML = rows.map(s => `<tr><td>${esc(s.id)}</td><td>${esc(s.title)}</td><td>${esc(s.author)}</td><td>${esc(s.genre)}</td><td>${esc(s.year_published)}</td><td class="actions-cell"><a class="btn btn-small btn-secondary" href="/books/${encodeURIComponent(s.id)}">View</a> <a class="btn btn-small" href="/books/${encodeURIComponent(s.id)}/edit">Edit</a> <button class="btn btn-small btn-danger" type="button" data-delete-book="${esc(s.id)}">Delete</button></td></tr>`).join('');
        } catch (e) { tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Could not load records.</td></tr>'; notice(n, e.message, 'error'); }
    }
    async function deleteBook(id, detail = false) { if (!confirm('Delete this book? This cannot be undone.')) return; const n = document.getElementById('bookNotice'); try { await request('/books/' + encodeURIComponent(id), 'DELETE'); if (detail) { location.href = '/books'; return; } notice(n, 'Book deleted successfully.', 'success'); await loadBooks(); } catch (e) { notice(n, e.message, 'error'); } }
    function fill(s) { ['id', 'title', 'author', 'genre', 'year_published'].forEach(k => { const el = document.getElementById(k); if (el) el.value = s[k] ?? ''; }); }
    document.addEventListener('DOMContentLoaded', async () => {
        const page = document.body.dataset.page, id = document.body.dataset.bookId;
        if (page === 'books-index') { loadBooks(); document.getElementById('refreshBooks')?.addEventListener('click', loadBooks); document.getElementById('bookTableBody')?.addEventListener('click', e => { const b = e.target.closest('[data-delete-book]'); if (b) deleteBook(b.dataset.deleteBook); }); }
        if (page === 'books-create') { const f = document.getElementById('bookForm'), n = document.getElementById('bookNotice'); f?.addEventListener('submit', async e => { e.preventDefault(); clearNotice(n); if (!f.reportValidity()) return; busy(f, true, 'Add Book'); try { await request('/books', 'POST', data(f)); notice(n, 'Book added successfully.', 'success'); f.reset(); setTimeout(() => location.href = '/books', 700); } catch (err) { notice(n, err.message, 'error'); } finally { busy(f, false, 'Register Book'); } }); }
        if (page === 'books-edit' && id) { const f = document.getElementById('bookForm'), n = document.getElementById('bookNotice'); try { fill(await request('/books/' + encodeURIComponent(id))); const cancel = document.getElementById('cancelEditLink'); if (cancel) cancel.href = '/books/' + encodeURIComponent(id); } catch (e) { notice(n, 'Could not load book: ' + e.message, 'error'); return; } f?.addEventListener('submit', async e => { e.preventDefault(); if (!f.reportValidity()) return; busy(f, true, 'Save Changes'); try { await request('/books/' + encodeURIComponent(id), 'PUT', data(f)); notice(n, 'Book updated.', 'success'); setTimeout(() => location.href = '/books/' + encodeURIComponent(id), 600); } catch (err) { notice(n, err.message, 'error'); } finally { busy(f, false, 'Save Changes'); } }); }
        if (page === 'books-show' && id) { const d = document.getElementById('bookDetails'), n = document.getElementById('bookNotice'); const edit = document.getElementById('editBookLink'); if (edit) edit.href = '/books/' + encodeURIComponent(id) + '/edit'; document.getElementById('deleteBookButton')?.addEventListener('click', () => deleteBook(id, true)); try { const s = await request('/books/' + encodeURIComponent(id)); d.innerHTML = [['Book ID', s.id], ['Title', s.title], ['Author', s.author], ['Genre', s.genre], ['Year Published', s.year_published], ['Created', s.created_at ? new Date(s.created_at).toLocaleString() : '—']].map(([k, v]) => `<div class="detail-item"><strong>${esc(k)}</strong><span>${esc(v)}</span></div>`).join(''); } catch (e) { d.innerHTML = '<p class="empty-state">Book details could not be loaded.</p>'; notice(n, e.message, 'error'); } }
    });
})();
