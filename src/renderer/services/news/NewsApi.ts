import * as rLogger from "../rLogger/rLogger";
import NewsDownloadError from "./NewsDownloadError";
import { NewsResponse } from "./NewsResponse";

const NEWS_URL = "https://www.charlielee.uk/feed/boats-animator.json";
const POST_COUNT = 5;

export const fetchRecent = async (): Promise<NewsResponse> => {
  try {
    rLogger.info("newsApi.fetchRecent.start");
    const newsResponse: NewsResponse = await window
      .fetch(NEWS_URL, {
        method: "get",
      })
      .then((data) => data.json());

    const transformPosts = newsResponse.posts
      .slice(0, POST_COUNT)
      .map((post) => ({
        ...post,
        date: new Date(post.date),
      }));

    return { ...newsResponse, posts: transformPosts };
  } catch (e) {
    rLogger.warn("newsApi.fetchRecent.error", "Unable to download news posts");
    throw new NewsDownloadError();
  }
};
