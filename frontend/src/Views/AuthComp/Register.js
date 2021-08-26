import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { setUserSession } from '../../Components/Common/Auth/Sessions'
import request from '../../Components/Common/HttpRequests'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications';
import addNotification from 'react-push-notification';

const RegisterView = ({login}) => {

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
        <div className="form-box login-register-form-element" style={{display: login == true ? 'none' : 'block'}}>
            <img className="form-box-decoration" src="https://odindesignthemes.com/vikinger/img/landing/rocket.png" alt="rocket"/>

            <h2 className="form-box-title">Create your Account!</h2>
        
            <form className="form">
            <div className="form-row">
                <div className="form-item">
                <div className="form-input">
                    <label htmlor="register-email">Your Email</label>
                    <input type="text" id="register-email" name="register_email"/>
                </div>
                </div>
            </div>
        
            <div className="form-row">
                <div className="form-item">
                <div className="form-input">
                    <label htmlor="register-username">Username</label>
                    <input type="text" id="register-username" name="register_username"/>
                </div>
                </div>
            </div>
        
            <div className="form-row">
                <div className="form-item">
                <div className="form-input">
                    <label htmlor="register-password">Password</label>
                    <input type="password" id="register-password" name="register_password"/>
                </div>
                </div>
            </div>
        
            <div className="form-row">
                <div className="form-item">
                <div className="form-input">
                    <label htmlor="register-password-repeat">Repeat Password</label>
                    <input type="password" id="register-password-repeat" name="register_password_repeat"/>
                </div>
                </div>
            </div>
        
            <div className="form-row">
                <div className="form-item">
                <div className="checkbox-wrap" onClick={handleChange}>
                    <input type="checkbox" checked={radio === true} id="register-newsletter" name="register_newsletter"/>
                    <div className="checkbox-box">
                    <svg className="icon-cross">
                        <use xlinkHref="#svg-cross"></use>
                    </svg>
                    </div>
                    <label htmlor="register-newsletter">Send me news and updates via email</label>
                </div>
                </div>
            </div>
        
            <div className="form-row">
                <div className="form-item">
                <button className="button medium primary">Register Now!</button>
                </div>
            </div>
            </form>
        
            <p className="form-text">You'll receive a confirmation email in your inbox with a link to activate your account. If you have any problems, <a href="#">contact us</a>!</p>
        </div>
    )
}
export default RegisterView