lists = new Meteor.Collection("Lists");

lists.allow({
     insert: function(userId, doc){
       return userId && doc.owner === userId;
     },
     remove: function(userId, doc){
       return userId && doc.owner === userId;
     },
     update: function(userId, doc, fields, modifier){
	     return userId && doc.owner === userId;
     }
});



