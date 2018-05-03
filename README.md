# Dependency Manager (I need a name)

While developing at a company that heavily employs microservices, I noticed that there was no solution for keeping track of all of the projects. There was a gateway application that had all of the RESTful API endpoints and interfaces, but didn't provide any information on where the source code was stored or in what features/applications they were used for. This resulted in a lot of developer time being spent researching work that was already done.

To build a new feature that was similar to an existing feature, the developers would have to figure out which services were being used by the feature. Following that, the developers would then have to search through the version control system to find the actual repositories containing the relevant source code.

This tool is intended to ease that burden by providing a simple system for looking up services relevant to a given feature. Features can be given names and searched upon. Tagging a service as part of a feature recursively provides the option of tagging dependencies as part of the feature as well. This allows future searches to pull up any and all services that are relevant to the requested feature.

## Running
Run with `npm start`. The webapp will be hosted on port 8000.



## TODO
https://docs.aws.amazon.com/lambda/latest/dg/build-pipeline.html
