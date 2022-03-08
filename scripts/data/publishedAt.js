function publisher(article) {
  let publishedAt = new Date(article.publishedAt);
  publishedAt = publishedAt.toString().substring(3, 25);
  publishedAt = publishedAt.slice(12, 16) + publishedAt.slice(16);

  return publishedAt;
}

export { publisher, publishedAt };
