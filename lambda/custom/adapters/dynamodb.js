// IMPORTANT: don't forget to give DynamoDB access to the role you're to run this lambda (IAM)
const {
    DynamoDbPersistenceAdapter
} = require('ask-sdk-dynamodb-persistence-adapter');

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

persistenceAdapter = new DynamoDbPersistenceAdapter({
    tableName: 'alexa_seed_attr_table',
    createTable: true,
    partitionKeyGenerator: keyGenerator
});

module.exports = persistenceAdapter;