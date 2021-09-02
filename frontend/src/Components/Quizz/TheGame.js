import React, { useEffect, useState } from 'react'
import request from '../Common/HttpRequests'
import useSound from 'use-sound';

export const TheGame = ({ setTimeOutState, timeout, right, handleCorrect, handleAllQN, handleGameOver, timeactive, getTime, timeActiveBtn, timeDesactive, questions, nbQuestions, setStartTimer }) => {
    const [questionNo, setQuestionNo] = useState(0)
    const [disable, setdisable] = useState(false)
    const [choiceB, setChoiceB] = useState('')
    
    
    const [playCorrect] = useSound(
        '/static/assets/audio/correct.mp3',
        { volume: 1 }
      );
    const [playWrong] = useSound(
    '/static/assets/audio/wrong.mp3',
    { volume: 1 }
    );
    const [playTime] = useSound(
        '/assets/audio/timeout.mp3',
        { volume: 1 }
    );
    useEffect(() => {
        if (timeout === true) {
            setTimeout(() => {
                playTime()
                setTimeOutState(false)
                nextQuestion()
                setChoiceB('')
            }, 1500);
        }
        if (timeactive === false){
            setdisable(true)
        } else {
            setdisable(false)
        }
        if (questions.length != 0) {
            setStartTimer(true)
        }
    })


    

    const handleAnswerClick = (ev) => {
        setChoiceB(ev.currentTarget.name)
        if (questions[questionNo].correct_option === ev.currentTarget.name) {
            handleCorrect()
            playCorrect()
        } else {
            playWrong()
        }
        setTimeout(() => {
            nextQuestion()
            setChoiceB('') 
        }, 2000);
        setdisable(true)
        timeDesactive()
    }

    const [playWin1] = useSound(
        '/static/assets/audio/win1.mp3',
        { volume: 1 }
    );

    const [playWin2] = useSound(
        '/static/assets/audio/win2.mp3',
        { volume: 1 }
    );

    const [playWin3] = useSound(
        '/static/assets/audio/win3.mp3',
        { volume: 1 }
    );

    const [playWin4] = useSound(
        '/static/assets/audio/win4.mp3',
        { volume: 1 }
    );

    const [playFun] = useSound(
        '/static/assets/audio/fun.mp3',
        { volume: 1 }
    );


    const nextQuestion = () => {
        timeActiveBtn()
        handleAllQN()
        getTime()
        setdisable(false)
        // if (questions.length === questionNo + 1){
        //     handleGameOver(questions.length)
        // } 
        if (questionNo === nbQuestions - 1) {
            const winn = Math.round((right) * (100) / nbQuestions)
            // console.log(winn)j
            if (winn < 10) {
                playWin3()
            } else if (winn < 20) {
                playWin3()
            } else if (winn < 30) {
                playFun()
            } else if (winn < 40) {
                playFun()
            } else if (winn < 50) {
                playWin2()
            } else if (winn < 60) {
                playWin2()
            } else if (winn < 70) {
                playWin4()
            } else if (winn < 80) {
                playWin4()
            } else if (winn < 90) {
                playWin1()
            }else if (winn < 101) {
                playWin1()
            } else {
                playFun()
            }
            handleGameOver(questions.length)
        }
        setQuestionNo(questionNo + 1)
    }

    if (questions) {
        return (
            <div className="profile-header-info" style={{height: 440}}>
                <div className="user-short-description" style={{paddingTop: 0}}>
                    <div style={{display: 'flex',justifyContent: 'center',paddingTop: 10}}>
                        {questions[questionNo].image? 
                        <img style={{width: 160,height: 90,borderRadius: 8,position: 'relative'}} src={questions[questionNo].image}/>
                        : 
                        <img style={{width: 70, position: 'relative'}} src={'https://quizapay.com' + questions[questionNo].cate_image}/>
                        }
                    </div>

                {timeout?
                <div style={{padding: '100px 50px'}}>
                    <p className="user-short-description-title">le temps est ecoule!</p>
                </div>
                :
                <>
                <p className="user-short-description-text">{questions[0].quiz_name}</p>
            
                <p className="user-short-description-title" style={{margin: "7px 20px"}}>{questions[questionNo].question}</p>

                <div style={{margin: "5px 25px"}}>
                    <div style={{padding: 5}}>
                        <button name="a" disabled={disable} className={`button ${choiceB === 'a'? questions[questionNo].correct_option === 'a'? 'social-link artstation' : 'social-link youtube': 'secondary'} full`} onClick={handleAnswerClick}>
                            <span className="btn_text">{questions[questionNo].option_a}</span>
                        </button>
                    </div>

                    <div style={{padding: 5}}>
                        <button name="b" disabled={disable} className={`button ${choiceB === 'b'? questions[questionNo].correct_option === 'b'? 'social-link artstation' : 'social-link youtube': 'secondary'} full`} onClick={handleAnswerClick}>
                            <span className="btn_text">{questions[questionNo].option_b}</span>
                        </button>
                    </div>

                    <div style={{padding: 5}}>
                        <button name="c" disabled={disable} className={`button ${choiceB === 'c'? questions[questionNo].correct_option === 'c'? 'social-link artstation' : 'social-link youtube': 'secondary'} full`}  onClick={handleAnswerClick}>
                            <span className="btn_text">{questions[questionNo].option_c}</span>
                        </button>
                    </div>

                    <div style={{padding: 5}}>
                        <button name="d" disabled={disable} className={`button ${choiceB === 'd'? questions[questionNo].correct_option === 'd'? 'social-link artstation' : 'social-link youtube': 'secondary'} full`}  onClick={handleAnswerClick}>
                            <span className="btn_text">{questions[questionNo].option_d}</span>
                        </button>
                    </div>
                </div>
                </>}
            
                </div>

            </div>
        )
    } else {
        return (<div style={{marginTop:"15%"}} className="row h-100 justify-content-center">
        <div className="loader"></div>   
   </div>)
    }
}
