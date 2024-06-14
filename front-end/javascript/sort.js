const sortSelector = document.getElementById("sortSelector");
const sortDirectionButton = document.getElementById("sortDirection");
let isAscending = true;

sortSelector.addEventListener("change", function () {
    const sortBy = sortSelector.value;

    const gridItemsArray = [...gridItems];
    gridItemsArray.sort(function (a, b) {
        let comparisonValue;

        switch (sortBy) {
            case "alphabetical":
                const websiteA = a.dataset.website.toLowerCase();
                const websiteB = b.dataset.website.toLowerCase();
                comparisonValue = websiteA.localeCompare(websiteB);
                break;
            case "availability":
                const availabilityA = a.dataset.status.toLowerCase();
                const availabilityB = b.dataset.status.toLowerCase();
                comparisonValue = availabilityA > availabilityB ? 1 : -1;
                break;
            case "order":
                comparisonValue = a.dataset.order - b.dataset.order;
                break;
        }

        return isAscending ? comparisonValue : -comparisonValue;
    });

    const gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = "";
    gridItemsArray.forEach(function (item) {
        gridContainer.appendChild(item);
    });
});

sortDirectionButton.addEventListener("click", function () {
    isAscending = !isAscending;
    sortDirectionButton.textContent = isAscending ? "⬆" : "⬇";
    sortSelector.dispatchEvent(new Event("change"));
});