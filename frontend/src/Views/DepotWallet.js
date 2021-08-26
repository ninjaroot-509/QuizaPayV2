import React, { useState, useEffect, useRef } from 'react'
import Options from './Options'
import request from '../Components/Common/HttpRequests'
import { getUser, getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications';
import IDTD from './IDTD'
import Loading from '../Components/Common/Loading'

const DepotWallet = () => {
    const user = getUser()
    const token = getToken()
    // const userId = user.id

    const [wallet, setWallet] = useState([])
    const [load, setLoad] = useState(false)
    const [montant, setMontant] = useState('')
    const [temp, setTemp] = useState(0)
    const { addToast } = useToasts()

    const [action, setAction] = useState(true)
    const scroolsec = useRef(null)

    const executeScroll = () => {
        scroolsec.current.scrollIntoView()
    }

    useEffect(() => {
        if (wallet.length !== 0) {
            if (wallet.recharge_effec === true) {
                if (action) {
                    executeScroll()
                    setAction(false)
                }
            }
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

    const handleChange = (ev) => {
        if (ev.target.name === 'idTransaction') setMontant(ev.target.value)
    }
    const handleSubmitClick = (ev) => {
        ev.preventDefault()

        const config = { headers: { 'Content-Type': 'application/json' } }
        if (token) config.headers['Authorization'] = `Token ${token}`
        if (montant !== undefined) {
            if (montant >= 5000) {
                setLoad(true)
                axios.post(`https://quizapay.com/api/depot/`, JSON.stringify({montant: montant}), config)
                .then(res => {
                    setLoad(false)
                })
                .catch(err => {
                    setLoad(false)
                    addToast("Oupps une erreur s'est produite! " + err, {appearance: 'error', autoDismiss: true})
                })
            } else {
                addToast("il faut mettre un id valide! ", {appearance: 'error', autoDismiss: true})
            }
        } else {
            addToast("il faut mettre l'id transaction! ", {appearance: 'error', autoDismiss: true})
        }
        
    }

    const handleTry = () => {
        request.postTry()
    }

    const moncashQuizaPay = 47929400
    
    if (wallet.recharge_effec === false) {
        return <IDTD handleDone={handleTry} />
    } else if (wallet.recharge_effec === true) {
        return (
            <section className="absolute">
                <div className="rounded-lg d-block d-sm-flex">
                    <Options depo={true}/>
                    <div className="tab-content p-4 p-md-5" ref={scroolsec}>
                        <div className="tab-pane fade show active">
                            <h3 className="mb-4">Recharger {user.username} wallet's</h3>
                            <p className="">
                                Vous trouverez ci-dessous les étapes à suivre afin de <b>recharger votre compte QuizaPay!</b><br />
                                Dans le téléphone où se trouve la SIM moncash, il vous suffit d'entrer le code suivant: <br/>
                                <p className="alert alert-warning btn-animated">
                                    <b style={{color: 'blue'}}>*202*32*760*<b style={{color: '#ff8612'}}>Montant</b>*{moncashQuizaPay}*<b style={{color: '#ff8612'}}>Code secret</b>#</b>
                                </p> 
                                pour effectuer le paiement.<br/>
                                <b>N.B: <b style={{color: 'blue'}}>le numéro <b style={{color: '#ff8612'}}>{moncashQuizaPay}</b> est représenté comme le numéro moncash de QuizaPay</b> afin d'effectuer le paiement. 
                                Vous devez conserver l'identifiant de la transaction<b style={{color: 'blue'}}>(ID Transaction)</b> qui se trouve dans le SMS</b> <b style={{color: 'green'}}><br />
                                Cliquez ici pour plus d'informations!!</b>
                                {/* <b>N.B: immédiatement que vous aurez cliqué sur le bouton ci-dessous la demande vous redirigera sur le sdk moncash pour payer</b> <b style={{color: 'green'}}>Cliquez ici pour plus d'informations!!</b> */}
                            </p>
                            <h3 className="mb-4">finaliser une recharge ici!!!</h3>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>l'identifiant de la transaction<b style={{color: 'blue'}}>(ID Transaction)</b></label>
                                        <input type="number" className="form-control" name='idTransaction' onChange={handleChange} placeholder="N.B: l'Id se trouve dans le SMS"/>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row" ref={scroolsec}>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Montant</label>
                                        <input type="number" className="form-control" name='montant' onChange={handleChange} placeholder="EX: 1000"/>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="row" ref={scroolsec}>
                                <div className="col-md-12">
                                    <div className="alert alert-danger">ce processus est maintenant hors service</div>
                                </div>
                            </div> */}
    
                            <div>
                                <button onClick={handleSubmitClick} disabled={load} className="btn btn-primary1 btn-lg btn-block">Terminer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    } else {
        return <Loading /> 
    }
}

export default DepotWallet

