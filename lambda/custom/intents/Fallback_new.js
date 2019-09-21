const Launch = require('./base/Launch');
const FallbackHandler = {
    canHandle() {
        return true;
    },
    async handle(handlerInput) {
        const event = handlerInput.requestEnvelope;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        let speech, step, reprompt;
        console.log("********************** Fallback ***************");
        if (!attributes.step) {
            step = "name";
            attributes.step = "name";
        }

        // Paso 1: Preguntar por el nombre si no lo tiene
        if (step == "name") {
            if (event.request.intent &&
                event.request.intent.slots &&
                event.request.intent.slots.NombreUsuario &&
                event.request.intent.slots.NombreUsuario.value) {
                // Repeat name, and alert they can change it
                attributes.NombreUsuario = event.request.intent.slots.NombreUsuario.value;

                speech = requestAttributes
                    .t("CHANGE_CONFIRM")
                    .replace("{0}", attributes.NombreUsuario);

                attributes.temp = {};
                attributes.temp.namePrompt = true;
                attributes.step = "pelicula";
                console.log("siguiente step");
                return handlerInput.responseBuilder
                    .speak(speech + ", siguiente step:" + attributes.step)
                    .getResponse();

            } else {
                console.log("volver al launch");
                return Launch.handle();
            }

        }
        console.log("if pelicula");
        // Paso 2: Comprobar película
        if (step == "pelicula") {

            if (event.request.intent &&
                event.request.intent.slots &&
                event.request.intent.slots.NombrePelicula &&
                event.request.intent.slots.NombrePelicula.value) {
                // Repeat name, and alert they can change it
                attributes.NombrePelicula = event.request.intent.slots.NombrePelicula.value;
                console.log("La película es: " + attributes.NombrePelicula);
                return handlerInput.responseBuilder
                    .speak("La película es: " + attributes.NombrePelicula)
                    .getResponse();
            } else {
                console.log("volver al name");
                attributes.step = "name";
                return this.handle();
            }



        }
        console.log("********************** Fallback finish ***************");
    }
};

module.exports = FallbackHandler;