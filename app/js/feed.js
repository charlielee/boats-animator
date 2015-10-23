module.exports = (function () {
    "use strict";
    var self = null;

    function NewsFeed(options) {
        this.options = options;
        this.parser = new window.DOMParser(),
        self = this;
    }

     NewsFeed.prototype.erroring = function(err) {
        self.options.selectors.container.innerHTML = "<h3>News could not be loaded at this time.</h3>";
        console.error(err);
    };

    NewsFeed.prototype.get = function() {
        var request = new window.XMLHttpRequest();
        request.open("GET", self.options.url, true);
        request.send();

        // Success!
        request.onload = function() {
            if (request.readyState === 4 && request.status === 200) {
                // First, we extract all the posts
                var posts = self.getPosts(request.responseText);

                // Then we convert each one into a object and display it
                posts.forEach(function(v, i) {
                    self.displayPost(self.createPost(v, i));
                });

            // We reached our target destination, but it returned an error
            } else {
              self.erroring();
            }
        };

        // We could not fetch the feed
        request.onerror = self.erroring;
    };

    /**
     * Extract the individual posts from the XML.
     *
     * @param {String} data The XML to extract.
     * @returns {Array.<string>} The extracted posts.
     */
    NewsFeed.prototype.getPosts = function(data) {
        var posts  = [],
            xmlDoc = self.parser.parseFromString(data, "text/xml");

        // Get each blog post
        for (var i = 0, ele = xmlDoc.getElementsByTagName("channel")[0].childNodes; i < ele.length; i++) {
            if (ele[i].tagName === "item") {
                posts.push(`<?xml version="1.0" encoding="UTF-8"?><item>${ele[i].innerHTML}</item>`);
            }
        }

        return posts;
    };

    /**
     * Create a post object from the extracted post XML.
     *
     * @param {String} data The XML post data.
     * @returns {Object} An object all necessary post information.
     */
    NewsFeed.prototype.createPost = function(data, id) {
        // Create the post object
        var xmlDoc = self.parser.parseFromString(data, "text/xml");
        return {
            id: id + 1,
            url: xmlDoc.getElementsByTagName("link")[0].textContent,
            date: xmlDoc.getElementsByTagName("pubDate")[0].textContent,
            title: xmlDoc.getElementsByTagName("title")[0].textContent,
            summary: xmlDoc.getElementsByTagName("description")[0].textContent
        };
    };

    /**
     * Insert a post into the DOM.
     *
     * @param {Object} post A generated post object.
     */
    NewsFeed.prototype.displayPost = function(post) {
        var layout = `<div class="post" id="post-${post.id}">
    <header>
        <a class="post-link" href="${post.url}"><h2 class="post-title">${post.title}</h2></a>
        <p class="post-date">${post.date}</p>
    </header>
    <div class="post-content"><p>${post.summary}</p></div>
</div>`;
        self.options.selectors.container.insertAdjacentHTML("beforeend", layout);
    };
    return NewsFeed;
}());
