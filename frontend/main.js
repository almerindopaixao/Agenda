import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login'

console.log('front-end pegando')
const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
login.init()
cadastro.init()