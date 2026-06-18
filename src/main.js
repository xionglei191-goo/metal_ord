import { registerRoute, initRouter } from './router.js';
import { onLangChange } from './utils/i18n.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderProducts } from './pages/products.js';
import { renderManufacturing } from './pages/manufacturing.js';
import { renderRFQ } from './pages/rfq.js';
import { renderContact } from './pages/contact.js';

// Register all routes
registerRoute('/', renderHome);
registerRoute('/about', renderAbout);
registerRoute('/products', renderProducts);
registerRoute('/manufacturing', renderManufacturing);
registerRoute('/rfq', renderRFQ);
registerRoute('/contact', renderContact);

// Render layout components
renderNavbar();
renderFooter();

// Re-render current page on language change
onLangChange(() => {
  const path = window.location.hash.slice(1) || '/';
  const pages = {
    '/': renderHome,
    '/about': renderAbout,
    '/products': renderProducts,
    '/manufacturing': renderManufacturing,
    '/rfq': renderRFQ,
    '/contact': renderContact,
  };
  const render = pages[path];
  if (render) render();
  renderFooter();
});

// Initialize router (triggers initial page render)
initRouter();
