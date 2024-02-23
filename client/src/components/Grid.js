import { Square } from './Square.js';
import React, { useState, useEffect,useRef} from 'react';
import '../css/Grid.css';
import Popup from 'react-popup';
import {openPopup, openPopupDefeat, openPopupWin,openPopupConnection} from './PopupFunctions.js';
import { useNavigate } from 'react-router-dom';
import { socket } from './socket.js';

export function Grid({updateGrid,gameId,getPlayerNum}){
    
    const initialGrid = Array(6)
    .fill(null)
    .map( () =>
        Array(7).fill(null).map(
            ()=> ({
                squareValue : 0,
            }
        ))
    );

    const [grid,setGrid] = useState(initialGrid);
    const [turn,setTurn] = useState(undefined);
    const [isEnd,setIsEnd] = useState(false);          
    const [playerNum,setPlayerNum] = useState(undefined);       // if you're the red player (player 1) or the blue player.
    const rowPreviewRef = useRef(null);         // Used in the preview.
    const [socState,setSockState] =  useState(false);   // it's true if the socket is connected or false if the socket is not connected.
    const [reloadKey,setReloadKey] = useState(false);       // Used to reload the component.
    const navigate = useNavigate();   // it is for do redirects.

    const heigth = 6;
    const playerOnePreview = 3;
    const playerTwoPreview = 4;



      // Put token into the game. Index is the number of column where you want to put the token.
  const putToken = async (index,game_id) => {
            socket.emit('put_token', {index : index , game_id: game_id});    
  }
    // Given a json with the grid returns an array with the grid.
    function JsonToGrid(new_grid){
  
        const res = Array(6).fill(null).map( (_,i) =>
         Array(7).fill(null).map(
             (_,j)=> ({
               squareValue : new_grid[i][j] === 'Square.FREE' ? 0 : new_grid[i][j] === 'Square.PLAYER_ONE' ? 1 : 2,
             }
             
         ))
     );
           return res;
     }

    const returnHome = ()=>{
        navigate('/');
    };

    const tokenPreview = (col)=>{
        const newGrid = JSON.parse(JSON.stringify(grid.map(row => [...row])));
        for(let i=0; i < heigth ; i++ ){
            if( newGrid[i][col].squareValue != 0){
                return i;
            }
        }
        return heigth;
    }


    // provides a vizualization of the token position.
    const setPreview = (col)=>{
        const newGrid = JSON.parse(JSON.stringify(grid.map(row => [...row])));
        rowPreviewRef.bool = true;
        setTimeout(()=>{     
                    const row = tokenPreview(col);  
                    if(row != 0){
                        if(playerNum == 1){ newGrid[row-1][col].squareValue = playerOnePreview; }
                        else{ newGrid[row-1][col].squareValue = playerTwoPreview;}; 
                    }
                    if(rowPreviewRef.bool){      // It's false if the onMouseLeave event is executed before the onMouseEnter event.
                        setGrid(newGrid);      
                    }

        },0); 
    }

    // delete the vizualization.
    const quitPreview = (col)=>{
        const newGrid = JSON.parse(JSON.stringify(grid.map(row => [...row])));
        setTimeout(() => {
            rowPreviewRef.bool = false;
            for(let i=0; i<heigth ; i++){
               if(newGrid[i][col].squareValue == playerOnePreview || newGrid[i][col].squareValue == playerTwoPreview ){
                    newGrid[i][col].squareValue = 0;
                    break;
                }

            }
            setGrid(newGrid);
        }, 0);
    }

    const refresh = ()=> {
        setReloadKey(!reloadKey);
      };

    useEffect(()=> {
                

        socket.on('put_token_response',(response)=>{
            if(! response.isEnd ){      
                setGrid(JsonToGrid(response.grid));
                setTurn(response.turn === playerNum);
            }else{
                setIsEnd(true);   
                setGrid(JsonToGrid(response.grid));
                if( turn  && turn != undefined){  // when turn is undefined the user is entering from /history.
                    openPopupWin({returnHome});
                }else{ if( !turn && turn != undefined){ openPopupDefeat({returnHome}); } };  
            }    
        });

        socket.on('error',(error)=>{
                console.error("Se produjo un error", error);   // Handle errors.
        });

        return ()=>{
            socket.off('put_token_response');   // Stop listening to that event.
            socket.off('error');
        };

    },[turn]);


// It's executed the first time you enter the board and each time the board need to be reloaded due to a socket disconection.
    useEffect(()=> {    
            
            if(socket.connected){
                socket.emit('join_game', { game_id : gameId }); // Join room.
                setSockState(true);
            }
            
            if(! isEnd ){        // if it's not ended.
                getPlayerNum().then(json => {      // The number of player is set.
                    setPlayerNum(json.playerNum);
                    return updateGrid();           // The board is set.
                }
                ) .then(json => { 
                    if(! json.isEnd ){      
                        setGrid(JsonToGrid(json.grid));
                        setTurn(json.turn);
                    }else{
                        setIsEnd(true);   
                        setGrid(JsonToGrid(json.grid)); 
                    }    
                }
                ).catch(error => {
                    console.error('Error al obtener el nuevo grid:', error);
                });
            }

            socket.on('disconnect',()=>{
                    openPopupConnection({refresh});
                    setSockState(false);
            });
            
            return ()=>{
                socket.off('disconnect');
                socket.emit('leave_game', { game_id : gameId } );   // When you leave the board, you leave the room.
            };
    

    },[reloadKey]);

    
    return(
        <div className='hole_grid'>
            <div className='buttons_grid'>        
                    { socState ? !isEnd ?      // if it's not ended.
                    Array.from({length: 7},(_,index) => (   // buttons to put the tokens.
                        turn ? <button onClick={()=> putToken(index,gameId)} onMouseEnter={()=>setPreview(index)} 
                                onMouseLeave={()=>quitPreview(index)} className={playerNum==1 ? 'col-button' : 'col-button-player-two'}> ▼  </button>
                             : <button onClick={()=> openPopup() } 
                             className={playerNum==1 ? 'col-button' : 'col-button-player-two'} style={{ cursor: 'auto' } }> ▼ </button>
                    )) 
                    : <button className="go_back" onClick={()=> navigate(-1)} > {'<< Volver'}  </button>
                    : <button className="home_button" onClick={()=>refresh()} > Refrescar </button> } 
            </div>
            <div className='Grid'> 
                {grid.map((row,i) => (      // grid render.
                <div className='row'>
                    {row.map((col,j)=>(
                        <Square value={grid[i][j].squareValue}/>
                    ))}
                </div>  ))}
            </div>
            <Popup />
        </div>
    )

}