from .Square import Square
from marshmallow import Schema,fields

class Board :
    height = 6
    width = 7

    def __init__(self):
        self.__grid = [[ Square.FREE for i in range(self.width) ] for j in range(self.height)]
        self.__tokens = [0 for i in range(self.width)]       ## amount of tokes in each col.
    
    def get_grid(self):
        return self.__grid
    
    def set_grid(self,new_grid):
        self.__grid = new_grid
        self.__tokens = self.calculate_tokens(new_grid)

    def get_height(self):
        return self.height
    
    def get_width(self):
        return self.width
    
    def set_tokens(self,col,amount):
        self.__tokens[col] = amount
    
    def strcit_put_token(self,row,col,square):
        self.__grid[row][col] = Square(square)
        
    def put_token(self,col,square):
        if (not  (self.col_is_full(col))  ):
            self.__grid[(self.height-self.__tokens[col]) -1][col] = square
            self.__tokens[col] = self.__tokens[col] + 1
        
    def put_token_preview(self,col):
        return (self.height-self.__tokens[col])
    
    def col_is_full(self,col):
        return (self.__tokens[col] == self.height)
    
    def grid_is_full(self):
        for a in self.__tokens:
            if( a < self.height ):
                return False
        return True

    

    def check_winner(self):
        # check rows.
        for row in range(self.height):
            for col in range(self.width-3):
                if self.__grid[row][col] == self.__grid[row][col + 1] == self.__grid[row][col + 2] == self.__grid[row][col + 3] != Square.FREE:
                    return True
        # check cols.
        for col in range(self.width):
            for row in range(self.height-3):
                if self.__grid[row][col] == self.__grid[row + 1][col] == self.__grid[row + 2][col] == self.__grid[row + 3][col] != Square.FREE:
                    return True
        # check descending diagonals.
        for row in range(self.height-3):
            for col in range(self.width-3):
                if self.__grid[row][col] == self.__grid[row + 1][col + 1] == self.__grid[row + 2][col + 2] == self.__grid[row + 3][col + 3] != Square.FREE:
                    return True
        
        # check ascending diagonals.
        for row in range(self.height-3, self.height):
            for col in range(self.width-3):
                if self.__grid[row][col] == self.__grid[row - 1][col + 1] == self.__grid[row - 2][col + 2] == self.__grid[row - 3][col + 3] != Square.FREE:
                    return True
        return False
    
    def calculate_tokens(self,new_grid):
        res = [0 for i in range(self.width)]
        for col in range(self.width):
               for row in range(self.height):
                   if( new_grid[row][col] != Square.FREE ):
                       res[col] = self.height-row
                       break
        return res        


    def __str__(self):
        matrix_str = ""
        for row in self.__grid:
            matrix_str += " ".join(map(str, row)) + "\n"
        return matrix_str.strip()

class BoardSchema(Schema):
    grid = fields.List(fields.List(fields.Str())) 


