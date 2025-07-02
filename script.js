var menu = document.getElementById('area');
var opcoes = document.getElementById('options');
var credits = document.getElementById('Credits');
var game = document.getElementById('TelaDoGame');
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
