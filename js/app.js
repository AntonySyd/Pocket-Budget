import { State } from './state.js';
import { UI } from './ui.js';
function onReady() {
  UI.initTabs(); UI.fillYear();
  const today = new Date().toISOString().slice(0,10);
  document.getElementById('tx-date').value = today;
  UI.renderCategories(); UI.renderTransactions(); UI.renderGoals();
  document.getElementById('tx-form').addEventListener('submit', e => {
    e.preventDefault();
    const amount = document.getElementById('tx-amount').value;
    const category = document.getElementById('tx-category').value;
    const date = document.getElementById('tx-date').value;
    const note = document.getElementById('tx-note').value;
    if (!amount || !category || !date) return;
    State.addTransaction({ amount, category, date, note });
    e.target.reset(); document.getElementById('tx-date').value = new Date().toISOString().slice(0,10);
    UI.renderTransactions();
  });
  document.getElementById('goal-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('goal-name').value;
    const target = document.getElementById('goal-target').value;
    if (!name || !target) return;
    State.addGoal({ name, target }); e.target.reset(); UI.renderGoals();
  });
  document.getElementById('save-settings').addEventListener('click', () => {
    const currency = document.getElementById('currency').value || 'A$';
    const dateFormat = document.getElementById('date-format').value || 'DD-MM-YYYY';
    const nudges = document.getElementById('nudges').value;
    State.updateSettings({ currency, dateFormat, nudges });
    UI.renderTransactions(); UI.renderCategories();
  });
  document.getElementById('cat-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('cat-input');
    const name = input.value.trim(); if (!name) return;
    State.addCategory(name); input.value = ''; UI.renderCategories();
  });
}
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', onReady); } else { onReady(); }
