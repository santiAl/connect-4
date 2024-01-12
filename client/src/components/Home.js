import { useEffect, useState,useRef } from "react";
import { Outlet,Routes,Route } from "react-router-dom";
import '../css/Home.css';
import { usePageVisibility } from 'react-page-visibility';
import { redirect } from "react-router-dom";



export const Home = ({newGame,getGames,showGrid}) => {
    
    const isPageVisible = usePageVisibility();
    const [myGames,setMyGames] = useState([])  // Current games.
    const [reloadKey, setReloadKey] = useState(0);
    const timerIdRef = useRef(null);
    const [isPollingEnabled, setIsPollingEnabled] = useState(true);



    const handleNewGame= ( ) =>{
        newGame();
        setReloadKey((prevKey) => prevKey + 1);  // to reload the component.
    }
    
    const refresh = ()=> {
      setReloadKey((prevKey) => prevKey + 1);   // to reload the component.
    };
    


      useEffect(()=> {
        const pollingCallback = () => {
                getGames().then( games =>{
                  console.log(games);
                  setMyGames(games);
                } ).catch(error =>{
                      console.error('Error al obtener partidas:', error);
                }
              );
    
          
        };
        const startPolling = () => {
          pollingCallback(); // To immediately start fetching data
          // Polling every 5 seconds.
          timerIdRef.current = setInterval(pollingCallback, 5000);
        };

        const stopPolling = () => {
          clearInterval(timerIdRef.current);
        };

        if (isPageVisible && isPollingEnabled) {
          startPolling();
        } else {
          stopPolling();
        }

        return () => {
          stopPolling();
        };

        
      },[isPageVisible, isPollingEnabled,reloadKey])
    




    return( 
    <div className="home"> 
        
        <button className="home_button" onClick={()=> handleNewGame()}> new_game </button>
        <button className="home_button" onClick={()=> refresh()} > refresh </button>
        
        <div className="game_list">
            {myGames.map((data)=>(
                        <div className="game_box" >
                              <h1 className="game_text"> Numero de juego: {data[0]} </h1> 
                              <h1 className="game_text"> {data[1] != null ? 'Oponente: Guest' + data[1] : 'Esperando oponente' } </h1>

                              <button className="home_button_list" onClick={()=> showGrid(data[0])} > Go to grid </button>
                        </div>
                        ))}
        </div>
        
    </div>);

}