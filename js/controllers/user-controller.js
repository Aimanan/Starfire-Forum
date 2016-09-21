import 'jquery'
import {templateGenerator} from 'template-generator'
import {notifier} from 'notifier'
import {userData} from 'js/data.js'

const mainContainer = $('#wrapper');
class UserController {
    register(context) {
        // var newUser = {
        //     username: 'pencho',
        //     password: 'pencho',
        // };

        templateGenerator.load('register')
            .then(function (htmlContent) {
                mainContainer.html(htmlContent);
            })
            .then(function () {
                $('#btn-register').on('click', function () {
                    var username = $('#user-name').val(),
                        password = $('#input-password').val();

                    let newUser = {username, password};

                    userData.register(newUser)
                        .then(function (user) {
                            notifier.success(`${user.username} successfully registered!`);
                        });
                });
            })
    }

    login(context) {
        templateGenerator.load('login')
            .then(function (htmlContent) {
                mainContainer.html(htmlContent);
            })
            .then(function () {
                $('#btn-login').on('click', function () {
                    var username = $('#user-name').val(),
                        password = $('#input-password').val();
                    let user = {
                        username,
                        password
                    };
                    userData.login(user)
                        .then(function (success) {
                            localStorage.setItem('username', success.username);
                            localStorage.setItem('userId', success._id);
                            localStorage.setItem('authKey', success._kmd.authtoken);
                        })
                        .then(function () {
                            notifier.success(`${user.username} logged in!`);
                            context.redirect(`#/`);
                        })
                        .catch(function (err) {
                            notifier.error(`${err} occured`);
                        });
                })
            })


    }

    logout(context) {
        userData.logout();
    }
}


const userController = new UserController();
export {userController}