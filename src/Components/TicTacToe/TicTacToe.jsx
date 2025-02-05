import React from 'react'
import { useState, useRef, useEffect } from 'react'
import "./TicTacToe.css"



const TicTacToe = () => {

    /* Estados de los jugadores */
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

   /* Estados del juego */ 
    let [count,setCount] = useState(0);
    let [lock,setLock ]= useState(false);
    let titleRef = useRef(null);
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""])
    
    let X = "X"
    let O = "O"


 useEffect(() => {
    checkWin();
 }, [data]);


 const toggle = (num) => {
    if (lock || data[num] !== "")return;

    const newData = [...data]; 
    newData[num] = count % 2 === 0 ? X : O;
    setData(newData); 
    setCount(count+1);
    
};

    const checkWin = () => {

        const winningCombinations = [
            [0,1,2],[3,4,5],[6,7,8], /* Filas */
            [0,3,6],[1,4,7],[2,5,8], /* Columnas */
            [0,4,8],[2,4,6] /* Diagonales */
        ]

        for (let combo of winningCombinations) {
            const [a,b,c] = combo;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                setLock(true);
                const winner = data[a] === X ? player1 : player2;
                titleRef.current.innerText =  `Congratulations ${winner}! You are the winner!`
                return;
            }
        }
         
        if(!data.includes("") && !lock){
            setLock(true);
            titleRef.current.innerText = "🤝 It is a draw!";
        }

    };

 

    const resetGame = () => {
        setData(["", "", "", "", "", "", "", "", ""]); 
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = 'Tic Tac Toe game in <span>React</span> '

    };

    /* Formulario */

    const startGame = (e) => {
        e.preventDefault();
        if(player1.trim()!== "" && player2.trim() !== ""){
            setGameStarted(true)
        }
    }

  return (

<div className="container">

<img src="./public/react.svg" alt="logo-react" className="logoReact" />



        {!gameStarted ? (
            <form onSubmit={startGame} className="form-container">
                <h2>Enter Player Names</h2>
                <input type='text' placeholder='Player 1 (X)' value={player1} onChange={(e) => setPlayer1(e.target.value)} required />
                <input type='text' placeholder='Player 2 (O)' value={player2} onChange={(e) => setPlayer2(e.target.value)} required />
                <button type='sumbit'>Start Game</button>
            </form>
        ): (
            <>

                <div className="container">
                    <h1 className="tittle" ref={titleRef}>Tic Tac Toe game in <span>React</span></h1>
                        <div className="board">
                            {data.map((value, index) => (
                                <div key={index} className="boxes" onClick={()=> toggle(index)}>
                                    {value}
                                </div>
                            ))}
                        </div>
                            <button className="reset" onClick={resetGame}>Reset</button>
                        
                </div>

            </>
        )
        }
   </div>

    
  )
}

export default TicTacToe