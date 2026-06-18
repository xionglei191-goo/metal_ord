import zh from '../i18n/zh.json';
import en from '../i18n/en.json';

const translations = { zh, en };
let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('zh') ? 'zh' : 'en');

const listeners = new Set();

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (lang !== 'zh' && lang !== 'en') return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  listeners.forEach(fn => fn(lang));
}

export function t(key) {
  const keys = key.split('.');
  let value = translations[currentLang];
  for (const k of keys) {
    if (value == null) return key;
    value = value[k];
  }
  return value ?? key;
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Initialize
document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
