// http://charlielee.uk/category/boats-animator/feed/

const NewsFeed = (function () {
    "use strict";
    var self = null;

    function NewsFeed(options) {
        this.options = options;
        this.parser = new window.DOMParser(),
        self = this;
    }

    NewsFeed.prototype.get = function() {
        window.fetch(self.options.url).then(function(response) {
            return response.text();

        }).then(function(text) {
            // First, we extract all the posts
            var posts = self.getPosts(text);

           // Then we convert each one into a object and display it
            posts.forEach(function(v, i) {
                self.displayPost(self.createPost(v, i));
            });

            // We could not fetch the feed
            // TODO Better error display
        }).catch(function(err) {
            console.error(err);
        });
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
        <a href="${post.url}"><h2 class="post-title">${post.title}</h2></a>
        <p class="post-date">${post.date}</p>
    </header>
    <div class="post-content">${post.summary}</div>
</div>`;
        self.options.selectors.container.insertAdjacentHTML("beforeend", layout);
    };
    return NewsFeed;
}());

module.exports = NewsFeed;
