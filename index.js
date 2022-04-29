// get elements with specific id
let b1 = document.getElementById('b1')
let b2 = document.getElementById('b2')
let b3 = document.getElementById('b3')
let b4 = document.getElementById('b4')
let b5 = document.getElementById('b5')
let b6 = document.getElementById('b6')
let b7 = document.getElementById('b7')
let b8 = document.getElementById('b8')
let b9 = document.getElementById('b9')
let turn_indicator = document.getElementById('turn-indicator')

// get all elements that has the class 'grid'
let grids = document.getElementsByClassName('grid')
let turn = 'Player 1'

let html_board = [
    [b1, b2, b3],
    [b4, b5, b6],
    [b7, b8, b9]
]

let grid_coordinates = [
    {x : 0, y : 0}, {x : 0, y : 1}, {x : 0, y : 2}, 
    {x : 1, y : 0}, {x : 1, y : 1}, {x : 1, y : 2},
    {x : 2, y : 0}, {x : 2, y : 1}, {x : 2, y : 2}
]


// INITIALIZING AI 
let board = new TicTacToe.TicTacToeBoard(['','','','','','','','','']);
let aiTeam = board.oppositePlayer("X");
let aiPlayer = new TicTacToe.TicTacToeAIPlayer();
aiPlayer.initialize(aiTeam, board);


square_grids()
set_click_listeners()

// this function is used to transform the grids into square
function square_grids() {
    // loop through all the elements that has the class 'grid'
    for (let i=0; i < grids.length; i++) {
        // get computed with of the element
        let width = window.getComputedStyle(grids[i]).width

        // set height in the same value as the width
        grids[i].style.height = width
    }
}

function set_click_listeners() {
    // set click listeners for the grids
    for (let i=0; i < grids.length; i++) {
        grids[i].addEventListener('click', function() {
            grids[i].value = 'X'
            board.makeMove('O', grid_coordinates[i])
            let winner = validate_board(grids[i].id)

            if (winner) {
                disable_grids()
                turn_indicator.innerHTML = "Player wins"
            }

            else {
                turn_indicator.innerHTML = "Computer's Turn..."
            }
            
            // {x : 2, y : 2}
            // {board : {board : []}}
            // 1000 milliseconds = 1 second
            setTimeout(function(){
                let move = aiPlayer.makeMove()
                if (move != null) {
                    board.makeMove(aiPlayer, move);
                    html_board[move.x][move.y].value = 'O'

                    winner = validate_board(html_board[move.x][move.y].id)
                    
                    if (winner) {
                        disable_grids()
                        turn_indicator.innerHTML = "Computer wins"
                    }

                    else {
                        turn_indicator.innerHTML = "Player 1's Turn"
                    }
                }
            }, 1000) 
        })
    }
}

// this function will check if there is a winner
function validate_board(grid_id) {
    let patterns = {
        'b1' : [
            [b1, b2, b3],
            [b1, b4, b7],
            [b1, b5, b9]
        ],
    
        'b2' : [
            [b1, b2, b3],
            [b2, b5, b8]
        ],
    
        'b3' : [
            [b1, b2, b3],
            [b3, b5, b7],
            [b3, b6, b9]
        ],
    
        'b4' : [
            [b1, b4, b7],
            [b4, b5, b6]
        ],
    
        'b5' : [
            [b1, b5, b9],
            [b2, b5, b8],
            [b3, b5, b7],
            [b4, b5, b6]
        ],
    
        'b6' : [
            [b3, b6, b9],
            [b4, b5, b6]
        ],
    
        'b7' : [
            [b1, b4, b7],
            [b7, b5, b3],
            [b7, b8, b9]
        ],
    
        'b8' : [
            [b2, b5, b8],
            [b7, b8, b9]
        ],
    
        'b9' : [
            [b3, b6, b9],
            [b9, b5, b1],
            [b7, b8, b9]
        ]
    }
    
    let pattern = patterns[grid_id]
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i][0].value == pattern[i][1].value && pattern[i][0].value == pattern[i][2].value) {
            return true
        }
    }

    return false
}

function disable_grids() {
    for (let i = 0; i < grids.length; i++) {
        grids[i].disabled = true
    }
}