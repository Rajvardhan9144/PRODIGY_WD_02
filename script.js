let board = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer = 'X';
        let isGameActive = true;

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const cells = document.querySelectorAll('.cell');
        const messageElement = document.getElementById('message');
        const resetBtn = document.getElementById('resetBtn');

        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        resetBtn.addEventListener('click', handleReset);

        function handleCellClick(event) {
            const cell = event.target;
            const index = cell.getAttribute('data-index');

            if (board[index] !== '' || !isGameActive) {
                return;
            }

            updateCell(cell, index);
            checkForWinner();
        }

        function updateCell(cell, index) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
        }

        function changePlayer() {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
        }

        function checkForWinner() {
            let roundWon = false;

            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) {
                messageElement.textContent = `Player ${currentPlayer} wins!`;
                isGameActive = false;
                return;
            }

            if (!board.includes('')) {
                messageElement.textContent = 'Game is a draw!';
                isGameActive = false;
                return;
            }

            changePlayer();
        }

        function handleReset() {
            board = ['', '', '', '', '', '', '', '', ''];
            isGameActive = true;
            currentPlayer = 'X';
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
            cells.forEach(cell => cell.textContent = '');
        }