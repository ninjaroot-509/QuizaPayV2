import React, { useState, useEffect } from "react";
import request from '../Components/Common/HttpRequests';
import { Link } from 'react-router-dom';

function GamePage({
  gameID,
  currentQuestion,
  correctAnswer,
  numberQuestions,
  questionCountdown,
  gameOver,
  updatedIndex,
  userAnswer,
  setUserAnswer,
}) {
  const [temp, setTemp] = useState(0)
  const [players, setPlayers] = useState([])
  useEffect(()=>{
    setInterval(()=>{
        setTemp((prevTemp)=>prevTemp+1)
    }, 3000)
  }, [])

  useEffect(()=>{
    getrealtime()
  }, [temp])

  const getrealtime = () => {
    request.getPlayers(gameID).then(res => setPlayers(res))
  }
  return (
    <div className="h-screen w-full absolute">
      {currentQuestion && (
        <div className="absolute w-full uppercase bg-purple-900 text-gray-300 text-xs tracking-wider shadow">
          <div className="max-w-sm mx-auto px-2 py-1">
            question {currentQuestion.index + 1} 
          </div>
        </div>
      )}

      <div className="max-w-sm mx-auto my-8 p-2">
        <div
          className={
            typeof correctAnswer === "number"
              ? "hidden"
              : "fixed bottom-0 right-0 lg:absolute font-black text-2xl h-12 w-12 m-4 rounded-full bg-orange shadow"
          }
        >
          <div className="mx-auto min-w-0 pt-1 w-min-content">
            {questionCountdown}
          </div>
        </div>

        {currentQuestion && (
          <div>
            <p>{currentQuestion.question}</p>
            <form>
                <label
                  className={
                    "transition relative block py-2 px-4 border-solid rounded my-2 box-border border-2 cursor-pointer " +
                    (userAnswer === 'a'
                      ? "shadow-xl z-40 border-l-8 border-orange "
                      : "shadow z-20 ") +
                    (typeof correctAnswer === "number"
                      ? correctAnswer === 'a'
                        ? "border-green-500"
                        : "border-red-500"
                      : "border-gray-800")
                  }
                >
                  <input
                    className="hidden"
                    type="radio"
                    name="userAnswer"
                    value={'a'}
                    onChange={() => setUserAnswer('a')}
                    checked={userAnswer === 'a'}
                    disabled={typeof correctAnswer === "number"}
                  />
                  {userAnswer === 'a' && correctAnswer === 'b'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  : userAnswer === 'a' && correctAnswer === 'c'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  : userAnswer === 'a' && correctAnswer === 'd'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg> 
                  :
                   ''
                  }
                  {userAnswer === 'a' && correctAnswer === 'a'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="check w-6 h-6 inline text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    :
                    ''
                  }
                  <span className="pl-2">{currentQuestion.answers1}</span>
                </label>
                    {/* option two */}
                <label
                  className={
                    "transition relative block py-2 px-4 border-solid rounded my-2 box-border border-2 cursor-pointer " +
                    (userAnswer === 'b'
                      ? "shadow-xl z-40 border-l-8 border-orange "
                      : "shadow z-20 ") +
                    (typeof correctAnswer === "number"
                      ? correctAnswer === 'b'
                        ? "border-green-500"
                        : "border-red-500"
                      : "border-gray-800")
                  }
                >
                  <input
                    className="hidden"
                    type="radio"
                    name="userAnswer"
                    value={'b'}
                    onChange={() => setUserAnswer('b')}
                    checked={userAnswer === 'b'}
                    disabled={typeof correctAnswer === "number"}
                  />
                  {userAnswer === 'b' && correctAnswer === 'a'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      clbssName="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  : userAnswer === 'b' && correctAnswer === 'c'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  : userAnswer === 'c' && correctAnswer === 'd'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg> 
                  :
                   ''
                  }
                  {userAnswer === 'b' && correctAnswer === 'b'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="check w-6 h-6 inline text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    :
                    ''
                  }
                  <span className="pl-2">{currentQuestion.answers2}</span>
                </label>
                {currentQuestion.answers3?
                  <label
                    className={
                      "transition relative block py-2 px-4 border-solid rounded my-2 box-border border-2 cursor-pointer " +
                      (userAnswer === 'c'
                        ? "shadow-xl z-40 border-l-8 border-orange "
                        : "shadow z-20 ") +
                      (typeof correctAnswer === "number"
                        ? correctAnswer === 'c'
                          ? "border-green-500"
                          : "border-red-500"
                        : "border-gray-800")
                    }
                  >
                    <input
                      className="hidden"
                      type="radio"
                      name="userAnswer"
                      value={'c'}
                      onChange={() => setUserAnswer('c')}
                      checked={userAnswer === 'c'}
                      disabled={typeof correctAnswer === "number"}
                    />
                    {userAnswer === 'c' && correctAnswer === 'b'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  : userAnswer === 'c' && correctAnswer === 'a'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  : userAnswer === 'c' && correctAnswer === 'd'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg> 
                  :
                   ''
                  }
                  {userAnswer === 'c' && correctAnswer === 'c'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="check w-6 h-6 inline text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    :
                    ''
                  }
                    <span className="pl-2">{currentQuestion.answers3}</span>
                  </label>
                  : 
                  ''
                }
              {currentQuestion.answers4? 
                <label
                  className={
                    "transition relative block py-2 px-4 border-solid rounded my-2 box-border border-2 cursor-pointer " +
                    (userAnswer === 'd'
                      ? "shadow-xl z-40 border-l-8 border-orange "
                      : "shadow z-20 ") +
                    (typeof correctAnswer === "number"
                      ? correctAnswer === 'd'
                        ? "border-green-500"
                        : "border-red-500"
                      : "border-gray-800")
                  }
                >
                  <input
                    className="hidden"
                    type="radio"
                    name="userAnswer"
                    value={'d'}
                    onChange={() => setUserAnswer('d')}
                    checked={userAnswer === 'd'}
                    disabled={typeof correctAnswer === "number"}
                  />
                  {userAnswer === 'd' && correctAnswer === 'b'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  : userAnswer === 'd' && correctAnswer === 'c'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  : userAnswer === 'd' && correctAnswer === 'a'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x inline text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg> 
                  :
                   ''
                  }
                  {userAnswer === 'd' && correctAnswer === 'd'?
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="check w-6 h-6 inline text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    :
                    ''
                  }
                  <span className="pl-2">{currentQuestion.answers4}</span>
                </label>
              :
                ''  
              }
              </form>
            <hr className="my-1" />
          </div>
        )}
        {gameOver && <h1 className="text-3xl mx-2 font-black">Le jeu est terminé</h1>}
        {players && (
          <ul>
            <h2 className="uppercase tracking-wide text-sm m-1 text-gray-700">
              Classement:
            </h2>
              {players.map((item) =>
                  <li key={item.id} className="flex" style={{padding: 6}}>
                      <img style={{width: 50, height: 50}} className="img-circle img-thumbnail" src={'https://quizapay.com' + item.player_avatar}/>
                      <span style={{display: 'flex',alignItems: 'center',padding: 5}}>{item.player_name}</span>
                      <span style={{display: 'flex',alignItems: 'center',padding: 5}}>Score: {item.score}</span>
                  </li>
              )}
              {gameOver?
              <div className="text-center">
                  <Link to="/etape-1" className="btn-animated btn btn-primary1 btn-rg">Jouer à nouveau!?</Link><br/><br/>
              </div>
              :
                ""
              }
          </ul>
        )}
      </div>
    </div>
  );
}

export default GamePage;
