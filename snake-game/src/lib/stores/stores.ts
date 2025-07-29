import { writable } from 'svelte/store';

    // Store for players, if you need it elsewhere
    export const playersStore = writable('gameplay1');
    export const difficultyStore = writable(1500);
    export const snakeColorStore = writable('red'); // cor padrão, para poder mudar a cor da cobrinha
    export const snakeColorStore_p2 = writable('green');
    //export const snakeColor2Store = writable('blue'); // cor padrão do player 2
    // Local variable for select binding
    let players: string = '/gameplay1';
    let difficulty : number = 1500; // Default difficulty


    // Optionally, sync local variable to store
    $: playersStore.set(players);
    $: difficultyStore.set(difficulty);