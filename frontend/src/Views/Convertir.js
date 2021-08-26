import React, { useState, useEffect, useRef } from 'react'
import Options from './Options'
import request from '../Components/Common/HttpRequests'
import { getUser, getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios'
import InputRange from 'react-input-range';
import { useToasts } from 'react-toast-notifications';

const Convertir = () => {
    const token = getToken()
    const [temp, setTemp] = useState(0)
    const [wallet, setWallet] = useState([])
    const [Pcoin, setPCoin] = useState([])
    
    const [coin, setCoin] = useState(1)
    const Pmontant = wallet.montant
    const { addToast } = useToasts()
    const [loading, setLoading] = useState(false)

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
        }, 9000)
    }, [])

    useEffect(()=>{
        getwallet()
        getcoin()
    }, [temp])

    const getwallet = () => {
        if (getUser()) {
            request.getWallet().then(res => setWallet(res))
        }
    }

    const getcoin = () => {
        if (getUser()) {
            request.getCoin().then(res => setPCoin(res.coins))
        }
    }

    const total = 25 * coin

    const handleSubmitClick = (ev) => {
        ev.preventDefault()

        let formData = new FormData()
        formData.append('coin', coin)
        const config = { headers: { 'Content-Type': 'application/json' } }
        if (token) config.headers['Authorization'] = `Bearer ${token}`
        if (coin !== undefined) {
            if (Pmontant >= total) {
                setLoading(true)
                axios.post(`https://quizapay.com/api/wallet/`, formData, config)
                .then(res => {
                    setLoading(false)
                    addToast("Votre demande a ete effectuez avec succes!", {appearance: 'success', autoDismiss: true})
                })
                .catch(err => {
                    setLoading(false)
                    addToast("Oupps une erreur s'est produite! " + err, {appearance: 'error', autoDismiss: true})
                })
            } else{
                addToast("Votre solde est insuffisante", {appearance: 'error', autoDismiss: true})
            }
        } else {
            addToast("vous devrier choisir la quantité de Coin que vous souhaitez convertir, Merci!", {appearance: 'error', autoDismiss: true})
        }
    }
    return (
        <section className="absolute">
            <div className="rounded-lg d-block d-sm-flex">
                <Options conv={true}/>
                <div className="tab-content p-4 p-md-5">
                    <div className="tab-pane fade show active">
                        <h3 className="mb-4">Acheter plus coins</h3>
                        <h3 className="mb-4">vous avez {Math.round(Pcoin)} coin{Pcoin > 1? 's' : ''} </h3>
                        <p className="alert alert-warning">
                            Faites glisser votre doigt pour sélectionner la quantité de Coin que vous souhaitez acheter!<br />
                            <b>N.B: 25 Gourdes pour 1 coin,</b> <b style={{color: 'green'}}>Ex: {coin} = {total} gourdes</b>
                        </p>
                        <hr/>
                        <div className="row" ref={scroolsec}>
                            <div className="col-md-12">
                                <InputRange
                                    maxValue={20}
                                    minValue={1}
                                    value={Math.round(coin)}
                                    onChange={value => setCoin(value)} />
                            </div>
                        </div>
                        <br/>
                        <div>
                            <button onClick={handleSubmitClick} disabled={loading} className="btn btn-primary btn-lg btn-block">sauvegarder</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Convertir