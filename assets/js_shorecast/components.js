async function loadComponent(selector, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur chargement : ${url}`);
    const html = await response.text();
    document.querySelector(selector).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#header-placeholder", "components/header.html");
  loadComponent("#footer-placeholder", "components/footer.html");
  loadComponent("#home-placeholder","pages/home.html");
});



// document.addEventListener("click", function(e) {
//   // Vérifie si on clique sur le lien Contact
//   const link = e.target.closest('a[href="#footer"]');

//   if (link) {
//     e.preventDefault(); // bloque le comportement normal

//     const footer = document.getElementById("footer");

//     if (footer) {
//       footer.scrollIntoView({
//         behavior: "smooth"
//       });
//     }
//   }
// });