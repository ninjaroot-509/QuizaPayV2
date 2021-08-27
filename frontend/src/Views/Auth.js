import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Login from './AuthComp/Login'
import Register from './AuthComp/Register'

const Auth = () => {
    const [login, setLogin] = useState(true)

    return (
        <div className="landing">
            <div className="landing-decoration"></div>

            <div className="landing-info">
            <div className="logo">
                <img src="/logo.png" alt="QuizaPay"  style={{width: 'auto', height: 70}}/> 
            </div>

            <h2 className="landing-info-pretitle">Bienvenue à</h2>

            <h1 className="landing-info-title">QuizaPay</h1>

            <p className="landing-info-text">Le réseau social de la prochaine génération et &amp; communauté!Connectez-vous avec vos amis et jouez avec notre système de gamification de quêtes et de badges!</p>

            <div className="tab-switch">
                <p className={`tab-switch-button login-register-form-trigger ${login == true? 'active' : ''}`} onClick={() => setLogin(true)}>Connexion</p>

                <p className={`tab-switch-button login-register-form-trigger ${login == false? 'active' : ''}`} onClick={() => setLogin(false)}>S'inscrire</p>
            </div>
            </div>

            <div className="landing-form">
            <Login login={login}/>
            <Register login={login}/>
            </div>
        </div>
    )
}
export default Auth