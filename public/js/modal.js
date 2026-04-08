document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('quick-view-modal');
    const closeBtn = document.querySelector('.modal-close');
    const quickViewBtns = document.querySelectorAll('.quick-view');

    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card') || btn.closest('.cat-item');
            
            // Extract data from the card
            const title = card.querySelector('h3').innerText;
            const price = card.querySelector('.price') ? card.querySelector('.price').innerText : '';
            const img = card.querySelector('img').src;

            // Populate Modal
            modalImg.src = img;
            modalTitle.innerText = title;
            modalPrice.innerText = price;

            // Show Modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    globalThis.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
