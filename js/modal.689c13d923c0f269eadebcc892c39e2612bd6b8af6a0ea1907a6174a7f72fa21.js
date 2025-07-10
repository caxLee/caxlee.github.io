(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const modal = document.getElementById("article-modal");
    const modalContent = document.getElementById("modal-content");
    if (!modal || !modalContent) {
      return;
    }
    document.querySelectorAll(".article-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        const url = card.dataset.url;
        if (url) {
          body.classList.add("modal-open");
          modal.classList.add("is-active");
          fetch(url).then((response) => response.text()).then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const article = doc.querySelector(".main-article");
            if (article) {
              modalContent.innerHTML = article.innerHTML;
            } else {
              modalContent.innerHTML = "<p>Could not load article content.</p>";
            }
          }).catch((err) => {
            console.error("Failed to fetch article:", err);
            modalContent.innerHTML = "<p>Error loading article.</p>";
          });
        }
      });
    });
    modal.addEventListener("mouseleave", () => {
      modal.classList.remove("is-active");
      body.classList.remove("modal-open");
      modalContent.innerHTML = "";
    });
  });
})();
