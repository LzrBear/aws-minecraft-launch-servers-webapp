const mongodb = require('mongodb')
const url = "mongodb://localhost:27017/";
var MongoClient = mongodb.MongoClient(url, { useUnifiedTopology: true });

exports.CreateDataBase = function() {

    MongoClient.connect(function(err, db) {
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

exports.InsertUser = function (name) {

    var data = { username: name, instances : [] }

    MongoClient.connect(function(err, db) {
        if (err) throw err;

        var dbo = db.db("AWS_Server_Service");

        dbo.collection("users").insertOne(data, function(err, res) {
            if (err) throw err;
            
            console.log("1 document inserted");
            db.close();
        });
      }); 
}


exports.UpdateUser = function (name, data) {
    MongoClient.connect(function(err, db) {
        if (err) throw err;
        var dbo = db.db("AWS_Server_Service");
        var myquery = { username: name };
        var newvalues = { $set: data };
        dbo.collection("users").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
            db.close();
        });
    }); 
}

// var myobj = { username: "Company Inc", instances: "Highway 41" };
// //this.InsertUser(myobj);

// var myobj = { instances: "Highway 411" };
// this.UpdateUser("Company Inc", myobj);