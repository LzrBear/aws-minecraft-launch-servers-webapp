const express = require('express'); //npm install express
const cors = require('cors'); //npm install cors
const app = express();
const AWSMinecraftServerHosting = require('./MinecraftServer.js')
const UserDB = require('./MongoDBTest.js')

//TODO: Disable this before deploying to production
app.use(cors()) //Enable All CORS (Cross-Origin) Requests - https://expressjs.com/en/resources/middleware/cors.html

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

//Admin
app.get('/CreateUser/:username', (req, res) => {

    UserDB.InsertUser(req.params.username)

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

    //TODO: Implement
    res.send("Currently not implemented");

});

//AWS Related End Points
app.get('/Create', (req, res) => {

    function ParseAWSResponse(resp) {

        var InstanceId = resp.Instances[0].InstanceId;

        res.send("Creating new Minecraft instance " + InstanceId);

        //TODO: Add some sort of error handling for when the template failed to get created - Currently the server will most likely crash
    }

    AWSMinecraftServerHosting.LaunchNewTemplate(ParseAWSResponse)
    
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