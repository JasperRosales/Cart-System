import { showModal } from './modal.js';

export function setupModalTriggers() {
  const openBtn = document.getElementById('open-about-us');
  if (openBtn) {
    openBtn.addEventListener('click', e => {
      e.preventDefault();
      showModal({
        title: 'Whats up my indio!',
        message:
          "Alam kong gusto mong bumili dito, dahil sa store na ito mapapabili ka talaga! (ง'̀-'́)ง",
        type: 'info'
      });
    });
  }
}
