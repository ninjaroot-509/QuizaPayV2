import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { setUserSession } from '../../Components/Common/Auth/Sessions'
import request from '../../Components/Common/HttpRequests'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications';
import addNotification from 'react-push-notification';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import fr from 'react-phone-input-2/lang/fr.json'

const LoginView = ({login}) => {

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [focused1, setFocused1] = useState(false)
    const [load, setLoad] = useState(false)
    const { addToast } = useToasts()
    
    const handleLoginSubmit = (ev) => {
        ev.preventDefault();

        if (phone && password) {
            setLoad(true)
            request.postLogin(phone, password)
            .then(res => { 
                setUserSession(res.data.token, res.data.user);       // LOGIN OK redirect 
                addNotification({
                    title: 'Warning',
                    subtitle: 'QuizaPay!',
                    message: "Bienvenue " + '' + res.data.user.first_name,
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                })
                addToast("Bienvenue " + '' + res.data.user.first_name, {appearance: 'success', autoDismiss: true})
                window.location.reload()
                setLoad(false)
                })
                .catch(err => {
                    setLoad(false)
                    addToast("Erreur! Nom d'utilisateur ou mot de passe invalide.", {appearance: 'error', autoDismiss: true})
                })
        } else {
            addToast("Nom d'utilisateur ou mot de passe manquant!", {appearance: 'warning', autoDismiss: true})
        }
    }
    const handleInputChange = (ev) => {
        if (ev.target.name === 'phone') setPhone(ev.target.value)
        else if (ev.target.name === 'password') setPassword(ev.target.value)
    }
    return (
        <div className="form-box login-register-form-element"  style={{display: login == true ? 'block' : 'none' }}>
            <img className="form-box-decoration overflowing" src="https://odindesignthemes.com/vikinger/img/landing/rocket.png" alt="rocket"/>

            <h2 className="form-box-title">Connexion au compte</h2>
        
            <form onSubmit={handleLoginSubmit} className="form">
            <div className="form-row">
                <div className="form-item">
                <div className="form-input">
                    <PhoneInput
                    country={'ht'}
                    localization={fr}
                    preferredCountries={['ht','us','fr']}
                    placeholder="47929400"
                    value={phone}
                    autocompleteSearch={true}
                    onChange={phone => setPhone(phone)}
                    />
                </div>
                </div>
            </div>
        
            <div className="form-row">
                <div className="form-item">
                <div className={`form-input ${focused1 == true? 'active' : password !== '' ? 'active' : ''}`}>
                    <label htmlFor="login-password">Mot de passe</label>
                    <input type="password" id="login-password" name="password" onFocus={() => setFocused1(true)} onBlur={() => setFocused1(false)} onChange={handleInputChange} value={password} />
                </div>
                </div>
            </div>
        
            <div className="form-row space-between">
                <div className="form-item">
                <div className="checkbox-wrap">
                    <input type="checkbox" id="login-remember" name="login_remember" />
                    <div className="checkbox-box">
                    <svg className="icon-cross">
                        <use xlinkHref="#svg-cross"></use>
                    </svg>
                    </div>
                    <label htmlFor="login-remember">Souviens de moi</label>
                </div>
                </div>
        
                <div className="form-item">
                <a className="form-link" href="#">Mot de passe oublié?</a>
                </div>
            </div>
        
            <div className="form-row">
                <div className="form-item">
                <button className="button medium secondary" disabled={load} type="submit">Connectez-vous à votre compte!</button>
                </div>
            </div>
            </form>
        
            <p className="lined-text">Connectez-vous avec votre compte social</p>
        
            <div className="social-links">
            <a className="social-link facebook" href="#">
                <svg className="icon-facebook">
                <use xlinkHref="#svg-facebook"></use>
                </svg>
            </a>
        
            <a className="social-link twitter" href="#">
                <svg className="icon-twitter">
                <use xlinkHref="#svg-twitter"></use>
                </svg>
            </a>
        
            <a className="social-link twitch" href="#">
                <svg className="icon-twitch">
                <use xlinkHref="#svg-twitch"></use>
                </svg>
            </a>
        
            <a className="social-link youtube" href="#">
                <svg className="icon-youtube">
                <use xlinkHref="#svg-youtube"></use>
                </svg>
            </a>
            </div>
        </div>
    )
}
export default LoginView