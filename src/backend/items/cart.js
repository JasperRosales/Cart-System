import { showModal } from '../modals/modal.js';

const CART_KEY = 'asper_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatPHP(amount) {
  return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function renderCart() {
  const list = document.getElementById('cart-list');
  const subtotalEl = document.getElementById('cart-subtotal');
  if (!list || !subtotalEl) return;

  const cart = getCart();
  list.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    subtotal += price * item.quantity;

    const li = document.createElement('li');
    li.className = 'flex py-6';
    li.innerHTML = `
      <div class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img src="${item.image}" alt="${item.alt}" class="size-full object-cover" />
      </div>
      <div class="ml-4 flex flex-1 flex-col justify-between">
        <div>
          <div class="flex justify-between text-sm font-medium text-gray-900">
            <h3>${item.name}</h3>
            <p>${formatPHP(price)}</p>
          </div>
          <p class="mt-1 text-sm text-gray-500">${item.color || ''}</p>
        </div>
        <div class="flex items-center gap-3 mt-2">
          <button class="text-sm px-2 border rounded" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="text-sm px-2 border rounded" data-action="increase">+</button>
        </div>
        <button class="text-sm font-medium text-indigo-600 hover:text-indigo-500 self-start mt-2 remove-btn">Remove</button>
      </div>
    `;

    li.querySelector('[data-action="increase"]').addEventListener('click', () => updateQuantity(item.name, item.color, 1));
    li.querySelector('[data-action="decrease"]').addEventListener('click', () => updateQuantity(item.name, item.color, -1));
    li.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(item.name, item.color));

    list.appendChild(li);
  });

  subtotalEl.textContent = formatPHP(subtotal);

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) checkoutBtn.onclick = handleCheckout;
}

export function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(p => p.name === item.name && p.color === item.color);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
  renderCart();
}

function removeFromCart(name, color) {
  const cart = getCart().filter(p => !(p.name === name && p.color === color));
  saveCart(cart);
  renderCart();
}

function updateQuantity(name, color, delta) {
  const cart = getCart().map(item => {
    if (item.name === name && item.color === color) {
      item.quantity = Math.max(1, item.quantity + delta);
    }
    return item;
  });
  saveCart(cart);
  renderCart();
}

function handleCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    showModal({
      title: 'Empty Cart',
      message: 'Your cart is empty. Please add some items before checking out.',
      type: 'warning'
    });
    return;
  }

  let total = 0;
  let receipt = 'Receipt\n\n';

  cart.forEach(item => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    const subtotal = price * item.quantity;
    total += subtotal;
    receipt += `${item.name} x ${item.quantity} = ${formatPHP(subtotal)}\n`;
  });

  receipt += `\nTotal = ${formatPHP(total)}\n \nThank you for shopping!`;

  localStorage.removeItem(CART_KEY);
  renderCart();

  showModal({
    title: 'Checkout Successful!',
    message: receipt.replace(/\n/g, '<br>'),
    type: 'success'
  });
}



export function setupCartDrawer() {
  renderCart();
}
