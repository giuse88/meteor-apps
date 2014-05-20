Meteor.subscribe("Categories");

Meteor.autosubscribe(function() {
	Meteor.subscribe("listdetails",
		Session.get('current_list'));
});