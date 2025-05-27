$(document).ready(function() {
    $('.rules_button').click(function() {
        $('#extra').fadeIn();
    })
    $('.close').click(function() {
        $('#extra').fadeOut();
    })
    $(window).click(function(event) {
        if ($(event.target).is('#extra')) {
            $('#extra').fadeOut();
        }
    })

     const choices = {
        'button1': 'paper',
        'button2': 'scissors',
        'button3': 'rock'
    };
    
    const choiceNames = {
        'paper': 'Бумага',
        'scissors': 'Ножницы',
        'rock': 'Камень'
    };
    
    const gameRules = {
        'rock': { beats: 'scissors', losesTo: 'paper' },
        'paper': { beats: 'rock', losesTo: 'scissors' },
        'scissors': { beats: 'paper', losesTo: 'rock' }
    };
    
    let score = 0;
    
    $('.button1, .button2, .button3').click(function() {
        const playerChoice = choices[$(this).attr('class').split(' ')[0]];
        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);
        
        updateScore(result);
        showResult(playerChoice, computerChoice, result);
    });
    
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }
    
    function determineWinner(player, computer) {
        if (player === computer) return 'draw';
        if (gameRules[player].beats === computer) return 'win';
        return 'lose';
    }
    
    function updateScore(result) {
        if (result === 'win') {
            score++;
            $('.numbers').text(score);
        } else if (result === 'lose') {
                    score = Math.max(0, score - 1);
                    $('.numbers').text(score);
                }
    }
    
    function showResult(playerChoice, computerChoice, result) {
        const resultText = {
            'win': 'Вы победили!',
            'lose': 'Победил компьютер!',
            'draw': 'Ничья!'
        };
        
        const resultHTML = `
            <div class="result-content">
                <div class="choices">
                    <div class="player-choice">
                        <p>Ваш выбор:</p>
                        <button class="${playerChoice}-result">
                            <img src="images/icon-${playerChoice}.svg" alt="${choiceNames[playerChoice]}">
                        </button>
                        <p>${choiceNames[playerChoice]}</p>
                    </div>
                    <div class="computer-choice">
                        <p>Выбор компьютера:</p>
                        <button class="${computerChoice}-result">
                            <img src="images/icon-${computerChoice}.svg" alt="${choiceNames[computerChoice]}">
                        </button>
                        <p>${choiceNames[computerChoice]}</p>
                    </div>
                </div>
                <div class="result-message">
                    <h2>${resultText[result]}</h2>
                    <button class="play-again">Играть снова</button>
                </div>
            </div>
        `;
        
        $('.result').html(resultHTML).fadeIn();

        $(`.${playerChoice}-result`).css({
            'background-color': 'white',
            'border': `20px solid ${getBorderColor(playerChoice)}`,
            'height': '150px',
            'width': '150px',
            'border-radius': '80px',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center'
        });
        
        $(`.${computerChoice}-result`).css({
            'background-color': 'white',
            'border': `20px solid ${getBorderColor(computerChoice)}`,
            'height': '150px',
            'width': '150px',
            'border-radius': '80px',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center'
        });
        
        $('.play-again').click(function() {
            $('.result').fadeOut();
        });
    }
    
    function getBorderColor(choice) {
        switch(choice) {
            case 'paper': return '#516df2';
            case 'scissors': return '#eba418';
            case 'rock': return '#df3a58';
            default: return '#000';
        }
    }
});
