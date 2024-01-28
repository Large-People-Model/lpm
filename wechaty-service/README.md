# Wechaty Service

## Install

```shell
npm install
```

## Config

We are using `.env` file to config the environment variables.

```
MONGODB_URI=mongodb+srv://lpm:<PASSWORD>@<CLUSTER>.mongodb.net/?retryWrites=true&w=majority
```

## Usage

```shell
npm start
```

1. After started the program, it will show you a QR Code in the terminal, you can scan it with your WeChat App to login.
1. After logged in, the bot need some time to initialize itself. You will see the log message with the `login` event, after that, wait a while until you see lots of new log messsage is printing out, then you are ready to the next step.
1. you can send message `ding` to the group, and it will trigger the bot to start working

## Features

1. each `ding` message will flip the switch of the bot functionality
2. when the bot is on duty, it will update the members in the group
3. when the bot is on duty, it will save messages in the group to db

## Maintainer

Huan
