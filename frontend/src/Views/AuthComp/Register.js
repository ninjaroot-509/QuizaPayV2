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

const RegisterView = ({login}) => {

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [focused, setFocused] = useState(false)
    const [focused1, setFocused1] = useState(false)
    const [load, setLoad] = useState(false)
    const [radio, setRadio] = useState(false)
    const { addToast } = useToasts()

    const handleRegisterSubmit = (ev) => {
        ev.preventDefault()
        if (phone === "" || password === "" || password2 === "") alert("Remplissez tous les champs!")
        else if (password !== password2) alert("Les mots de passe ne correspondent pas!")
        else {
            setLoad(true)
            request.postRegister('+'+phone, password)
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
        if (ev.target.name === 'phone') setPhone(ev.target.value)
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
            <img className="form-box-decoration" src="http://localhost:3000/static/assets/img/landing/rocket.png" alt="rocket"/>

            <h2 className="form-box-title">S'enregistrer!</h2>
        
            <form className="form" onSubmit={handleRegisterSubmit}>
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
                <div className={`form-input ${focused == true? 'active' : password !== '' ? 'active' : ''}`}>
                    <label htmlor="register-password">Mot de passe</label>
                    <input type="password" id="register-password" name="password" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={handleInputChange} value={password}/>
                </div>
                </div>
            </div>
        
            <div className="form-row">
                <div className="form-item">
                <div className={`form-input ${focused1 == true? 'active' : password2 !== '' ? 'active' : ''}`}>
                    <label htmlor="register-password-repeat">Comfirmer le mot de passe</label>
                    <input type="password" id="register-password-repeat" name="password2" onFocus={() => setFocused1(true)} onBlur={() => setFocused1(false)} onChange={handleInputChange} value={password2}/>
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
                    <label htmlor="register-conditions">Je suis d'accord <Link to="/terms-conditions">Termes & Conditions</Link></label>
                </div>
                </div>
            </div>
        
            <div className="form-row">
                <div className="form-item">
                {radio === true?
                        <button type="submit" disabled={load} className="button medium primary">S'inscrire</button>
                    :
                        <button type="button" style={{backgroundColor: '#cacaca'}} className="button medium primary">S'inscrire</button>
                }
                </div>
            </div>
            </form>
        
            {/* <p className="form-text">You'll receive a confirmation sms in your inbox with a link to activate your account. If you have any problems, <a href="#">contact us</a>!</p> */}
        </div>
    )
}
export default RegisterView