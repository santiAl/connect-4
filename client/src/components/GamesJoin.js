import { useEffect, useState } from "react";



export const GamesJoin = ({getGamesJoin,idPlayer,joinGame}) => {
    const [gamesJoin,setGamesJoin] = useState([]) // Games to join.
    const [reloadKey, setReloadKey] = useState(0);

    const handleJoinGame= (gameId,idPlayer)=>{
      joinGame(gameId,idPlayer);
      setReloadKey((prevKey) => prevKey + 1);
    };

    const refresh = ()=> {
      setReloadKey((prevKey) => prevKey + 1);
    };
    
    useEffect(()=> {         // update the list of games to join.
        getGamesJoin().then( games =>{
          setGamesJoin(games);
        } ).catch(error =>{
              console.error('Error al obtener partidas para unirse:', error);
        }
      );
      
      
      },[reloadKey]);


    return( 
    <div> 
        <button className="home_button" onClick={()=>refresh()} > Refrescar </button>
        <div className="game_list">
            {gamesJoin.length == 0 ? (<div className="no_games"> <p className="no_games_text"> No hay juegos para unirte... </p></div>) 
                            : gamesJoin.map((data)=>(
                            <div className="game_box" >
                                  <h1 className="game_text"> Numero de juego: {data[0]} </h1>
                                  <h1 className="game_text"> Rival: Guest{data[1]} </h1>
                                  <button className="home_button_list" onClick={()=>handleJoinGame(data[0],idPlayer)} > Join </button>
                            </div>
                        ))}
        </div>
    </div>);

}