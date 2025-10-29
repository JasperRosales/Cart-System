import { loader } from './view.js';
import { loadItems } from '../items/item.js';
import { products } from '../items/store.js'; 

const HERO_SECTION_ID = 'hero-section';

export async function navigateTo(section) {
  const hero = document.getElementById(HERO_SECTION_ID);
  if (!hero) return;

  hero.classList.add('opacity-0', 'transition-opacity', 'duration-300');
  await new Promise(resolve => setTimeout(resolve, 300));

  let filepath;
  switch (section) {
    case 'store':
      filepath = '/src/components/item-catalog.html';
      break;
    default:
      filepath = '/src/components/hero.html';
  }

  await loader(HERO_SECTION_ID, filepath);

  const newHero = document.getElementById(HERO_SECTION_ID);
  newHero.classList.add('opacity-0', 'transition-opacity', 'duration-300');
  requestAnimationFrame(() => {
    newHero.classList.remove('opacity-0');
  });

  if (section === 'store') {
    loadItems('#product-grid', products);
  }
}

export function setupNavigation() {
  const homeBtn = document.getElementById('nav-home');
  const storeBtn = document.getElementById('nav-store');

  if (homeBtn)
    homeBtn.addEventListener('click', e => {
      e.preventDefault();
      navigateTo('home');
    });

  if (storeBtn)
    storeBtn.addEventListener('click', e => {
      e.preventDefault();
      navigateTo('store');
    });
}
