import { Square } from './Square.js';
import React, { useState, useEffect} from 'react';
import '../css/Grid.css';
import { json } from 'react-router-dom';
import Popup from 'react-popup';
import {openPopup, openPopupDefeat, openPopupWin} from './PopupFunctions.js';
import { useNavigate } from 'react-router-dom';



export function Grid({updateGrid,amount,putToken,gameId}){
    
    const initialGrid = Array(6)
    .fill(null)
    .map( () =>
        Array(7).fill(null).map(
            ()=> ({
                squareValue : 0,
            }
        ))
    );

    const [grid,setGrid] = useState(initialGrid)
    const [turn,setTurn] = useState(undefined)
    const [isEnd,setIsEnd] = useState(false)
    const navigate = useNavigate();   // it is for do redirects.


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

    

    useEffect(()=> {
                
            if(! isEnd ){        // if it's not ended.
                updateGrid().then(json => { 
                    if(! json.isEnd ){      //
                        setGrid(JsonToGrid(json.grid));
                        setTurn(json.turn);
                    }else{
                        setIsEnd(true);   
                        setGrid(JsonToGrid(json.grid));
                        if(turn){
                            openPopupWin({returnHome,handleRemoveGame});
                        }else{ openPopupDefeat({returnHome,handleRemoveGame}); };
                        
                    }    
                }
                ).catch(error => {
                    console.error('Error al obtener el nuevo grid:', error);
                });
            }



        return ()=>{

        };
        

    },[amount]);
    
    return(
        <div className='hole_grid'>
            <div className='buttons_grid'>        
                    { !isEnd ?      // if it's not ended.
                    Array.from({length: 7},(_,index) => (   // buttons to put the tokens.
                        turn ? <button onClick={()=> putTokenNew(index,gameId)} className='col-button'> col {index} </button>
                             : <button onClick={()=> openPopup() } className='col-button'> col {index} </button>
                    )) 
                    : null } 
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