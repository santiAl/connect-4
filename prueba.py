from logic.Board import Board
from logic.Square import Square
from logic.Game import Game


board = Board()
new_grid_1 = [
    [Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE],
    [Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE],
    [Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE],
    [Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE],
    [Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE],
    [Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE, Square.FREE],
]
# ascending case.
new_grid_2 = [
    [Square.FREE, Square.FREE       , Square.FREE      , Square.FREE      , Square.PLAYER_ONE, Square.FREE, Square.FREE],
    [Square.FREE, Square.FREE       , Square.FREE      , Square.PLAYER_ONE, Square.FREE      , Square.FREE, Square.FREE],
    [Square.FREE, Square.FREE       , Square.PLAYER_ONE, Square.FREE      , Square.FREE      , Square.FREE, Square.FREE],
    [Square.FREE, Square.PLAYER_ONE , Square.FREE      , Square.FREE      , Square.FREE      , Square.FREE, Square.FREE],
    [Square.FREE, Square.FREE       , Square.FREE      , Square.FREE      , Square.FREE      , Square.FREE, Square.FREE],
    [Square.FREE, Square.FREE       , Square.FREE      , Square.FREE      , Square.FREE      , Square.FREE, Square.FREE],
]
# descending case.
new_grid_3 = [
    [Square.FREE, Square.FREE, Square.FREE      , Square.FREE      , Square.FREE      , Square.FREE      , Square.FREE],
    [Square.FREE, Square.FREE, Square.PLAYER_TWO, Square.FREE      , Square.FREE      , Square.FREE      , Square.FREE],
    [Square.FREE, Square.FREE, Square.FREE      , Square.PLAYER_TWO, Square.FREE      , Square.FREE      , Square.FREE],
    [Square.FREE, Square.FREE, Square.FREE      , Square.FREE      , Square.PLAYER_TWO, Square.FREE      , Square.FREE],
    [Square.FREE, Square.FREE, Square.FREE      , Square.FREE      , Square.FREE      , Square.PLAYER_TWO, Square.FREE],
    [Square.FREE, Square.FREE, Square.FREE      , Square.FREE      , Square.FREE      , Square.FREE      , Square.FREE],
]

board.set_grid(new_grid_3)
#print(board.check_winner())
game = Game()
while (not game.end()) :
    print("Turno del jugador" + str(game.get_turn().value))
    print(game.get_board())
    value = input("Ingrese una columna: ")
    game.update_board(int(value))
    

