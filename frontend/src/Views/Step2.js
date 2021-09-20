import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Radio from './Radio';
import RandomQ from './RandomQ';

const Step2 = () => {
    const [isPay, setIsPay] = useState(false)
    const [nbQ, setNBQ] = useState()
    const [prixQ, setPrixQ] = useState()
    const [perdre, setPerdre] = useState()
    const [gains, setGains] = useState()
    const [princingId, setPrincingId] = useState()

    if (isPay == true) {
        return (
            <RandomQ nbQuestions={nbQ} prixQ={prixQ} perdre={perdre} princingId={princingId} gains={gains}/>
        )
    } else {
        return (
            <Radio setIsPay={setIsPay} setNBQ={setNBQ} setPrixQ={setPrixQ} prixQ={prixQ} setPerdre={setPerdre} setGains={setGains} setPrincingId={setPrincingId}/>
        )
    }
}
export default Step2; 