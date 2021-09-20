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
const postProgress = (progression) => axios.post(`${url}user-details/`, { progression }, config)
const postPayQ = (prix) => axios.post(`${url}pay/`, { prix }, config)
const postDepot = (montant) => axios.post(`${url}depot/`, { montant }, config)
const postDepotDone = (idtrans) => axios.post(`${url}depot/`, { idtrans }, config)
const postResults = (right, nbQuestions, winnGains, prixQ) => axios.post(`${url}results/`, JSON.stringify({
    score: right,
    total: nbQuestions,
    winnGains: winnGains,
    prix: prixQ,
}), config)
const postWinPay = (princingId, perdre) => axios.post(`${url}wallet/`, JSON.stringify({
    princingId: princingId,
    perdre: perdre
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

const postTry = (pk) => axios.post(`${url}try-agains/?pk=${pk}`, config)

const postAddFriend = (id) => axios.post(`${url}friends-actions/`, JSON.stringify({
    id_add: id
}), config)

const postAcceptFriend = (id) => axios.post(`${url}friends-actions/`, JSON.stringify({
    id_accept: id
}), config)

const postCancelFriend = (id) => axios.post(`${url}friends-actions/`, JSON.stringify({
    id_cancel: id
}), config)
    // request GET 
const getUserList = () => axios.get(`${url}users/`, config).then(res => res.data)
const getFriendList = () => axios.get(`${url}friends/`, config).then(res => res.data).catch(error => {
    if (error.response.status === 401) {
        removeUserSession()
        window.location.reload()
    }
});
const getPlayers = (gameID) => axios.get(`${url}players/?gameID=${gameID}`, config).then(res => res.data)
const getStart = (gameID) => axios.get(`${url}start/?gameID=${gameID}`, config).then(res => res.data)
const getQuizOrder = (id, userId) => axios.get(`${url}quizdone/?quizz_id=${id}&-details=${userId}`).then(res => res.data)
const getWallet = () => axios.get(`${url}wallet/`, config).then(res => res.data).catch(error => {
        if (error.response.status === 401) {
            removeUserSession()
            window.location.reload()
        }
    });
const getCoin = () => axios.get(`${url}coins/`, config).then(res => res.data)
const getLevel = () => axios.get(`${url}user-details/`, config).then(res => res.data).catch(error => {
    if (error.response.status === 401) {
        removeUserSession()
        window.location.reload()
    }
});
const getDemandeRecuList = () => axios.get(`${url}demandereculist/`, config).then(res => res.data).catch(error => {
    if (error.response.status === 401) {
        removeUserSession()
        window.location.reload()
    }
});
const getDemandeSentList = () => axios.get(`${url}demandesentlist/`, config).then(res => res.data)
const getResultat = () => axios.get(`${url}results/`, config).then(res => res.data).catch(error => {
    if (error.response.status === 401) {
        removeUserSession()
        window.location.reload()
    }
});

const getProduit = () => axios.get(`${url}produits/`, config).then(res => res.data)
const getRetrait = () => axios.get(`${url}retrait/`, config).then(res => res.data)
const getQuizz = (id) => axios.get(`${url}quizzes/${id}/`).then(res => res.data)
const getQuestions = (id) => axios.get(`${url}questions/?quizz_id=${id}`).then(res => res.data).catch(error => {
    if (error.response.status === 401) {
        removeUserSession()
        window.location.reload()
    }
});
const getQuestionsV2 = (nbQuestions) => axios.get(`${url}questions/?nbQ=${nbQuestions}`, config).then(res => res.data).catch(error => {
    if (error.response.status === 401) {
        removeUserSession()
        window.location.reload()
    }
});

const getPrincing = () => axios.get(`${url}princings/`, config).then(res => res.data)
export default { postLogin, postRegister, postAcceptFriend, postCancelFriend, postAddFriend, postInfo, postProgress, postPayQ, postDepot, postDepotDone, postTry, postResults, postWinPay, postQuizRegister, postCreateChallenge, postStartChallenge, postPlayersChallenge, postJoinChallenge, postJoinPayChallenge, postAnswerChallenge, postEndChallenge, getPlayers, getPrincing, getStart, getQuizz, getProduit, getQuestions, getQuestionsV2, getQuizOrder, getWallet, getCoin, getResultat, getRetrait, getLevel, getDemandeRecuList, getDemandeSentList, getUserList, getFriendList }