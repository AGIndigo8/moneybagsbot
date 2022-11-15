const Users = require('./user.js');
const {users, addUser} = Users.getUsers();

const commandHandlerForCommandName = {};

commandHandlerForCommandName['rollcall'] = (msg, args) => {
    const thing = args[0];

    return msg.channel.createMessage(`Hi there, ${msg.author.username}. Yeah, I heard you say ${thing}`);
};

commandHandlerForCommandName['newAccount'] = (msg, args) => {
    const name = args[0];
    if(users[name]){
        return msg.channel.createMessage(`Woah! Looks like ${msg.author.username}, already has an account! What are you trying to pull here?`); 
    }
    addUser(name); 
    return msg.channel.createMessage(`Gotcha, ${msg.author.username}. I created an account for ${name}. They have ${users[name].spoons} spoons and ${users[name].gems} gems.`);
};

commandHandlerForCommandName['signup'] = (msg, args) => {
    const name = msg.author.username;
    if(users[name]){
        return msg.channel.createMessage(`Woah, ${msg.author.username}! It looks like you already have an account! What are you trying to pull here?`); 
    }
    addUser(name);
    return msg.channel.createMessage(`Welcome ${name}! I just spoke to the boys upstairs and we opened you an account. You have ${users[name].spoons} spoons and ${users[name].gems} gems. Oof!`);
};

commandHandlerForCommandName['balance'] = (msg, args) => {
    const name = msg.author.username;
    return msg.channel.createMessage(`You have ${users[name].spoons} spoons and ${users[name].gems} gems.`);
};

commandHandlerForCommandName['depositSpoons'] = (msg, args) => {
    const name = msg.author.username;
    const amount = args[0];
    users[name].spoons += parseInt(amount);
    return msg.channel.createMessage(`You now have ${users[name].spoons} spoons and ${users[name].gems} gems.`);
};


exports.commandHandlerForCommandName = commandHandlerForCommandName;