// js/app.js
import { State } from './state.js';
import { UI } from './ui.js';

function onReady() {
  // ----- Tabs + footer year -----
  UI.initTabs();
  UI.fillYear();

  // ----- Default date = today (if the input exists) -----
  const txDate = document.getElementById('tx-date');
  if (txDate) txDate.value = new Date().toISOString().slice(0, 10);

  // ----- Initial render (if sections exist) -----
  UI.renderCategories();
  UI.renderTransactions();
  UI.renderGoals();

  // ====== Forms & buttons (guarded so it won't error if element missing) ======

  // Add Transaction
  const txForm = document.getElementById('tx-form');
  if (txForm) {
    txForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount   = document.getElementById('tx-amount')?.value;
      const category = document.getElementById('tx-category')?.value;
      const date     = document.getElementById('tx-date')?.value;
      const note     = document.getElementById('tx-note')?.value || '';
      if (!amount || !category || !date) return;

      State.addTransaction({ amount, category, date, note });
      txForm.reset();
      if (txDate) txDate.value = new Date().toISOString().slice(0, 10);
      UI.renderTransactions();
    });
  }

  // Add Goal
  const goalForm = document.getElementById('goal-form');
  if (goalForm) {
    goalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name   = document.getElementById('goal-name')?.value;
      const target = document.getElementById('goal-target')?.value;
      if (!name || !target) return;

      State.addGoal({ name, target });
      goalForm.reset();
      UI.renderGoals();
    });
  }

  // Save Settings
  const saveSettingsBtn = document.getElementById('save-settings');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const currency   = document.getElementById('currency')?.value || 'A$';
      const dateFormat = document.getElementById('date-format')?.value || 'DD-MM-YYYY';
      const nudges     = document.getElementById('nudges')?.value;
      State.updateSettings({ currency, dateFormat, nudges });
      UI.renderTransactions();
      UI.renderCategories();
    });
  }

  // Add Category
  const catForm = document.getElementById('cat-form');
  if (catForm) {
    catForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('cat-input');
      const name = input?.value.trim();
      if (!name) return;
      State.addCategory(name);
      if (input) input.value = '';
      UI.renderCategories();
    });
  }

  // ====== Pricing toggle (Monthly / Annual) ======
  const toggleBtns = Array.from(document.querySelectorAll('.toggle-btn'));
  if (toggleBtns.length) {
    const priceEls   = Array.from(document.querySelectorAll('.js-price'));
    const cycleEls   = Array.from(document.querySelectorAll('.js-cycle'));
    const buyMonthly = Array.from(document.querySelectorAll('.js-buy-monthly'));
    const buyAnnual  = Array.from(document.querySelectorAll('.js-buy-annual'));

    const setPlan = (plan) => {
      // active state for buttons
      toggleBtns.forEach((b) => b.classList.toggle('is-active', b.dataset.plan === plan));
      // swap numbers and /mo|/yr labels
      priceEls.forEach((el) => { if (el.dataset[plan]) el.textContent = el.dataset[plan]; });
      cycleEls.forEach((el) => (el.textContent = plan === 'monthly' ? '/mo' : '/yr'));
      // show correct buy CTAs
      const monthly = plan === 'monthly';
      buyMonthly.forEach((a) => a.classList.toggle('hidden', !monthly));
      buyAnnual.forEach((a)  => a.classList.toggle('hidden', monthly));
    };

    toggleBtns.forEach((b) => b.addEventListener('click', () => setPlan(b.dataset.plan)));
    setPlan('monthly'); // default view
  }
}

// Keep this bootstrapping exactly as-is
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onReady);
} else {
  onReady();
}

