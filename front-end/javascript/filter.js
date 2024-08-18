const categoryButtons = document.getElementById('filterBox').querySelectorAll('.categoryButton');
const gridItemss = document.querySelectorAll('.grid-item');
let selectedCategory = 'All';

function hasCategory(item, category) {
    return item.dataset[category] === 'y';
}

function toggleButton(selectedButton) {

    if (selectedButton.classList.contains('active')) {
        selectedButton.classList.toggle('active');
        selectedCategory = 'All';

        filterItems();
        return;
    }

    for (const button of categoryButtons) {
        if (button.classList.contains('active')) {
            button.classList.toggle('active');
        }
    }
    selectedCategory = selectedButton.id.replace('category', '');
    selectedButton.classList.toggle('active');
    filterItems();
}

function filterItems() {

    if (selectedCategory == 'All') {
        gridItemss.forEach(item => {
            item.style.display = 'flex';
        });
        return;
    }

    gridItemss.forEach(item => {
        let visible = false;

        if (hasCategory(item, selectedCategory.toLowerCase())) {
            visible = true;
        }
        item.style.display = visible ? 'flex' : 'none';
    });
}

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleButton(button);
    });
});

// window.addEventListener('DOMContentLoaded', filterItems);
