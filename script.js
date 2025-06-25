class MinesweeperGame {
    constructor() {
        this.board = [];
        this.gameStarted = false;
        this.gameEnded = false;
        this.timer = 0;
        this.timerInterval = null;
        this.mineCount = 0;
        this.flagCount = 0;
        this.revealedCount = 0;
        
        // 难度配置
        this.difficulties = {
            easy: { rows: 9, cols: 9, mines: 10 },
            medium: { rows: 16, cols: 16, mines: 40 },
            hard: { rows: 16, cols: 30, mines: 99 }
        };
        
        this.currentDifficulty = 'easy';
        this.config = this.difficulties[this.currentDifficulty];
        
        this.initializeElements();
        this.bindEvents();
        this.initializeGame();
    }
    
    initializeElements() {
        this.gameBoard = document.getElementById('game-board');
        this.mineCountElement = document.getElementById('mine-count');
        this.timerElement = document.getElementById('timer');
        this.resetBtn = document.getElementById('reset-btn');
        this.gameStatus = document.getElementById('game-status');
        this.modal = document.getElementById('game-over-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalMessage = document.getElementById('modal-message');
        this.playAgainBtn = document.getElementById('play-again-btn');
        this.closeModalBtn = document.getElementById('close-modal-btn');
        this.difficultyBtns = document.querySelectorAll('.difficulty-btn');
    }
    
    bindEvents() {
        // 重置按钮
        this.resetBtn.addEventListener('click', () => this.resetGame());
        
        // 难度选择
        this.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.changeDifficulty(e.target.dataset.level));
        });
        
        // 模态框按钮
        this.playAgainBtn.addEventListener('click', () => {
            this.hideModal();
            this.resetGame();
        });
        
        this.closeModalBtn.addEventListener('click', () => this.hideModal());
        
        // 点击模态框背景关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
        
        // 阻止右键菜单
        document.addEventListener('contextmenu', (e) => {
            if (e.target.classList.contains('cell')) {
                e.preventDefault();
            }
        });
    }
    
    changeDifficulty(level) {
        if (level === this.currentDifficulty) return;
        
        this.currentDifficulty = level;
        this.config = this.difficulties[level];
        
        // 更新活跃状态
        this.difficultyBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level === level);
        });
        
        this.resetGame();
    }
    
    initializeGame() {
        this.createBoard();
        this.renderBoard();
        this.updateMineCount();
        this.updateTimer();
        this.updateGameStatus('点击开始游戏！右键标记地雷。');
    }
    
    createBoard() {
        this.board = [];
        for (let row = 0; row < this.config.rows; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.config.cols; col++) {
                this.board[row][col] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0,
                    row: row,
                    col: col
                };
            }
        }
    }
    
    placeMines(firstClickRow, firstClickCol) {
        let minesPlaced = 0;
        while (minesPlaced < this.config.mines) {
            const row = Math.floor(Math.random() * this.config.rows);
            const col = Math.floor(Math.random() * this.config.cols);
            
            // 确保第一次点击的位置和周围不放置地雷
            if (!this.board[row][col].isMine && 
                !(Math.abs(row - firstClickRow) <= 1 && Math.abs(col - firstClickCol) <= 1)) {
                this.board[row][col].isMine = true;
                minesPlaced++;
            }
        }
        
        this.calculateNeighborMines();
    }
    
    calculateNeighborMines() {
        for (let row = 0; row < this.config.rows; row++) {
            for (let col = 0; col < this.config.cols; col++) {
                if (!this.board[row][col].isMine) {
                    this.board[row][col].neighborMines = this.countNeighborMines(row, col);
                }
            }
        }
    }
    
    countNeighborMines(row, col) {
        let count = 0;
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 0 && r < this.config.rows && 
                    c >= 0 && c < this.config.cols && 
                    this.board[r][c].isMine) {
                    count++;
                }
            }
        }
        return count;
    }
    
    renderBoard() {
        this.gameBoard.innerHTML = '';
        this.gameBoard.style.gridTemplateColumns = `repeat(${this.config.cols}, 1fr)`;
        this.gameBoard.style.gridTemplateRows = `repeat(${this.config.rows}, 1fr)`;
        
        for (let row = 0; row < this.config.rows; row++) {
            for (let col = 0; col < this.config.cols; col++) {
                const cell = this.createCellElement(row, col);
                this.gameBoard.appendChild(cell);
            }
        }
    }
    
    createCellElement(row, col) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        
        // 左键点击
        cell.addEventListener('click', (e) => this.handleCellClick(row, col));
        
        // 右键点击（标记）
        cell.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.toggleFlag(row, col);
        });
        
        // 触摸设备长按支持
        let pressTimer;
        cell.addEventListener('touchstart', (e) => {
            pressTimer = setTimeout(() => {
                e.preventDefault();
                this.toggleFlag(row, col);
            }, 500);
        });
        
        cell.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
        });
        
        cell.addEventListener('touchmove', () => {
            clearTimeout(pressTimer);
        });
        
        return cell;
    }
    
    handleCellClick(row, col) {
        if (this.gameEnded || this.board[row][col].isFlagged) return;
        
        // 第一次点击时放置地雷
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.placeMines(row, col);
            this.startTimer();
            this.updateGameStatus('游戏进行中...');
        }
        
        this.revealCell(row, col);
    }
    
    revealCell(row, col) {
        const cell = this.board[row][col];
        
        if (cell.isRevealed || cell.isFlagged) return;
        
        cell.isRevealed = true;
        this.revealedCount++;
        
        const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.add('revealed');
        
        if (cell.isMine) {
            cellElement.classList.add('mine');
            this.gameOver(false);
            return;
        }
        
        if (cell.neighborMines > 0) {
            cellElement.textContent = cell.neighborMines;
            cellElement.dataset.count = cell.neighborMines;
        } else {
            // 如果周围没有地雷，自动揭露相邻格子
            this.revealNeighbors(row, col);
        }
        
        // 检查是否获胜
        if (this.revealedCount === this.config.rows * this.config.cols - this.config.mines) {
            this.gameOver(true);
        }
    }
    
    revealNeighbors(row, col) {
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 0 && r < this.config.rows && 
                    c >= 0 && c < this.config.cols && 
                    !this.board[r][c].isRevealed) {
                    this.revealCell(r, c);
                }
            }
        }
    }
    
    toggleFlag(row, col) {
        if (this.gameEnded || this.board[row][col].isRevealed) return;
        
        const cell = this.board[row][col];
        const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        
        if (cell.isFlagged) {
            cell.isFlagged = false;
            cellElement.classList.remove('flagged');
            this.flagCount--;
        } else {
            cell.isFlagged = true;
            cellElement.classList.add('flagged');
            this.flagCount++;
        }
        
        this.updateMineCount();
    }
    
    gameOver(won) {
        this.gameEnded = true;
        this.stopTimer();
        
        if (won) {
            this.updateGameStatus('🎉 恭喜您获得胜利！');
            this.showModal('🎉 胜利！', `恭喜您在 ${this.timer} 秒内完成了游戏！`);
        } else {
            this.updateGameStatus('💥 游戏结束！您踩到了地雷。');
            this.revealAllMines();
            this.showModal('💥 游戏结束', '很遗憾，您踩到了地雷。再试一次吧！');
        }
    }
    
    revealAllMines() {
        for (let row = 0; row < this.config.rows; row++) {
            for (let col = 0; col < this.config.cols; col++) {
                if (this.board[row][col].isMine) {
                    const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    cellElement.classList.add('revealed', 'mine');
                }
            }
        }
    }
    
    showModal(title, message) {
        this.modalTitle.textContent = title;
        this.modalMessage.textContent = message;
        this.modal.style.display = 'block';
    }
    
    hideModal() {
        this.modal.style.display = 'none';
    }
    
    resetGame() {
        this.gameStarted = false;
        this.gameEnded = false;
        this.timer = 0;
        this.flagCount = 0;
        this.revealedCount = 0;
        this.stopTimer();
        this.initializeGame();
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.updateTimer();
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    updateTimer() {
        this.timerElement.textContent = this.timer.toString().padStart(3, '0');
    }
    
    updateMineCount() {
        const remainingMines = this.config.mines - this.flagCount;
        this.mineCountElement.textContent = remainingMines.toString();
    }
    
    updateGameStatus(message) {
        this.gameStatus.textContent = message;
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new MinesweeperGame();
});

// PWA支持 - Service Worker注册
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
                
                // 检查更新
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // 新的service worker已安装，显示更新提示
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
            
        // 监听service worker消息
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
                showUpdateNotification();
            }
        });
    });
}

// 显示更新通知
function showUpdateNotification() {
    if (confirm('有新版本可用！是否立即更新？')) {
        // 发送消息给service worker跳过等待
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({type: 'SKIP_WAITING'});
        }
        window.location.reload();
    }
}

// PWA安装提示
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // 阻止Chrome 67及之前版本自动显示安装提示
    e.preventDefault();
    // 存储事件，以便稍后触发
    deferredPrompt = e;
    
    // 显示自定义安装按钮
    showInstallButton();
});

function showInstallButton() {
    // 创建安装按钮
    const installButton = document.createElement('button');
    installButton.textContent = '📱 安装应用';
    installButton.className = 'install-button';
    installButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        z-index: 1000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
    `;
    
    installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
            // 显示安装提示
            deferredPrompt.prompt();
            // 等待用户响应
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`用户选择: ${outcome}`);
            // 清除保存的事件
            deferredPrompt = null;
            // 隐藏安装按钮
            installButton.remove();
        }
    });
    
    installButton.addEventListener('mouseenter', () => {
        installButton.style.transform = 'translateY(-2px)';
        installButton.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
    });
    
    installButton.addEventListener('mouseleave', () => {
        installButton.style.transform = 'translateY(0)';
        installButton.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
    });
    
    document.body.appendChild(installButton);
}

// 监听应用安装事件
window.addEventListener('appinstalled', (evt) => {
    console.log('应用已安装');
    // 隐藏安装按钮
    const installButton = document.querySelector('.install-button');
    if (installButton) {
        installButton.remove();
    }
});

// 处理URL参数（支持快捷方式）
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    if (action === 'new_game') {
        // 从快捷方式启动新游戏
        setTimeout(() => {
            const newGameButton = document.querySelector('button[onclick*="newGame"]');
            if (newGameButton) {
                newGameButton.click();
            }
        }, 500);
    } else if (action === 'settings') {
        // 从快捷方式打开设置
        setTimeout(() => {
            const settingsButton = document.querySelector('button[onclick*="settings"]');
            if (settingsButton) {
                settingsButton.click();
            }
        }, 500);
    }
});
