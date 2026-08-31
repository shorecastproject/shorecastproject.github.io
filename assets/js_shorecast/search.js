let pages = [];

async function indexPages() {
  const urls = [
    "/index.html",
    "/pages/publications.html",
    "/pages/overview.html",
    "/pages/news.html",
    "/pages/overview/team.html",
    "/pages/overview/objectives.html",
    "/pages/overview/methodology.html",
    "/pages/overview/consortium.html",
    "/pages/link.html",
    "/components/footer.html",
    "/components/header.html",
    "/components/under_header.html",
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      const html = await res.text();

      // parse le HTML pour extraire le texte
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // supprime les scripts et styles du texte
      doc.querySelectorAll("script, style").forEach(el => el.remove());

      const content = doc.body.innerText.toLowerCase();
      const title = doc.querySelector("title")?.innerText || url;

      pages.push({ title, url, content });
    } catch (err) {
      console.error(`Impossible d'indexer ${url}`, err);
    }
  }
}

function doSearch() {
  const query = document.getElementById("search-input").value.toLowerCase().trim();
  const resultsDiv = document.getElementById("search-results");

  if (!query) {
  resultsDiv.innerHTML = "";
  resultsDiv.style.display = "none";
  return;
}

  const matches = pages.filter(page =>
    page.title.toLowerCase().includes(query) ||
    page.content.includes(query)
  );

  if (matches.length === 0) {
  resultsDiv.innerHTML = `<div class="result-item"><span class="result-title">Aucun résultat pour "${query}"</span></div>`;
  resultsDiv.style.display = "block"; 
  return;
}

  resultsDiv.innerHTML = matches.map(page => {
    const idx = page.content.indexOf(query);
    const excerpt = page.content.slice(Math.max(0, idx - 50), idx + 100);
    const highlighted = excerpt.replace(
      new RegExp(query, 'gi'),
      m => `<strong>${m}</strong>`
    );

    return `
      <div class="result-item">
        <a href="${page.url}">
          <div class="result-title">${page.title}</div>
          <div class="result-info">...${highlighted}...</div>
        </a>
      </div>`;
  }).join("");
  resultsDiv.style.display = "block";
}

async function initSearch() {
  await indexPages(); // fetch et indexe toutes les pages au chargement

  const input = document.getElementById("search-input");
  if (!input) return;

  input.addEventListener("input", doSearch);

  document.addEventListener("click", e => {
  if (!e.target.closest(".search-bar")) {
    document.getElementById("search-results").innerHTML = "";
    document.getElementById("search-results").style.display = "none"; 
  }
});
}

initSearch();