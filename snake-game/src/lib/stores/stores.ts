import { writable } from 'svelte/store';

    // Store for players, if you need it elsewhere
    export const playersStore = writable('gameplay1');
    // Local variable for select binding
    let players: string = '/gameplay1';

    // Optionally, sync local variable to store
    $: playersStore.set(players);