
$(document).ready(function() {
    $('.rules_button').click(function() {
        $('#extra').fadeIn();
    });
    $('.close').click(function() {
        $('#extra').fadeOut();
    });
    $(window).click(function(event) {
        if ($(event.target).is('#extra')) {
            $('#extra').fadeOut();
        }
    });

    const choices = {
        'button1': 'paper',
        'button2': 'scissors',
        'button3': 'rock',
        'button4': 'spock',
        'button5': 'lizard'
    };
    
    const choiceNames = {
        'paper': 'Бумага',
        'scissors': 'Ножницы',
        'rock': 'Камень',
        'spock': 'Спок',
        'lizard': 'Ящерица'
    };
    
    const choiceColors = {
        'paper': '#516df2',
        'scissors': '#f6ac19',
        'rock': '#df3a58',
        'spock': '#51d4f2',
        'lizard': '#b751f2'
    };
    

    const gameRules = {
        'rock': { beats: ['scissors', 'lizard'], losesTo: ['paper', 'spock'] },
        'paper': { beats: ['rock', 'spock'], losesTo: ['scissors', 'lizard'] },
        'scissors': { beats: ['paper', 'lizard'], losesTo: ['rock', 'spock'] },
        'lizard': { beats: ['paper', 'spock'], losesTo: ['rock', 'scissors'] },
        'spock': { beats: ['rock', 'scissors'], losesTo: ['paper', 'lizard'] }
    };
    
    let score = 0;
    

    $('.button1, .button2, .button3, .button4, .button5').click(function() {
        const playerChoice = choices[$(this).attr('class').split(' ')[0]];
        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);
        
        updateScore(result);
        showBonusResult(playerChoice, computerChoice, result);
    });

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
        const randomIndex = Math.floor(Math.random() * 5);
        return choices[randomIndex];
    }
    

    function determineWinner(player, computer) {
        if (player === computer) return 'draw';
        if (gameRules[player].beats.includes(computer)) return 'win';
        return 'lose';
    }
    

    function updateScore(result) {
        if (result === 'win') {
            score++;
            $('.numbers').text(score);
        } else if (result === 'lose') {
                    score = score - 1;
                    $('.numbers').text(score);
                }
    }
    
    function showBonusResult(playerChoice, computerChoice, result) {
        const resultText = {
            'win': 'Вы победили!',
            'lose': 'Победил компьютер!',
            'draw': 'Ничья!'
        };
        
        const resultHTML = `
            <div class="bonus-result-content">
                <div class="bonus-choices">
                    <div class="player-choice">
                        <p class="choice-name">Ваш выбор:</p>
                        <button class="${playerChoice}-result">
                            <img src="images/icon-${playerChoice}.svg" alt="${choiceNames[playerChoice]}">
                        </button>
                        <p class="choice-name">${choiceNames[playerChoice]}</p>
                    </div>
                    
                    <div class="result-message">
                        <h2>${resultText[result]}</h2>
                        <p class="rules-text">${getRulesText(playerChoice, computerChoice, result)}</p>
                        <button class="play-again">Играть снова</button>
                    </div>
                    
                    <div class="computer-choice">
                        <p class="choice-name">Выбор компьютера:</p>
                        <button class="${computerChoice}-result">
                            <img src="images/icon-${computerChoice}.svg" alt="${choiceNames[computerChoice]}">
                        </button>
                        <p class="choice-name">${choiceNames[computerChoice]}</p>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(`<div class="bonus-result">${resultHTML}</div>`);
        
        $(`.${playerChoice}-result, .${computerChoice}-result`).css({
            'background-color': 'white',
            'border': `20px solid ${choiceColors[playerChoice]}`,
            'height': '150px',
            'width': '150px',
            'border-radius': '50%',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'box-shadow': '0 6px 0 rgba(0,0,0,0.1)',
            'transition': 'all 0.3s ease'
        });
        
        $(`.${computerChoice}-result`).css('border-color', choiceColors[computerChoice]);

        $('.bonus-result').hide().fadeIn(300);
        $('.player-choice').hide().slideDown(400);
        $('.computer-choice').hide().slideDown(400);
        $('.result-message').hide().fadeIn(600);
        
        $('.play-again').click(function() {
            $('.bonus-result').fadeOut(300, function() {
                $(this).remove();
            });
        });
    }
    
    function getRulesText(player, computer, result) {
        if (result === 'draw') return '';
        
        const winningChoice = result === 'win' ? player : computer;
        const losingChoice = result === 'win' ? computer : player;
        
        const rules = {};
        
        return rules[`${winningChoice}-${losingChoice}`] || '';
    }
});