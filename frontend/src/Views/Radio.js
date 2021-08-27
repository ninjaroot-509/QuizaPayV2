import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import request from '../Components/Common/HttpRequests'
import randomstring from 'randomstring';
// modal section
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// endmodal section
import { useToasts } from 'react-toast-notifications';
import axios from 'axios'
import { getUser, getToken, removeUserSession } from '../Components/Common/Auth/Sessions'
import useWallets from '../state/wallet/hooks/useWallets';
import Loading from '../Components/Common/Loading';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
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


const Radio = ({setIsPay, setNBQ, setPrixQ}) => {
    const [wallet, isLoading, setWallets] = useWallets();
    const { addToast } = useToasts()
    const [prix, setPrix] = useState(35)
    const [modalStyle] = useState(getModalStyle);

    useEffect(() => {
      if (!wallet.details || wallet.details.length === 0) {
        setWallets();
      }
    }, [wallet, setWallets]);

    const quizPay = () => {
        if (wallet?.details) {
            if (wallet?.details?.montant >= prix) {
              request.postPayQ(prix)
              .then((res) => {
                  setIsPay(true)
                  setWallets()
              })
              .catch(err => {
                if (err.response.status === 401) {
                  removeUserSession()
                  window.location.reload()
              }
                console.log('err.response.data', err.response.data)
              })
            } else {
                insuffisanceSolde()
            }
        }
    }
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const pay35 = () => {
      setNBQ(5)
      setPrix(35) 
      setPrixQ(35)
      quizPay()
    }

    const pay50 = () => {
      setNBQ(7)
      setPrix(50) 
      setPrixQ(50)
      quizPay()
    }

    const pay75 = () => {
      setNBQ(10)
      setPrix(75) 
      setPrixQ(75)
      quizPay()
    }

    const insuffisanceSolde = () => {
      handleOpen()
        addToast("Vous n'avez pas assez d'argent pour jouer au quiz, veuillez recharger pour continuer!!", {appearance: 'error', autoDismiss: true})
    }

    const body = (
      <div style={modalStyle} className={classes.paper}>
        <div className="badge-item-stat"> 
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img style={{maxWidth: 150}} src={process.env.PUBLIC_URL + '/static/assets/img/icons/sad.png' }  alt="sad" />
        </div>
        <p className="badge-item-stat-title">Solde insuffisant</p>
        <p className="badge-item-stat-text">
          Vous n'avez pas assez d'argent pour jouer au quiz.
        </p>
        <div style={{paddingTop: 10}}>
          <Link to="/depot/moncash" className="button primary full">
            Recharger mon compte
          </Link>
        </div>
        </div>
      </div>
    );

    if (!isLoading) {
      return (
        <div className="content-grid">
    
        <div className="grid grid-3-3-3-3 top-space centered" style={{marginTop: -15}}>
  
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
    
          <div className="badge-item-stat"> 
            <p className="text-sticker">
            <svg className="text-sticker-icon icon-minus-small">
              <use xlinkHref="#svg-minus-small"></use>
            </svg>
            35 HTG
          </p>
            <img className="badge-item-stat-image" src="https://odindesignthemes.com/vikinger/img/quest/openq-b.png" alt="Questionaires"/>
        
            <p className="badge-item-stat-title">5 Questions</p>
        
            <p className="badge-item-stat-text">Si vous voulez avoir 5 questions à répondre!</p>
        
              <div style={{paddingTop: 20}}>
                <p onClick={pay35} className="button secondary full">
                  <svg className="button-icon icon-small-arrow" style={{margin: 5}}>
                    <use xlinkHref="#svg-small-arrow"></use>
                  </svg>
                  Payer 35 Gourdes
                </p>
              </div>
          </div>
    
          <div className="badge-item-stat"> 
            <p className="text-sticker">
            <svg className="text-sticker-icon icon-minus-small">
              <use xlinkHref="#svg-minus-small"></use>
            </svg>
            50 HTG
          </p>
            <img className="badge-item-stat-image" src="https://odindesignthemes.com/vikinger/img/quest/openq-b.png" alt="Questionaires"/>
        
            <p className="badge-item-stat-title">7 Questions</p>
        
            <p className="badge-item-stat-text">Si vous voulez avoir 7 questions à répondre!</p>
        
              <div style={{paddingTop: 20}}>
                <p onClick={pay50} className="button secondary full">
                  <svg className="button-icon icon-small-arrow" style={{margin: 5}}>
                    <use xlinkHref="#svg-small-arrow"></use>
                  </svg>
                  Payer 50 Gourdes
                </p>
              </div>
          </div>
    
          <div className="badge-item-stat"> 
            <p className="text-sticker">
            <svg className="text-sticker-icon icon-minus-small">
              <use xlinkHref="#svg-minus-small"></use>
            </svg>
            75 HTG
          </p>
            <img className="badge-item-stat-image" src="https://odindesignthemes.com/vikinger/img/quest/completedq-b.png" alt="Questionaires"/>
        
            <p className="badge-item-stat-title">10 Questions</p>
        
            <p className="badge-item-stat-text">Si vous voulez avoir 10 questions à répondre!</p>
        
              <div style={{paddingTop: 20}}>
                <p onClick={pay75} className="button secondary full">
                  <svg className="button-icon icon-small-arrow" style={{margin: 5}}>
                    <use xlinkHref="#svg-small-arrow"></use>
                  </svg>
                  Payer 75 Gourdes
                </p>
              </div>
          </div>
    
    
        </div>
      </div>
      )
    } else {
      return (
        <Loading />
      )
    }
}
export default Radio