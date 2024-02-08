import { useEffect, useState } from "react";

export const History= ( {getGamesHistory,showGrid} ) =>{
     const [gamesHistory,setGamesHistory] = useState([]);
     const [reloadKey, setReloadKey] = useState(0);


     const refresh = ()=> {
        setReloadKey((prevKey) => prevKey + 1);   // to reload the component.
      };


     useEffect( (  )=>{
        
        getGamesHistory().then( games =>{
            console.log(games);
            setGamesHistory(games);
          } ).catch(error =>{
                console.error('Error al obtener partidas:', error);
          }
        );

     }
        ,[reloadKey]);

    return(<div className="home"> 
    <button className="home_button" onClick={()=> refresh()} > Refrescar </button>
    
    <div className="game_list">
        
        {gamesHistory.length === 0 ? (<div className="no_games"> <p className="no_games_text"> Todavia no tienes juegos... </p></div>) 
                    : (gamesHistory.map((data)=>(
                        <div className={ data[2] == data[3] ? "game_box_your_turn" : data[2] == 0 ? "game_box": "game_box_defeat"}>
                          <h1 className="game_text"> Numero de juego: {data[0]} </h1>
                          <h1 className="game_text">  { 'Oponente: Guest' + data[1] }  </h1>
                          <button className="home_button_list" onClick={()=> showGrid(data[0])} > Ir al tablero </button>
                        </div>
                    )))}
    </div>
    
</div>);

}