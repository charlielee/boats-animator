class NewsDownloadError extends Error {
  constructor() {
    super("Unable to download news posts");
  }
}

export default NewsDownloadError;
