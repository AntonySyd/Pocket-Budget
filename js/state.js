import { store } from './storage.js';

const defaultCats = ['Income','Housing','Food','Transport','Utilities','Health','Entertainment','Shopping','Other'];

const defaultState = {
  currency: 'A$',
  dateFormat: 'DD-MM-YYYY',
  categories: [...defaultCats],
  budgets: {},
  transactions: [],
  recurring: [],
  goals: [],
  settings: { nudges: { pacing:true, bills:true, goals:true, duplicates:true } },
  _meta: { createdAt: new Date().toISOString() }
};

export const State = {
  _state: store.load() ?? defaultState,
  get() { return this._state; },
  save() { store.save(this._state); },
  addCategory(name) {
    const n = (name || '').trim();
    if (!n) return;
    if (!this._state.categories.includes(n)) {
      this._state.categories.push(n); this.save();
    }
  },
  removeCategory(name) {
    this._state.categories = this._state.categories.filter(c => c !== name); this.save();
  },
  addTransaction({ amount, category, date, note }) {
    const tx = { id: crypto.randomUUID(), amount: Number(amount), category, date, note: note?.trim() || '' };
    this._state.transactions.unshift(tx); this.save(); return tx;
  },
  addGoal({ name, target }) {
    const goal = { id: crypto.randomUUID(), name: name.trim(), target: Number(target), saved: 0 };
    this._state.goals.push(goal); this.save(); return goal;
  },
  updateSettings({ currency, dateFormat, nudges }) {
    if (currency) this._state.currency = currency;
    if (dateFormat) this._state.dateFormat = dateFormat;
    if (nudges !== undefined) {
      const on = nudges === 'on';
      this._state.settings.nudges = { pacing:on, bills:on, goals:on, duplicates:on };
    }
    this.save();
  }
};
