
const displayFeature = require("./displayFeature.js").displayFeature;
const newPurse = require("./purse.js").newPurse;
const newUser = require("./user.js").newUser;

function encodeUser(user){
    const features = getFeatures(user);
    encoding = "";
    // We are going to store each feature as 3 characters, so we need to pad the encoding with 0s
    for (let i = 0; i < features.length; i++){
        encoding += features[i].value.toString(36).padStart(3, "0");
    }
    return encoding;
}

function decodeUser(userObj, encoding){
    const user = newUser(userObj);
    const features = getFeatures(user);
    for (let i = 0; i < features.length; i++){
        features[i].value = parseInt(encoding.slice(i*3, i*3+3), 36);
    }
    return user;
}

function getFeatures(user){
    const purse = user.purse.raw;
    const profile = user.profile;
    features= [
        profile.level,
        profile.lives,
        profile.HP,
        profile.maxHP,
        profile.exp,
        purse.Spoons,
        purse.Gems,
        purse.Hugs,
        purse.Provisions,
        purse.Hearts,
        purse.MaxProvisions,
        purse.MaxHearts,
    ];
    return features;
}

exports.encodeUser = encodeUser;
exports.decodeUser = decodeUser;