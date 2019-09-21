const movie = require('../../api/tmdbApi');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const {attributesManager} = handlerInput.attributesManager;
      const requestAttributes = attributesManager.getRequestAttributes();
      const sessionAttributes = attributesManager.getSessionAttributes();
      const speechText = requestAttributes.t('WELCOME_MESSAGE');

      console.log(movie)
      sessionAttributes['movie'] = '' //respuesta;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    },
};

module.exports = LaunchRequestHandler;