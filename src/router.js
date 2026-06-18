const routes = {};
const listeners = new Set();

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentPath() {
  return window.location.hash.slice(1) || '/';
}

export function onRouteChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function handleRoute() {
  const path = getCurrentPath();
  const handler = routes[path] || routes['/'];
  if (handler) {
    handler();
  }
  listeners.forEach(fn => fn(path));
  
  // Update document title dynamically for SEO
  import('./utils/i18n.js').then(({ t }) => {
    const routeKeyMap = {
      '/': 'home',
      '/about': 'about',
      '/products': 'products',
      '/manufacturing': 'manufacturing',
      '/rfq': 'rfq',
      '/contact': 'contact'
    };
    const key = routeKeyMap[path] || 'home';
    document.title = `${t(`nav.${key}`)} | ${t('hero.badge')}`;
  });

  // Scroll to top on route change
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  // Handle initial route
  handleRoute();
}
