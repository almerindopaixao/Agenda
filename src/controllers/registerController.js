const Register = require('../models/registerModel');

exports.index = (req, res) => {
    res.render('cadastro')
}

exports.register = async (req, res) => {
    try {
        const register = new Register(req.body);
        await register.registered()

        if (register.errors.length > 0) {
            req.flash('errors', register.errors)
            req.session.save(function () {
                return res.redirect('back')
            });
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso')
        req.session.save(function () {
            return res.redirect('back')
        });
        
    } catch (e) {
        console.error(e)
        return res.render('404')
    }
}