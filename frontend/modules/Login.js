import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
        this.referencia = document.querySelector('.lead')
    }

    init() {
        this.events()
    }

    events() {
        if (!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e)
        })
    }

    verificaSmall() {
        const smalls = this.form.querySelectorAll('small[class="form-text text-danger"]');
        if (smalls.length > 0) {
            for(let small of smalls) {
                small.remove()
            }
        }
    }

    msg(msg, elemento) {
        const small = document.createElement('small');
        small.setAttribute('class', 'form-text text-danger')
        small.innerHTML = msg 
        elemento.insertAdjacentElement('afterend', small)
    }

    validate(e) {
        const elemento = e.target;
        const emailInput = elemento.querySelector('input[name="email"]');
        const passwInput = elemento.querySelector('input[name="password"]');
        let error = false;

        this.verificaSmall()

        if (!validator.isEmail(emailInput.value)) {
           this.msg('Email Inválido', emailInput)
           error = true
        }

        if(passwInput.value.length < 3 || passwInput.value.length > 50) {
            this.msg('Senha precia ter entre 3 e 50 caracteres', passwInput)
            error = true
        }

        if (!error) elemento.submit();
    }
}