import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { ResultsTable } from './ResultsTable';
import { getUser } from '../Common/Auth/Sessions'


export const Results = ({ right, nbQuestions, winn, prix }) => {
    const user = getUser()

    return (
        <>
            <div className="profile-header-info" style={{height: 440}}>
                <div className="user-short-description" style={{paddingTop: 40}}>
                <p className="user-short-description-title" style={{margin: "7px 20px"}}>{winn >= 50?'Bravo':'Désolé'} {user.username}!</p>
                <div style={{textAlign: 'center'}}>
                    <div> 
                        <span style={{fontSize: 65, fontWeight: 'bold'}}>
                            {right}/{nbQuestions} 
                        </span>
                    </div>
                    <div>
                        <span role="img" aria-labelledby="icon">{winn >= 50? "Tu as gagné 🤓 🤩 🥳" : "Tu as perdu 🥺 😢 😭" }</span> 
                    </div>

                    <div>
                        <span>Vous avez gagné {Math.round(prix)} gourde{prix > 1?'s':''}!
                            <br /> 
                            qui ont déjà été transférés à votre porte-monnaie, <br />Merci QuizaPay!!!
                        </span>
                    </div>
                

                    <div style={{padding: 20}}>
                        <Link to={"/etape-2"} onClick={()=> window.location.reload()} className="button secondary small">
                            <span style={{padding: 15}}>Jouer à nouveau!?</span>
                        </Link>
                    </div>
                </div>

                </div>
            
            </div>
        </>
    )
}
