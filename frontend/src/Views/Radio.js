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
import usePrincings from '../state/princing/hooks/usePrincings';
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


const Radio = ({setIsPay, setNBQ, setPrixQ, prixQ, setPerdre, setGains, setPrincingId}) => {
    const [wallet, isLoading, setWallets] = useWallets();
    const [click, setClick] = useState(false)
    const [princing, isLoading1, setPrincings] = usePrincings();
    const { addToast } = useToasts()
    const [modalStyle] = useState(getModalStyle);

    useEffect(() => {
      if (!wallet.details || wallet.details.length === 0) {
        setWallets();
      }
    }, [wallet, setWallets]);

    useEffect(() => {
      if (!princing.list || princing.list.length === 0) {
        setPrincings();
      }
    }, [princing, setPrincings]);
    const cost = wallet?.details?.montant

    const quizPay = (prix) => {
        if (wallet?.details) {
            if (cost >= prix) {
              request.postPayQ(prix)
              .then((res) => {
                  setIsPay(true)
                  setWallets()
                  setClick(true)
              })
              .catch(err => {
                setClick(false)
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

    const handlepay = (nb, prix, prd, gains, pId) => {
      if (!click) {
        setClick(true)
        setNBQ(nb)
        setPrixQ(prix)
        setPerdre(prd)
        setGains(gains)
        setPrincingId(pId)
        setTimeout(() => { 
          setWallets() 
          quizPay(prix)
        }, 5000);
      }
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
        {princing?.list?.map((item) =>
          <div className="badge-item-stat" key={item.id}> 
            <p className="text-sticker">
            <svg className="text-sticker-icon icon-plus-small">
              <use xlinkHref="#svg-plus-small"></use>
            </svg>
            {item.gains} HTG
          </p>
            <img className="badge-item-stat-image" src="https://quizapay.com/static/assets/img/quest/openq-b.png" alt="Questionaires"/>
        
            <p className="badge-item-stat-title">{item.nombres_questions} Questions</p>
        
            <p className="badge-item-stat-text">Vous ne devez pas raté {item.perdre} {item.perdre > 1?'questions':'question'}, ou vous perdez !</p>
        
              <div style={{paddingTop: 20}}>
                <p onClick={()=>handlepay(item.nombres_questions, item.prix, item.perdre, item.gains, item.id)} className="button secondary full">
                  <svg className="button-icon icon-small-arrow" style={{margin: 5}}>
                    <use xlinkHref="#svg-small-arrow"></use>
                  </svg>
                  Payer {item.prix} Gourdes
                </p>
              </div>
          </div>
        )}
    
    
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