exports.Launch = function() {
    // Load the SDK
    var AWS = require('aws-sdk');
    // Load credentials and set region from JSON file
    AWS.config.update({ region: 'us-east-2' });
    var ec2 = new AWS.EC2();
    var params = {
        MaxCount: '1',
        MinCount: '1',
        LaunchTemplate: {
            // LaunchTemplateId: 'lt-066669f2c169f0f9f',
            LaunchTemplateName: 'EC2-MineCraft-Configuration',
        },
    };
    ec2.runInstances(params, function (err, data) {
        if (err)
            console.log(err, err.stack); // an error occurred
        else
            console.log(data); // successful response
    });
};