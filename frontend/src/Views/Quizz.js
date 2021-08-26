import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import request from '../Components/Common/HttpRequests'
import { TheGame } from '../Components/Quizz/TheGame';
import { Results } from '../Components/Quizz/Results';
import Loading from '../Components/Common/Loading'
import { getUser, getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios';
// import { Link } from 'react-router-dom'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import useSound from 'use-sound';
import { useToasts } from 'react-toast-notifications';
import addNotification from 'react-push-notification';
import BeforeUnloadComponent from 'react-beforeunload-component';

const Quizz = ({questions, nbQuestions, prixQ}) => {
    const token = getToken()
    const [timer, setTimer] = useState(questions[0].timer_secs)
    const [right, setRight] = useState(0)
    const [all, setAll] = useState()
    const [quizId, setQuizId] = useState()
    const [allQN, setAllQN] = useState(1)
    const [rep, setRep] = useState()
    const [timeactive, setTimeactive] = useState(true)
    const [end, setEnd] = useState(false)
    const [startTimer, setStartTimer] = useState(false)
    const { addToast } = useToasts()
    const [timeout, setTimeOutState] = useState(false)

    const Preduce = prixQ / nbQuestions
    const som = Preduce * right * 2

        
    useEffect(() => {
        if (!quizId) {
            setQuizId(questions[0].quizz_id)
        }
    })

    const sauvegarder = () => {
        request.postResults(right, nbQuestions, quizId, som, prixQ)
        request.postWinPay(prixQ, nbQuestions, right)
    }

    const restartTime = () => {
        setTimer(questions[0].timer_secs)
    }

    const timeDesactive = () => {
        setTimeactive(false)
    }
    const timeActive = () => {
        setTimeactive(true)
        setRep(undefined)
    }

    const handleGameOver = (all) => {
        setEnd(true)
        setAll(all + 1)
        sauvegarder()
    }

    const handleCorrect = () => {
        setRight(right + 1)
        setRep(true)
    }

    const handleWrong = () => {
        setRep(false)
    }

    const handleAllQN = () => {
        if (end == false) {
            setAllQN(allQN + 1)
        }
    }

    const winn = Math.round((right) * (100) / nbQuestions)

    if (questions.length !== 0) {
        return (
            <>
                <div className="content-grid quizplayH" style={{height: 650}}>
                    <div className="profile-header">

                    <div className="profile-header-cover liquid" style={{backgroundColor: "cornflowerblue", maxHeight: 85}}>
                        <div style={{display: 'flex',justifyContent: 'space-between', alignItems: 'center', padding: "12px 23px"}}>
                            <div style={{padding: 5, position: 'relative'}}>
                                <span style={{color: '#fff'}}>correct: {right}</span>
                            </div>
                            {all ?
                                <div style={{position: 'relative', visibility: 'hidden'}}>
                                    <CountdownCircleTimer
                                        isPlaying={false}
                                        size={50}
                                        duration={1}
                                        colors={[
                                        ['#004777', 0.33],
                                        ['#F7B801', 0.33],
                                        ['#A30000', 0.33],
                                        ]}
                                    >
                                        {({ remainingTime }) => remainingTime}
                                    </CountdownCircleTimer> 
                                </div>
                             : 
                            <div style={{position: 'relative'}}>
                            {timer > 0?
                                timeactive === true?
                                <CountdownCircleTimer
                                    isPlaying={startTimer}
                                    size={50}
                                    duration={timer}
                                    colors={[
                                    ['#004777', 0.33],
                                    ['#F7B801', 0.33],
                                    ['#A30000', 0.33],
                                    ]}
                                    onComplete={() => {
                                        setTimer(0)
                                        setTimeactive(false)
                                        setStartTimer(false)
                                        setTimeOutState(true)
                                    }}
                                >
                                    {({ remainingTime }) => remainingTime}
                                </CountdownCircleTimer> 
                            : '': ''}
                            </div>}
                            <div style={{position: 'relative'}}>
                            {end?
                                <div className="flex" style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <button className="button secondary small">
                                        <span style={{padding: 15}}>Partager le score</span>
                                    </button>
                                </div>
                                :
                                <div className="flex" style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', padding: 5, borderRadius: 20, color: 'white'}}>
                                    {allQN} / {nbQuestions}
                                </div>
                            }
                            </div>
                        </div>                            
                    </div>
                
                    {!all
                        ? 
                        <BeforeUnloadComponent 
                            blockRoute={true}
                            ignoreBefoureunloadDocument={true}
                            alertMessage={"Êtes-vous sûr de vouloir quitter? Les modifications ne seront pas enregistrées."}
                        >
                            <TheGame setTimeOutState={setTimeOutState} timeout={timeout} end={end} handleCorrect={handleCorrect} handleGameOver={handleGameOver} getTime={restartTime} timeActiveBtn={timeActive} timeDesactive={timeDesactive} handleWrong={handleWrong} questions={questions} nbQuestions={nbQuestions} timeactive={timeactive} rep={rep} setStartTimer={setStartTimer} right={right} handleAllQN={handleAllQN}/>
                        </BeforeUnloadComponent>
                        :   <Results nbQuestions={nbQuestions} right={right} all={all} winn={winn} prix={som}/>
                    }
                    </div>
                </div>
            </>
        )
    } else {
        return <Loading /> 
    }
}
export default Quizz