Router.map( function () {
  this.route( 'login',  
            { 
              path : '/login',  
              layoutTemplate: 'loginLayout',
              yieldTemplate : 'login',
              data : { 
                appName : "Fady", 
                welcomeMessage  : "Welcome to the most awesome app ever seen." 
              }
            }
    );

  this.route( 'registration',  
            { 
              path : '/registration',  
              layoutTemplate: 'loginLayout',
              yieldTemplate:'registration',
              data : {}
            }
    );

  this.route( 'resetPassword',  
            { 
              path : '/resetPassword',  
              layoutTemplate: 'loginLayout',
              yieldTemplate : 'resetPassword',
              data : {}
            }
    );
  this.route('library');
});

var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('login');
    pause();
  }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['login', 'registration', 'resetPassword']});

