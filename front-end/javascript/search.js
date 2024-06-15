const searchInput = document.getElementById("searchInput");
const gridItems = document.querySelectorAll(".grid-item");

searchInput.addEventListener("keyup", function () {
    const searchTerm = searchInput.value.toLowerCase();

    gridItems.forEach(function (item) {
        const itemText = item.id.toLowerCase();
        const match = itemText.includes(searchTerm);

        if (match) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
});
