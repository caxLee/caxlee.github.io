(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const modal = document.getElementById("article-modal");
    const modalContent = document.getElementById("modal-content");
    if (!modal || !modalContent) {
      console.error("Modal elements not found");
      return;
    }
    document.querySelectorAll(".article-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".article-tags-list-item") || e.target.closest(".article-original-link")) {
          return;
        }
        e.stopPropagation();
        const originalLink = card.dataset.originalLink;
        if (originalLink) {
          window.open(originalLink, "_blank", "noopener,noreferrer");
        }
      });
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    const closeButton = document.createElement("button");
    closeButton.className = "modal-close-button";
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      modal.classList.remove("is-active");
      body.classList.remove("modal-open");
      modalContent.innerHTML = "";
    });
    modal.querySelector(".modal-content-wrapper").appendChild(closeButton);
  });
})();
