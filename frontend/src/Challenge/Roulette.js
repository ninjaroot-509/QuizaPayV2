import React, { useState } from 'react'
import { getToken } from '../Components/Common/Auth/Sessions'
import request from '../Components/Common/HttpRequests';
import WheelComponent from 'react-wheel-of-prizes'
import useSound from 'use-sound';

const Roulette = ({gameID, handleStartGame}) => {

  const segments = [
    'Geographie',
    'Histoire',
    'Langue française',
    'Science',
    'Sport',
    'Animaux',
    'Art et culture'
  ]
  const segColors = [
      '#34A24F',
      '#3DA5E0',
      '#EC3F3F',
      '#F0CF50',
      '#815CD6',
      '#EE4040',
      '#FF9000'
  ]
  const [click, setClick] = useState(false)
  const onFinished = (category) => {
    request.postStartChallenge(gameID, category).then((res) => {
      handleStartGame(res.quiz_id)
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
    return (
      <div className="wrapper">
        <div className="containerpam">
          <div className="canvas-container" onClick={handleSong}>
              <WheelComponent
                segments={segments}
                segColors={segColors}
                // winningSegment='Histoire'
                onFinished={(category) => onFinished(category)}
                primaryColor='#003'
                contrastColor='white'
                buttonText='Tourner'
                isOnlyOnce={false}
                size={300}
                upDuration={100}
                downDuration={2300}
              />
          </div>
        </div>
      </div>
    )
}
export default Roulette