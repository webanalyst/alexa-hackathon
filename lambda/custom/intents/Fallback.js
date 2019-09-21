const FallbackHandler = {
    canHandle() {
        return true;
    },
    async handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('FALLBACK_MESSAGE');
        const speechReprompt = requestAttributes.t('FALLBACK_MESSAGE_REPROMPT');

        await requestAttributes.analytics.pageview("Fallback");


        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechReprompt)
            .getResponse();
    },
};

module.exports = FallbackHandler;