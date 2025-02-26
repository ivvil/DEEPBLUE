export const globals = {
    time: 0,
    deltaTime: 0,
    ships: {
        3: [
            'ship-cargo-a',
            'ship-cargo-b',
            'ship-cargo-c',
            'ship-large',
            'ship-ocean-liner'
        ],
        2: [
            'ship-ocean-liner-small',
            'ship-small',
            'ship-small-ghost',
            'boat-sail-a',
            'boat-sail-b'
        ],
        1: [
            'boat-row-large',
            'boat-row-small',
            'boat-fan'
        ]
    },
    pieces: [
        { size: 3, amount: 2 },
        { size: 2, amount: 3 },
        { size: 1, amount: 4 }
    ],
    playfield: {
        size: {x: 10, y: 10},
    }
};