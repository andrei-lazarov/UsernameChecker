const modalCategoryButtons = document.getElementById('modalFilterBox').querySelectorAll('.modalCategoryButton');
let selectedModalCategory = 'All';
const table = document.getElementById('table');
const cellHeaders = table.querySelectorAll('.cell-header');
let cells;

function toggleModalButton(selectedButton) {

    if (selectedButton.classList.contains('active')) {
        selectedButton.classList.toggle('active');
        selectedModalCategory = 'All';

        modalFilterItems();
        return;
    }

    for (const button of modalCategoryButtons) {
        if (button.classList.contains('active')) {
            button.classList.toggle('active');
        }
    }
    selectedModalCategory = selectedButton.id.replace('modalCategory', '');
    selectedButton.classList.toggle('active');
    modalFilterItems();
}

function modalFilterItems() {

    cellHeaders.forEach(item => {
        let visible = false;

        if (hasCategory(item, selectedModalCategory.toLowerCase())) {
            visible = true;
        }
        if (visible)
            item.classList.remove('hidden');
        else
            item.classList.add('hidden');
    });

    cells.forEach(item => {
        let visible = false;
        if (hasCategory(item, selectedModalCategory.toLowerCase())) {
            visible = true;
        }
        if (visible)
            item.classList.remove('hidden');
        else
            item.classList.add('hidden');
    });
}

modalCategoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleModalButton(button);
    });
});

// window.addEventListener('DOMContentLoaded', modalFilterItems);
