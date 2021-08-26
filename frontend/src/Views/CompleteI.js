import React, { useState, useEffect } from 'react'
import { Link, Route, Redirect } from 'react-router-dom';
import { setUser, getToken, getUser } from '../Components/Common/Auth/Sessions'
import request from '../Components/Common/HttpRequests'
import { useToasts } from 'react-toast-notifications';
import addNotification from 'react-push-notification';

const CompleteI = () => {

    const [last_name, setLastName] = useState('')
    const [first_name, setFirstName] = useState('')
    const [focused, setFocused] = useState(false)
    const [focused1, setFocused1] = useState(false)
    const [load, setLoad] = useState(false)
    const { addToast } = useToasts()
    
    const handleLoginSubmit = (ev) => {
        ev.preventDefault();

        if (last_name && first_name) {
            setLoad(true)
            request.postInfo(last_name, first_name)
            .then(res => { 
                setUser(res.data);       // LOGIN OK redirect 
                addNotification({
                    title: 'Warning',
                    subtitle: 'QuizaPay!',
                    message: "Bienvenue " + '' + res.data.last_name,
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                })
                addToast("Bienvenue " + '' + res.data.last_name, {appearance: 'success', autoDismiss: true})
                window.location.reload()
                setLoad(false)
                }).catch(err => {
                    setLoad(false)
                    addToast(err, " Une erreur s'est produite, si le probleme persiste merci de nous contacter!.", {appearance: 'error', autoDismiss: true})
                })
        } else {
            addToast("Votre Nom ou Prenom est manquant!", {appearance: 'warning', autoDismiss: true})
        }
    }
    const handleInputChange = (ev) => {
        if (ev.target.name === 'last_name') setLastName(ev.target.value)
        else if (ev.target.name === 'first_name') setFirstName(ev.target.value)
    }
    if (getToken() && getUser().is_complete === false) {
        return ( 
            <div>
            <div className="landing-form">
                <div className="form-box" style={{marginTop: 85}}>
                    <h2 className="form-box-title">Infos personnel</h2>
                
                    <form className="form" onSubmit={handleLoginSubmit}>
                        <div className="form-row">
                            <div className="form-item">
                            <div className={`form-input ${focused == true? 'active' : last_name !== '' ? 'active' : ''}`}>
                                <label htmlFor="login-last_name">Votre Nom</label>
                                <input type="text" name="last_name" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={handleInputChange} value={last_name}/>
                            </div>
                            </div>
                        </div>
                    
                        <div className="form-row">
                            <div className="form-item">
                            <div className={`form-input ${focused1 == true? 'active' : first_name !== '' ? 'active' : ''}`}>
                                <label htmlFor="login-first_name">Votre Prenom</label>
                                <input type="text" name="first_name" onFocus={() => setFocused1(true)} onBlur={() => setFocused1(false)} onChange={handleInputChange} value={first_name} />
                            </div>
                            </div>
                        </div>
                    
                        <div className="form-row">
                            <div className="form-item">
                            <button className="button medium secondary" disabled={load} type="submit">Continuer</button>
                            </div>
                        </div>
                        </form>
                    
                    </div>
            </div>
            </div>
        )
    } else {
        return <Route render = {(props) => <Redirect to={{ pathname: '/' }} />} />;
    }
}
export default CompleteI