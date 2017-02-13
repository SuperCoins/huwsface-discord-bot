const Discord = require('discord.js');
const jsonfile = require('jsonfile');
const _ = require('lodash');
const fs = require('fs');
const bot = new Discord.Client();
const token = require("./token.json").token;

var commands = [];
fs.readdirSync('./modules').forEach(file => {
    let mod = require('./modules/' + file);
    let commandsObj = {
        name: mod.name,
        commands: mod.commands
    };
    commands.push(commandsObj);
});

bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    if (message.author.username != 'huwsface')
        processMessage(message);
});

bot.login(token);

function processMessage(message) {
    //console.log(message);
    if (message.content === 'beep') {
        message.channel.sendMessage('boop');
    }
    if (message.content === 'boop') {
        message.channel.sendMessage('beep');
    }
    if (message.content[0] === '!') {
        command(message);
    }
}

function command(message) {
    let com = splitter(message);
    let commandExists = false;
    if (com.command === 'help') {
        help(com);
        return;
    }
    for (let mod of commands) {
        if (mod.commands.hasOwnProperty(com.command)) {
            mod.commands[com.command](com);
            commandExists = true;
            break;
        }
    }

    if (!commandExists) {
        message.channel.sendMessage('please enter a proper command you nerd (try `!help` to see the available commands)');
    }
}

function splitter(message) {
    let contents = _.split(message.content, ' ');
    return {
        command: contents[0].substring(1),
        params: contents.slice(1, contents.length),
        user: message.author.username,
        message: message
    };
}

function help(command) {
    let msg = '```diff\n';
    msg += 'available commands:\n'
    for (let mod of commands) {
        msg += '- ' + mod.name + '\n';
        for (let cmdName of Object.keys(mod.commands)) {
            msg += '+  ' + cmdName + '\n';
        }
    }
    msg += '```';
    command.message.channel.sendMessage(msg);
}


