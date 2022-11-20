const decodeUser = require("./userEncoder.js").decodeUser;
const encodeUser = require("./userEncoder.js").encodeUser;
const newUser = require("./user.js").newUser;

function getDataChannelActions(bot){
    dataChannelActions = {
        getUserData: async (msg) => await getUserData(msg, bot),
        setUserData: async (msg, userData) => await setUserData(msg, userData),
    }
    return dataChannelActions;
}

async function getUserData(msg, bot){
    const user = msg.author;
    const dataChannel = getDataChannel(msg);
    const userPost = await findUserPost(user, dataChannel);
    if(!userPost){
        const userData = newUser(user);
        setUserData(msg, userData);
        return userData;
    }
    const userEncoding = userPost.content.split(' ')[1];
    const userData = decodeUser(user, userEncoding);
    return userData;
}

async function setUserData(msg, userData){
    const user = msg.author;
    const dataChannel = getDataChannel(msg);
    const userPost = await findUserPost(user, dataChannel);
    const userEncoding = encodeUser(userData);
    if(!userPost){
        dataChannel.createMessage(user.username + user.discriminator + ' ' + userEncoding);
    } else {
        await userPost.edit(user.username + user.discriminator + ' ' + userEncoding);
    }
}

function getUser(discriminator, client){
    const users = client.users;
    const user = users.find(user => user.discriminator === discriminator);
    return user;
}

async function findUserPost(user, dataChannel){
    const posts = await dataChannel.getMessages();
    let prefix = user.username + user.discriminator;
    const userPost = posts.find(post => post.content.startsWith(prefix));

    return userPost;
}

function getDataChannel(msg){
    const channel = msg.channel;
    const guild = channel.guild;
    const guildChannels = guild.channels;
    const dataChannel = guildChannels.find(channel => channel.name === 'botstuff');
    return dataChannel;
}

exports.getDataChannelActions = getDataChannelActions;