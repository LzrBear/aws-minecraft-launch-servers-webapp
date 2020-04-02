const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const AWSMinecraftServerHosting = require('./MinecraftServer.js')
const dbTools = require('./db.js')


var sess; // global session, NOT recommended

const app = express();
app.use(cors()) //Enable All CORS (Cross-Origin) Requests - https://expressjs.com/en/resources/middleware/cors.html //TODO: Disable this before deploying to production
app.use(bodyParser());
app.use(session({secret: 'ssshhhhh'}));

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {           
        dbTools.VerifyUserPassword(username, password).then(function(resp) {
            if (resp == true) {
                sess = req.session;
                sess.username = username;
                res.send('Success');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

app.get('/logout', function(req, res) {
	req.session.destroy((err) => {
        if(err) {
            return console.log(err); //throw new error?
        }
        res.send('Successfully logged out');
        res.end();
    });
});

//Admin
app.get('/CreateUser/:username', (req, res) => {

    //UserDB.InsertUser(req.params.username)


    var password = 'p'; //TODO: Read this value in from the client
    dbTools.CreateNewUser(req.params.username, password);

    //TODO: Add validation to ensure user was created
    res.send("Successfully created user " + req.params.username);

});

app.get('/UpdateUser', (req, res) => {

    //TODO: Implement
    res.send("Currently not implemented");

});

app.get('/DeleteUser', (req, res) => {

    //TODO: Implement
    res.send("Currently not implemented");

});

app.get('/GetUser', (req, res) => {
    res.send(sess.username);
    res.end();
});

//AWS Related End Points
app.get('/CreateServer', (req, res) => {

    function ParseAWSResponse(resp) {

        var InstanceId = resp.Instances[0].InstanceId;

        dbTools.AddServerToUser(sess.username, InstanceId);
        res.send("Creating new Minecraft instance " + InstanceId);

        //TODO: Add some sort of error handling for when the template failed to get created - Currently the server will most likely crash
    }

    AWSMinecraftServerHosting.LaunchNewTemplate(ParseAWSResponse);
    
});

app.get('/GetInstances', (req, res) => {
    dbTools.GetServersForUser(sess.username).then(function(resp) {

        var instanceList = [];

        resp.forEach(i => {
            instanceList.push({ID: i, IPAddr: "aaa.aaa.aaa.aaa"});
        });

        res.send(instanceList);
    });
});

app.get('/Get/InstanceID/:instanceId', (req, res) => {

    function ParseAWSResponse(resp) {

        var IPAddr = resp.Reservations[0].Instances[0].PublicIpAddress;

        res.send("Minecraft instance " + req.params.instanceId + " has an IP Address of " + IPAddr);

        //TODO: Add some sort of error handling for when the template failed to get created - Currently the server will most likely crash
    }

    AWSMinecraftServerHosting.GetInstancePublicIPAddr(ParseAWSResponse, req.params.instanceId)
    
});


app.get('/Start/InstanceID/:instanceId', (req, res) => {

    //TODO: Implement
    res.send("Currently not implemented");

});

app.get('/Shutdown/InstanceID/:instanceId', (req, res) => {

    //TODO: Implement
    res.send("Currently not implemented");

});

app.get('/Delete/InstanceID/:instanceId', (req, res) => {

    //TODO: Implement
    res.send("Currently not implemented");

});

//Create a zip file of the minecraft world
app.get('/Backup/InstanceID/:instanceId', (req, res) => {

    //TODO: Implement
    res.send("Currently not implemented");

});

//allow user to upload backed up world
app.get('/Restore/InstanceID/:instanceId', (req, res) => {

    //TODO: Implement
    res.send("Currently not implemented");

});

//Allow the user to change the minecraft server settings file
app.get('/UpdateConfiguration/InstanceID/:instanceId', (req, res) => {

    //TODO: Implement
    res.send("Currently not implemented");

});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});