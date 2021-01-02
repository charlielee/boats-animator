module.exports = {};

(function() {
  "use strict";
  const { shell } = require("electron");
  let qNewsContainer = document.querySelector(".container-news"),
      loadingDots    = document.querySelector(".loading-dots");
  qNewsContainer.addEventListener("click", openNews);

  /**
   * Open the desired news post in the user's browser.
   *
   * @param {Object} e - An MouseEvent object.
   * @returns {void}
   */
  function openNews(e) {
    if (e.target.classList.contains("post-link")) {
      shell.openExternal(e.target.dataset.url);
    }
  }

  /**
   * Cache the latest news.
   *
   * @param {Array} posts - An array containing raw new objects.
   * @returns {Boolean} True if new was cached, false otherwise.
   */
  function _cacheNews(posts) {
    // Store the news in localStorage in case we cannot fetch it anew
    localStorage.setItem("ba-news", JSON.stringify(posts));

    // Because setItem() does not have a return value upon successful
    // storage, this kludge does that for us.
    if (localStorage.getItem("ba-news")) {
      console.info("Latest news successfully cached");
      return true;
    } else {
      console.info("Latest news was not successfully cached");
      return false;
    }
  }

  /**
   * Retrieve the cached news.
   *
   * @returns {Array} An array containing raw news objects.
   *                  If not available, an empty array.
   */
  function _getNewsCache() {
    console.info("Fetching cached news");
    let cached = localStorage.getItem("ba-news");
    return cached ? JSON.parse(cached) : [];
  }

  /**
   * Clear the cached news.
   *
   * @returns {Boolean} Always returns true.
   */
  function _clearNewsCache() {
    localStorage.removeItem("ba-news");
    return true;
  }

  /**
   * Construct the HTML structure for the news.
   *
   * @param {Object} post - A news article object.
   * @returns {String} The generated HTML.
   */
  function _compilePostHTML(post) {
    return `<div class="post" id="post-${post.id}">
    <header>
        <h2 class="post-title"><a class="post-link" href="#" data-url="${post.url}">${post.title}</a></h2>
        <p class="post-date">${post.date}</p>
    </header>
    <div class="post-content"><p>${post.excerpt}</p></div>
</div>`;
  }

  /**
   * Compile the latest news.
   *
   * @param {JSON} data - The JSON response data.
   * @returns {Array} The latest news, in the form of news objects.
   */
  function getPosts(data) {
    let posts = [],
      numOfPosts = 3;

    // Get the post up to the limit of posts we want to display
    for (var i = 0; i < numOfPosts; i++) {
      var curPost = data.posts[i];
      posts.push({
        id: curPost.id,
        url: curPost.url,
        date: new Date(curPost.date).toLocaleString([], {month: "long", day: "numeric", year: "numeric"}),
        title: curPost.title_plain,
        excerpt: curPost.excerpt
      });
    }

    // Cache the news
    _clearNewsCache();
    _cacheNews(posts);
    return posts;
  }

  /**
   * Display an error message if the news cannot be loaded.
   * @param {Object} err - Browser-generated error message.
   * @returns {void}
   */
  function erroring(err) {
    qNewsContainer.innerHTML = "<h3>News could not be loaded at this time.</h3>";
    console.error(err);
  }

  /**
   * Display the news.
   *
   * @param {Array} posts - An array containing the news to display.
   * @returns {Boolean} Always returns true.
   */
  function displayNews(posts) {
    loadingDots.remove();
    posts.forEach(function(post) {
      qNewsContainer.insertAdjacentHTML("beforeend", _compilePostHTML(post));
    });
    return true;
  }

  /**
   * Fetch the latest news.
   *
   * @param {String} url - The URL to the JSON news feed.
   * @returns {void}
   */
  function load(url) {
    window.fetch(url, {
        method: "get"
      })
      .then(r => r.json())
      .then(r => displayNews(getPosts(r)))
      .catch(err => {
        // First try to load the cached news, if possible
        var cachedNews = _getNewsCache();
        if (cachedNews) {
          displayNews(cachedNews);

          // No cache available, error
        } else {
          erroring(err);
        }
      });
  }


  // Public exports
  module.exports.load = load;
}());
