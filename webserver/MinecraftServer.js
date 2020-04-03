// Load the SDK
const AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.update({ region: 'us-east-2' });

exports.LaunchNewTemplate = function(callback) {

    var ec2 = new AWS.EC2();
    var params = {
        MaxCount: '1',
        MinCount: '1',
        LaunchTemplate: {
            // LaunchTemplateId: 'lt-066669f2c169f0f9f',
            LaunchTemplateName: 'EC2-MineCraft-Configuration',
        },
    };

    //Create the template instance
    ec2.runInstances(params, function (err, data) {
        if (err)
            console.log(err, err.stack); // an error occurred
        else
            console.log(data); // successful response
            callback(data);
    });

    // var resp = `{ "Groups": [],
    //     "Instances": 
    //      [ { "AmiLaunchIndex": 0,
    //          "ImageId": "ami-0c0415cdff14e2a4a",
    //          "InstanceId": "i-07c0de80656b4dd8d",
    //          "InstanceType": "t2.small",
    //          "KeyName": "aws",
    //          "LaunchTime": "2020-03-30T00:45:49.000Z",
    //          "PrivateDnsName": "ip-10-0-1-148.us-east-2.compute.internal",
    //          "PrivateIpAddress": "10.0.1.148",
    //          "PublicDnsName": ""
    //          } ],
    //     "OwnerId": "766908429762",
    //     "ReservationId": "r-006d76ea11c397e04" }`
    // callback(resp);
};

exports.GetInstanceDetails = function(InstanceId) {
    return new Promise(function(resolve, reject) {
        var ec2 = new AWS.EC2();
        var params = {
            InstanceIds: [
                InstanceId
            ]
        };

        //Create the template instance
        ec2.describeInstances(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }

            IP = "Unknown";
            State = "Unknown";

            if (data.Reservations.length != 0) { //if we did not get any information from AWS do not update values from unknown
                IP = data.Reservations[0].Instances[0].PublicIpAddress,
                State = data.Reservations[0].Instances[0].State.Name
            }

            var response = { 
                IP: IP,
                State: State
            }

            resolve(response);
        });
    });
};


exports.StartInstance = function(InstanceId) {
    return new Promise(function(resolve, reject) {
        var ec2 = new AWS.EC2();
        var params = {
            InstanceIds: [
                InstanceId
            ]
        };

        //Create the template instance
        ec2.startInstances(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve("success");
        });
    });
};

exports.StopInstance = function(InstanceId) {
    return new Promise(function(resolve, reject) {
        var ec2 = new AWS.EC2();
        var params = {
            InstanceIds: [
                InstanceId
            ]
        };

        //Create the template instance
        ec2.stopInstances(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve("success");
        });
    });
};

exports.DeleteInstance = function(InstanceId) {
    return new Promise(function(resolve, reject) {
        var ec2 = new AWS.EC2();
        var params = {
            InstanceIds: [
                InstanceId
            ]
        };

        //Create the template instance
        ec2.terminateInstances(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve("success");
        });
    });
};