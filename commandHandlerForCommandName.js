const Users = require('./user.js');
const {users, addUser} = Users.getUsers();

function getCommandHandler(bot){
    const {getUserData, setUserData} = require('./datachannel.js').getDataChannelActions(bot);

    const commandHandlerForCommandName = {};

    commandHandlerForCommandName['rollcall'] = (msg, args) => {
        const thing = args[0];

        return msg.channel.createMessage(`Hi there, ${msg.author.username}. Yeah, I heard you say ${thing}`);
    };

    commandHandlerForCommandName['balance'] = async (msg, args) => {
        const user = await getUserData(msg); 
        let mess = 'You have the following in your account:\n';
        mess += generateBalance(user);
        return msg.channel.createMessage(mess);
    };

    function generateBalance(user){
        const purse = user.purse.raw;
        let output = '';
        for (const feature in purse){
            output += `${purse[feature].name}: ${purse[feature].value}\n`;
        }
        return output;
    }

    commandHandlerForCommandName['grant'] = async (msg, args) => {
        const author = msg.member;
        const authorRoles = author.roles
        const bankerRoleID = findRoleInGuild(msg, 'Banker').id;
        const bankerRole = authorRoles.find(role => role === bankerRoleID);
        if(!bankerRole){
            return msg.channel.createMessage('You do not have permission to grant money. Only bankers can tell me to do something like that.');
        }
        const mention = msg.mentions[0];
        const currency = args[1];
        const amount = parseInt(args[2]);
        const name = author.username;
        
        const getUserBundle = {
            author: mention,
            channel: msg.channel,
        }
        const recipient = await getUserData(getUserBundle);
        recipient.purse.raw[currency].value += amount;
        await setUserData(getUserBundle, recipient);
        return msg.channel.createMessage(`Okay, ${name}! You got it! ${mention.username} now has ${amount} ${currency}!`);
    };

    return commandHandlerForCommandName;
}

function findRoleInGuild(msg, role){
    const guild = msg.channel.guild;
    const guildRoles = guild.roles;
    const roleObj = guildRoles.find(guildRole => guildRole.name === role);
    return roleObj;
}

exports.getCommandHandler = getCommandHandler;