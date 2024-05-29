  // Return a json with the current games.
  export const getGames = async (idPlayer)=>{
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
    export const getGamesHistory = async (idPlayer)=>{
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
  export const getGamesJoin = async (idPlayer) => {
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
    export const getBoard = async (game_id,idPlayer) => {
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
  export const next_player = async() => {
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
    export const playerNum = async(gameId,playerId) => {
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


     export async function newGame(idPlayer){
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

     export async function joinGame(game_id,idPlayer){
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

