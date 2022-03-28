// import { articleObserver } from "../partials/articleObserver.js";

// const articlesContainer = document.querySelector(
//   "main:first-of-type section section:last-of-type ul"
// );

// const articleContent = (articles) => {
// Function
// articles.map((article) => {
//   // Function
//   let publishedAt = new Date(article.publishedAt);
//   publishedAt = publishedAt.toString().substring(3, 25);
//   publishedAt = publishedAt.slice(12, 16) + publishedAt.slice(16);

//   for (let i = 0; i < articles.length; i++) {
//     articles.forEach((article) => {
//       article.id = i++;
//     });
//   }

// }

//     const articleContents = `
//       <div  style="background-image:url(${
//         article.urlToImage ? article.urlToImage : "./images/icons/no-image.svg"
//       })"></div>
//       <article>
//       <a href=/articles/${article.id}>
//         <h2>${article.title}</h2>
//         </a>
//           <div>
//           <small><i class="fa-solid fa-clock"></i>${publishedAt}</small>
//           <small><i class="fa-solid fa-file-signature"></i> ${
//             article.author ? article.author : "-"
//           }</small>
//           </div>
//       </article>

// `;
//     const articleCard = document.createElement("li");
//     articleCard.className = "articleCard";
//     articleCard.innerHTML = articleContents;
//     articlesContainer.appendChild(articleCard);
//   });

//   const articlesToObserve = document.querySelectorAll(
//     ".articleCard:not(:first-of-type)"
//   );

//   articleObserver(articlesToObserve);
// });
//
