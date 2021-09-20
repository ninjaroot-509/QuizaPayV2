import React, { useState } from 'react'
import request from '../Components/Common/HttpRequests';
import Quizz from './Quizz'
import useSound from 'use-sound';

const RandomQ = ({nbQuestions, prixQ, perdre, gains, princingId}) => {
  const [load, setLoad] = useState(true)

  const [questions, setQuestions] = useState([])
  const [click, setClick] = useState(false)

  const onClickGene = () => {
    if (click === false){
    // handleSong()
    request.getQuestionsV2(nbQuestions).then(res => {
      setQuestions(res)
      setLoad(false)
    })
    setClick(true)
    }
  }
  const [playSong] = useSound(
    '/static/assets/audio/rand.mp3',
    { volume: 1 }
  );

  const handleSong = () => {
      playSong()
  }

  if (load == true) {
    return (
      <div className="content-grid">
          <div>
              <button className="button primary" onClick={onClickGene}>
                générer les questions
              </button>
          </div>
      </div>
    )
  } else {
    return (
      <Quizz questions={questions} nbQuestions={nbQuestions} prixQ={prixQ} perdre={perdre} gains={gains} princingId={princingId}/>
    )
  }
}
export default RandomQ