const Discord = require('discord.js');
const jsonfile = require('jsonfile');
const _ = require('lodash');
const fs = require('fs');
const bot = new Discord.Client();
const token =  require("./token.json").token;

const LIST_DIR = __dirname + '/storage/';

var channel = '';

bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    if(message.author.username != 'also huwsface')
        processMessage(message);
});

bot.login(token);

function processMessage(message) {
    //console.log(message);
    channel = message.channel;
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
    switch(com.command) {
        case 'summon':
            var roles = channel.guild.roles;
            var roleFound;
            _.forEach(roles, function (role) {
                if (role.name == 'pizza gang') {
                    roleFound = role;
                    return;
                }                    
            })
            channel.sendMessage(com.user + ' summons ' + role.mention() + ' to play ' + com.params[0]);
            break;
        case 'newlist':
            newList(com.params[0], com.user);
            break;
        case 'list':
            addToList(com.params[0], com.params[1]);
            break;
        case 'viewlist':
            viewList(com.params[0]);
            break;
        default:
            channel.sendMessage('Please enter a proper command you nerd')
            break;
    }
}

function splitter(message) {
    let contents = _.split(message.content, ' ');
    return {
        command: contents[0].substring(1),
        params: contents.slice(1, contents.length),
        user: message.author.username
    };
}

function newList(listName, author) {
    let pathToFile = LIST_DIR + listName + '.json';
    if (fs.existsSync(pathToFile)){
        channel.sendMessage('List already exists');
    } else {
        let file = {
            contents: [],
            author: author
        }
        jsonfile.writeFileSync(pathToFile, file);
        channel.sendMessage('List created');
    }
}

function addToList(listName, value) {
    let pathToFile = LIST_DIR + listName + '.json';
    if (fs.existsSync(pathToFile)) {
        let list = jsonfile.readFileSync(pathToFile);
        list.contents.push(value);
        jsonfile.writeFileSync(pathToFile, list);
        channel.sendMessage("Added '" + value  + "' to list");
    }
}

function viewList(listName) {
    let pathToFile = LIST_DIR + listName + '.json';
    if (fs.existsSync(pathToFile)) {
        let list = jsonfile.readFileSync(pathToFile).contents;
        let output =  "```diff" + "\n" + "- "  + listName + '\n';
        _.forEach(list, function(item)  {
            output += '+ '  + item + '\n';
        });
        output += "```"
        channel.sendMessage(output);
    } else {
        channel.sendMessage('List does not exist');
    }
}
