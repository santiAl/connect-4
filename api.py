from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin
from logic.Game import Game
from logic.Board import Board,BoardSchema
from logic.Square import Square
from typing import Tuple
from flask_socketio import SocketIO, emit, join_room, leave_room, rooms
from app import *
import os
from itertools import count

app = create_app(os.getenv('FLASK_CONFIG') or 'default')

##app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

## Tuple got (id player 1, id player 2 , game ).
current_games = dict[int,Tuple[int, int, Game]]({})
next_player = count(start=0)  ## to get the players id.
game_id_counter = count(start=0)



@app.post('/new_game/<int:idPlayer>')
def new_game(idPlayer): 
    new_game = Game()
    game_id = next(game_id_counter)
    current_games[game_id] = (idPlayer,None,new_game)
    return jsonify({'game_id': game_id})

@app.post('/join_game/<int:game_id>/<int:idPlayer>')
def join_game(game_id,idPlayer): 
    game_id = game_id
    idPlayer = idPlayer
    c_game = current_games[game_id]
    if(c_game[1] == None  ):
        current_games[game_id] = (c_game[0],idPlayer,c_game[2])
        return jsonify({'game_id': game_id})
    else:
        raise ValueError("El juego al que intenta unirse ya ha comenzado.")


@socketio.on('join_game')
def join(data): 
    game_id = data['game_id']
    room = str(game_id)          
    join_room(room)     ## join into the room.
    emit('join_response', {'game_id': game_id}, room=room)

@socketio.on('leave_game')
def leave(data):
    game_id = data['game_id']
    room = str(game_id)
    leave_room(room)


## Returns the grid, the turn and the game state (if it's end or not). 
@socketio.on('put_token')
def put_token(data):
    game_id = data['game_id']      
    index = data['index']      ## column where you want to set the token.
    c_game = current_games[game_id]
    c_game[2].update_board(index)
    room = str(game_id)
    board_schema = BoardSchema()
    json = board_schema.dump({"grid" : c_game[2].get_board().get_grid()})  
    json["turn"] = c_game[2].get_turn().value    # if it's your turn return True , else return false .
    json["isEnd"] = c_game[2].end()
    emit('put_token_response', json , to=room)



## Returns the grid, the turn and the game state (if it's end or not). 
@app.get('/get_board/<int:game_id>/<int:idPlayer>')
def get_board(game_id,idPlayer):
    c_game = current_games[game_id]
    board_schema = BoardSchema()
    json = board_schema.dump({"grid" : c_game[2].get_board().get_grid()})  
    player_num =  1 if c_game[0] == idPlayer else 2
    json["turn"] = c_game[2].get_turn().value == player_num    # if it's your turn return True , else return false .
    json["isEnd"] = c_game[2].end()
    return json


# Returns the num of player you are. If you've created the game you're PlayerOne else you're PlayerTwo.
@app.get('/get_num_player/<int:game_id>/<int:idPlayer>')
def get_num_player(game_id,idPlayer):
    c_game = current_games[game_id]
    player_num =  1 if c_game[0] == idPlayer else 2
    return jsonify({'playerNum': player_num})
    

# Returns the next player id. (When other window is opened)
@app.get('/get_player_id')
def get_player_id(): 
    next_id = next(next_player)
    return jsonify({'next_player': next_id})

# given a playerId return a list of games.
@app.get('/get_games/<int:playerId>')
def get_games(playerId):
    keys = [ (key,None,game.get_turn().value == 1,False) if(secound_element == None) 
            else (key,first_element,game.get_turn().value == 2,game.end()) if(first_element != playerId) 
            else  (key,secound_element,game.get_turn().value == 1,game.end()) 
            for key, (first_element, secound_element, game) 
            in current_games.items() if (first_element == playerId or secound_element == playerId) and not game.end()]
            ##Returns (game Id,opponent Id,turn,gameIsEnd).  For each key,(first_element, secound_element, _) in current_games.items()   if first_element == playerId
    return keys

# given a playerId return a list of games to join.
@app.get('/get_games_join/<int:playerId>')
def get_games_join(playerId):
    keys = [(key,first_element) for key, (first_element, secound_element , _) in current_games.items() 
            if ( (first_element != playerId) and (secound_element == None)) ]
    return keys 


# given a playerId return a list of games which are over.
@app.get('/get_games_history/<int:playerId>')
def get_games_history(playerId):
    keys = [ (key,first_element,game.get_winner(),2) if(first_element != playerId) 
            else  (key,secound_element,game.get_winner(),1) 
            for key, (first_element, secound_element, game) 
            in current_games.items() if (first_element == playerId or secound_element == playerId) and game.end()]
            ##Returns (game Id,opponent Id,gameWinner,your playerNum).  For each key,(first_element, secound_element, game) in current_games.items()   if first_element == playerId
    return keys


# given a gameId remove that game from current_games.
@app.post('/remove_game/<int:gameId>')
def remove_game(gameId): 
    if gameId in current_games.keys():
        current_games.pop(gameId)
        return jsonify({'success': gameId})
    else:
        return jsonify({'success': gameId})
    



if __name__ == '__main__':
    socketio.run(app)
    