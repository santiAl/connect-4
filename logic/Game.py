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
    
    # it returns the player who did the last move.
    def get_player_last_move(self):
        if (self.__move_amount % 2 == 0):
            return Square.PLAYER_ONE
        return Square.PLAYER_TWO
    
    ## if the game is ended it returns the winner.
    def get_winner(self):
        if( self.end() ):    
            if(self.__board.grid_is_full()):
                return 0
            else:
                if self.__turn == Square.PLAYER_ONE:
                    return 2
                else:
                    return 1 
        else: return None
    
    def set_board(self,new_board):
        self.__board = new_board

    def set_turn(self,player):
        self.__turn = Square(player)

    def get_move_amount(self):
        return self.__move_amount
    
    # puts a piece regardless of the rules of the game
    def strcit_put_token(self,row,col,player):
        self.__board.strcit_put_token(row,col,player)
        self.set_turn(1) if player == 2 else self.set_turn(2)   ## set turn to the opponent.
    
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
        return self.__board.check_winner() or self.__board.grid_is_full()
    
    