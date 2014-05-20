Meteor.startup(function () {
  // code to run on server at startup
});

/* Publish category list */
Meteor.publish("Categories", function() {
   console.log(this.userId);
   return lists.find({owner:this.userId},{fields:{Category:1}});
});

/* Publish items in a category */
Meteor.publish("listdetails", function(category_id){
   return lists.find({_id:category_id});
});
