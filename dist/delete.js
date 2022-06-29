"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const credentials = new aws_sdk_1.default.SharedIniFileCredentials({ profile: 'personal' });
aws_sdk_1.default.config.credentials = credentials;
aws_sdk_1.default.config.update({ region: 'us-east-1' });
const sqs = new aws_sdk_1.default.SQS({ apiVersion: '2021-11-05' });
const queueURL = 'https://sqs.us-east-1.amazonaws.com/112742562502/other';
const params = {
    QueueUrl: queueURL,
    MaxNumberOfMessages: 10,
    VisibilityTimeout: 30,
    WaitTimeSeconds: 0
};
function deleteMessage() {
    sqs.receiveMessage(params, function (err, data) {
        if (err) {
            console.log(`Error ${err}`);
        }
        else if (data.Messages) {
            console.log("Number of messages received: ", data.Messages.length);
            data.Messages.forEach(element => {
                console.log('This message will be deleted', element);
                const deleteParams = {
                    QueueUrl: queueURL,
                    ReceiptHandle: element.ReceiptHandle || ''
                };
                sqs.deleteMessage(deleteParams, function (err, data) {
                    if (err) {
                        console.log(`Error ${err}`);
                    }
                    else {
                        console.log("Message deleted with successful:", data);
                    }
                });
            });
        }
        else {
            console.log("No message received");
        }
    });
}
deleteMessage();
