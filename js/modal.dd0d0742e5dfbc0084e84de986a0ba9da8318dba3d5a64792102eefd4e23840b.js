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
    function openModalWithContent(url, originalLink) {
      body.classList.add("modal-open");
      modal.classList.add("is-active");
      modalContent.innerHTML = "<p>Loading...</p>";
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      }).then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const article = doc.querySelector(".article-content");
        if (article) {
          let originalLinkHTML = "";
          if (originalLink) {
            originalLinkHTML = `<p><a href="${originalLink}" target="_blank" rel="noopener noreferrer">\u9605\u8BFB\u539F\u6587</a></p><hr>`;
          }
          modalContent.innerHTML = originalLinkHTML + article.innerHTML;
        } else {
          modalContent.innerHTML = '<p>Could not load article content. The selector ".article-content" might be incorrect.</p>';
          console.error("Could not find '.article-content' in fetched document from URL:", url);
        }
      }).catch((err) => {
        console.error("Failed to fetch article:", err);
        modalContent.innerHTML = `<p>Error loading article. ${err.message}</p>`;
      });
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
