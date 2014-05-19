/*
 * Router.configure();

Router.map(function() {
  this.route('index', {path: '/'});
  this.route('library');
});

var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('login');
    pause();
  }
};

var goToDashboard = function(pause) {
  if (Meteor.user()) {
    Router.go('library');
    pause();
  }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['login', 'registration', 'resetPassword']});
Router.onBeforeAction(goToDashboard, {only: ['index']});

*/ 
