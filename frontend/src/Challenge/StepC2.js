import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import Radio from './Radio';
import Tour from './Tour';
import request from '../Components/Common/HttpRequests';
import { useToasts } from 'react-toast-notifications';
import io from "socket.io-client";
import axios from "axios";
import InitPage from "../RealTime/InitPage";
import JoinPage from "../RealTime/JoinPage";
import GamePage from "../RealTime/GamePage";
import StepC1 from './StepC1'

const StepByStep = ({cont, createGame, joinGame}) => {
    const [wallet, setWallet] = useState()
    const [temp, setTemp] = useState(0)
    const [tour, setTour] = useState(false)
    const [tourID, setTourID] = useState(1)
    const [nbQ, setNBQ] = useState(5)
    const [prixQ, setPrixQ] = useState(35)
    const [joinPage, setJoinPage] = useState(true)
    const { addToast } = useToasts()

    useEffect(()=>{
        setInterval(()=>{
            setTemp((prevTemp)=>prevTemp+1)
        }, 3000)
    }, [])

    useEffect(()=>{
        getrealtime()
    }, [temp])

    const getrealtime = () => {
        request.getWallet().then(res => setWallet(res.montant))
    }

    const endChoiceQ = () => {
        setTour(true)
    }

    const handleCreateLa = () => {
        setJoinPage(false)
    }

    const endGoJoin = () => {
        if (wallet >= prixQ) {
            request.postPayQ(prixQ)
            .then((res) => {
                cont()
                createGame(prixQ, nbQ, tourID)
            })

        } else {
            addToast("vous n'avez pas assez d'argent sur votre compte, veuillez l'augmenter pour continuer!!", {appearance: 'error', autoDismiss: true})
        }
    }

    if (joinPage === true) {
        return <StepC1 joinGame={joinGame} handleCreateLa={handleCreateLa} conthandle={cont} />;
    } else {
        if (tour === true){
            return (
                <Tour setTourID={setTourID} endGoJoin={endGoJoin}/>
            )
        } else {
            return (
                <Radio endChoiceQ={endChoiceQ} setNBQ={setNBQ} setPrixQ={setPrixQ}/>
            )
        }
    }
}

function GameCountdown({ number }) {
  return (
    <div className="absolute w-full h-screen flex items-center">
      <div className="max-w-sm mx-auto content-center font-thin">
        le Jeu demare dans
        <div className="text-6xl text-center">
          {number}
        </div>
      </div>
    </div>
  );
}

class LiveQuiz extends React.Component {
  constructor(props) {
    super(props);
    // this.SERVER = "http://localhost:4000";
    this.SERVER = "https://nodeser.quizapay.com";
    this.socket = io(this.SERVER, {autoConnect: true,})
    this.state = {
      userAnswer: "-1",
      gameID: "",
      NQuestions: 5,
      appState: "init",
      isGameCreator: false,
      numJoiners: 0,
      updatedIndex: 0,
      gameOver: false,
    };
  }

  componentDidMount() {
    this.setState({
      socket: io(this.SERVER, {autoConnect: true,})
    })
    this.socket.on(
      "start countdown",
      ({ countdownLength, questionLength, numberQuestions }) => {
        this.countdownTimer(countdownLength, "gameCountdown");
        this.setState({
          appState: "countdown",
          questionLength: questionLength,
          countdownLength: countdownLength,
          numberQuestions: numberQuestions,
        });
      }
    );
    this.socket.on("question", (q) => {
      console.log(`recieved question:  ${JSON.stringify(q)}`);
      this.setState({
        appState: "play",
        currentQuestion: q,
        correctAnswer: undefined,
        userAnswer: "-1",
      });
      this.countdownTimer(this.state.questionLength, "questionCountdown");
    });
    this.socket.on("request answer", () => {
      this.socket.emit(
        "validate answer",
        {
          answer: this.state.userAnswer,
          questionNum: this.state.currentQuestion.index,
          gameID: this.state.gameID,
        },
        ({ isCorrect, correctAnswer }) => {
          this.setState((prevState) => {
            return {
              correctAnswer: correctAnswer,
              updatedIndex: prevState.updatedIndex + 1,
            };
          });
          if (this.state.userAnswer !== undefined){
            if (this.state.userAnswer === correctAnswer) {
                request.postAnswerChallenge(this.state.gameID, 'true')
            } else {
                request.postAnswerChallenge(this.state.gameID, 'false')
            }
          }
        }
      );
    });
    this.socket.on("players", (p) => {
      console.log(`update players:  ${JSON.stringify(p)}`);
      this.setState({ players: p });
    });
    this.socket.on("joining", (n) => {
      this.setState({ numJoiners: n });
    });
    this.socket.on("game over", () => {
      this.setState({
        currentQuestion: undefined,
        // correctAnswer: undefined,
        userAnswer: "-1",
        gameOver: true,
      });
      request.postEndChallenge(this.state.gameID)
    });
  }

  emitJoining = () => {
    this.socket.emit("joining", { numInc: -1, gameID: this.state.gameID });
  };

  countdownTimer = (n, timerName) => {
    this.setState({ [timerName]: n });
    if (n > 0) {
      setTimeout(() => this.countdownTimer(n - 1, timerName), 1000);
    }
  };

  handleNewGameID = (gameID) => {
    this.setState({ gameID: gameID });
  };

  joinGame = (gameID, joinGameCallback) => {
    console.log(`join game, game id: ${gameID}`);
    this.setState({ isGameCreator: false, gameID: gameID });
    this.socket.emit("join game", gameID, (callbackData) => {
      if (callbackData.sucess) {
        this.setState({ appState: "join", gameID: callbackData.gameID }, () =>
          console.log(`gameID changed to ${this.state.gameID}`)
        );
      } else {
        this.setState({
          initError: { error: true, msg: callbackData.errorMsg },
        });
      }
    });
  };

  // joinGameCallback = ;

  createNewGame = (prixQ, nbQ, tourID) => {
    this.setState({ isGameCreator: true, appState: "join" });
    this.socket.emit("create new game", {}, (gameID) => {
      console.log(`got gameid from callback: ${gameID}`);
      this.setState({ gameID: gameID });
      this.setState({NQuestions: nbQ})
      setTimeout(() => {
        request.postCreateChallenge(prixQ, nbQ, tourID, gameID.toString())
      }, 3000);
    });
  };

  startGame = (quiz_ID) => {
    setTimeout(() => {
        this.socket.emit("start game", {quizID: quiz_ID, gameID: this.state.gameID, NQuestions: this.state.NQuestions});
        this.setState({ appState: "countdown" });
    }, 2000);
  };

  submitName = (gameID, playerName) => {
    this.socket.emit("submit name", {
      gameID: gameID,
      playerName: playerName,
    });
  };

  render() {
    if (this.state.appState === "init") {
      return (
        <StepByStep
          gameID={this.state.gameID}
          joinGame={this.joinGame}
          createGame={this.createNewGame}
          cont={() => this.setState({ appState: "join" })}
        />
      );
    }
    if (this.state.appState === "join") {
      return (
        <InitPage
          gameID={this.state.gameID}
          players={this.state.players}
          numberJoiners={this.state.numJoiners}
          isGameCreator={this.state.isGameCreator}
          categories={this.state.categories}
          submitName={this.submitName}
          startGame={this.startGame}
          emitJoining={this.emitJoining}
        />
      );
    } else if (this.state.appState === "countdown") {
      return <GameCountdown number={this.state.gameCountdown} />;
    }
    return (
      <GamePage
        gameID={this.state.gameID}
        currentQuestion={this.state.currentQuestion}
        correctAnswer={this.state.correctAnswer}
        numberQuestions={this.state.numberQuestions}
        questionCountdown={this.state.questionCountdown}
        gameOver={this.state.gameOver}
        players={this.state.players}
        updatedIndex={this.state.updatedIndex}
        userAnswer={this.state.userAnswer}
        setUserAnswer={(id) => this.setState({ userAnswer: id })}
      />
    );
  }
}

export default LiveQuiz;
