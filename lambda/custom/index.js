/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");

// Translation Service
const LocalizationInterceptor = require("./interceptors/localizationInterceptor");

// Base Intents
const BaseHandlers = require("./intents/base/index");
const ErrorHandler = require("./intents/Error");

// Persistance Adapters
const persistenceAdapter = require("./adapters/dynamodb");

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'Hello World!';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
      .getResponse();
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    HelloWorldIntentHandler,
    ...BaseHandlers
  )
  .withApiClient(new Alexa.DefaultApiClient())
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(LocalizationInterceptor)
  .withCustomUserAgent('skill/movieman/v1')
  .withPersistenceAdapter(persistenceAdapter)
  .lambda();