import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Radio from './Radio';
import RandomQ from './RandomQ';

const Step2 = () => {
    const [isPay, setIsPay] = useState(false)
    const [nbQ, setNBQ] = useState(5)
    const [prixQ, setPrixQ] = useState(35)

    if (isPay == true) {
        return (
            <RandomQ nbQuestions={nbQ} prixQ={prixQ}/>
        )
    } else {
        return (
            <Radio setIsPay={setIsPay} setNBQ={setNBQ} setPrixQ={setPrixQ}/>
        )
    }
}
export default Step2; 