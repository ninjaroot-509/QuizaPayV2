import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { ResultsTable } from './ResultsTable';
import { getUser } from '../Common/Auth/Sessions'


export const Results = ({ right, nbQuestions, winn, prix, gains, sauvegarder }) => {
    const user = getUser()
    const [done, setDone] = useState(false)

    useEffect(()=> {
        if (done === false) {
            sauvegarder()
            setDone(true)
        }
    }, [done])

    return (
        <>
            <div className="profile-header-info" style={{height: 440}}>
                <div className="user-short-description" style={{paddingTop: 40}}>
                <p className="user-short-description-title" style={{margin: "7px 20px"}}>{gains > 1?'Bravo':'Désolé'} {user.first_name}!</p>
                <div style={{textAlign: 'center'}}>
                    <div> 
                        <span style={{fontSize: 70, fontWeight: 'bold'}}>
                            {right}/{nbQuestions} 
                        </span>
                    </div>
                    <div>
                        <span style={{fontSize: 25, fontWeight: 'bold'}} role="img" aria-labelledby="icon">{gains > 1? "Tu as gagné 🤓 🤩 🥳" : "Tu as perdu 🥺 😢 😭" }</span> 
                    </div>

                    <div>
                        <span>Vous avez gagné {Math.round(gains)} gourde{gains > 1?'s':''}!
                            <br /> 
                            qui ont déjà été transférés à votre porte-monnaie, <br />Merci QuizaPay!!!
                        </span>
                    </div>
                

                    <div style={{padding: 20}}>
                        <Link to={"/play"} onClick={()=> window.location.reload()} className="button secondary small">
                            <span style={{padding: 15}}>Jouer à nouveau!?</span>
                        </Link>
                    </div>
                </div>

                </div>
            
            </div>
        </>
    )
}
