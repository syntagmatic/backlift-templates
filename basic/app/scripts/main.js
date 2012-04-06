window.Router = Backbone.Router.extend({
    routes: {
        "": "handleHome",
        ":pagename": "handlePage",
    },

    initialize: function() {
        // set the order in which page options will appear
        this.pages = ['home', 'tutorial', 'resources'];
    },

    handleHome: function() {
        this.handlePage('home');
    },

    handlePage: function(page) {
        var newPage = new window.PageView(page, this.pages);
        var $body = $('body');
        $body.empty();
        $body.append(newPage.render().el);
    },
});

$(function(){
    var App = new window.Router();
    Backbone.history.start(); 
});