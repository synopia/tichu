const { Card, Container, refContainer, world, globalEvents } = require('@tabletop-playground/api');

refContainer.onInserted.add(function(holder, insertedCards, player, index) {
   // world.fsm.cardDiscarded(refContainer.getId(), insertedCards)
})
