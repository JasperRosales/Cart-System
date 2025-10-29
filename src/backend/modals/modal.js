export function loadModalTemplate(filepath = '/src/components/info-modal.html') {
  return fetch(filepath)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load modal template: ${response.status}`);
      return response.text();
    })
    .then(html => {
      if (!document.getElementById('info-modal')) {
        document.body.insertAdjacentHTML('beforeend', html);

        const modal = document.getElementById('info-modal');
        const closeBtn = document.getElementById('info-modal-close');
        closeBtn.onclick = () => hideModal('info-modal');
        modal.onclick = e => e.target === modal && hideModal('info-modal');
      }
    })
    .catch(error => console.error('Error loading modal template:', error));
}

export function showModal({ title = 'Information', message = 'Default message', type = 'info' } = {}) {
  const modal = document.getElementById('info-modal');
  const titleEl = document.getElementById('info-modal-title');
  const msgEl = document.getElementById('info-modal-message');
  const box = document.getElementById('info-modal-box');

  if (!modal || !titleEl || !msgEl || !box) {
    console.error('Modal template not loaded yet. Did you call loadModalTemplate()?');
    return;
  }

  box.className = 'bg-white p-6 rounded-lg shadow-lg max-w-sm justify-center text-center border-l-4';
  titleEl.className = 'text-xl font-semibold mb-2';

  switch (type) {
    case 'error':
      box.classList.add('border-red-500');
      titleEl.classList.add('text-red-600');
      break;
    case 'success':
      box.classList.add('border-green-500');
      titleEl.classList.add('text-green-600');
      break;
    case 'warning':
      box.classList.add('border-yellow-500');
      titleEl.classList.add('text-yellow-600');
      break;
    default:
      box.classList.add('border-blue-500');
      titleEl.classList.add('text-blue-600');
  }

  titleEl.textContent = title;
  msgEl.innerHTML = message;

  modal.classList.remove('hidden');
}

export function hideModal(modalname) {
  const modal = document.getElementById(`${modalname}`);
  if (modal) modal.classList.add('hidden');
}