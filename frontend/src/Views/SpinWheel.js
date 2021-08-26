import React, { } from 'react'

import WheelComponent from 'react-wheel-of-prizes'

const SpinWheel = () => {
  const segments = [
    'pas de chance',
    'gagné 70 coins',
    'pas de chance',
    'gagné 10 coins',
    'gagné 2 coins',
    // 'gagné un laissez passer',
    'gagné 250 coins',
    // 'gagné un bon prix'
  ]
  const segColors = [
    '#EE4040',
    '#3DA5E0',
    '#EC3F3F',
    '#F0CF50',
    '#815CD6',
    // '#F9AA1F',
    '#34A24F',
    // '#FF9000'
  ]
  const onFinished = (winner) => {
    alert(winner)
  }
  return (
    <div className="wrapper">
      <div className="containerpam">
        <div className="canvas-container">
            <WheelComponent
              segments={segments}
              segColors={segColors}
              // winningSegment='won 10'
              onFinished={(winner) => onFinished(winner)}
              primaryColor='#003'
              contrastColor='white'
              buttonText='Tourner'
              isOnlyOnce={false}
              size={300}
              upDuration={100}
              downDuration={2000}
            />
        </div>
      </div>
    </div>
  )
}
export default SpinWheel