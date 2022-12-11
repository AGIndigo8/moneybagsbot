const newCitizen = require("./user.js").newCitizen;

function encodeCitizen(citizen){
    const features = getFeatures(citizen);
    encoding = "";
    // We are going to store each feature as 3 characters, so we need to pad the encoding with 0s
    for (let i = 0; i < features.length; i++){
        encoding += features[i].value.toString(36).padStart(3, "0");
    }
    return encoding;
}

function decodeCitizen(discordUser, encoding){
    const citizen = newCitizen(discordUser);
    const features = getFeatures(citizen);
    for (let i = 0; i < features.length; i++){
        features[i].value = parseInt(encoding.slice(i*3, i*3+3), 36);
    }
    return citizen;
}

function getFeatures(citizen){
    const purse = citizen.purse.raw;
    const profile = citizen.profile;
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

exports.encodeCitizen = encodeCitizen;
exports.decodeCitizen = decodeCitizen;