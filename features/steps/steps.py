from behave import *
from logic.Game import Game
from logic.Square import Square

@given('la aplicación ha sido iniciada')
def step_given_app_not_initialized(context):
    pass

@step('creo un nuevo juego')
def step_create_new_game(context):
    context.game = Game()
    

@then('obtengo un tablero de 6x7 celdas vacio')
def step_get_board(context):
    board = context.game.get_board()
    assert(board.get_height() == 6 and board.get_width() == 7)

@step('cantidad de movimientos {number:d}')
def step_get_moves(context,number):
    assert(context.game.get_move_amount() == number)

@step('turno del jugador {number:d}')
def step_get_turn(context,number):
    assert(context.game.get_turn().value == number)

@step('pongo una ficha en la columna {number:d}')
def step_put_token(context,number):
    context.game.update_board(number)


@step('obtengo un tablero con una ficha del jugador {number:d} en la posicion ({pos_x:d},{pos_y:d})')
def step_check_pos(context,number,pos_x,pos_y):
    assert( context.game.get_board().get_grid()[pos_x][pos_y].value == number )


@step('lleno la columna {number:d} de fichas')
def step_fill_column(context,number):
    for i in range(5):
        context.game.update_board(number)

@step('guardo el estado actual del juego')
def step_save_game(context):
    context.old_game = context.game

@then('el juego es el mismo')
def step_check_grid(context):
   first_condition = context.game.get_board().get_grid() == context.old_game.get_board().get_grid()
   secound_condition = context.game.get_move_amount() == context.old_game.get_move_amount()
   third_condition = context.game.get_turn().value == context.old_game.get_turn().value
   assert( first_condition and secound_condition and third_condition )


@step('el jugador {number:d} pone una ficha en la posicion ({pos_x:d},{pos_y:d})')
def step_strict_put_token(context,number,pos_x,pos_y):
   context.game.strcit_put_token(pos_x,pos_y,number)

@then('el juego termina y el ganador es el jugador {number:d}')
def step_game_is_end(context,number):
   assert(context.game.get_winner() == number)


@step('el tablero esta casi lleno')
def board_almost_full(context):
    context.game.get_board().set_tokens(0,6)
    context.game.get_board().set_tokens(1,6)
    context.game.get_board().set_tokens(2,6)
    context.game.get_board().set_tokens(3,6)
    context.game.get_board().set_tokens(4,6)
    context.game.get_board().set_tokens(5,6)
    context.game.get_board().set_tokens(6,5)  ## the last column is not full. A token is missing in the col 6.

    
