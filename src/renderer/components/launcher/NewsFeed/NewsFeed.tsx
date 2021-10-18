import { useEffect, useState } from "react";
import { fetchRecent } from "../../../services/news/News";
import NewsDownloadError from "../../../services/news/NewsDownloadError";
import { NewsResponsePost } from "../../../services/news/NewsResponse";
import "./NewsFeed.css";

interface NewsFeedProps {}

const NewsFeed = (): JSX.Element => {
  const [newPosts, setNewsPosts] = useState<NewsResponsePost[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const newsResponse = await fetchRecent();
        setNewsPosts(newsResponse.posts);
      } catch (e) {
        if (e instanceof NewsDownloadError) {
          setError(true);
        } else {
          console.error(e);
        }
      }
    })();
  }, []);

  return (
    <div className="news-feed">
      {error ? (
        <p className="news-feed__error">
          News could not be loaded at this time.
        </p>
      ) : (
        newPosts.map((post) => (
          <div key={post.id}>
            <h3>
              <a
                href="#"
                onClick={() => window.preload.openExternal.newsPost(post)}
              >
                {post.title}
              </a>
            </h3>
            <p className="news-feed__date">
              {post.date.toLocaleString([], {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsFeed;
