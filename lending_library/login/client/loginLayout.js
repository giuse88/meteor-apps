/*
 * The page is open in the login tab
 */

console.log("I am login.js");

Template.loginLayout.events({
  'click a' : function(event,t){
    var $target = $(event.currentTarget);
    var selectedTab = $target.attr('id');
    console.log("tab selected " + selectedTab);
    $target.addClass("active");
    // update view 
    //Meteor.flush();
  } 
});

// This should be global
Template.loginLayout.helpers({
  isRouteActive: function (route) {
    var result = Router.current().path ===  ("/"+route) ;
    console.log("IsRouteActive : " + result); 
    return result;
  }
});
