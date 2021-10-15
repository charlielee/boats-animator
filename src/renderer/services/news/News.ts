import NewsDownloadError from "./NewsDownloadError";
import { NewsResponse } from "./NewsResponse";

const NEWS_URL = "https://www.charlielee.uk/feed/boats-animator.json";

export const fetchRecent = async (): Promise<NewsResponse> => {
  try {
    return window
      .fetch(NEWS_URL, {
        method: "get",
      })
      .then((data) => data.json());
  } catch (e) {
    throw new NewsDownloadError();
  }
};
