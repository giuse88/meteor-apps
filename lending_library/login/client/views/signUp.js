Template.registration.events({

    'submit #registration-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
     var email = t.find('#email').value
        , password = t.find('#password').value;

       console.log("email : " + email);
       console.log("password : " + password);
        
        // Trim and validate the input
      Accounts.createUser({username: email, password : password}, function(err){
          if (err) {
            // Inform the user that account creation failed
            console.log("error " + err);
            console.log("Registration failed");
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
            Router.go('library');
            console.log("Registration success");
          }
        });
      return false;
    }
  });
