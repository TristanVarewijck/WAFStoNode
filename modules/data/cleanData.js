function cleanData(response) {
  let data = response.data.articles;
  const cleanedData = data.map((item, index) => {
    return {
      title: item.title,
      img: item.urlToImage,
      id: `${index}`,
      publishedAt: parseDate(item.publishedAt),
      author: item.author,
      content: item.content,
    };
  });

  module.exports = { cleanedData };
  return cleanedData;
}

// PARSE PUBLISH DATE
function parseDate(publishedAt) {
  publishedAt = new Date(publishedAt);
  publishedAt = publishedAt.toString().substring(3, 25);
  publishedAt = publishedAt.slice(12, 16) + publishedAt.slice(16);
  return publishedAt;
}

module.exports = { cleanData };
