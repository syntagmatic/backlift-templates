$(function() {
	var MyThing = Backbone.Model.extend({ 
		idAttribute: "_id" 
	});

	var MyThings = Backbone.Collection.extend({
		model: MyThing,
		url: 'backlift/mythings',
	});

	var MyView = Backbone.View.extend({

		el: '#mainview',

		initialize: function() {
			this.collection.bind('add', this.render, this);
			this.collection.bind('remove', this.render, this);
			this.collection.bind('reset', this.render, this);
		},

		render: function() {
			var t = _.template($('#mainview-template').html(), {
				thinglist: this.collection
			});
			this.$('ul').html(t);
		},

		events: {
			"click #add-btn": "add_thing",
			"click .thing-del-btn": "del_thing",
		},

		add_thing: function (ev) {
			var thing_name = $('#add-input').val();
			newthing = new MyThing({name: thing_name});
			this.collection.add(newthing);
			newthing.save(newthing.attributes);
		},

		del_thing: function (ev) {
			// format of button id is 'del-' + cid
			var cid = ev.target.id.split('-')[1]; 
			var oldthing = this.collection.getByCid(cid);
			oldthing.destroy();
			this.collection.remove(oldthing);
		},
	});	

	var myThings = new MyThings();
	var myView = new MyView({collection: myThings});
	myThings.fetch();
});