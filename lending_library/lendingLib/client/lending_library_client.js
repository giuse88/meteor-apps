  var  focusText =  function ($element, val) {
        $element.focus();
        $element.value = val ? val : "";
        $element.select();
  }

  Meteor.subscribe("Categories");
  Meteor.autosubscribe(function() {
     Meteor.subscribe("listdetails",
     Session.get('current_list'));
  }); 

  Accounts.ui.config({
     passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });

  Template.categories.lists = function() 
  {
    return lists.find({}, { sort : { Category : 1}});  
  }

  Session.set('adding_category', false);
  
  /* 
   * This function uses the equals method from 
   * the session obejct to test if the adding_category 
   * varieble is set to true;
   */ 

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
              lists.insert({Category:catVal,owner: this.userId});
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

  Template.list.items = function () {
    if (Session.equals('current_list',null))
      return null;
    else {
      var cats = lists.findOne({_id:Session.get('current_list')});
      if (cats&&cats.items) {
      for(var i = 0; i<cats.items.length;i++) {
        var d = cats.items[i]; d.Lendee = d.LentTo ? d.LentTo : "free"; 
        d.LendClass = d.LentTo ?  "label-danger" : "label-success"; 
      }
      return cats.items;
      }
    }
  };
  
  Template.list.list_selected = function() {
    return ((Session.get('current_list')!=null) &&
    (!Session.equals('current_list',null)));
  };

  Template.categories.list_status = function(){
    if (Session.equals('current_list',this._id))
      return "active";
    else
      return "";
  };

  Template.list.list_adding = function(){
    return (Session.equals('list_adding',true));
  };
  
  Template.list.lendee_editing = function(){
    return (Session.equals('lendee_input',this.Name));
  };

  function removeItem(list_id,item_name){ 
    if (!item_name&&!list_id) 
      return; 
    lists.update({_id:list_id}, 
    {$pull:{items:{Name:item_name}}}); 
  }

  function addItem(list_id,item_name){
    if (!item_name&&!list_id)
        return; 
    lists.update({_id:list_id}, {$addToSet:{items:{Name:item_name}}}); 
  };

  function updateLendee(list_id,item_name,lendee_name){
    var l = lists.findOne({"_id":list_id , "items.Name":item_name}); 
    if (l&&l.items) { 
    for (var i = 0; i<l.items.length; i++) { 
      if (l.items[i].Name === item_name) {
         l.items[i].LentTo = lendee_name;
      } 
    }
    lists.update({"_id":list_id},{$set:{"items":l.items}}); 
    } 
  };

Template.list.events({
  'click #btnAddItem': function (e,t){
    Session.set('list_adding',true);
    Meteor.flush();
    focusText(t.find("#item_to_add"));
  },
  'keyup #item_to_add': function (e,t){
    if (e.which === 13) {
      addItem(Session.get('current_list'),e.target.value);
      Session.set('list_adding',false);
    }
  },
 'focusout #item_to_add': function(e,t){
    Session.set('list_adding',false);
  },
 'click .delete_item': function(e,t){
   removeItem(Session.get('current_list'),e.target.id);
 },
 'click .lendee' : function(e,t){
   Session.set('lendee_input',this.Name);
   Meteor.flush();
   focusText(t.find("#edit_lendee"),this.LentTo);
 },
 'focusout #edit_lendee': function(e,t){
    Session.set('lendee_input',null);
 },
 'keyup #edit_lendee': function (e,t){
  if (e.which === 13) {
    updateLendee(Session.get('current_list'),this.Name, e.target.value);
    Session.set('lendee_input',null);
  }
  if (e.which === 27) {
    Session.set('lendee_input',null);
    }
  }
 });

