import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router"

const Radio = ({endChoiceQ, setNBQ, setPrixQ}) => {
    const history = useHistory()
    const [radio, setRadio] = useState('radio-1')
    const [prix, setPrix] = useState(35)

    const handleRadioChange = (e) => {
        setRadio(e.currentTarget.value);
        setNBQ(e.currentTarget.id)
        if (e.currentTarget.name === 'nbf') {
            setPrix(0) 
            setPrixQ(0)
        } else if (e.currentTarget.name === 'nb5') {
            setPrix(35) 
            setPrixQ(35)
        } else if (e.currentTarget.name === 'nb7') {
            setPrix(50) 
            setPrixQ(50)
        } else if (e.currentTarget.name === 'nb10') {
            setPrix(75)
            setPrixQ(75)
        }
    };


    const GoToTour = () => {
        endChoiceQ()
    }

    return (
        <div className="container-login100">
            <div className="wrap-login100 p-t-0 p-b-20">
                <div className="login100-form validate-form">
                    <span className="login100-form-title p-b-37">
                        Choisissez pour continuer
                    </span>
                    <div className="alert alert-warning">
                        Ici vous devez choisir la mise entre vous et vos participants<br />
                        <b>N.B: le gagnant recevra la somme de toutes les mises</b> <b style={{color: 'green'}}>Cliquez ici pour plus d'informations</b>
                    </div>
                <div style={{paddingBottom:15}}>
                {/* <label
                  className={
                    "transition relative block py-2 px-4 border-solid rounded my-2 box-border border-2 cursor-pointer " +
                    (radio === 'radio-0'
                      ? "shadow-xl z-40 border-l-8 border-orange"
                      : "shadow z-20 ")
                    }
                >
                  <input
                    className="hidden"
                    id="5"
                    name="nbf"
                    type="radio"
                    value="radio-0"
                    onChange={handleRadioChange}
                    checked={radio === 'radio-0'}
                    disabled={radio === "radio-0"}
                  />
                  <span className="pl-2">Jouer Gratuit</span>
                </label> */}

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
                    name="nb5"
                    type="radio"
                    value="radio-1"
                    onChange={handleRadioChange}
                    checked={radio === 'radio-1'}
                    disabled={radio === "radio-1"}
                  />
                  <span className="pl-2">misez 35 gourdes pour 5 questions</span>
                </label>

                <label
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
                    name="nb7"
                    type="radio"
                    value="radio-2"
                    onChange={handleRadioChange}
                    checked={radio === 'radio-2'}
                    disabled={radio === "radio-2"}
                  />
                  <span className="pl-2">misez 50 gourdes pour 7 questions</span>
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
                    name="nb10"
                    type="radio"
                    value="radio-3"
                    onChange={handleRadioChange}
                    checked={radio === 'radio-3'}
                    disabled={radio === "radio-3"}
                  />
                  <span className="pl-2">misez 75 gourdes pour 10 questions</span>
                </label>

                </div>

                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn" onClick={GoToTour}>
                            Continuer
                        </button>
                    </div>
                
                </div>
            </div>
        </div>
    )
}
export default Radio