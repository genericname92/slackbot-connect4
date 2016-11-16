/* jshint node: true */

'use strict';

var Connect4Bot = require('../lib/connect4bot');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var connect4bot = new Connect4Bot({
    token: token,
    name: name
});

connect4bot.run();
