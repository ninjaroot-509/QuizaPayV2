import React, { useState, useEffect, useRef } from 'react'
import Options from './Options'
import request from '../Components/Common/HttpRequests'
import { getUser, getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications';

const RetraitWallet = () => {
    const user = getUser()
    const token = getToken()

    const [wallet, setWallet] = useState([])
    
    const [montant, setMontant] = useState('')
    const [phone, setPhone] = useState('')
    const Pmontant = wallet.montant
    const [temp, setTemp] = useState(0)
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
    
    useEffect(()=>{
        setInterval(()=>{
            setTemp((prevTemp)=>prevTemp+1)
        }, 5000)
    }, [])

    useEffect(()=>{
        getwallet()
    }, [temp])

    const getwallet = () => {
        if (getUser()) {
            request.getWallet().then(res => setWallet(res))
        }
    }
    const [loading, setLoading] = useState(false)

    const handleChange = (ev) => {
        if (ev.target.name === 'montant') setMontant(ev.target.value)
        if (ev.target.name === 'phone') setPhone(ev.target.value)
    }
    
    const handleSubmitClick = (ev) => {
        ev.preventDefault()

        let formData = new FormData()
        formData.append('phone', phone)
        formData.append('montant', montant)
        const config = { headers: { 'Content-Type': 'application/json' } }
        if (token) config.headers['Authorization'] = `Bearer ${token}`
        if (montant !== '' && phone !== '') {
            if (Pmontant >= montant) {
                if (Pmontant >= 100 && montant >= 100) {
                    setLoading(true)
                    axios.post(`https://quizapay.com/api/retrait/`, formData, config)
                    .then(res => {
                        setLoading(false)
                        addToast("Votre demande a ete envoyer avec succes!", {appearance: 'success', autoDismiss: true})
                    })
                    .catch(err => {
                        setLoading(false)
                        addToast("Oupps une erreur s'est produite! " + err, {appearance: 'error', autoDismiss: true})
                    })
                } else{
                    addToast("Vous devez avoir une somme de 100 Gourdes pour effectuer un retrait!", {appearance: 'warning', autoDismiss: true})
                }
            } else {
                addToast("insuffisance capitale!", {appearance: 'error', autoDismiss: true})
            }
        } else {
            addToast("Veuillez remplir tout les champs!", {appearance: 'error', autoDismiss: true})
        }
        
    }
    return (
        <section className="absolute">
            <div className="rounded-lg d-block d-sm-flex">
                <Options ret={true}/>
                <div className="tab-content p-4 p-md-5">
                    <div className="tab-pane fade show active">
                        <h3 className="mb-4">Retrait {user.username} wallet's</h3>
                        <p className="alert alert-warning">
                            Entrer la quantité de Gourdes que vous souhaitez retirer<br />
                            <b>N.B: Le montant minimum doit être de 100 gourdes et plus encore !!
                                <br /> immédiatement que vous avez cliqué sur le bouton ci-dessous vous nous confirmez que vous souhaitez retirer la somme choisie</b> <b style={{color: 'green'}}>Cliquez ici pour avoir plus d'informations!!</b>
                        </p>
                        <div className="row" ref={scroolsec}>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Votre numero moncash</label>
                                    <input type="phone" className="form-control" name='phone' onChange={handleChange} placeholder="EX: 47929400"/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Montant</label>
                                    <input type="number" className="form-control" name='montant' onChange={handleChange} placeholder="EX: 1000"/>
                                </div>
                            </div>
                            {/* <div className="col-md-12">
                                <div className="alert alert-danger">ce processus est maintenant hors service</div>
                            </div> */}
                        </div>

                        <div>
                            <button onClick={handleSubmitClick} disabled={loading} className="btn btn-primary btn-lg btn-block">Continuer</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RetraitWallet