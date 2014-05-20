/*
 * The page is open in the login tab
 */

console.log("I am login.js");


// This should be global
Template.loginLayout.helpers({

  isRouteActive: function (route) {
    var result = Router.current().path ===  ("/"+route) ;
    console.log("IsRouteActive : " + result); 
    return result;
  }

});
