import React, { useState } from 'react'
import SpinWheel from './SpinWheel'

const SpinHome = () => {
  const [ispay, setPay] = useState(false)
  const OnPay = () => {
      alert('ce processus est maintenant hors service')
  }
  const EndToggle = () => {
    setPay(false)
}
  if (ispay == false) {
      return (
        <div className="container-login100">
            <div className="wrap-login100 p-t-0 p-b-20">
                <div className="login100-form validate-form">
                    <span className="login100-form-title p-b-37">
                        Roulette de prix
                    </span>
    
                    <div className="container-login100-form-btn">
                        <button onClick={OnPay} className="login100-form-btn">
                            Start
                        </button>
                    </div>
                
                </div>
            </div>
        </div>
      )
  } else {
      return (
          <SpinWheel EndToggle={EndToggle}/>
      )
  }
}
export default SpinHome