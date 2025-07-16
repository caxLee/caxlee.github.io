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
        if (e.target.closest(".article-tags-list-item")) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        const originalLink = card.dataset.originalLink;
        if (originalLink) {
          openModalWithIframe(originalLink);
        }
      });
    });
    function openModalWithIframe(url) {
      body.classList.add("modal-open");
      modal.classList.add("is-active");
      modalContent.innerHTML = `<iframe src="${url}"></iframe>`;
    }
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    const closeButton = document.createElement("button");
    closeButton.className = "modal-close-button";
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", closeModal);
    modal.querySelector(".modal-content-wrapper").appendChild(closeButton);
    function closeModal() {
      modal.classList.remove("is-active");
      body.classList.remove("modal-open");
      modalContent.innerHTML = "";
    }
  });
})();
