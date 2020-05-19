const { Vector, world, globalEvents, CardHolder } = require('@tabletop-playground/api');
const StateMachine = require('javascript-state-machine')

// world.startDebugMode();
const CardStacks = [
    "751ED99A41F643AE7E708D992ABF707B",
    "4D04D52741823C63DC1DF7993F6DDDB3",
    "FF312423454999537FECAEAE8B3493CC",
    "0BD9405D413451F6EDBAB8A79EE3AF9B",
    "749391704791285B70005E971BA46B65",
    "110779C84178B264BA5C96B5F3ABB916",
    "007DD6314C1CD0F0CF913BBC7F850501"
]
const Cards = [
    { name: "Queen Black", templateId: "751ED99A41F643AE7E708D992ABF707B", index: 5 },
    { name: "Queen Red", templateId: "4D04D52741823C63DC1DF7993F6DDDB3", index: 2 },
    { name: "Queen Green", templateId: "FF312423454999537FECAEAE8B3493CC", index: 6 },
    { name: "4 Green", templateId: "4D04D52741823C63DC1DF7993F6DDDB3", index: 7 },
    { name: "3 Green", templateId: "4D04D52741823C63DC1DF7993F6DDDB3", index: 6 },
    { name: "5 Blue", templateId: "0BD9405D413451F6EDBAB8A79EE3AF9B", index: 3 },
    { name: "King Blue", templateId: "749391704791285B70005E971BA46B65", index: 2 },
    { name: "King Green", templateId: "FF312423454999537FECAEAE8B3493CC", index: 7 },
    { name: "4 Red", templateId: "110779C84178B264BA5C96B5F3ABB916", index: 3 },
    { name: "9 Green", templateId: "FF312423454999537FECAEAE8B3493CC", index: 3 },
    { name: "Jack Red", templateId: "4D04D52741823C63DC1DF7993F6DDDB3", index: 1 },
    { name: "8 Blue", templateId: "0BD9405D413451F6EDBAB8A79EE3AF9B", index: 6 },
    { name: "8 Green", templateId: "FF312423454999537FECAEAE8B3493CC", index: 2 },
    { name: "10 Green", templateId: "FF312423454999537FECAEAE8B3493CC", index: 4 },
    { name: "9 Blue", templateId: "0BD9405D413451F6EDBAB8A79EE3AF9B", index: 7 },
    { name: "10 Blue", templateId: "0BD9405D413451F6EDBAB8A79EE3AF9B", index: 8 },
    { name: "2 Red", templateId: "110779C84178B264BA5C96B5F3ABB916", index: 1 },
    { name: "6 Black", templateId: "749391704791285B70005E971BA46B65", index: 8 },
    { name: "King Red", templateId: "751ED99A41F643AE7E708D992ABF707B", index: 3 },
    { name: "7 Black", templateId: "751ED99A41F643AE7E708D992ABF707B", index: 0 },
    { name: "6 Red", templateId: "110779C84178B264BA5C96B5F3ABB916", index: 5 },
    { name: "2 Blue", templateId: "0BD9405D413451F6EDBAB8A79EE3AF9B", index: 0 },
    { name: "7 Red", templateId: "110779C84178B264BA5C96B5F3ABB916", index: 6 },
    { name: "4 Black", templateId: "749391704791285B70005E971BA46B65", index: 6 },
    { name: "3 Blue", templateId: "0BD9405D413451F6EDBAB8A79EE3AF9B", index: 1 },
    { name: "King Black", templateId: "751ED99A41F643AE7E708D992ABF707B", index: 6 },
    { name: "7 Blue", templateId: "0BD9405D413451F6EDBAB8A79EE3AF9B", index: 5 },
    { name: "King Red", templateId: "4D04D52741823C63DC1DF7993F6DDDB3", index: 3 },
    { name: "8 Black", templateId: "751ED99A41F643AE7E708D992ABF707B", index: 1 },
    { name: "3 Black", templateId: "749391704791285B70005E971BA46B65", index: 5 },
    { name: "6 Blue", templateId: "0BD9405D413451F6EDBAB8A79EE3AF9B", index: 4 },
    { name: "2 Green", templateId: "4D04D52741823C63DC1DF7993F6DDDB3", index: 5 },
    { name: "7 Green", templateId: "FF312423454999537FECAEAE8B3493CC", index: 1 },
    { name: "Ace Blue", templateId: "FF312423454999537FECAEAE8B3493CC", index: 8 },
    { name: "Ace Green", templateId: "4D04D52741823C63DC1DF7993F6DDDB3", index: 4 },
    { name: "6 Green", templateId: "FF312423454999537FECAEAE8B3493CC", index: 0 },
    { name: "4 Blue", templateId: "0BD9405D413451F6EDBAB8A79EE3AF9B", index: 2 },
    { name: "2 Black", templateId: "749391704791285B70005E971BA46B65", index: 4 },
    { name: "9 Red", templateId: "110779C84178B264BA5C96B5F3ABB916", index: 8 },
    { name: "Queen Blue", templateId: "749391704791285B70005E971BA46B65", index: 1 },
    { name: "Phoenix", templateId: "007DD6314C1CD0F0CF913BBC7F850501", index: 1 },
    { name: "9 Black", templateId: "751ED99A41F643AE7E708D992ABF707B", index: 2 },
    { name: "Jack Green", templateId: "FF312423454999537FECAEAE8B3493CC", index: 5 },
    { name: "5 Black", templateId: "749391704791285B70005E971BA46B65", index: 7 },
    { name: "3 Red", templateId: "110779C84178B264BA5C96B5F3ABB916", index: 2 },
    { name: "Jack Blue", templateId: "749391704791285B70005E971BA46B65", index: 0 },
    { name: "Ace Black", templateId: "749391704791285B70005E971BA46B65", index: 3 },
    { name: "5 Red", templateId: "110779C84178B264BA5C96B5F3ABB916", index: 4 },
    { name: "Mahjong", templateId: "751ED99A41F643AE7E708D992ABF707B", index: 7 },
    { name: "8 Red", templateId: "110779C84178B264BA5C96B5F3ABB916", index: 7 },
    { name: "Dragon", templateId: "007DD6314C1CD0F0CF913BBC7F850501", index: 0 },
    { name: "Dog", templateId: "751ED99A41F643AE7E708D992ABF707B", index: 8 },
    { name: "5 Green", templateId: "4D04D52741823C63DC1DF7993F6DDDB3", index: 8 },
    { name: "10 Red", templateId: "4D04D52741823C63DC1DF7993F6DDDB3", index: 0 },
    { name: "Jack Black", templateId: "751ED99A41F643AE7E708D992ABF707B", index: 4 },
    { name: "Ace Red", templateId: "110779C84178B264BA5C96B5F3ABB916", index: 0 }
]

const TichuState = {
    playerNames: ["","","",""],
    hands: [undefined, undefined, undefined, undefined],
    discards: [undefined, undefined, undefined, undefined],
    deck: undefined,
    round: 0,
    team0Total: 0,
    team1Total: 0,
    team0Round: 0,
    team1Round: 0,
}

function prepareTable() {
    TichuState.team0Total += TichuState.team0Round
    TichuState.team1Total += TichuState.team1Round
    TichuState.round ++
    for( let i=0; i<4; i++) {
        const player = world.getPlayerBySlot(i)
        if( player ) {
            TichuState.playerNames[i] = player.getName()
        }
    }
    world.getAllObjects().forEach(function (obj) {
        const nameParts = obj.getName().split(" ")
        const playerId = +nameParts[1]-1

        if (obj instanceof CardHolder) {
            TichuState.hands[playerId] = obj
        } else if (obj instanceof Container) {
            TichuState.discards[playerId] = obj
        } else {
            obj.destroy()
        }
    })

    TichuState.hands.forEach(function (holder) {
        for( let i=0; i<holder.getNumCards(); i++) {
            holder.removeAt(0)
        }
    })
    TichuState.discards.forEach(function (container) {
        container.clear()
    })

    let deck = undefined
    CardStacks.forEach(function (stack) {
        const s = world.createObjectFromTemplate(stack, new Vector(0,0,85) )
        if( deck===undefined) {
            deck = s
        } else {
            deck.addCards(s, true)
        }
    })

    deck.shuffle()
    TichuState.deck = deck
}

function finishRound() {
    const scores = TichuState.discards.map(function(container){
        let score = 0
        container.getItems().forEach(function (item) {
            if( item instanceof Card ) {
                score += scoreCards(item)
            }
        })
        return score
    })
    const team0Score = scores[0] + scores[2];
    const team1Score = scores[1] + scores[3];
    TichuState.team0Round = team0Score
    TichuState.team1Round = team1Score

    const team0 = TichuState.playerNames[0] + " + " + TichuState.playerNames[2]
    const team1 = TichuState.playerNames[1] + " + " + TichuState.playerNames[3]
    world.getAllPlayers().forEach(function (player) {
        player.showMessage("Round "+TichuState.round)
        player.showMessage("Round score: "+team0+" = "+team0Score+", "+team1+" = "+team1Score)
        player.showMessage("Total score: "+team0+" = "+(team0Score+TichuState.team0Total)+", "+team1+" = "+(team1Score+TichuState.team1Total))
    })
}

function scoreCard(cardDetails) {
    const parts = cardDetails.name.split(" ");
    const value = parts[0]
    if( value==="5") {
        return 5
    }
    if( value==="10" || value==="King" ) {
        return 10
    }
    if( value==="Dragon" ) {
        return 25
    }
    if( value==="Phoenix") {
        return -25
    }
    return 0;
}
function scoreCards(card) {
    let score = 0
    for (let i = 0; i < card.getStackSize(); i++) {
        score += scoreCard(card.getCardDetails(i))
    }
    return score
}

const fsm = new StateMachine({
    init: 'init',
    transitions: [
        {name: 'step', from: 'init',       to: 'shuffled'  },
        {name: 'step', from: 'shuffled',    to: 'dealt8'    },
        {name: 'step', from: 'dealt8',      to: 'dealt'     },
        {name: 'finish', from: '*',       to: 'init'     },
    ],
    methods: {
        onShuffled: function() {
            prepareTable()
        },
        onDealt8: function() {
            TichuState.deck.deal(8)
        },
        onDealt: function () {
            TichuState.deck.deal(6)
        },
        onFinish: function () {
            finishRound()
        }
    }
})

world.fsm = fsm

globalEvents.onScriptButtonReleased.add(function(player, index) {
    if( index===1 ) {
        fsm.step()
    }
    if( index===2) {
        fsm.finish()
    }
})