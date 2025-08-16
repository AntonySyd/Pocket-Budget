import { State } from './state.js';
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
export const UI = {
  initTabs() {
    $$('.tab').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.tab').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const view = btn.dataset.view;
        $$('.view').forEach(v => v.classList.remove('is-active'));
        $(`.view-${view}`).classList.add('is-active');
      });
    });
  },
  fillYear() { $('#year').textContent = new Date().getFullYear(); },
  renderCategories() {
    const cats = State.get().categories;
    const sel = $('#tx-category'); sel.innerHTML = '';
    cats.forEach(c => { const opt = document.createElement('option'); opt.value = c; opt.textContent = c; sel.appendChild(opt); });
    const list = $('#cat-list'); list.innerHTML = '';
    cats.forEach(c => {
      const li = document.createElement('li'); li.textContent = c;
      const del = document.createElement('button'); del.textContent = '×';
      del.addEventListener('click', () => { State.removeCategory(c); this.renderCategories(); });
      li.appendChild(del); list.appendChild(li);
    });
  },
  renderTransactions() {
    const ul = $('#tx-list'); const { transactions, currency } = State.get(); ul.innerHTML = '';
    transactions.slice(0, 20).forEach(t => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${t.date} — ${t.category}${t.note ? ` — ${t.note}` : ''}</span><strong>${currency}${t.amount.toFixed(2)}</strong>`;
      ul.appendChild(li);
    });
  },
  renderGoals() {
    const ul = $('#goal-list'); const { goals, currency } = State.get(); ul.innerHTML = '';
    goals.forEach(g => {
      const li = document.createElement('li');
      const pct = Math.min(100, Math.round((g.saved / g.target) * 100)) || 0;
      li.innerHTML = `<span>${g.name} — target ${currency}${g.target.toFixed(2)}</span><strong>${pct}%</strong>`;
      ul.appendChild(li);
    });
  }
};
