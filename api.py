from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin
from logic.Game import Game
from logic.Board import Board,BoardSchema
from logic.Square import Square
from typing import Tuple
from flask_socketio import SocketIO, emit, join_room

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

## Tuple got (id player 1, id player 2 , game ).
current_games = dict[int,Tuple[int, int, Game]]({})
next_player = 0  ## to get the players id.



@cross_origin
@socketio.on('create')
def new_game(data): 
    new_game = Game()
    game_id = len(current_games)
    current_games[game_id] = (data['idPlayer'],None,new_game)
    room = str(game_id)          
    join_room(room)     ## creates a new room .
    emit('create_response', {'game_id': game_id}, room=room)

@cross_origin
@socketio.on('join')
def join_game(data): 
    game_id = data['game_id']
    idPlayer = data['idPlayer']
    c_game = current_games[game_id]
    if(c_game[1] == None  ):
        current_games[game_id] = (c_game[0],idPlayer,c_game[2])
        room = str(game_id)          
        join_room(room)     ## join into the room.
        emit('create_response', {'game_id': game_id}, room=room)
    else:
        emit('error',{'message': "El juego al que intenta unirse ya ha comenzado."})


@cross_origin
@socketio.on('put_token')
def put_token(data):
    game_id = data['game_id']
    index = data['index']
    c_game = current_games[game_id]
    c_game[2].update_board(index)
    room = str(game_id)
    emit('put_token_response', {'game_id': game_id}, to=room)


    
@cross_origin
@app.get('/get_board/<int:game_id>/<int:idPlayer>')
def get_board(game_id,idPlayer):
    c_game = current_games[game_id]
    board_schema = BoardSchema()
    json = board_schema.dump({"grid" : c_game[2].get_board().get_grid()})
    player_num =  1 if c_game[0] == idPlayer else 2
    json["turn"] = c_game[2].get_turn().value == player_num    # if it's your turn return True , else return false .
    json["isEnd"] = c_game[2].end()
    return json
    


@cross_origin
@app.get('/get_player_id')
def get_player_id(): 
    global next_player
    next_player = next_player + 1
    return jsonify({'next_player': next_player})

@cross_origin
@app.get('/get_games/<int:playerId>')
def get_games(playerId):
    keys = [ (key,None) if(secound_element == None) else (key,first_element) if(first_element != playerId) else  (key,secound_element) 
            for key, (first_element, secound_element, _) 
            in current_games.items() if first_element == playerId or secound_element == playerId]
            ##Returns (game Id,opponent Id).  For each key,(first_element, secound_element, _) in current_games.items()   if first_element == playerId
    return keys

@cross_origin
@app.get('/get_games_join/<int:playerId>')
def get_games_join(playerId):
    keys = [(key,first_element) for key, (first_element, secound_element , _) in current_games.items() if ( (first_element != playerId) and (secound_element == None)) ]
    return keys 

@app.post('/remove_game/<int:gameId>')
def remove_game(gameId): 
    print(current_games.keys())
    if gameId in current_games.keys():
        current_games.pop(gameId)
        return jsonify({'success': gameId})
    else:
        return jsonify({'success': gameId})
    



if __name__ == '__main__':
    socketio.run(app)
    