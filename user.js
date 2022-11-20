const displayFeature = require("./displayFeature.js").displayFeature;
const newPurse = require("./purse.js").newPurse;

function getUsers(){
    const users = {};

    return {
        users, 
        addUser: (name) => addUser(name, users),
    };
    
}

function newUser(userObj){
    const user = {
        userObj: userObj,
        purse: newPurse(),
        profile: playerProfile(userObj.username),
    }
    return user;
}

function addUser(name, users){
    user = {
        name: name,
        purse: newPurse(),
        profile: playerProfile(name),
    }
    users[name] = user;
}

function playerProfile(name){
    profile = {
        name: displayFeature("Name", name),
        level: displayFeature("Level", 1),
        lives: displayFeature("Lives", 3), 
        HP: displayFeature("HP", 10),
        maxHP: displayFeature("Max HP", 10),
        exp: displayFeature("Exp", 0),
    }
    return profile;
}

exports.getUsers = getUsers;
exports.newUser = newUser;