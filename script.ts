const menu:HTMLElement = document.getElementById('area')!
const opcoes:HTMLElement = document.getElementById('options')!
const credits:HTMLElement = document.getElementById('Credits')!
const game:HTMLElement = document.getElementById('TelaDoGame')!



function TelaOptions() {
    menu.style.display = 'none';
    opcoes.style.display = 'block';
}


function TelaMenu() {
    menu.style.display = 'flex';
    opcoes.style.display = 'none';
}


function TelaCredits() {
    menu.style.display = 'none';
    credits.style.display = 'block';
}


function VMenu() {
    menu.style.display = 'flex';
    credits.style.display = 'none';
}


function TelaGame() {
    menu.style.display = 'none';
    game.style.display = 'flex';
}


function T4P1() {
    game.style.display = 'none';
    menu.style.display = 'flex';
}