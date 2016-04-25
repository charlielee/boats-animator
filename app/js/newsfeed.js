module.exports = {};

(function() {
    "use strict";
    var newsContainer = window.document.querySelector(".container-news");

    /**
     * Cache the latest news.
     *
     * @param {Array} posts An array containing raw new objects.
     * @returns {Boolean} True if new was cached, false otherwise.
     */
    function cacheNews(posts) {
        // Store the news in localStorage in case we cannot fetch it anew
        window.localStorage.setItem("ba-news", JSON.stringify(posts));

        // Because setItem() does not have a return value upon successful
        // storage, this kludge does that for us.
        if (window.localStorage.getItem("ba-news")) {
            console.info("Latest news sucessfully cached.");
            return true;
        } else {
            console.info("Latest news sucessfully cached.");
            return false;
        }
    }

    /**
     * Retrieve the cached news.
     *
     * @returns {Array} An array containing raw news objects.
     *                  If not available, an empty array.
     */
    function getNewsCache() {
        var cached = window.localStorage.getItem("ba-news");
        return cached ? JSON.parse(cached) : [];
    }

    /**
     * Clear the cached news.
     *
     * @returns {Boolean} Always returns true.
     */
    function clearNewsCache() {
        window.localStorage.removeItem("ba-news");
        return true;
    }

    /**
     * Construct the HTML structure for the news.
     *
     * @param {Object} post A news article object.
     * @returns {String}
     */
    function compilePostHTML(post) {
        return `<div class="post" id="post-${post.id}">
    <header>
        <a class="post-link" href="#" onclick="gui.Shell.openExternal('${post.url}')"><h2 class="post-title">${post.title}</h2></a>
        <p class="post-date">${post.date}</p>
    </header>
    <div class="post-content"><p>${post.excerpt}</p></div>
</div>`;
    }

    /**
     * Compile the latest news.
     *
     * @param {JSON} data The raw JSON response data.
     * @returns {Array} The latest news, in the form of news objects.
     */
    function getPosts(data) {
        var posts      = [],
            numOfPosts = 3;
        data = JSON.parse(data);

        // Get the post up to the limit of posts we want to display
        for (var i = 0; i < numOfPosts; i++) {
            var curPost = data.posts[i];
            posts.push({
                id: curPost.id,
                url: curPost.url,
                date: new Date(curPost.date).toLocaleDateString(),
                title: curPost.title_plain,
                excerpt: curPost.excerpt
            });
        }

        // Cache the news
        clearNewsCache();
        cacheNews(posts);
        return posts;
    }

    /**
     * Display an error message if the news cannot be loaded.
     */
    function erroring(err) {
        newsContainer.innerHTML = "<h3>News could not be loaded at this time.</h3>";
        console.error(err);
    }

    /**
     * Display the news.
     *
     * @param {Array} posts An array containing the news to display.
     * @returns {Boolean} Always returns true.
     */
    function displayNews(posts) {
        posts.forEach(function(post) {
            newsContainer.insertAdjacentHTML("beforeend", compilePostHTML(post));
        });
        return true;
    }

    /**
     * Fetch the latest news.
     *
     * @param {String} url The URL to the JSON news feed.
     */
    function load(url) {
        // We can fetch the news from the site
        var request = new window.XMLHttpRequest();
        request.open("GET", url, true);
        request.send();

        // Success!
        request.onload = function() {
            if (request.readyState === 4 && request.status === 200) {
                // Extract and display the latest news
                displayNews(getPosts(request.responseText));

            // We reached our target destination, but it returned an error
            } else {
                // First try to load the cached news, if possible
                var cachedNews = getNewsCache();
                if (cachedNews) {
                    displayNews(cachedNews);

                    // No cache available, error
                } else {
                    erroring();
                }
            }
        };

        // We could not fetch the feed
        request.onerror = erroring;
    }

    // Public exports
    module.exports.load = load;
}());
