import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { setUserSession } from '../Components/Common/Auth/Sessions'
import request from '../Components/Common/HttpRequests'
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import addNotification from 'react-push-notification';

const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [load, setLoad] = useState(false)
    const [radio, setRadio] = useState()
    const { addToast } = useToasts()

    const handleRegisterSubmit = (ev) => {
        ev.preventDefault()
        if (username === "" || password === "" || password2 === "") alert("Remplissez tous les champs!")
        else if (password !== password2) alert("Les mots de passe ne correspondent pas!")
        else {
            setLoad(true)
            request.postRegister(username, password)
            .then(res => {
                setUserSession(res.data.token, res.data.user);       // REG OK   
                addNotification({
                    title: 'Warning',
                    subtitle: 'QuizaPay!',
                    message: "Bienvenue " + res.data.user.username,
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                })
                addToast("Bienvenue " + res.data.user.username, {appearance: 'success', autoDismiss: true})
                window.location.reload()                         // how to redirect paremmin?
            })
            .catch(err => {
                setLoad(false)
                addToast("Erreur!\n" + Object.values(err.response.data).flat(), {appearance: 'error', autoDismiss: true})
            })
        }
    }
    const handleInputChange = (ev) => {

        if (ev.target.name === 'username') setUsername(ev.target.value)
        else if (ev.target.name === 'password') setPassword(ev.target.value)
        else if (ev.target.name === 'password2') setPassword2(ev.target.value)
    }

    const handleChange = () => {
        if (radio === true) {
            setRadio(false)
        } else {
            setRadio(true)
        }
    }
    return (
        <div className="container-login100">
            <div className="wrap-login100 p-t-0 p-b-20">
                <form onSubmit={handleRegisterSubmit} className="login100-form validate-form">
                    <span className="login100-form-title p-b-37">
                        S'enregistrer
                    </span>

                    <div className="wrap-input100 validate-input m-b-20" data-validate="Entrez un nom d'utilisateur">
                        <input className="input100" type="text" name="username" onChange={handleInputChange} value={username} placeholder="Entrez un nom d'utilisateur" />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input m-b-20" data-validate="Entrer le mot de passe">
                        <input className="input100" type="password" name="password" onChange={handleInputChange} value={password} placeholder="Entrer un mot de passe" />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input m-b-25" data-validate="Entrer le mot de passe">
                        <input className="input100" type="password" name="password2" onChange={handleInputChange} value={password2} placeholder="Confirmer le mot de passe" />
                        <span className="focus-input100"></span>
                    </div>

                    <div style={{paddingBottom: 3}} onClick={handleChange}>
                        <input type="checkbox" checked={radio === true} name="terms" id="terms"/>
                        <span style={{margin: 3}}>Je suis d'accord <Link to="/terms-conditions">Termes & Conditions</Link></span>
                    </div>

                    <div className="container-login100-form-btn">
                        {radio === true?
                            <button disabled={load} type="submit" className="login100-form-btn">
                                S'inscrire
                            </button>
                            :
                            <button type="button" style={{backgroundColor: '#cacaca'}} className="login100-form-btn">
                                S'inscrire
                            </button>
                        }
                    </div>

                    <div className="btn-animated text-center p-t-30">
                        Vous êtes déjà membre?
                    </div>
                    <div className="text-center">
                        <Link to="/login" className="txt2 hov1">
                            Connectez-vous
                        </Link>
                    </div>
                </form>


            </div>
        </div>
    )
}
export default Register