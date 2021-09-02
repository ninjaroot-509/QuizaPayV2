import React, { useState } from 'react'

const IDTD = ({handleDone}) => {

    return (
        <div style={{paddingTop: 150}}>
            <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                <div className="form-box">
                    <h4 className="text-center">
                        veuillez patientez...
                    </h4>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10}}>
                    <p>
                        <div className="text-center">
                            si dans les 5 prochaines minutes le virement n'a pas encore été effectué, merci de nous contacter au plus vite, QuizaPay !!
                        </div>
                        <div style={{display: 'grid',padding: 5}}>
                            <span>+509 47929400</span>
                            <span>+509 43208550</span>
                        </div>
                    </p>
                    </div>

                    <div>
                        <button onClick={handleDone} className="button primary full">
                            modifier l'ID transaction
                        </button>
                    </div>
                
                </div>
            </div>
        </div>
    )
}
export default IDTD