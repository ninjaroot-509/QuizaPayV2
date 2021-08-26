import React from 'react'
import { Link } from 'react-router-dom'
import { getUser, removeUserSession } from '../Components/Common/Auth/Sessions'

const Options = ({photo, executeScroll, prof, ret, depo, conv}) => {
    const user = getUser()
    const photoUrl = user.photo
    const photoView = photo? URL.createObjectURL(photo) : photoUrl

    return (
        <div className="profile-tab-nav border-right">
            <div className="p-4">
                <div className="img-circle flex justify-center mb-3">
                    <img src={photoView} alt={user.username} className="shadow" />
                </div>
                <h4 className="text-center">{user.username}</h4>
            </div>
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <Link to="/mon-profile" onClick={executeScroll} className={"nav-link " + (prof? 'active' : '')}>
                    <i className="fa fa-home text-center mr-1"></i> Compte
                </Link>
                <Link to={`/spin`} onClick={executeScroll} className="nav-link">
                    <i className="fa fa-dollar-sign text-center mr-1"></i> Jouer au roue de prix
                </Link>
                <Link to="#" onClick={executeScroll} className="nav-link">
                    <i className="fa fa-key text-center mr-1"></i> Changer de mot de passe
                </Link>
                <Link to={`/depot/moncash/`} onClick={executeScroll} className={"nav-link " + (depo? 'active' : '')}>
                    <i className="fa fa-dollar-sign text-center mr-1"></i> Recharger mon compte
                </Link>
                <Link to={`/plus-coins`} onClick={executeScroll} className={"nav-link " + (conv? 'active' : '')}>
                    <i className="fa fa-dollar-sign text-center mr-1"></i> Acheter plus coins
                </Link>
                <Link to={`/retrait/moncash/`} onClick={executeScroll} className={"nav-link " + (ret? 'active' : '')}>
                    <i className="fa fa-dollar-sign text-center mr-1"></i> Faire un retrait
                </Link>
                <Link to='/' className="nav-link"
                    onClick={() => {
                        removeUserSession()
                        window.location.reload() 
                    }}>
                    <i className="fa fa-sign-out text-center mr-1"></i> Deconnecter
                </Link>
            </div>
        </div>
    )
}

export default Options