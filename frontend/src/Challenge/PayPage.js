import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Pay = ({handlePay, PrixChallenge}) => {
    return (
        <div className="container-login100">
            <div className="wrap-login100 p-t-0 p-b-20">
                <div className="login100-form validate-form">
                    <span className="login100-form-title p-b-37">
                        Ce challenge est de {PrixChallenge} Gourdes
                    </span>

                    <div className="container-login100-form-btn">
                        <button onClick={handlePay} className="login100-form-btn" style={{margin: 10}}>
                            Payer
                        </button>

                        <Link to="/">
                            <button className="login100-form-btn" style={{margin: 10}}>
                                Retourner
                            </button>
                        </Link>
                    </div>
                
                </div>
            </div>
        </div>
    )
}
export default Pay