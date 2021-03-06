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

  this.route( 'logout', 
            {
              path : '/logout', 
              onBeforeAction : function(pause){
                  Meteor.logout();
                  Router.go('/login');
                  pause(); 
              }
            }
   );
  // this should be removed from here 
  this.route('library');
  // 
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

Router.onBeforeAction(goToDashboard, {only:['login'] });
Router.onBeforeAction(mustBeSignedIn, {except: ['login', 'registration', 'resetPassword']});


