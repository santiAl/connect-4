from logic.Board import Board
from logic.Square import Square

class Game :
    def __init__(self):
        self.__board = Board()
        self.__turn = Square.PLAYER_ONE
        self.__move_amount = 0
    
    def get_turn(self):
        return self.__turn
    
    def get_board(self):
        return self.__board
    
    def get_player_last_move(self):
        if (self.__move_amount % 2 == 0):
            return Square.PLAYER_TWO
        return Square.PLAYER_TWO
    
    def set_board(self,new_board):
        self.__board = new_board

    
    def update_board(self,col):
        self.__board.put_token(col,self.__turn)
        self.change_turn()
        self.__move_amount = self.__move_amount + 1

    def change_turn(self):
        if self.__turn == Square.PLAYER_ONE:
            self.__turn = Square.PLAYER_TWO
        else:
            self.__turn = Square.PLAYER_ONE
    
    def end(self):
        return self.__board.check_winner()
    
    