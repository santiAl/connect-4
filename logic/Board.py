from .Square import Square

class Board :
    def __init__(self):
        self.__grid = [[ Square.FREE for i in range(7) ] for j in range(6)]
        self.__tokens = [0 for i in range(7)]       ## amount of tokes in each col.
    
    def get_grid(self):
        return self.__grid
    
    def set_grid(self,new_grid):
        self.__grid = new_grid
        self.__tokens = self.calculate_tokens(new_grid)
    
    def put_token(self,col,square):
        if (not  (self.col_is_full(col))  ):
            self.__grid[(6-self.__tokens[col]) -1][col] = square
            self.__tokens[col] = self.__tokens[col] + 1
    

    def col_is_full(self,col):
        return (self.__tokens[col] == 6)
    

    def check_winner(self):
        # check rows.
        for row in range(6):
            for col in range(4):
                if self.__grid[row][col] == self.__grid[row][col + 1] == self.__grid[row][col + 2] == self.__grid[row][col + 3] != Square.FREE:
                    return True
        # check cols.
        for col in range(7):
            for row in range(3):
                if self.__grid[row][col] == self.__grid[row + 1][col] == self.__grid[row + 2][col] == self.__grid[row + 3][col] != Square.FREE:
                    return True
        # check descending diagonals.
        for row in range(3):
            for col in range(4):
                if self.__grid[row][col] == self.__grid[row + 1][col + 1] == self.__grid[row + 2][col + 2] == self.__grid[row + 3][col + 3] != Square.FREE:
                    return True
        
        # check ascending diagonals.
        for row in range(3, 6):
            for col in range(4):
                if self.__grid[row][col] == self.__grid[row - 1][col + 1] == self.__grid[row - 2][col + 2] == self.__grid[row - 3][col + 3] != Square.FREE:
                    return True
        return False
    
    def calculate_tokens(self,new_grid):
        res = [0 for i in range(7)]
        for col in range(7):
               for row in range(6):
                   if( new_grid[row][col] != Square.FREE ):
                       res[col] = 6-row
                       break
        return res        


    def __str__(self):
        matrix_str = ""
        for row in self.__grid:
            matrix_str += " ".join(map(str, row)) + "\n"
        return matrix_str.strip()

 


