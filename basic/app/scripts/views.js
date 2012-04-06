window.PageView = Backbone.View.extend({
	tagName: 'div',
	className: 'page',

	initialize: function(page, pages) {
		this.layout = window.JST['layout']({
			cur_page: page,
			pages: pages,
			url_root: window.url_root,
		});
		this.content = window.JST[page]();
	},

	render: function() {
		var $el = $(this.el);
		$el.html(this.layout);

		var $content = this.$('.content');
		$content.html(this.content);

		return this;
	},
});
