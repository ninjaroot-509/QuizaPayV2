import React from 'react'

const Loading = () => {
    return (
        <div className="page-loader">
            <div className="page-loader-decoration">
                <img src="/logo.png" alt="QuizaPay"  style={{width: 'auto', height: 40}}/> 
            </div>

            <div className="page-loader-info">
            <p className="page-loader-info-title">QuizaPay</p>

            <p className="page-loader-info-text">Chargement...</p>
            </div>
            
            <div className="page-loader-indicator loader-bars">
            <div className="loader-bar"></div>
            <div className="loader-bar"></div>
            <div className="loader-bar"></div>
            <div className="loader-bar"></div>
            <div className="loader-bar"></div>
            <div className="loader-bar"></div>
            <div className="loader-bar"></div>
            <div className="loader-bar"></div>
            </div>
        </div>
    )
}
export default Loading
