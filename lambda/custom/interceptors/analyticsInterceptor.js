var ua = require('universal-analytics');
const config = require("../config");

const AnalyticsInterceptor = {
    async process(handlerInput) {
        const deviceID = handlerInput.requestEnvelope.context.System.device.deviceId;
        const userID = handlerInput.requestEnvelope.context.System.user.userId;
        const visitor = ua(config.analytics.ua, deviceID, {
            strictCidFormat: false
        }, {
            uid: userID
        });

        // this gets the request attributes and save the localize function inside 
        // it to be used in a handler by calling requestAttributes.t(STRING_ID, [args...])
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.analytics = {};
        attributes.analytics.pageview = (...args) => {
            return visitor.pageview(...args).send();
        };
        attributes.analytics.event = (...args) => {
            return visitor.event(...args).send();
        };

    },
};


module.exports = AnalyticsInterceptor;