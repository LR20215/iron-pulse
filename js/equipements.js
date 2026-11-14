
/* =====================================================
   IRON PULSE — ÉQUIPEMENTS
   Recherche • Filtres • Compteur • Réinitialisation
===================================================== */

(() => {
    "use strict";

    const searchInput = document.getElementById("equipment-search");
    const categorySelect = document.getElementById("equipment-category");
    const resetButton = document.getElementById("equipment-reset");
    const countDisplay = document.getElementById("equipment-count");
    const emptyMessage = document.getElementById("equipment-empty");

    const cards = Array.from(
        document.querySelectorAll(".equipment-product-card")
    );

    if (
        !searchInput ||
        !categorySelect ||
        !resetButton ||
        !countDisplay ||
        !emptyMessage
    ) {
        return;
    }

    function filterEquipment() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedCategory = categorySelect.value;

        let visibleCount = 0;

        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const cardCategory = card.dataset.category;

            const matchesSearch = cardText.includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;

            const isVisible = matchesSearch && matchesCategory;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        // Masquer les sections qui ne contiennent aucun résultat
        document.querySelectorAll(".equipment-section").forEach(section => {
            const sectionCards = Array.from(
                section.querySelectorAll(".equipment-product-card")
            );

            if (sectionCards.length > 0) {
                section.hidden = !sectionCards.some(card => !card.hidden);
            }
        });

        // Actualiser le compteur
        countDisplay.textContent =
            `${visibleCount} équipement${visibleCount > 1 ? "s" : ""} affiché${visibleCount > 1 ? "s" : ""}`;

        // Afficher le message si aucun résultat
        emptyMessage.hidden = visibleCount !== 0;
    }

    // Recherche en direct
    searchInput.addEventListener("input", filterEquipment);

    // Filtre par catégorie
    categorySelect.addEventListener("change", filterEquipment);

    // Réinitialisation
    resetButton.addEventListener("click", () => {
        searchInput.value = "";
        categorySelect.value = "all";

        filterEquipment();
        searchInput.focus();
    });

    // Premier affichage
    filterEquipment();

})();
