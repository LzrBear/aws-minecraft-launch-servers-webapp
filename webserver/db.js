const mongodb = require('mongodb')
const url = "mongodb://localhost:27017/";

exports.CreateDataBase = function() {

    mongodb.MongoClient(url, { useUnifiedTopology: true }).connect(function(err, db) {
        if (err) throw err;
        console.log("Database created!"); 
        
        var dbo = db.db("AWS_Server_Service")

        dbo.createCollection("users", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });

    });
}

exports.CreateNewUser = function (username, password) {

    var data = { username: username, password: password, instances : [] } //TODO: Hash and salt the password

    mongodb.MongoClient(url, { useUnifiedTopology: true }).connect(function(err, db) {
        if (err) throw err;

        var dbo = db.db("AWS-MinecraftServerService");

        dbo.collection("users").insertOne(data, function(err, res) {
            if (err) throw err;
            
            console.log("New user " + username + "created");
            db.close();
        });
      }); 
}

exports.VerifyUserPassword = function (username, password) {
    return new Promise(function(resolve, reject) {
        mongodb.MongoClient(url, { useUnifiedTopology: true }).connect(function(err, db) {
            if (err) {
                reject(err);
                throw err;
            } 
            var dbo = db.db("AWS-MinecraftServerService");
            dbo.collection("users").findOne({username: username}, function(err, result) {
                if (err) {
                    reject(err);
                    throw err;
                }
                console.log(result);
                db.close();
                
                if (result.password == password) { //TODO: Add salt and hashing
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        });
    });
}

exports.UpdateUser = function (name, data) {
    mongodb.MongoClient(url, { useUnifiedTopology: true }).connect(function(err, db) {
        if (err) throw err;
        var dbo = db.db("AWS-MinecraftServerService");
        var myquery = { username: name };
        var newvalues = { $set: data };
        dbo.collection("users").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
            db.close();
        });
    }); 
}

exports.AddServerToUser = function (username, serverID) {
    mongodb.MongoClient(url, { useUnifiedTopology: true }).connect(function(err, db) {
        if (err) throw err;
        var dbo = db.db("AWS-MinecraftServerService");
        var myquery = { username: username };
        var newvalues = { $push: { instances: serverID } };
        dbo.collection("users").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
            db.close();
        });
    }); 
}

exports.GetServersForUser = function (username) {
    return new Promise(function(resolve, reject) {
        mongodb.MongoClient(url, { useUnifiedTopology: true }).connect(function(err, db) {
            if (err) {
                reject(err);
                throw err;
            }
            var dbo = db.db("AWS-MinecraftServerService");
            dbo.collection("users").findOne({username: username}, function(err, result) {
                if (err) {
                    reject(err);
                    throw err;
                }

                resolve(result.instances);
                console.log(result.instances);
                db.close();
            });
        });
    }); 
}


// var myobj = { username: "Company Inc", instances: "Highway 41" };
// //this.InsertUser(myobj);

//var myobj = { instances: ["Gpat 4121"] };
//this.AddServerToUser("test", "Koala");