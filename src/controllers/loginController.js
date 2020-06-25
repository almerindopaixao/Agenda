const Register = require('../models/registerModel');

exports.index = (req, res) => {
    if (req.session.user) return res.render('login-logado')
    res.render('login')
}

exports.login = async (req, res) => {
    try {
        const register = new Register(req.body);
        await register.login()

        if (register.errors.length > 0) {
            req.flash('errors', register.errors)
            req.session.save(function () {
                return res.redirect('back')
            });
            return;
        }

        req.flash('success', 'Login realizado com sucesso')
        req.session.user = register.user
        req.session.save(function () {
            return res.redirect('back')
        });
        
    } catch (e) {
        console.error(e)
        return res.render('404')
    }
}

exports.logout = function(req, res) {
    req.session.destroy()
    res.redirect('/login')
}