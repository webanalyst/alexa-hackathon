// IMPORTANT: don't forget to give DynamoDB access to the role you're to run this lambda (IAM)
const {
    DynamoDbPersistenceAdapter
} = require('ask-sdk-dynamodb-persistence-adapter');

const AWS = require("aws-sdk");
const config = require("../config");

AWS.config.update({
    region: config.dynamo.region
});


// This function establishes the primary key of the database as the skill id (hence you get global persistence, not per user id)
function keyGenerator(requestEnvelope) {
    if (requestEnvelope &&
        requestEnvelope.context &&
        requestEnvelope.context.System &&
        requestEnvelope.context.System.application &&
        requestEnvelope.context.System.application.applicationId) {
        return requestEnvelope.context.System.application.applicationId;
    }
    throw 'Cannot retrieve app id from request envelope!';
}

const persistenceAdapter = new DynamoDbPersistenceAdapter({
    tableName: config.dynamo.tableName,
    createTable: true,
    partitionKeyGenerator: keyGenerator
});

module.exports = persistenceAdapter;