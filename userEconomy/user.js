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
    const HP = displayFeature("HP", 10);
    HP.setMax(10);
    profile = {
        name: displayFeature("Name", name),
        level: displayFeature("Level", 1),
        lives: displayFeature("Lives", 3), 
        HP: HP,
        exp: displayFeature("Exp", 0),
    }
    return profile;
}

exports.newCitizen = newCitizen;