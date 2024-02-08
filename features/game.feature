# game.feature

Feature: connect-4 

# ------SCENARY #1


        Scenario: Iniciar un nuevo juego
            Given la aplicación ha sido iniciada
             When creo un nuevo juego
             Then obtengo un tablero de 6x7 celdas vacio
              And cantidad de movimientos 0
              And turno del jugador 1

# ------SCENARY #2

            Scenario: Poner una ficha por cada jugador
            Given creo un nuevo juego
            When pongo una ficha en la columna 0
            And pongo una ficha en la columna 0
            Then obtengo un tablero con una ficha del jugador 1 en la posicion (5,0)
            And obtengo un tablero con una ficha del jugador 2 en la posicion (4,0)
            And cantidad de movimientos 2
            And turno del jugador 1

# ------SCENARY #3

            Scenario: Poner una ficha en una columna llena
            Given creo un nuevo juego
            And lleno la columna 0 de fichas
            And guardo el estado actual del juego
            When pongo una ficha en la columna 0
            Then el juego es el mismo

# ------SCENARY #4

            Scenario: Ganador por fila de 4
            Given creo un nuevo juego
            And el jugador 1 pone una ficha en la posicion (0,0)
            And el jugador 1 pone una ficha en la posicion (0,1)
            And el jugador 1 pone una ficha en la posicion (0,2)
            When el jugador 1 pone una ficha en la posicion (0,3)
            Then el juego termina y el ganador es el jugador 1

# ------SCENARY #5

            Scenario: Ganador por columna de 4
            Given creo un nuevo juego
            And el jugador 2 pone una ficha en la posicion (0,0)
            And el jugador 2 pone una ficha en la posicion (1,0)
            And el jugador 2 pone una ficha en la posicion (2,0)
            When el jugador 2 pone una ficha en la posicion (3,0)
            Then el juego termina y el ganador es el jugador 2


# ------SCENARY #6

            Scenario: Ganador por escalera descendiente  de 4
            Given creo un nuevo juego
            And el jugador 1 pone una ficha en la posicion (0,0)
            And el jugador 1 pone una ficha en la posicion (1,1)
            And el jugador 1 pone una ficha en la posicion (2,2)
            When el jugador 1 pone una ficha en la posicion (3,3)
            Then el juego termina y el ganador es el jugador 1

# ------SCENARY #7

            Scenario: Ganador por escalera ascendente de 4
            Given creo un nuevo juego
            And el jugador 2 pone una ficha en la posicion (5,0)
            And el jugador 2 pone una ficha en la posicion (4,1)
            And el jugador 2 pone una ficha en la posicion (3,2)
            When el jugador 2 pone una ficha en la posicion (2,3)
            Then el juego termina y el ganador es el jugador 2


# ------SCENARY #8

            Scenario: El juego termina en empate.
            Given creo un nuevo juego
            And el tablero esta casi lleno
            When pongo una ficha en la columna 6
            Then el juego termina y el ganador es el jugador 0 











