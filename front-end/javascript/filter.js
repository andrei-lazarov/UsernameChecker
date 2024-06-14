const filterBox = document.getElementById('filterBox');
const gridItemss = document.querySelectorAll('.grid-item');

function hasCategory(item, category) {
    return item.dataset[category] === 'y';
}

function toggleButton(button) {
    button.classList.toggle('active');
}

function filterItems() {
    const selectedCategories = [];

    for (const button of filterBox.querySelectorAll('.categoryButton')) {
        if (button.classList.contains('active')) {
            selectedCategories.push(button.id.replace('category', ''));
        }
    }

    gridItemss.forEach(item => {
        let visible = false;
        for (const category of selectedCategories) {

            if (hasCategory(item, category.toLowerCase())) {
                visible = true;
                break;
            }
        }
        item.style.display = visible ? 'flex' : 'none';
    });
}

filterBox.querySelectorAll('.categoryButton').forEach(button => {
    button.addEventListener('click', () => {
        toggleButton(button);
        filterItems();
    });
});

window.addEventListener('DOMContentLoaded', filterItems);
