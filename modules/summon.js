const _ = require('lodash');

var summon = function (command) {
  let roles = command.message.channel.guild.roles;
  let roleFound;
  //_.forEach(roles, function (role) {
  roles.forEach(role => {
    if (role.name == 'pizza gang') {
      roleFound = role;
      return;
    }
  });
  command.message.channel.sendMessage(command.user + ' summons ' + roleFound + ' to play ' + command.params[0]);
}

exports.name = 'games';
exports.commands = {
  'summon': summon
}