import logo from './logo.svg';
import './App.css';
import { Grid } from './components/Grid.js'
import React, { useState, useEffect} from 'react';
import { socket } from './components/socket.js';
import { Routes,Route,useNavigate,useLocation } from 'react-router-dom';
import { Layout } from './components/Layout.js'
import { Home } from './components/Home.js'
import { GamesJoin } from './components/GamesJoin.js'
import { History } from './components/History.js'
import { connect } from 'socket.io-client';
import { getGames , getGamesHistory , getGamesJoin , getBoard , next_player , playerNum , newGame, joinGame} from './services/services.js';

function App() {
  const [gameId, setGameId] = useState(undefined);
  const [idPlayer, setIdPlayer] = useState(undefined);
  const navigate = useNavigate();

  const configTabs = 1;         // A new player is created when you open a new tab.
  const configWindows = 2;      // A new player is created when you open a new window.

  const config = configTabs;    // Current configuration.


  // Change the game id and go to the grid.
  const showGrid = (idGame)=> {
      setGameId(idGame);
      navigate('/grid');
  };


  useEffect(()=> {
    
    socket.connect();

    if ((localStorage.getItem('idPlayer') != null) && config == configWindows) {
        setIdPlayer(parseInt(localStorage.getItem('idPlayer')));    // Set the idPlayer.
    }
    else{
          next_player().then( json =>{      // gets the player id.
              setIdPlayer(json.next_player);
              if (config == configWindows){  localStorage.setItem('idPlayer',json.next_player) };  // Set the localStorage to save the idPlayer.
            } ).catch(error =>{
                  console.error('Error al obtener el nuevo jugador:', error);
            }
          );
  }
  socket.on('connect',()=>{console.log("Socket conectado.")});
  return ()=>{
    socket.disconnect();    // the socket is created with the component and when the component is distroyed the socket is disconected.
  };

  },[]);


  return (
    <div className="App">
        
        <Routes>
            <Route path='/' element={<Layout/>} >
                <Route path='/' element = {<Home newGame={()=> newGame(idPlayer)} getGames={()=>getGames(idPlayer)} showGrid={showGrid} />} />
                <Route path='/join' element = {<GamesJoin  getGamesJoin={()=>getGamesJoin(idPlayer) } idPlayer={idPlayer} joinGame={joinGame} />} />
                <Route path='/grid' element = {<Grid updateGrid={()=> getBoard(gameId,idPlayer)}
                                              gameId={gameId} getPlayerNum={()=> playerNum(gameId,idPlayer) } />} />
                <Route path='/history' element = {<History getGamesHistory={()=>getGamesHistory(idPlayer)} showGrid={showGrid} />} />
            </Route>
        </Routes>      
    </div>
  );
}

export default App;
