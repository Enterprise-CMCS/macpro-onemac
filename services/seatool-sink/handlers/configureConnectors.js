import aws from "aws-sdk";
const lodash = require("lodash");
const http = require("http");

const connectors = [
  {
    name: `${process.env.sinkPrefix}sink.testing`,
    config: {
      "tasks.max": "1",
      "connector.class":
        "com.nordstrom.kafka.connect.lambda.LambdaSinkConnector",
      topics: process.env.topics,
      "poll.interval.ms": 200,
      "key.converter": "org.apache.kafka.connect.storage.StringConverter",
      "value.converter": "org.apache.kafka.connect.storage.StringConverter",
      "aws.region": "us-east-1",
      "aws.lambda.function.arn": process.env.functionArn,
      "aws.lambda.batch.enabled": "false",
      "aws.credentials.provider.class":
        " com.amazonaws.auth.DefaultAWSCredentialsProviderChain",
    },
  },
];

function putConnectorConfig(workerIp, config, callback) {
  const retry = function (e) {
    console.log("Got error: " + e);
    setTimeout(function () {
      putConnectorConfig(workerIp, config, callback);
    }, 5000);
  };

  const options = {
    hostname: workerIp,
    port: 8083,
    path: `/connectors/${config.name}/config`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const req = http
    .request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      if (res.statusCode == "404") {
        retry.call(`${res.statusCode}`);
      }
      res.on("data", (d) => {
        console.log(d.toString("utf-8"));
      });
    })
    .on("error", retry);
  req.setTimeout(5000, function () {
    this.socket.destroy();
  });
  req.write(JSON.stringify(config.config));
  req.end();
}

function myHandler(event) {
  if (event.source == "serverless-plugin-warmup") {
    console.log(
      "Warmed up... although this function shouldn't be prewarmed.  So, turn it off."
    );
    return null;
  }
  console.log("Received event:", JSON.stringify(event, null, 2));
  const ecs = new aws.ECS();
  const params = {
    cluster: process.env.cluster,
  };
  ecs.listTasks(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      const params = {
        cluster: process.env.cluster,
        tasks: data.taskArns,
      };
      ecs.describeTasks(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else {
          data.tasks.forEach((task) => {
            const ip = lodash.filter(
              task.attachments[0].details,
              (x) => x.name === "privateIPv4Address"
            )[0].value;
            console.log(`Configuring connector on worker:  ${ip}`);
            connectors.forEach(function (config) {
              console.log(
                `Configuring connector with config: ${JSON.stringify(
                  config,
                  null,
                  2
                )}`
              );
              putConnectorConfig(ip, config, function (res) {
                console.log(res);
              });
            });
          });
        }
      });
    }
  });
}

exports.handler = myHandler;
