// @ts-ignore
import AWS from 'aws-sdk'

const credentials = new AWS.SharedIniFileCredentials({profile: 'personal'});
AWS.config.credentials = credentials;
AWS.config.update({ region: 'us-east-1'})

const sqs = new AWS.SQS({ apiVersion: '2021-11-05'})
const queueURL = 'https://sqs.us-east-1.amazonaws.com/112742562502/other'

const params: AWS.SQS.ReceiveMessageRequest = {
    QueueUrl: queueURL,
    MaxNumberOfMessages: 10,
    VisibilityTimeout: 30
}

sqs.receiveMessage(params, function (err, data) {
    if (err) {
        console.log(`Error ${err}`)
    } else if (data.Messages) {
        console.log(data.Messages)
    }
})