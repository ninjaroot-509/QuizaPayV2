import React, { useState } from 'react'

const IDTD = ({handleDone}) => {

    return (
        <div className="container-login100">
            <div className="wrap-login100 p-t-0 p-b-20">
                <div className="login100-form validate-form">
                    <span className="login100-form-title p-b-37">
                        veuillez patientez...
                    </span>

                    <p>si dans les 5 prochaines minutes le virement n'a pas encore été effectué, merci de nous contacter au plus vite, QuizaPay !!</p>
                    <p>47929400</p>

                    <div className="container-login100-form-btn">
                        <button onClick={handleDone} className="login100-form-btn">
                            modifier l'ID transaction
                        </button>
                    </div>
                
                </div>
            </div>
        </div>
    )
}
export default IDTD