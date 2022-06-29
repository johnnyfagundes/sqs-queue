// @ts-ignore
import AWS from 'aws-sdk'

const credentials = new AWS.SharedIniFileCredentials({profile: 'personal'});
AWS.config.credentials = credentials;
AWS.config.update({ region: 'us-east-1'})

const sqs = new AWS.SQS({ apiVersion: '2021-11-05'})
const queueURL = 'https://sqs.us-east-1.amazonaws.com/112742562502/other'

const sendSQS = function () {
    const params: AWS.SQS.SendMessageRequest = {
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
    }

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log(`Error ${err}`)
        } else {
            console.log(`Success: ${JSON.stringify(data)}`)
        }
    })
}

sendSQS()