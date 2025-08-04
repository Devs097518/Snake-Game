import { writable } from 'svelte/store';

// Store for players, if you need it elsewhere
export const playersStore = writable('/gameplay1');
export const difficultyStore = writable('300');
export const snakeColorStore = writable('red'); // cor padrão, para poder mudar a cor da cobrinha
export const snakeColorStore_p2 = writable('green');
export const volumeStore = writable(0.5); // Volume padrão 50%