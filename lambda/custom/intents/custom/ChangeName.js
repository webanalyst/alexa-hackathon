module.exports = {
    canHandle: function (handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return (
            request.type === "IntentRequest" &&
            request.intent.name === "ChangeNameIntent"
        );
    },
    handle: function (handlerInput) {
        const event = handlerInput.requestEnvelope;
        // Grab a reference to the session attributes
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        let speech;

        if (
            !event.request.intent ||
            !event.request.intent.slots ||
            !event.request.intent.slots.NombreUsuario ||
            !event.request.intent.slots.NombreUsuario.value
        ) {
            // Delegate this
            return handlerInput
                .addDelegateDirective(event.request.intent)
                .getResponse();
        }

        // Repeat name, and alert they can change it
        attributes.NombreUsuario = event.request.intent.slots.NombreUsuario.value;
        speech = requestAttributes.t('CHANGE_CONFIRM').replace("{0}", attributes.NombreUsuario);
        if (typeof attributes.temp !== "undefined" && typeof attributes.temp.namePrompt !== "undefined") {
            speech += requestAttributes.t('CHANGE_PROMPT_CHANGE');
            attributes.temp = {};
            attributes.temp.namePrompt = true;
        }

        const reprompt = requestAttributes.t('CHANGE_REPROMPT');
        speech += reprompt;

        return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(reprompt)
            .getResponse();
    }
};