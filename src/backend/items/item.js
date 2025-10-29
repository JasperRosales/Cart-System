// src/js/item.js
import { addToCart } from './cart.js';

export function loadItems(containerSelector, products) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'group relative';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.alt}"
        class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
      <div class="mt-4 flex justify-between">
        <div>
          <h3 class="text-sm text-gray-700">${product.name}</h3>
          <p class="mt-1 text-sm text-gray-500">${product.color}</p>
        </div>
        <p class="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
      <button
        class="mt-3 w-full bg-linear-to-tl from-blue-600 to-violet-600 text-white text-sm font-medium rounded-md py-2 hover:from-violet-600 hover:to-blue-600 transition-all duration-200 shadow">
        Add to Cart
      </button>
    `;

    div.querySelector('button').addEventListener('click', () => addToCart(product));
    container.appendChild(div);
  });
}
