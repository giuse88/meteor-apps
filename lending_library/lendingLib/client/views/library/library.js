Template.library.helpers({
	name : function() {
		var user = Meteor.user();
		var username = user && user.username;
		return  username ? username : "Unknown";
	}
});