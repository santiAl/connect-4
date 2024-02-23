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


function App() {
  const [gameId, setGameId] = useState(undefined);
  const [idPlayer, setIdPlayer] = useState(undefined);
  const navigate = useNavigate();

  const configTabs = 1;         // A new player is created when you open a new tab.
  const configWindows = 2;      // A new player is created when you open a new window.

  const config = configTabs;    // Current configuration.
  
  // Return a json with the current games.
  const getGames = async (idPlayer)=>{
    try{
        if (idPlayer == undefined) { return [] };
        const response = await fetch(`http://127.0.0.1:5000/get_games/${idPlayer}`,{method: 'GET'})
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        let res = await response.json();
        return res;
      }
      catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
  
  }

  // Return a json with the ended games.
  const getGamesHistory = async (idPlayer)=>{
    try{
        if (idPlayer == undefined) { return [] };
        const response = await fetch(`http://127.0.0.1:5000/get_games_history/${idPlayer}`,{method: 'GET'})
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        let res = await response.json();
        return res;
      }
      catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
  
  }

  // Return a json with games to join.
  const getGamesJoin = async (idPlayer) => {
    try{
        if (idPlayer == undefined) { return [] };
        const response = await fetch(`http://127.0.0.1:5000/get_games_join/${idPlayer}`,{method: 'GET'})
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        let res = await response.json();
        return res;
      }
      catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
  
  }


  // Returns the grid, the turn and the game state (if it's end or not). 
  const getBoard = async (game_id,idPlayer) => {
    try{
        const response = await fetch(`http://127.0.0.1:5000/get_board/${game_id}/${idPlayer}`,{method: 'GET'})
  
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        let res = await response.json();

        return res;
      }
      catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
  
  }

  // Return an id for the new player. 
  const next_player = async() => {
    try{
        const response =  await fetch(`http://127.0.0.1:5000/get_player_id`,{method: 'GET',mode: 'cors',})
  
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        let res = await response.json();
        return res;
      }
      catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }

  }

  // Return the number of player (it's 1 if you have created the game or 2 if you have joined the game).
  const playerNum = async(gameId,playerId) => {
    try{
        const response =  await fetch(`http://127.0.0.1:5000/get_num_player/${gameId}/${playerId}`,{method: 'GET',mode: 'cors',})
  
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        let res = await response.json();
        return res;
      }
      catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }

  }


  async function newGame(idPlayer){
    try{
    const response = await fetch(`http://127.0.0.1:5000/new_game/${idPlayer}`,{method: 'POST'})
  
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      let res = await response.json()
      return res;
    }
    catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  
  }



async function joinGame(game_id,idPlayer){
  try{
  const response = await fetch(`http://127.0.0.1:5000/join_game/${game_id}/${idPlayer}`,{method: 'POST'})

    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    let res = await response.json()
    return res;
  }
  catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }

}

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
