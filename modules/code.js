var code = function(command) {
  console.log(command.rest);
  var fnString = command.rest.replace(/`/g, '');

  var consolelog = console.log;

  var processexit = process.exit
  
  var fn = new Function(fnString);
  // redefine some stuff
  console.log = s => { command.message.channel.sendMessage("output: `" + s + "`") };
  process.exit = () => { command.message.channel.sendMessage('stop that, you idiot') }
  try {
    fn();
  } catch (ex) {
    command.message.channel.sendMessage('`' + ex + '`');
  }  
  //set stuff back to normal
  console.log = consolelog;
  process.exit = processexit;
}

exports.name = 'code';
exports.commands = [
  {
    cmd: 'code',
    func: code,
    desc: 'run some javascript code'
  },
  {
    cmd: 'js',
    func: code,
    desc: 'same as !code'
  }
]