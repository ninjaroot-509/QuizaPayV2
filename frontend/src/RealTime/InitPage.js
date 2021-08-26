import React, { useState, useEffect } from "react";
import { getUser } from '../Components/Common/Auth/Sessions'
import request from '../Components/Common/HttpRequests';
import Loading from '../Components/Common/Loading'
import BeforeUnloadComponent from 'react-beforeunload-component';
import Roulette from '../Challenge/Roulette'
import PayPage from '../Challenge/PayPage'

export function InitPage({
  gameID,
  numberJoiners,
  submitName,
  startGame,
  emitJoining,
}) {
  const [put, setPut] = useState(false)
  const user = getUser()
  const userID = user.id
  const [temp, setTemp] = useState(0)
  const [RouletteStart, setRouletteStart] = useState(false)
  const [challenge, setChallenge] = useState([])
  const [done, setDone] = useState(null),
  
  [startError, setStartError] = useState({
    err: false,
    msg: "",
  }),
  [nameSubmitted, setNameSubmitted] = useState(false);

    useEffect(()=>{
      setInterval(()=>{
          setTemp((prevTemp)=>prevTemp+1)
      }, 3000)
    }, [])

    useEffect(()=>{
      if (challenge.length !== 0){
        if (challenge.owner === userID){
          if (put === false){
              setPut(true)
              setDone(true)
              handleSubmitName()
          }
        } else {
          if (gameID) {
            if (done === null){
              request.postJoinChallenge(gameID).then((res)=> {
                if (res.pay === true){
                  setDone(true)
                } else {
                  setDone(false)
                }
                // handleSubmitName()
              })
            }
          }
        }
      }
        getrealtime()
    }, [temp])

    const getrealtime = () => {
      request.getStart(gameID).then(res => setChallenge(res))
    }


  const handleSubmitName = () => {
    if (!nameSubmitted) {
      // the player is submitting name for the first time
      emitJoining();
    }
    setNameSubmitted(true);
    submitName(gameID, userID);
    setTimeout(() => {
      request.postPlayersChallenge(gameID)
    }, 3000);
  };
  const handleStartGame1 = () => {
    setRouletteStart(true)
  }

  const handleStartGame = (quizID) => {
    startGame(quizID);
  }

  const handlePay = () => {
    request.postJoinPayChallenge(gameID).then((res)=> {
      handleSubmitName()
      setDone(true)
    })
    .catch((err)=> {
      alert("votre solde est inssufisant!")
    })
  }



  if (gameID) {
    if (RouletteStart === true) {
      return <Roulette gameID={challenge.gameID} handleStartGame={handleStartGame}/>;
    } else {
      if (done === true) {
        return (
          <BeforeUnloadComponent 
            blockRoute={true}
            ignoreBefoureunloadDocument={true}
            alertMessage={"Êtes-vous sûr de vouloir quitter? Les modifications ne seront pas enregistrées."}>                                               
            <div className="h-screen w-full absolute">
              <div className="max-w-md mx-auto px-2 py-1">
                <div className="text-sm uppercase tracking-wide w-max-content mx-auto">
                  votre code de jeu:
                </div>
                <span className="block uppercase tracking-wider text-xl font-mono px-3 py-1 rounded border-orange border-2 bg-white shadow text-gray-800 font-hairline mx-auto w-min-content">
                  {gameID}
                </span>
        
                <div className="text-gray-600 italic text-xs leading-none text-center mt-2 mb-4">
                partager ce code avec des amis qui souhaitent rejoindre le jeu
                </div>
        
                <h2 className="uppercase tracking-wide text-center text-sm mb-2 mt-4">
                      Joueurs:
                  </h2>
                    <ul>
                    {challenge.players?
                      challenge.players.map((item) =>
                      item?
                        <li key={item.id} className="flex" style={{padding: 6}}>
                            <img style={{width: 50, height: 50}} className="img-circle img-thumbnail" src={'https://quizapay.com' + item.player_avatar}/>
                            <span style={{display: 'flex',alignItems: 'center',padding: 5}}>{item.player_name}</span>
                        </li>
                        :
                        <p className="animate-pulse px-3 py-1 mx-4 shadow italic border-l-4 border-gray-800 rounded w-max-content">
                            Personne n'a encore rejoint le jeu.
                        </p>
                    )
                    :
                    ''
                  }
                          
                </ul>
                {numberJoiners - (nameSubmitted ? 0 : 1) > 0 && (
                  <ul>
                    <li className="flex animate-pulse">
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="user w-8 h-8 inline pr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="italic shadow gray-600 text-sm">
                        quelqu'un se joint ...
                      </span>
                    </li>
                  </ul>
                )}
        
                {challenge.owner === user.id?
                  <button
                    style={{background: 'blue'}}
                    type="submit"
                    className="block mx-auto bg-teal-700 hover:bg-teal-600 text-white uppercase shadow py-2 px-4 tracking-wide rounded mt-4"
                    onClick={handleStartGame1}
                  >
                    Générer un quiz
                  </button>
                  :
                  ''
                }
              </div>
            </div>
          </BeforeUnloadComponent>
        );
      } else if (done === false) {
        return <PayPage handlePay={handlePay} PrixChallenge={challenge.prix}/>;
      } else if (done === null) {
        return <Loading />
      }
    }
  } else {
    return <Loading /> 
  }
}

export default InitPage;
