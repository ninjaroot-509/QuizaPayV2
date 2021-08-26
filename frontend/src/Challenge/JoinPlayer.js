import React, { useState, useEffect } from "react";
import { getUser } from '../Components/Common/Auth/Sessions'
import request from '../Components/Common/HttpRequests';
import Loading from '../Components/Common/Loading'
import BeforeUnloadComponent from 'react-beforeunload-component';
import Start from './Start'

const JoinPlayer = ({challenge, setRoulette}) => {
  const user = getUser()
  const [start, setStart] = useState(false)
  const [temp, setTemp] = useState(0)
  const [error, setErro] = useState()

  const handleStartGame = () => {
    if (challenge.players.length > 1) {
      setRoulette(true)
    } else {
      alert("vous devez avoir au moins un autre joueur ou plus pour continuer")
    }
  }

  useEffect(()=>{
    setInterval(()=>{
        setTemp((prevTemp)=>prevTemp+1)
    }, 5000)
  }, [])

  useEffect(()=>{
    if (start !== true) {
      getrealtime()
    }
  }, [temp])

  const getrealtime = () => {
    request.getStart(challenge.id).then(res => setStart(res.start))
  }

  if (challenge) {
    if (start === true) {
      <Start />
    } else  {
      return (
        <BeforeUnloadComponent 
          blockRoute={true}
          ignoreBefoureunloadDocument={true}
          alertMessage={"Êtes-vous sûr de vouloir quitter? Les modifications ne seront pas enregistrées."}>                                               
          <div className="h-screen w-full absolute">
            <div className="max-w-md mx-auto px-2 py-1">
              {challenge.owner === user.id?
                <>
                  <div className="text-sm uppercase tracking-wide w-max-content mx-auto">
                    votre code de jeu:
                  </div>
                  <span className="block uppercase tracking-wider text-xl font-mono rounded border-orange border-2 bg-white shadow text-gray-800 font-hairline mx-auto w-min-content" style={{padding: 5,width: '30%',display: 'flex',alignItems: 'center'}}>
                    {challenge.gameID}
                  </span>
                </>
                :
                ''
              }
      
              <div className="text-gray-600 italic text-xs leading-none text-center mt-2 mb-4">
              partager ce code avec des amis qui souhaitent rejoindre le jeu
              </div>
            {error?
              <div className="rounded border-red-800 border-l-4 bg-red-200 p-2 my-2 flex items-center text-red-800 text-sm leading-tight">
                  <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="exclamation w-8 h-8 inline pr-2 flex-initial"
                  >
                      <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                      />
                  </svg>
                  <span className="flex-1">lorem ipsun</span>
              </div>
              :
              ''
            }
      
              <h2 className="uppercase tracking-wide text-center text-sm mb-2 mt-4">
                  Joueurs:
              </h2>
                <ul>
                {challenge.players?
                  challenge.players.map((item) =>
                  item?
                    <li key={item.id} className="flex" style={{padding: 6}}>
                        <img style={{width: 50, height: 50}} className="img-circle img-thumbnail" src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
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
              
                {/* <ul>
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
                </ul> */}
                {challenge.owner === user.id?
                  <button
                    style={{background: 'blue'}}
                    type="submit"
                    className="block mx-auto bg-teal-700 hover:bg-teal-600 text-white uppercase shadow py-2 px-4 tracking-wide rounded mt-4"
                    onClick={handleStartGame}
                  >
                    démarrer le jeu
                  </button>
                  :
                  ''
                }
              </div>
          </div>
        </BeforeUnloadComponent>
      );
    }
  } else {
    return <Loading /> 
  }
}

export default JoinPlayer;
