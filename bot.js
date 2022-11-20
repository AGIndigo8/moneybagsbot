const eris = require('eris');
const bot = new eris.Client('MTA0MTg0MTA3Mjc5MzQ2ODk1OA.G3QHRy.r2UaARBRxdc-wig4jWecX9ZRnKxjLLSJFGvUaY');

const PREFIX = 'mb!';

const commandHandlerForCommandName = require('./commandHandlerForCommandName.js').getCommandHandler(bot);

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