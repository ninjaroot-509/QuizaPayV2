import React, { useState } from 'react'
import { getToken } from '../Components/Common/Auth/Sessions'
import request from '../Components/Common/HttpRequests';
import WheelComponent from 'react-wheel-of-prizes'
import Quizz from './Quizz'
import useSound from 'use-sound';

const RandomQ = ({nbQuestions, prixQ}) => {
  const [load, setLoad] = useState(true)

  const segments = [
    'Geographie',
    'Langue française',
    'Science',
    'Animaux',
    'Histoire',
    'Sport',
    'Art et culture'
  ]

  const segColors = [
      '#34A24F',
      '#3DA5E0',
      '#EE4040',
      '#F0CF50',
      '#EC3F3F',
      '#815CD6',
      '#FF9000'
  ]

  const [questions, setQuestions] = useState([])
  const [click, setClick] = useState(false)

  const onFinished = (category) => {
    request.getQuestionsV2(nbQuestions, category).then(res => {
      setQuestions(res)
      setLoad(false)
    })
  }
  const [playSong] = useSound(
    '/static/assets/audio/rand.mp3',
    { volume: 1 }
  );

  const handleSong = () => {
    if (click === false){
      playSong()
      setClick(true)
    }
  }

  if (load == true) {
    return (
      <div className="content-grid">
          <div onClick={handleSong}>
              <WheelComponent
                  segments={segments}
                  segColors={segColors}
                  winningSegment='Histoire'
                  onFinished={(category) => onFinished(category)}
                  primaryColor='#00a'
                  contrastColor='white'
                  buttonText='Tourner'
                  isOnlyOnce={false}
                  size={280}
                  upDuration={100}
                  downDuration={2350}
                />
          </div>
      </div>
    )
  } else {
    return (
      <Quizz questions={questions} nbQuestions={nbQuestions} prixQ={prixQ}/>
    )
  }
}
export default RandomQ