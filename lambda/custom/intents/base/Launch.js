const movie = require('../../api/tmdbApi');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const speechText = requestAttributes.t('WELCOME_MESSAGE');
        movie().then(res => {
            sessionAttributes['movie'] = res;
            console.log('........................');
            console.log(sessionAttributes['movie'])
        });
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};

module.exports = LaunchRequestHandler;
