/*
 * The page is open in the login tab
 */
Session.set("tab", "signIn");

console.log("I am login.js");
/*
 * This function controls when the login tab is shwon 
 */
Template.login.isLoginSelected = function() {
    console.log("isLoginSelected called.");
    return Session.equals("tab", "signIn"); 
};

Template.login.isRegisterSelected = function() {
    console.log("isRegisterSelected called.");
    return Session.equals("tab", "signUp"); 
};

Template.login.isResetPasswordSelected = function() {
    console.log("isResetPassword called.");
    return Session.equals("tab", "resetPassword"); 
};

Template.login.events({
  'click li' : function(event,t){
    var $target = $(event.currentTarget);
    var selectedTab = $target.attr('id');
    console.log("tab selected " + selectedTab);
    if (selectedTab) {
        Session.set('tab', selectedTab); 
        $('.active').removeClass("active");
        $target.children('a').addClass("active");
    }
    // update view 
    Meteor.flush();
  } 
});
