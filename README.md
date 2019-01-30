# OpenVAS-Wrapper
Express.js app used to execute OpenVAS Management Protocol commands through a reverse proxy server.

[![Build Status](https://travis-ci.com/kevin-ta/openvas-wrapper.svg?branch=master)](https://travis-ci.com/kevin-ta/openvas-wrapper)
[![Known Vulnerabilities](https://snyk.io/test/github/kevin-ta/openvas-wrapper/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kevin-ta/openvas-wrapper?targetFile=package.json)
[![Dependencies](https://david-dm.org/kevin-ta/openvas-wrapper.svg)](https://david-dm.org/kevin-ta/openvas-wrapper.svg)
## Getting Started

These instructions will get you a copy of the project up and running on a live system.

### Prerequisites

You will need at least Node.js v8.x, please refer to NodeSource's [instructions](https://github.com/nodesource/distributions/blob/master/README.md) to install the proper version.

### Installing

```
# Clone the project first
git clone https://github.com/kevin-ta/openvas-wrapper.git

# Go inside the directory
cd openvas-wrapper

# Install all the dependencies using npm
npm install
```

### Configuration

The configuration is located in config/default-0.json, the default values are:

```
OMP binary : /usr/bin/omp
OMP Host   : 127.0.0.1
OMP Port   : 9390

App Port   : 9001
```

### Deployment

```
# Install PM2
npm install pm2 -g

# Start the application
pm2 start /absolute/path/of/openvas-wrapper/index.js
```

## Usage

You can send any OMP commands in the URL and send any options by submitting data via POST method. To send an ID for task or report commands, use the data field.

```
# List of available commands:

# Display the OMP version used by OpenVAS Manager
get-omp-version

# Create a task
create-task

# Delete one or more reports
delete-report

# Delete one or more tasks
delete-task

# Get report of one task
get-report

# Get report formats (OMP 2.0 only)
get-report-formats

# Get status of one, many or all tasks
get-tasks

# Get configs
get-configs

# Get targets
get-targets

# Modify a task
modify-task

# Start one or more tasks
start-task

# Print version
version

# Show help
help
```

```
# List of available options:

# Use the username USER to access the OpenVAS Manager
username=USER

# Use the password PASSWORD to access the OpenVAS Manager.
password=PASSWORD

# Use NAME as the name for the newly created task
name=NAME

# Use COMMENT as the comment for the newly created task
comment=COMMENT

# Use TARGET as the target for the newly created task
target=TARGET

# Get report in format FORMAT
format=FORMAT
```

### Example with cURL

```
curl http://127.0.0.1:9001/get-report 
-d '{"username":"user", "password":"pwd", "data":"my-task-id"}' 
-H "Content-Type: application/json"
```
