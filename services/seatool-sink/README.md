This service is responsible for setting up the Kafka connector and processing events from the Kafka topics.

The following lambda functions are used to accomplish this:

configureConnectors - sets up the kafka connector in ECS

seaToolEvent - processes the kafka topics (topics listed in confluence listed below)

For more detailed informaiton see:
https://qmacbis.atlassian.net/wiki/spaces/DAD/pages/3124264969/Streaming+Management+Topics+OneMAC
