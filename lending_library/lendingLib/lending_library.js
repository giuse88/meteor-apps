lists = new Meteor.Collection("Lists");

lists.allow({

     insert: function(userId, doc){
       return userId && doc.owner === userId;
     },

     remove: function(userId, doc){
       return userId && doc.owner === userId;
     },

   /*  update: function(userId, docs, fields, modifier){ 
       console.log(userId, docs, fields, modifier);
       return true;
     }
   */
     update: function(userId, docs, fields, modifier){ 
       console.log(userId, docs, fields, modifier);
       return  _.all(docs, function(doc) {
                    return doc.owner === userId;
               });
     } 

  /*
    remove: function (userId, docs){ 
      return adminUser(userId) || 
             _.all(docs, function(doc) {
                  return doc.owner === userId;
             });
    }
  */
});



