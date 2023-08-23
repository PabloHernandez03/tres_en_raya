


class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.image('bg', 'assets/sky.png');
    }

    create ()
    {
        let currentPlayer = "X"
        let isWinner = false;
        this.add.image(300, 300, 'bg');
        const board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        
        const tileSize = 100
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile = this.add.rectangle(
                    j * tileSize + tileSize / 2,
                    i * tileSize + tileSize / 2,
                    tileSize, tileSize, 0xffffff
                ).setInteractive();
                tile.setStrokeStyle(2, 0x1a65ac);
        
                tile.on('pointerdown', () => {
                    if (board[i][j] === null && !isWinner) {
                        // Realiza la jugada
                        board[i][j] = currentPlayer; // currentPlayer es una variable que almacena el símbolo actual (X u O)
                
                        // Dibuja el símbolo en el tablero
                        const symbol = currentPlayer === 'X' ? 'X' : 'O';
                        const text = this.add.text(tile.x, tile.y, symbol, {
                            font: '64px Arial',
                            fill: '#000'
                        }).setOrigin(0.5);
                
                        // Verificar si hay un ganador
                        if (checkWinner(currentPlayer)) {
                            const message = currentPlayer + " gana. ¡Felicidades!";
                            const style = {
                                font: '32px Arial',
                                fill: '#000000'
                            };
                            const text = this.add.text(0, 320, message, style);
                            isWinner=true;
                            this.time.delayedCall(3000, () => {
                                
                                text.destroy();

                                inicializar(board,this);
                                isWinner=false;
                            });
                        }else if(boardFull(board)){
                            const message = "No hubo ganador :(";
                            const style = {
                                font: '32px Arial',
                                fill: '#000000'
                            };
                            const text = this.add.text(0, 320, message, style);
                            isWinner=true;
                            this.time.delayedCall(3000, () => {
                                
                                text.destroy();

                                inicializar(board,this);
                                isWinner=false;
                            });
                        }else {
                            // Alternar jugador
                            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                        }
                    }
                });
                function checkWinner(symbol) {
                    // Combinaciones ganadoras posibles
                    const winningCombos = [
                        [[0, 0], [0, 1], [0, 2]], // Fila 1
                        [[1, 0], [1, 1], [1, 2]], // Fila 2
                        [[2, 0], [2, 1], [2, 2]], // Fila 3
                        [[0, 0], [1, 0], [2, 0]], // Columna 1
                        [[0, 1], [1, 1], [2, 1]], // Columna 2
                        [[0, 2], [1, 2], [2, 2]], // Columna 3
                        [[0, 0], [1, 1], [2, 2]], // Diagonal principal
                        [[0, 2], [1, 1], [2, 0]]  // Diagonal secundaria
                    ];
                
                    // Verificar cada combinación ganadora
                    for (const combo of winningCombos) {
                        const [a, b, c] = combo;
                        if (board[a[0]][a[1]] === symbol && board[b[0]][b[1]] === symbol && board[c[0]][c[1]] === symbol) {
                            return true; // Hubo un ganador
                        }
                    }
                
                    return false; // No hubo ganador
                }
                function inicializar(board,game){
                        // Recorrer la matriz del tablero y borrar los elementos gráficos
                    for (let i = 0; i < board.length; i++) {
                        for (let j = 0; j < board[i].length; j++) {
                            if (board[i][j] !== null) {
                                board[i][j] = null;
                                const tile = game.add.rectangle(
                                    j * tileSize + tileSize / 2,
                                    i * tileSize + tileSize / 2,
                                    tileSize, tileSize, 0xffffff
                                );
                                tile.setStrokeStyle(2, 0x1a65ac);
                            }
                        }
                    }

                }
                function boardFull(board){
                    let lleno=0;
                    for (let i = 0; i < board.length; i++) {
                        for (let j = 0; j < board[i].length; j++) {
                            if (board[i][j] !== null) {
                                lleno++;
                            }
                        }
                    }
                    if(lleno==9){
                        return true;
                    }
                    return false;
                }
            }
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 400,
    height: 400,
    scene: Example
};

const game = new Phaser.Game(config);