module.exports = {
    canHandle: function (handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return (
            request.type === "IntentRequest" &&
            request.intent.name === "ResolverIntent"
        );
    },
    handle: function (handlerInput) {
        const event = handlerInput.requestEnvelope;
        // Grab a reference to the session attributes
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        let speech, reprompt;

        if (
            !event.request.intent ||
            !event.request.intent.slots ||
            !event.request.intent.slots.NombrePelicula ||
            !event.request.intent.slots.NombrePelicula.value
        ) {
            // Delegate this
            return handlerInput
                .addDelegateDirective(event.request.intent)
                .getResponse();
        }

        // La pelicula es
        attributes.NombrePelicula = event.request.intent.slots.NombrePelicula.value;

        if (true) {
            // Si ha adivinado
            speech = requestAttributes.t('RESOLVE_OK');
            reprompt = requestAttributes.t('RESOLVE_OK_PROMPT');

        } else {
            // Si no ha adivinado
            speech = requestAttributes.t('RESOLVE_KO');

            // Siguiente pista
            reprompt = requestAttributes.t('RESOLVE_KO_PROMPT');
        }

        return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(reprompt)
            .getResponse();
    }
};