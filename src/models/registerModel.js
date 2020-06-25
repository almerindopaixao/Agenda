const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const RegisterSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
    
});

const RegisterModel = mongoose.model('users', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async registered() {
        this.validate()
        if (this.errors.length > 0) return;

        await this.userExists()

        if(this.errors.length > 0) return

        // Hash da senha
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        try {
            this.user = await RegisterModel.create(this.body)
        } catch(e) {
            console.error(e)
        }
        
    }

    async userExists() {
        const user = await RegisterModel.findOne({email: this.body.email});
        if (user) this.errors.push('Usuário já existe')
    }

    validate() {
        /**
         * Validação
         * O e-mail precisa sere válido
         * A senha precisa ter entre 3 e 50 caractére
         */

        this.cleanUp()

        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail Inválido')

        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caractéres')
        }


    }

    cleanUp() {
        for(let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    
    }
}

module.exports = Register;