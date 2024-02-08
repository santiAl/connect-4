import pytest
from logic import *


@pytest.mark.parametrize("col,pos_expected",[(0,(4,0)),(1,(5,1)),(2,(5,2)),(3,(5,3)),(4,(5,4)),(5,(5,5)),(6,(5,6))])
def test_put_token(col,pos_expected):
    b = Board()
    b.put_token(0,Square(1))
    b.put_token(col,Square(1))
    assert(b.get_grid()[pos_expected[0]][pos_expected[1]].value == 1)



def test_grid_is_full():
    b = Board()
    for i in range(7):
        b.set_tokens(i,6)
    assert(b.grid_is_full())

@pytest.mark.parametrize("arr_pos,expected_result",[([(0,0),(1,1),(2,2),(3,3)],True),([ (5,0),(4,1),(3,2),(2,3) ],True),
                                                    ([(0,0),(0,1),(0,2),(0,3)],True),([(0,0),(0,1),(0,2),(0,4)],False)])
def test_check_winner(arr_pos,expected_result):
    b = Board()
    for pos in arr_pos:
        b.strcit_put_token(pos[0],pos[1],Square(1))
    assert(b.check_winner() == expected_result)



##   python -m pytest test/test_board.py