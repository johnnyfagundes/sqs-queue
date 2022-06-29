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
const sendSQS = function () {
    const params = {
        QueueUrl: queueURL,
        DelaySeconds: 0,
        MessageBody: JSON.stringify({
            id: 1,
            name: 'iPhone X',
            description: 'Phone at Apple',
            value: 15000
        }),
        // MessageAttributes: {
        //     "Product_1": {
        //         DataType: 'String',
        //         StringValue: 'Macbook M1'
        //     },
        //     "Product_2": {
        //         DataType: 'String',
        //         StringValue: 'Mac Air 13 inch'
        //     },
        //     "Product_3": {
        //         DataType: 'String',
        //         StringValue: 'iPhone Pro Max'
        //     }
        // }
    };
    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log(`Error ${err}`);
        }
        else {
            console.log(`Success: ${JSON.stringify(data)}`);
        }
    });
};
sendSQS();
