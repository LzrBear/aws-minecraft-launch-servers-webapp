In order for the aws sdk to work the aws credentials need to be supplied.
Start by credentials file located at ```~/.aws/credentials```

```
touch ~/.aws/credentials
```

Open the file and add the following information

```
[default]
aws_access_key_id = <your access key id>
aws_secret_access_key = <your secret access token>
```

N.B. The access key id and token can be generated from the Identity and Access Management (IAM) Console (i.e. https://console.aws.amazon.com/iam)