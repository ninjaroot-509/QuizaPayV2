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
import useWallets from '../state/wallet/hooks/useWallets';
import useLevels from '../state/level/hooks/useLevels';

const Quizz = ({questions, nbQuestions, prixQ, perdre, gains, princingId}) => {
    const token = getToken()
    const [timer, setTimer] = useState(questions[0].timer_secs)
    const [right, setRight] = useState(0)
    const [all, setAll] = useState()
    const [wrong, setWrong] = useState(0)
    const [quizId, setQuizId] = useState()
    const [allQN, setAllQN] = useState(1)
    const [timeactive, setTimeactive] = useState(true)
    const [end, setEnd] = useState(false)
    const [startTimer, setStartTimer] = useState(false)
    const { addToast } = useToasts()
    const [timeout, setTimeOutState] = useState(false)

    const winn = Math.round((right) * (100) / nbQuestions)
    const winnGains = perdre == 1 ? wrong == 0 ? gains : wrong == 1? (75 / 100) * gains : 0 : perdre == 2 ? wrong == 0 ? gains : wrong == 1? (80 / 100) * gains : wrong == 2? (60 / 100) * gains : 0 : perdre == 3 ? wrong == 0 ? gains : wrong == 1? (80 / 100) * gains : wrong == 2? (70 / 100) * gains : wrong == 3?  (60 / 100) * gains : 0 : wrong == 0 ? gains : 0

    const Preduce = prixQ / nbQuestions
    const som = Preduce * right * 1.4

    const progression = winn <= 20? 10 : winn <= 50? 25 : winn <= 100? 50 : 10

    const [wallet, isLoading, setWallets] = useWallets();
    const [level, isLoadinglevel, setLevels] = useLevels();

        
    useEffect(() => {
        if (!quizId) {
            setQuizId(questions[0].quizz_id)
        }
        if (wrong > perdre) {
            handleGameOver(questions.length)
        }
    })

    const sauvegarder = () => {
        request.postWinPay(princingId, wrong)
        request.postResults(right, nbQuestions, winnGains, prixQ)
        request.postProgress(progression)
        setTimeout(() => { 
            setWallets() 
            setLevels()
        }, 700);
    }

    const restartTime = () => {
        setTimer(questions[0].timer_secs)
    }

    const timeDesactive = () => {
        setTimeactive(false)
    }
    const timeActive = () => {
        setTimeactive(true)
    }


    const handleGameOver = (all) => {
        setEnd(true)
        setAll(all + 1)
    }

    const handleCorrect = () => {
        setRight(right + 1)
    }

    const handleAllQN = () => {
        setAllQN(allQN + 1)
    }

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
                            <TheGame setWrong={setWrong} wrong={wrong} setTimeOutState={setTimeOutState} timeout={timeout} end={end} handleCorrect={handleCorrect} handleGameOver={handleGameOver} getTime={restartTime} timeActiveBtn={timeActive} timeDesactive={timeDesactive} questions={questions} nbQuestions={nbQuestions} timeactive={timeactive} setStartTimer={setStartTimer} right={right} handleAllQN={handleAllQN}/>
                        </BeforeUnloadComponent>
                        :   <Results nbQuestions={nbQuestions} right={right} all={all} gains={winnGains} winn={winn} prix={som} sauvegarder={sauvegarder}/>
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