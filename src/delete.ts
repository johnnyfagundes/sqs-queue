// @ts-ignore
import AWS, {AWSError} from 'aws-sdk'
import {ReceiveMessageResult} from "aws-sdk/clients/sqs";

const credentials = new AWS.SharedIniFileCredentials({profile: 'personal'});
AWS.config.credentials = credentials;
AWS.config.update({ region: 'us-east-1'})

const sqs = new AWS.SQS({ apiVersion: '2021-11-05'})
const queueURL = 'https://sqs.us-east-1.amazonaws.com/112742562502/other'

const params: AWS.SQS.ReceiveMessageRequest = {
    QueueUrl: queueURL,
    MaxNumberOfMessages: 10,
    VisibilityTimeout: 30,
    WaitTimeSeconds: 0
}
function deleteMessage() {
    sqs.receiveMessage(params, function (err: AWSError, data: ReceiveMessageResult) {
        if (err) {
            console.log(`Error ${err}`)
        } else if (data.Messages) {
            console.log("Number of messages received: ", data.Messages.length)

            data.Messages.forEach(element => {
                console.log('This message will be deleted', element)

                const deleteParams: AWS.SQS.DeleteMessageRequest = {
                    QueueUrl: queueURL,
                    ReceiptHandle: element.ReceiptHandle || ''
                }
                sqs.deleteMessage(deleteParams, function(err: AWSError, data: {}) {
                    if (err) {
                        console.log(`Error ${err}`)
                    } else {
                        console.log("Message deleted with successful:", data)
                    }
                })
            })
        } else {
            console.log("No message received")
        }
    })
}

deleteMessage()
