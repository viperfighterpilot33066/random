document.getElementById('menu-button').addEventListener('click', function () {
    const menu = document.getElementById('Menu');
    // Toggle the hidden class on the menu
    menu.classList.toggle('hidden');
    // Update aria-expanded attribute for accessibility
    const isHidden = menu.classList.contains('hidden');
    this.setAttribute('aria-expanded', !isHidden);

    // Ensure the menu is displayed properly
    if (!isHidden) {
        menu.style.transform = 'translateX(0)'; // Slide in
    } else {
        menu.style.transform = 'translateX(100%)'; // Slide out
    }
});
