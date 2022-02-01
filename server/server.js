const { getQueryInfo } = require("./utils");

const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
var app = express();

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyparser.json());

app.get("/history", function(_, res) {
  connection.query(
    `SELECT requestInput FROM history
        ORDER BY id DESC
        LIMIT 5`,
    function(err, results) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.post("/search", (req, res) => {
  const body = req.body;
  const queries = body.queries;
  const responses = queries.map(query => [query, getQueryInfo(query)]);
  if (responses.find(([_, respone]) => !respone.isValid)) {
    res.status(500).send("invalid");
  } else {
    responses.forEach(([query, respone]) => {
      connection.query(
        respone.type === "email"
          ? `INSERT INTO history ( requestInput, inputType, isFreeEmail) VALUES("${query}" , "email", ${respone.moreInformation.isFreeEmail});`
          : `INSERT INTO history ( requestInput, inputType, phoneCountry) VALUES("${query}" , "phone","${respone.moreInformation.phoneCountry}");`,
        function(err) {
          console.log(err);
        }
      );
    });
    res.status(200).send(responses);
  }
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "main"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

function createRequestsTable(connection) {
  connection.query(
    `CREATE TABLE IF NOT EXISTS history ( id int AUTO_INCREMENT, requestInput VARCHAR(255), inputType VARCHAR(255), isFreeEmail BOOL,  phoneCountry VARCHAR(255), PRIMARY KEY(id));`,
    function(err, results) {
      console.log(err);
      console.log(results);
    }
  );
}
createRequestsTable(connection);
