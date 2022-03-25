const gameBoard = (() => {
    let gameBoardArray = [null,null,null,null,null,null,null,null,null];
    let playerCache = []
    let markers = ['x', 'o']
    let markerId = [[0,1,2], [3, 4, 5], [6,7,8]]

    const visualizeBoard = function() {
        for (i in gameBoardArray) {
            if (gameBoardArray[i] != null) {
                let notNull = document.getElementById(`${i}`)
                notNull.innerHTML = gameBoardArray[i];
                notNull.classList.add(gameBoardArray[i])
            }
        }
    }

    const winner = function(wMarker) {
        console.log('winner,', wMarker)

        let btns = Array.from(document.querySelectorAll('.spot'))

        btns.forEach(function(btn) { 
            btn.disabled = true;
            console.log(btn)
         })

        console.log(btns)
    }

    const gameLogic = function() {
        for (i in markers) {
            for (j in markerId) {
                if (gameBoardArray[markerId[j][0]] == markers[i] &&
                    gameBoardArray[markerId[j][1]] == markers[i] &&
                    gameBoardArray[markerId[j][2]] == markers[i]) {
                        winner(markers[i])
                        break
                } else if (
                    gameBoardArray[markerId[0][0]] == markers[i] && 
                    gameBoardArray[markerId[1][1]] == markers[i] &&
                    gameBoardArray[markerId[2][2]] == markers[i]) {
                        winner(markers[i])
                        break
                } else if ( 
                    gameBoardArray[markerId[0][2]] == markers[i] && 
                    gameBoardArray[markerId[1][1]] == markers[i] &&
                    gameBoardArray[markerId[2][0]] == markers[i]) {
                        winner(markers[i])
                        break
                } else if ( 
                    gameBoardArray[markerId[0][j]] == markers[i] && 
                    gameBoardArray[markerId[1][j]] == markers[i] &&
                    gameBoardArray[markerId[2][j]] == markers[i]) {
                        winner(markers[i])
                        break
                }
            }
        }
    }

    const placeMarker = function(index) {
        if (gameBoardArray[index] == null) {
            let marker = '';

            if (playerCache[playerCache.length-1] == 'x') {
                marker = 'o'
            } else {
                marker = 'x'
            }

            gameBoardArray[index] = marker;
            playerCache.push(marker)
            
            visualizeBoard()
            gameLogic()
        }
    }

    return { placeMarker }
})()