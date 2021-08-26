import React, { useState, useRef, useEffect } from 'react'
import { getUser, getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications';
import Options from './Options'
// TODO: Modifier les requêtes créées précédemment

const UserPage = () => {
    const user = getUser()
    const token = getToken()
    const [photo, setPhoto] = useState()
    
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [first_name, setFirstName] = useState()
    const [last_name, setLastName] = useState()
    const [phone, setPhone] = useState()
    const [bio, setBio] = useState()
    const { addToast } = useToasts()
    
    const [action, setAction] = useState(true)
    const scroolsec = useRef(null)

    const executeScroll = () => {
        scroolsec.current.scrollIntoView()
    }

    useEffect(() => {
        if (action) {
            executeScroll()
            setAction(false)
        }
    })

    const handleChange = (ev) => {
        if (ev.target.name === 'username') setUsername(ev.target.value)
        else if (ev.target.name === 'email') setEmail(ev.target.value)
        else if (ev.target.name === 'first_name') setFirstName(ev.target.value)
        else if (ev.target.name === 'last_name') setLastName(ev.target.value)
        else if (ev.target.name === 'bio') setBio(ev.target.value)
        else if (ev.target.name === 'phone') setPhone(ev.target.value)
        else if (ev.target.name === 'photo') setPhoto(ev.target.files[0])
    }
    const notify = () => {
        addToast("Votre user a ete mise a jour!", {appearance: 'success', autoDismiss: true})
    }
    const handleSubmitClick = (ev) => {
        ev.preventDefault()
        
        let formData = new FormData()
        if (username) {
            formData.append('username', username)
        }
        if (first_name) {
            formData.append('first_name', first_name)
        }
        if (last_name) {
            formData.append('last_name', last_name)
        }
        if (email) {
            formData.append('email', email)
        }
        if (phone) {
            formData.append('phone', phone)
        }
        if (bio) {
            formData.append('bio', bio)
        }
        if (photo) {
            formData.append('photo', photo)
        }
        const config = { headers: { 'Content-Type': 'application/json' } }
        if (token) config.headers['Authorization'] = `Token ${token}`
        axios.post(`https://quizapay.com/api/user/`, formData, config)
        .then(res => {
            notify()
            const userE={
                "id": user.id,
                "username": `${username? username : user.username }`,
                "first_name": `${first_name? first_name : user.first_name}`,
                "last_name": `${last_name? last_name : user.last_name}`,
                "email": `${email? email : user.email }`,
                "bio": `${bio? bio : user.bio }`,
                "phone": `${phone? phone : user.phone }`,
                "photo": user.photo,
                "password": user.password,
                "last_login": user.last_login,
                "is_superuser": user.is_superuser,
                "is_staff": user.is_staff,
                "is_active": user.is_active,
                "date_joined": user.date_joined,
                "groups":[],
                "user_permissions":[]
            }
            window.localStorage.setItem('user', JSON.stringify(userE))
            // setTimeout(() => window.location.reload(), 1000)
        })
        
        .catch(err => {
            addToast("user error! " + err, {appearance: 'error', autoDismiss: true})
        })
        
    }

    return (
        <section className="absolute">
            <div className="rounded-lg d-block d-sm-flex">
                <Options photo={photo} prof={true}/>
                <div className="tab-content p-4 p-md-5" ref={scroolsec}>
                    <div className="tab-pane fade show active">
                        <h3 className="mb-4">Mon user</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Pseudo</label>
                                    <input type="text" onChange={handleChange} name='username' className="form-control" placeholder={user.username} />
                                </div>
                            </div>
                            <hr />
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Nom</label>
                                    <input type="text" onChange={handleChange} name='last_name' className="form-control" placeholder={user.last_name} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Prenom</label>
                                    <input type="text" onChange={handleChange} name='first_name' className="form-control" placeholder={user.first_name} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" onChange={handleChange} name='email' className="form-control" placeholder={user.email} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Numero de telephone</label>
                                    <input type="phone" onChange={handleChange} name='phone' className="form-control" placeholder={user.phone} required/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="custom-file-label" htmlFor="customFileLang">Sélectionner une photo pour changer </label>
                                    <input type="file" onChange={handleChange} name='photo' className="custom-file-input" id="customFileLang" lang="fr"/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Bio</label>
                                    <textarea onChange={handleChange} name='bio' className="form-control" rows="4">{user.bio}</textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={handleSubmitClick} className="btn btn-primary btn-lg btn-block">sauvegarder</button>
                            {/* <button className="btn btn-light">Annuler</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default UserPage

