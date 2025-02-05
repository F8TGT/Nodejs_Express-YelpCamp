const User = require('../models/user');
const router = require("../routes/users");

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    const username = req.user.username;
    req.flash('success', `Welcome back ${username}!`);
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    const username = req.user ? req.user.username : 'Guest'; // Save username before logging out
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', `Goodbye ${username}!`);
        res.redirect('/campgrounds');
    });
}
