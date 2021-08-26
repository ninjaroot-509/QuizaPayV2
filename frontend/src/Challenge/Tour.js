import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router"

const Tour = ({setTourID, endGoJoin}) => {
    const history = useHistory()
    const [radio, setRadio] = useState('radio-1')
    const [tour, setTour] = useState(1)

    const handleRadioChange = (e) => {
        setRadio(e.currentTarget.value);
        if (e.currentTarget.name === 'nt1') {
            setTour(1) 
            setTourID(1) 
        } else if (e.currentTarget.name === 'nt3') {
            setTour(3) 
            setTourID(3) 
        } else if (e.currentTarget.name === 'nt5') {
            setTour(5)
            setTourID(5) 
        }
    };

    const GoToJoin = () => {
        endGoJoin()
    }

    return (
        <div className="container-login100">
            <div className="wrap-login100 p-t-0 p-b-20">
                <div className="login100-form validate-form">
                    <span className="login100-form-title p-b-37">
                        Choisissez pour continuer
                    </span>
                    <div className="alert alert-warning">
                        Ici, vous devez choisir le nombre de tours dont vous et vos participants avez besoin<br />
                        <b>N.B: le jeu vous donnera le nombre de tours que vous avez choisi</b> <b style={{color: 'green'}}>Cliquez ici pour plus d'informations</b>
                    </div>
                <div style={{paddingBottom:15}}>
            
                <label
                  className={
                    "transition relative block py-2 px-4 border-solid rounded my-2 box-border border-2 cursor-pointer " +
                    (radio === 'radio-1'
                      ? "shadow-xl z-40 border-l-8 border-orange"
                      : "shadow z-20 ")
                    }
                >
                  <input
                    className="hidden"
                    id="5"
                    name="nt1"
                    type="radio"
                    value="radio-1"
                    onChange={handleRadioChange}
                    checked={radio === 'radio-1'}
                    disabled={radio === "radio-1"}
                  />
                  <span className="pl-2">une(1) seule tour</span>
                </label>

                {/* <label
                  className={
                    "transition relative block py-2 px-4 border-solid rounded my-2 box-border border-2 cursor-pointer " +
                    (radio === 'radio-2'
                      ? "shadow-xl z-40 border-l-8 border-orange"
                      : "shadow z-20 ")
                    }
                >
                  <input
                    className="hidden"
                    id="7"
                    name="nt3"
                    type="radio"
                    value="radio-2"
                    onChange={handleRadioChange}
                    checked={radio === 'radio-2'}
                    disabled={radio === "radio-2"}
                  />
                  <span className="pl-2">Deux(2) tours</span>
                </label>

                <label
                  className={
                    "transition relative block py-2 px-4 border-solid rounded my-2 box-border border-2 cursor-pointer " +
                    (radio === 'radio-3'
                      ? "shadow-xl z-40 border-l-8 border-orange"
                      : "shadow z-20 ")
                    }
                >
                  <input
                    className="hidden"
                    id="10"
                    name="nt5"
                    type="radio"
                    value="radio-3"
                    onChange={handleRadioChange}
                    checked={radio === 'radio-3'}
                    disabled={radio === "radio-3"}
                  />
                  <span className="pl-2">Trois(3) Tours</span>
                </label> */}

                </div>

                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn" onClick={GoToJoin}>
                            Continuer
                        </button>
                    </div>
                
                </div>
            </div>
        </div>
    )
}
export default Tour;