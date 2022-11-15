const eris = require('eris');
const bot = new eris.Client('MTA0MTg0MTA3Mjc5MzQ2ODk1OA.Gec4Um.pj0-rSYc2XJIrqgKPEjcJU6rvAhun_O80YtUwI');

const PREFIX = 'moneybags!';

const commandHandlerForCommandName = require('./commandHandlerForCommandName.js').commandHandlerForCommandName;

bot.on('ready', () => {
   console.log('Connected and ready.');
});

bot.on('messageCreate', async (msg) => {
    const content = msg.content;

    if (!msg.channel.guild) {
        return;
    }

    if (!content.startsWith(PREFIX)) {
      return;
    }

  const parts = content.split(' ').map(s => s.trim()).filter(s => s);
  const commandName = parts[0].substr(PREFIX.length);
  console.log('commandName', commandName);

  const commandHandler = commandHandlerForCommandName[commandName];
  if (!commandHandler) {
      return;
  }

  const args = parts.slice(1);

  try {
      // Execute the command.
      await commandHandler(msg, args);
  } catch (err) {
      console.warn('Error handling command');
      console.warn(err);
  }
});

bot.on('error', err => {
   console.warn(err);
});

bot.connect();