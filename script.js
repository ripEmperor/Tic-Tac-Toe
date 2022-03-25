const gameBoard = (() => {
    let gameBoardArray = [null,null,null,null,null,null,null,null,null];
    let playerCache = []
    let markers = ['x', 'o']
    let markerId = [[0,1,2], [3, 4, 5], [6,7,8]]
    let winnerL = 0;

    const visualizeBoard = function() {
        for (i in gameBoardArray) {
            if (gameBoardArray[i] != null) {
                let notNull = document.getElementById(`${i}`)
                notNull.innerHTML = gameBoardArray[i];
                console.log(gameBoardArray)
                notNull.classList.add(gameBoardArray[i])
            }
        }
    }

    const winner = function(wMarker) {
        if (wMarker == 'tie') {
            console.log('tie')
        } else {
            console.log('winner,', wMarker)
        }

        let btns = Array.from(document.querySelectorAll('.spot'))

        btns.forEach(function(btn) { 
            btn.disabled = true;
         })

        let winnerDiv = document.querySelector('.winner');
        winnerDiv.innerHTML = "Winner: " + wMarker;

        if (!(document.getElementById('restartGame'))) {
            const restartGame = document.createElement('button');
            const tictactoe = document.querySelector('.tictactoe')

            restartGame.setAttribute('id', 'restartGame');
            restartGame.setAttribute('onclick', 'gameBoard.restartGame()');
            restartGame.innerHTML = 'restart'

            tictactoe.appendChild(restartGame);
        }
    }

    const restartGame = function() {
        playerCache = []

        let btns = Array.from(document.querySelectorAll('.spot'))

        btns.forEach(function(btn) { 
            btn.disabled = false;
         })

        for (i in gameBoardArray) {
            if (gameBoardArray[i] != null) {
                let notNull = document.getElementById(`${i}`)
                notNull.innerHTML = '';
                notNull.classList.remove(gameBoardArray[i])
            }
        }

        gameBoardArray = [null,null,null,null,null,null,null,null,null]
        winnerL = 0;
    }

    const gameLogic = function() {
        for (i in markers) {
            for (j in markerId) {
                if (gameBoardArray[markerId[j][0]] == markers[i] &&
                    gameBoardArray[markerId[j][1]] == markers[i] &&
                    gameBoardArray[markerId[j][2]] == markers[i]) {
                        winner(markers[i])
                        winnerL = 1;
                        break
                } else if (
                    gameBoardArray[markerId[0][0]] == markers[i] && 
                    gameBoardArray[markerId[1][1]] == markers[i] &&
                    gameBoardArray[markerId[2][2]] == markers[i]) {
                        winner(markers[i])
                        winnerL = 1;
                        break
                } else if ( 
                    gameBoardArray[markerId[0][2]] == markers[i] && 
                    gameBoardArray[markerId[1][1]] == markers[i] &&
                    gameBoardArray[markerId[2][0]] == markers[i]) {
                        winner(markers[i])
                        winnerL = 1;
                        break
                } else if ( 
                    gameBoardArray[markerId[0][j]] == markers[i] && 
                    gameBoardArray[markerId[1][j]] == markers[i] &&
                    gameBoardArray[markerId[2][j]] == markers[i]) {
                        winner(markers[i])
                        winnerL = 1;
                        console.log('test1')
                        break
                } else if (!(gameBoardArray.includes(null)) && winnerL == 0) {
                    winner('tie')
                }
            }
        }
    }

    const placeMarker = function(index) {
        if (gameBoardArray[index] == null) {
            let marker = '';

            if (!(playerCache[playerCache.length-1] == undefined)) {
                if (playerCache[playerCache.length-1] == 'x') {
                    marker = 'o'
                } else {
                    marker = 'x'
                }
            } else if (Math.random() < 0.5) {
                marker = 'o';
                playerCache.push(marker);
                document.querySelector('.starter').innerHTML = "starter: " + marker;
                return;
            } else {
                marker = 'x';
                playerCache.push(marker);
                document.querySelector('.starter').innerHTML = "starter: " + marker;
                return;
            }

            gameBoardArray[index] = marker;
            playerCache.push(marker)

            visualizeBoard()
            gameLogic()

            if (marker == 'x') {
                document.querySelector('.starter').innerHTML = "current: " + 'o';
            } else {
                document.querySelector('.starter').innerHTML = "current: " + 'x';
            }
        }
    }

    return { placeMarker, restartGame }
})()
