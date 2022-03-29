// import { displayEmptyState, hideEmptyState } from "../states/empty.js";

function cleanData(response) {
  let data = response.data.articles;
  const cleanedData = data.map((item) => {
    return {
      title: item.title,
      img: item.urlToImage,
      id: setID(data),
      publishedAt: parseDate(item.publishedAt),
      author: item.author,
      content: item.content,
    };
  });
  return cleanedData;
}

// set id's
function parseDate(publishedAt) {
  publishedAt = new Date(publishedAt);
  publishedAt = publishedAt.toString().substring(3, 25);
  publishedAt = publishedAt.slice(12, 16) + publishedAt.slice(16);
  return publishedAt;
}

function setID(data) {
  for (let i = 0; i < data.length; i++) {
    data.forEach((item) => {
      id = item.id = i++;
      return id;
    });
  }
}

module.exports = { cleanData };
