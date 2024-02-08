import pytest
from logic import *

@pytest.mark.parametrize("arr_pos,num_player,expected_winner",[([(0,0),(0,1),(0,2),(0,3)],1,1),([(0,1),(0,2),(0,3),(0,4)],2,2)])
def test_check_winner(arr_pos,num_player,expected_winner):
    g = Game()
    for pos in arr_pos:
        g.strcit_put_token(pos[0],pos[1],num_player)
    assert(g.get_winner() == expected_winner)


@pytest.mark.parametrize("current_turn,expected_turn",[(1,2),(2,1)])
def test_change_turn(current_turn,expected_turn):
    g = Game()
    g.set_turn(current_turn)
    g.change_turn()
    assert(g.get_turn().value == expected_turn )

                                                # list of moves (col)  -  player_last_move
@pytest.mark.parametrize("moves,player_expected",[([1,0,2,3,4],2),([1,3],1),[[5],2]])
def test_get_player_last_move(moves,player_expected):
    g = Game()
    for move in moves:
        g.update_board(move)
    assert(g.get_player_last_move().value == player_expected )

    # python -m pytest test