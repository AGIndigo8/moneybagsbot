const displayFeature = require("./displayFeature.js").displayFeature;
const newPurse = require("./purse.js").newPurse;

function newCitizen(user){
    const citizen = {
        user: user,
        purse: newPurse(),
        profile: playerProfile(user.username),
    }
    return citizen;
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

exports.newCitizen = newCitizen;