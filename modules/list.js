const LIST_DIR = __dirname + '/../storage/';
const jsonfile = require('jsonfile');
const fs = require('fs');
const _ = require('lodash');

var newList = function (command) {
  let listName = command.rest.trim();
  let author = command.user;
  let pathToFile = LIST_DIR + 'lists.json';
  var json = jsonfile.readFileSync(pathToFile);
  if (json[listName]) {
    command.message.channel.sendMessage('list already exists!');
  } else {
    json[listName] = {
      author: author,
      entries: []
    }
    json.writeFileSync(pathToFile, json);
  }
}

var addToList = function (command) {
  let rest = command.rest;
  let author = command.user;
  let pathToFile = LIST_DIR + 'lists.json';
  var regex = /^'(.*?)' (.*)/;
  var json = jsonfile.readFileSync(pathToFile);
  if (rest.test(regex)) {
    var parts = rest.match(regex);
    var listName = parts[1];
    var value = parts[2];
    if (json[listName]) {
      json[listName].entries.push(value);
      json.writeFileSync(pathToFile, json);
    } else {
      command.message.channel.sendMessage('couldn\'t find list :(')
    }
  } else {
    command.message.channel.sendMessage('oops! maybe your syntax was wrong or you had a typo?');
  }
}

var viewList = function (command) {
  let listName = command.rest.trim();
  let author = command.user;
  let pathToFile = LIST_DIR + 'lists.json';
  var json = jsonfile.readFileSync(pathToFile);
  if (json[listName]) {
    var msg = '```diff\n- ' + listName + ' (by ' + author + ')';
    json[listName].entries.forEach(x => {
      msg += '+ ' + x + '\n';
    });
    command.message.channel.sendMessage(msg);
  } else {
    command.message.channel.sendMessage('couldn\'t find list :(')
  }
}

exports.commands = [
  {
    cmd: 'newlist',
    func: newList,
    desc: 'create a new list with name `x`'
  },
  {
    cmd: 'addtolist',
    func: addToList,
    desc: 'add value `y` to the list `x`'
  },
  {
    cmd: 'viewlist',
    func: viewList,
    desc: 'view all entries in list `x`'
  }
]
exports.name = "list";