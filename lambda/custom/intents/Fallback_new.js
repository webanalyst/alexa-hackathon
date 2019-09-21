const FallbackHandler = {
    canHandle() {
        return true;
    },
    async handle(handlerInput) {
        const event = handlerInput.requestEnvelope;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        let speech, step;

        if (!attributes.step) {
            step = "name";
            attributes.step = "name";
        }

        // Paso 1: Preguntar por el nombre si no lo tiene
        if (step == "name") {

            // Repeat name, and alert they can change it
            attributes.NombreUsuario = event.request.intent.slots.NombreUsuario.value;

            speech = requestAttributes
                .t("CHANGE_CONFIRM")
                .replace("{0}", attributes.NombreUsuario);
            if (
                typeof attributes.temp !== "undefined" &&
                typeof attributes.temp.namePrompt !== "undefined"
            ) {
                speech += requestAttributes.t("CHANGE_PROMPT_CHANGE");
                attributes.temp = {};
                attributes.temp.namePrompt = true;
                attributes.step = "pelicula";
            }

            const reprompt = requestAttributes.t("CHANGE_REPROMPT");
            speech += reprompt;

            return handlerInput.responseBuilder
                .speak(speech)
                .reprompt(reprompt)
                .getResponse();
        }

        // Paso 2: Comprobar película
        if (step == "pelicula") {
            // Repeat name, and alert they can change it
            attributes.NombrePelicula = event.request.intent.slots.NombrePelicula.value;

            speech = requestAttributes
                .t("CHANGE_CONFIRM")
                .replace("{0}", attributes.NombrePelicula);
            if (
                typeof attributes.temp !== "undefined" &&
                typeof attributes.temp.peliPrompt !== "undefined"
            ) {
                speech += requestAttributes.t("CHANGE_PROMPT_CHANGE");
                attributes.temp = {};
                attributes.temp.peliPrompt = true;
                attributes.step = "pelicula";
            }

            const reprompt = requestAttributes.t("CHANGE_REPROMPT");
            speech += reprompt;

            return handlerInput.responseBuilder
                .speak(speech)
                .reprompt(reprompt)
                .getResponse();
        }

        return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(reprompt)
            .getResponse();
    }
};

module.exports = FallbackHandler;