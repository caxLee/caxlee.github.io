(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
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
  });
})();
