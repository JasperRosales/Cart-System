import { loader } from './nav/view.js';
import { loadModalTemplate } from './modals/modal.js';
import { setupNavigation } from './nav/navigation.js';
import { setupModalTriggers } from './modals/modal-setup.js';
import { setupCartDrawer } from './items/cart.js';

const HERO_SECTION_ID = 'hero-section';

async function initializeApp() {
  await Promise.all([
    loader('header-section', '/src/components/header-page.html'),
    loader(HERO_SECTION_ID, '/src/components/hero.html'),
    loader('footer-section', '/src/components/footer-page.html'),
    loadModalTemplate('/src/components/info-modal.html')
  ]);

  setupNavigation();
  setupModalTriggers();

  requestAnimationFrame(() => setupCartDrawer());
}

document.addEventListener('DOMContentLoaded', initializeApp);
