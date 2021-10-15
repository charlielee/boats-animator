import { useEffect, useState } from "react";
import { fetchRecent } from "../../../services/news/News";
import { NewsResponsePost } from "../../../services/news/NewsResponse";
import "./NewsFeed.css";

interface NewsFeedProps {}

const NewsFeed = (): JSX.Element => {
  const [newPosts, setNewsPosts] = useState<NewsResponsePost[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const newsResponse = await fetchRecent();
        setNewsPosts(newsResponse.posts);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="news-feed">
      {newPosts.map((post) => (
        <div key={post.id}>
          <h3>
            <a
              href="#"
              onClick={() => window.preload.openExternal.newsPost(post)}
            >
              {post.title}
            </a>
          </h3>
          <p>{post.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
