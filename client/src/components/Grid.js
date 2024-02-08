import { Square } from './Square.js';
import React, { useState, useEffect,useRef} from 'react';
import '../css/Grid.css';
import { json } from 'react-router-dom';
import Popup from 'react-popup';
import {openPopup, openPopupDefeat, openPopupWin} from './PopupFunctions.js';
import { useNavigate } from 'react-router-dom';

export function Grid({updateGrid,amount,putToken,gameId,getPlayerNum}){
    
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
    const [playerNum,setPlayerNum] = useState(undefined);
    const rowPreviewRef = useRef(null);
    const navigate = useNavigate();   // it is for do redirects.

    const heigth = 6;
    const playerOnePreview = 3;
    const playerTwoPreview = 4;



    const putTokenNew = (index,gameId)=>{
        putToken(index,gameId);
    };

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


     const removeGame= async (gameId )=>{
        try{
          const response =  await fetch(`http://127.0.0.1:5000/remove_game/${gameId}`,{method: 'POST',mode: 'cors',})
    
          if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
          }
          console.log("ejecuta");    
        }
        catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
    
      }

    const returnHome = ()=>{
        navigate('/');
    };

    const handleRemoveGame = ()=>{
        removeGame(gameId);
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
                    if(rowPreviewRef.bool){      
                        rowPreviewRef.current = row - 1;
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

    useEffect(()=> {
                
            if(! isEnd ){        // if it's not ended.
                updateGrid().then(json => { 
                    if(! json.isEnd ){      
                        setGrid(JsonToGrid(json.grid));
                        setTurn(json.turn);
                    }else{
                        setIsEnd(true);   
                        setGrid(JsonToGrid(json.grid));
                        if( !json.turn && turn != undefined){  // when turn is undefined the user is entering from /history.
                            openPopupWin({returnHome});
                        }else{ if(json.turn && turn != undefined){ openPopupDefeat({returnHome}); } };  
                    }    
                }
                ).catch(error => {
                    console.error('Error al obtener el nuevo grid:', error);
                });
            }


        return ()=>{

        };
        

    },[amount]);



    useEffect(()=> {
                
            if(! isEnd ){        // if it's not ended.
                console.log(getPlayerNum());
                getPlayerNum().then(json => { 
                    setPlayerNum(json.playerNum);
                }
                ).catch(error => {
                    console.error('Error al obtener el nuevo grid:', error);
                });
            }

    

    },[]);

    
    return(
        <div className='hole_grid'>
            <div className='buttons_grid'>        
                    { !isEnd ?      // if it's not ended.
                    Array.from({length: 7},(_,index) => (   // buttons to put the tokens.
                        turn ? <button onClick={()=> putTokenNew(index,gameId)} onMouseEnter={()=>setPreview(index)} 
                                onMouseLeave={()=>quitPreview(index)} className={playerNum==1 ? 'col-button' : 'col-button-player-two'}> ▼  </button>
                             : <button onClick={()=> openPopup() } 
                             className={playerNum==1 ? 'col-button' : 'col-button-player-two'} style={{ cursor: 'auto' } }> ▼ </button>
                    )) 
                    : <button className="go_back" onClick={()=> navigate(-1)} > {'<< Volver'}  </button> } 
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