if (Meteor.isClient) {

    trimInput = function(value) {
            return value.replace(/^\s*|\s*$/g, '');
    };

    isNotEmpty = function(value) {
            if (value && value !== ''){
                        return true;
                            }
                Session.set('alert', 'Please fill in all required fields.');
                    return false;
    };

    isEmail = function(value) {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (filter.test(value)) {
                            return true;
                                }
                    Session.set('alert', 'Please enter a valid email address.');
                        return false;
    };

    isValidPassword = function(password) {
            if (password.length < 6) {
                        Session.set('alert', 'Your password should be 6 characters or longer.');
                                return false;
                                    }
                return true;
    };

    areValidPasswords = function(password, confirm) {
            if (!isValidPassword(password)) {
                        return false;
                            }
                if (password !== confirm) {
                            Session.set('alert', 'Your two passwords are not equivalent.');
                                    return false;
                                        }
                    return true;
    };

  Template.alert.helpers({
    alert: function() {
        return Session.get('alert');
    }
  });

Template.signUp.events({
    'submit #signUpForm': function(e, t) {
        e.preventDefault();

        var signUpForm = $(e.currentTarget),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase()),
            password = signUpForm.find('#signUpPassword').val(),
            passwordConfirm = signUpForm.find('#signUpPasswordConfirm').val();

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {
            Accounts.createUser({email: email, password: password}, function(err) {
                if (err) {
                    if (err.message === 'Email already exists. [403]') {
                        Session.set('alert', 'We\'re sorry but this email is already used.');
                    } else {
                        Session.set('alert', 'We\'re sorry but something went wrong.');
                    }
                } else {
                    Session.set('alert', 'Congrats! You\'re now a new Meteorite!');
                }
            });
        }
        return false;
    },
    });

Template.signOut.events({
        'click #signOut': function(e, t) {
                    Meteor.logout(function() {
                                    Session.set('alert', 'Bye Meteorite! Come back whenever you want!');
                                            });
                            return false;
                                }
});


Template.signIn.events({
    'submit #signInForm': function(e, t) {
        e.preventDefault();

        var signInForm = $(e.currentTarget),
            email = trimInput(signInForm.find('.email').val().toLowerCase()),
            password = signInForm.find('.password').val();

        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
            Meteor.loginWithPassword(email, password, function(err) {
                if (err) {
                    Session.set('alert', 'We\'re sorry but these credentials are not valid.');
                } else {
                    Sesson.set('alert', 'Welcome back New Meteorite!');
                }
            });
        }
        return false;
    },
});
  

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
