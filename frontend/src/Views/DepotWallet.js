import React, { useState, useEffect, useRef } from 'react'
import Options from './Options'
import request from '../Components/Common/HttpRequests'
import { getUser, getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications';
import IDTD from './IDTD'
import Loading from '../Components/Common/Loading'
import useWallets from '../state/wallet/hooks/useWallets';
// modal section
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// endmodal section
import {CopyToClipboard} from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 18,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center'
    },
  }));
  
  function getModalStyle() {
    const top = 54;
    const left = 54;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  

const DepotWallet = () => {
    const user = getUser()
    const token = getToken()
    // const userId = user.id

    const [wallet, isLoading, setWallets] = useWallets();
    const [load, setLoad] = useState(false)
    const [copy, setCopy] = useState(false)
    const [choice, setChoice] = useState('')
    const [montant, setMontant] = useState('')
    const [pin, setPin] = useState('')
    const [idtrans, setIdtrans] = useState('')
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const moncashQuizaPay = 47929400
    const copyLegnht = '*202*32*760*' + '' + montant + '' + '*' + '' + moncashQuizaPay + '' + '*' + '' + pin + '' + '#'

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <div className="badge-item-stat"> 
          <h4>Entrer ceci!</h4>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10}}>
            <p className="alert alert-info">
                <span style={{color: 'blue'}}>*202*32*760*<span style={{color: '#ff8612'}}>{montant}</span>*{moncashQuizaPay}*<span style={{color: '#ff8612'}}>{pin.substring(0, 1)}***</span>#</span>
            </p> 
            </div>
            <div style={{alignItems: 'center', display: 'grid'}}>
                <CopyToClipboard text={copyLegnht}
                onCopy={() => setCopy(true)}>
                    <div className="button secondary full">
                        Copier
                    </div>
                </CopyToClipboard>  
                <div style={{paddingTop: 10}}>
                    <a href={`tel:*202*32*760*${montant}*${moncashQuizaPay}*${pin}%23`} className="button primary full">
                        Dans mon telephone
                    </a>
                </div>
            </div>
          </div>
        </div>
      );
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
    
    useEffect(() => {
        if (!wallet.details || wallet.details.length === 0) {
          setWallets();
        }
      }, [wallet, setWallets]);

    const handleInputChange = (ev) => {
        if (ev.target.name === 'idTransaction') setIdtrans(ev.target.value)
        else if (ev.target.name === 'montant') setMontant(ev.target.value)
        else if (ev.target.name === 'pin') setPin(ev.target.value)
    }
    const handleSubmitClick = (ev) => {
        if (montant && pin) {
            if (montant >= 5) {
                handleOpen()
            } else {
                alert("desole!, vous pouvez deposer 5 HTG et plus!")
            }
        } else {
            alert("il faut mettre le montant que vous voulez deposer et votre code moncash, Merci!")
        }
        
    }

    const handleSubmitClick1 = (ev) => {
        ev.preventDefault()
        if (idtrans !== '') {
            if (idtrans >= 1000) {
                setLoad(true)
                request.postDepotDone(idtrans).then(res => {
                    setLoad(false)
                    setTimeout(() => { 
                        setWallets() 
                    }, 500);
                })
                .catch(err => {
                    setLoad(false)
                    alert("Oupps une erreur s'est produite! " + err)
                })
            } else {
                alert("il faut mettre un id valide! ")
            }
        } else {
            alert("il faut mettre l'id transaction! ")
        }
        
    }

    const handleTry = () => {
        setTimeout(() => { 
            request.postTry(user.id)
            setWallets() 
        }, 500);
    }

    const btn = () => {
        setChoice('recharge')
    }
    
    const btn1 = () => {
        setChoice('transac')
    }
    
    if (wallet?.details?.recharge_effec === false) {
        return <IDTD handleDone={handleTry} />
    } else if (wallet?.details?.recharge_effec === true) {
        return (
            <div style={{paddingTop: 150}}>
            <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {body}
            </Modal>
            {choice != ''?
                            choice === 'transac'?
                            <div className="form-box">

                                        <h3 className="form-box-title">Finaliser une recharge</h3>
                                        <form className="form" style={{marginTop: 20, marginBottom: 15}}>
                                            <div className="form-row">
                                                <div className="form-item">
                                                <div className="form-input">
                                                    <input style={{height: 54,padding: '0 18px', backgroundColor: '#fff', border: '1px solid #dedeea', transition: 'border-color .2s ease-in-out', width: '100%', borderRadius: 12, fontSize: 14}} type="number" name="idTransaction" onChange={handleInputChange} value={idtrans} placeholder="N.B: l'Id se trouve dans le SMS" />
                                                </div>
                                                </div>
                                            </div>
                                        </form>
        
                                <div>
                                    <button onClick={handleSubmitClick1} disabled={load} className="button secondary full">Terminer</button>
                                </div>
                            </div>
                            :
                                <div className="form-box">

                                        <h3 className="form-box-title">Recharger mon compte</h3>
                                        <form className="form" style={{marginTop: 20, marginBottom: 15}}>
                                            <div className="form-row">
                                                <div className="form-item">
                                                <div className="form-input">
                                                    <input style={{height: 54,padding: '0 18px', backgroundColor: '#fff', border: '1px solid #dedeea', transition: 'border-color .2s ease-in-out', width: '100%', borderRadius: 12, fontSize: 14}} type="number" name="montant" onChange={handleInputChange} value={montant} placeholder="EX: 50 pour 50HTG" />
                                                </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-item">
                                                <div className="form-input">
                                                    <input type="password" name="pin" onChange={handleInputChange} value={pin} placeholder="Votre code moncash" />
                                                </div>
                                                </div>
                                            </div>
                                        </form>
        
                                <div>
                                    <button onClick={handleSubmitClick} disabled={load} className="button secondary full">Continuer</button>
                                </div>
                            </div>
                    :
               <div>
                   <h3 className="text-center">Choisissez pour continuer</h3>

                   <div className="grid text-center" style={{justifyContent: 'space-between',display: 'flex', padding: '40px 0px'}}>
                       <div onClick={btn} style={{padding: 20, background: 'white', boxShadow: '3px 5px 20px 0 rgb(94 92 154 / 6%)', borderRadius: 30}}>
                           <div>
                           <img src="https://quizapay.com/static/assets/img/moncash.png" style={{width: 100, height: 60}}/>
                           </div>
                           <div>
                           <span style={{fontFamily: 'fantasy'}}>Effectuer une recharge</span>
                           </div>
                       </div>
                       <div onClick={btn1} style={{padding: 20, background: 'white', boxShadow: '3px 5px 20px 0 rgb(94 92 154 / 6%)', borderRadius: 30}}>
                       <div>
                           <img src="https://quizapay.com/static/assets/img/finalize.jpg" style={{width: 100, height: 60}}/>
                           </div>
                           <div>
                           <span style={{fontFamily: 'fantasy'}}>Finaliser une recharger</span>
                           </div>
                       </div>
                   </div>

               </div>
            }
        </div>
        </div>
        )
    } else {
        return <Loading /> 
    }
}

export default DepotWallet

