const decodeCitizen = require("./userEncoder.js").decodeCitizen;
const encodeCitizen = require("./userEncoder.js").encodeCitizen;
const newCitizen = require("../userEconomy/user.js").newCitizen;

function getDataChannelActions(bot){
    const dataChannelActions = {
        getAuthorAsCitizen: async (msg) => await getAuthorAsCitizen(msg, bot),
        saveCitizen: async (msg, citizen) => await saveCitizen(msg, citizen),
    }
    return dataChannelActions;
}

async function getAuthorAsCitizen(msg, bot){
    const discordUser = msg.author;
    const dataChannel = getDataChannel(msg);
    const citizenPost = await findCitizenPost(discordUser, dataChannel);
    if(!citizenPost){
        const citizen = newCitizen(discordUser);
        setUserData(msg, citizen);
        return citizen;
    }
    const citizenEncoding = citizenPost.content.split(' ')[1];
    const citizen = decodeCitizen(discordUser, citizenEncoding);
    return citizen;
}

async function saveCitizen(msg, citizen){
    const discordUser = msg.author;
    const dataChannel = getDataChannel(msg);
    const citizenPost = await findCitizenPost(discordUser, dataChannel);
    const citizenEncoding = encodeCitizen(citizen);
    if(!citizenPost){
        dataChannel.createMessage(discordUser.username + discordUser.discriminator + ' ' + citizenEncoding);
    } else {
        await citizenPost.edit(discordUser.username + discordUser.discriminator + ' ' + citizenEncoding);
    }
}

async function findCitizenPost(discordUser, dataChannel){
    const posts = await dataChannel.getMessages();
    let prefix = discordUser.username + discordUser.discriminator;
    const citizenPost = posts.find(post => post.content.startsWith(prefix));

    return citizenPost;
}

function getDataChannel(msg){
    const channel = msg.channel;
    const guild = channel.guild;
    const guildChannels = guild.channels;
    const dataChannel = guildChannels.find(channel => channel.name === 'botstuff');
    return dataChannel;
}

exports.getDataChannelActions = getDataChannelActions;