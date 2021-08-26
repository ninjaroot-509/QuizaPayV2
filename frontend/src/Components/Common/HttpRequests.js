import axios from 'axios'
import {
    getToken,
    removeUserSession
} from './Auth/Sessions'
// import history from '../../history';

// const url = 'https://quizapay.com/api/'
    const url = 'http://localhost:8000/api/'
const config = { headers: { 'Content-Type': 'application/json' } }
const token = getToken()
if (token) config.headers['Authorization'] = `Token ${token}`

// request Post 
const postLogin = (phone, password) => axios.post(`${url}auth/login`, { phone, password })
const postRegister = (phone, password) => axios.post(`${url}auth/register`, { phone, password })
const postInfo = (last_name, first_name) => axios.post(`${url}info-user/`, JSON.stringify({ 
    last_name, 
    first_name 
}), config)
const postPayQ = (prix) => axios.post(`${url}pay/`, { prix }, config)
const postResults = (right, nbQuestions, quizId, som, prix) => axios.post(`${url}results/`, JSON.stringify({
    score: right,
    total: nbQuestions,
    quizz_id: quizId,
    gain: som,
    prix: prix
}), config)
const postWinPay = (prixQ, nbQuestions, right) => axios.post(`${url}wallet/`, JSON.stringify({
    montant: prixQ,
    total: nbQuestions,
    right: right
}), config)
const postQuizRegister = (quizId) => axios.post(`${url}done/`, JSON.stringify({
    quiz_id: quizId,
}), config)

const postCreateChallenge = (prixQ, nbQ, tourID, gameID) => axios.post(`${url}challenge/`, JSON.stringify({
    prix: prixQ,
    nombres_questions: nbQ,
    nombres_tours: tourID,
    gameID: gameID
}), config)

const postStartChallenge = (gameID, category) => axios.post(`${url}start/`, JSON.stringify({
    gameID: gameID,
    category: category
}), config).then(res => res.data)

const postPlayersChallenge = (gameID) => axios.post(`${url}players/`, JSON.stringify({
    gameID: gameID
}), config)

const postJoinChallenge = (gameID) => axios.post(`${url}joins/`, JSON.stringify({
    gameID: gameID
}), config).then(res => res.data)

const postJoinPayChallenge = (gameID) => axios.post(`${url}joins-pay/`, JSON.stringify({
    gameID: gameID
}), config).then(res => res.data)

const postAnswerChallenge = (gameID, correct) => axios.post(`${url}players-score/`, JSON.stringify({
    gameID: gameID,
    correct: correct,
}), config).then(res => res.data)

const postEndChallenge = (gameID) => axios.post(`${url}end/`, JSON.stringify({
    gameID: gameID
}), config).then(res => res.data)

const postTry = () => axios.post(`${url}try-agains/`, config)
    // request GET 
const getPlayers = (gameID) => axios.get(`${url}players/?gameID=${gameID}`, config).then(res => res.data)
const getStart = (gameID) => axios.get(`${url}start/?gameID=${gameID}`, config).then(res => res.data)
const getQuizOrder = (id, userId) => axios.get(`${url}quizdone/?quizz_id=${id}&user=${userId}`).then(res => res.data)
const getProfile = () => axios.get(`${url}profile/`, config).then(res => res.data)
const getWallet = () => axios.get(`${url}wallet/`, config).then(res => res.data)
    .catch(error => {
        if (error.response.status === 401) {
            removeUserSession()
            window.location.reload()
        }
    });
const getCoin = () => axios.get(`${url}coins/`, config).then(res => res.data)

const getRetrait = () => axios.get(`${url}retrait/`, config).then(res => res.data)
const getQuizzes = () => axios.get(`${url}quizzes/`).then(res => res.data)
const getCategory = () => axios.get(`${url}category/`).then(res => res.data)
const getCategoryQuiz = (id) => axios.get(`${url}quizzes/?category=${id}`).then(res => res.data)
const getCategoryId = (cateId) => axios.get(`${url}category/${cateId}/`).then(res => res.data)
const getQuizz = (id) => axios.get(`${url}quizzes/${id}/`).then(res => res.data)
const getQuestions = (id) => axios.get(`${url}questions/?quizz_id=${id}`).then(res => res.data)
const getQuestionsV2 = (nbQuestions, category) => axios.get(`${url}questions/?nbQ=${nbQuestions}&category=${category}`, config).then(res => res.data)

export default { postLogin, postRegister, postInfo, postPayQ, postTry, postResults, postWinPay, postQuizRegister, postCreateChallenge, postStartChallenge, postPlayersChallenge, postJoinChallenge, postJoinPayChallenge, postAnswerChallenge, postEndChallenge, getPlayers, getStart, getProfile, getQuizzes, getQuizz, getQuestions, getQuestionsV2, getCategory, getCategoryQuiz, getCategoryId, getQuizOrder, getWallet, getCoin, getRetrait }