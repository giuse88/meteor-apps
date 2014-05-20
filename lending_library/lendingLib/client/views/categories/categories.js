Template.categories.lists = function()
{
	return lists.find({}, { sort : { Category : 1}});
}

Session.set('adding_category', false);

Template.categories.new_cat = function() {
	return Session.equals('adding_category', true);
};

Template.categories.events({
	'click #btnNewCat': function (event, target) {
		Session.set('adding_category', true);
		Meteor.flush();
		target.find("#add-category").focus();
	},
	'keyup #add-category': function (e,t){
		if (e.which === 13) {
			var catVal = String(e.target.value || "");
			if (catVal) {
				console.log("user : " +  Meteor.userId());
				lists.insert({Category:catVal,owner: Meteor.userId()});
				Session.set('adding_category', false);
			}
		}
	},
	'focusout #add-category' : function(e,t){
		Session.set('adding_category',false);
	},

	'click .category' : function(e, t) {
		Session.set('current_list', this._id);
	},

	'dblclick .category' : function(e, t) {
		var list = lists.findOne({_id : this._id});
		var elements = list.items ? list.items.length : 0 ;
		if ((elements > 0 && confirm('There are elements in this list. Are you sure you want to delete it?')) ||
			elements <= 0 ) {
			lists.remove(this._id);
		}
	}
});

Template.categories.list_status = function(){
	if (Session.equals('current_list',this._id))
		return "active";
	else
		return "";
};
