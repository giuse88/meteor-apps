Router.LOGING = 'login';
Router.REGISTRATION = 'registration';
Router.PASSWORD_RESET = 'passwordReset';
Router.LAYOUT = 'loginLayout';

Router.map( function () {
  this.route( 'login',  
            { 
              path : '/login',  
              layoutTemplate: 'loginLayout',
              yieldTemplates :  { 
                login : { to : 'login'} 
                },
              data : { 
                appName : "Squiddy", 
                welcomeMessage  : "Welcome to the most awesome app ever seen." 
              }
            }
    );

  this.route( 'registration',  
            { 
              path : '/registration',  
              layoutTemplate: 'loginLayout',
              yieldTemplates :  { 
                registration : { to : 'registration'} 
                },
              data : {}
            }
    );

  this.route( 'resetPassword',  
            { 
              path : '/resetPassword',  
              layoutTemplate: 'loginLayout',
              yieldTemplates :  { 
                resetPassword : { to : 'resetPassword'} 
                },
              data : {}
            }
    );
});
