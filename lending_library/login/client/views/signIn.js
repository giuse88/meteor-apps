Template.signIn.events({

    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var userName = t.find('#login-email').value
        , password = t.find('#login-password').value;

        // Trim and validate your fields here.... 
        console.log(userName);
        console.log(password);
        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(userName, password, function(err){
        if (err) { 
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
          console.log("Error when loggin ");
          console.log(err.reason);
        } else {
          // The user has been logged in.
          console.log("user logged in");
        }
      });
         return false; 
      }
 });
