import NewsDownloadError from "./NewsDownloadError";
import { NewsResponse } from "./NewsResponse";

const NEWS_URL = "https://www.charlielee.uk/feed/boats-animator.json";
const POST_COUNT = 5;

export const fetchRecent = async (): Promise<NewsResponse> => {
  try {
    const newsResponse = await window
      .fetch(NEWS_URL, {
        method: "get",
      })
      .then((data) => data.json());

    return { ...newsResponse, posts: newsResponse.posts.slice(0, POST_COUNT) };
  } catch (e) {
    throw new NewsDownloadError();
  }
};
