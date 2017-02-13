const LIST_DIR = __dirname + '/../storage/';
const jsonfile = require('jsonfile');
const fs = require('fs');
const _ = require('lodash');

var newList = function (command) {
  let listName = command.params[0];
  let author = command.user;
  let pathToFile = LIST_DIR + listName + '.json';
  if (fs.existsSync(pathToFile)) {
    command.message.channel.sendMessage('List already exists');
  } else {
    let file = {
      contents: [],
      author: author
    }
    jsonfile.writeFileSync(pathToFile, file);
    command.message.channel.sendMessage('List created');
  }
}

var addToList = function (command) {
  let listName = command.params[0];
  let value = command.params[1];
  let pathToFile = LIST_DIR + listName + '.json';
  if (fs.existsSync(pathToFile)) {
    let list = jsonfile.readFileSync(pathToFile);
    list.contents.push(value);
    jsonfile.writeFileSync(pathToFile, list);
    command.message.channel.sendMessage("Added '" + value + "' to list");
  }
}

var viewList = function (command) {
  let listName = command.params[0];
  let pathToFile = LIST_DIR + listName + '.json';
  if (fs.existsSync(pathToFile)) {
    let list = jsonfile.readFileSync(pathToFile).contents;
    let output = "```diff" + "\n" + "- " + listName + '\n';
    _.forEach(list, function (item) {
      output += '+ ' + item + '\n';
    });
    output += "```"
    command.message.channel.sendMessage(output);
  } else {
    command.message.channel.sendMessage('List does not exist');
  }
}

exports.commands = {
  "newlist": newList,
  "addtoist": addToList,
  "viewlist": viewList
}
exports.name = "list";