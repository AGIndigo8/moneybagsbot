const inventoryType = require("./displayFeature.js").displayFeature;

function newPurse(){
    const context = getContext();
    purse = {
        raw: context,
        getSpoons: () => getSpoons(context),
        getGems: () => getGems(context),
        getHugs: () => getHugs(context),
        getProvisions: () => getProvisions(context),
        getHearts: () => getHearts(context),
        getMaxProvisions: () => getMaxProvisions(context),
        getMaxHearts: () => getMaxHearts(context),
        addSpoons: (amount) => addSpoons(context, amount),
        addGems: (amount) => addGems(context, amount),
        addHugs: (amount) => addHugs(context, amount),
        addProvisions: (amount) => addProvisions(context, amount),
        addHearts: (amount) => addHearts(context, amount),
        addMaxProvisions: (amount) => addMaxProvisions(context, amount),
        addMaxHearts: (amount) => addMaxHearts(context, amount),
    }
    
    return purse;
}

function getContext(){
    const context = {
        Spoons: inventoryType("Spoons", 10),
        Gems: inventoryType("Gems", 5),
        Hugs: inventoryType("Hugs", 0),
        Provisions: inventoryType("Provisions", 5),
        Hearts: inventoryType("Hearts", 20),
        MaxProvisions: inventoryType("MaxProvisions", 10),
        MaxHearts: inventoryType("MaxHearts", 20),
    };
    return context;
}

function getSpoons(context){
    return context.Spoons.value;
}

function getGems(context){
    return context.Gems.value;
}

function getHugs(context){
    return context.Hugs.value;
}

function getProvisions(context){
    return context.Provisions.value;
}

function getHearts(context){
    return context.Hearts.value;
}

function getMaxProvisions(context){
    return context.MaxProvisions.value;
}

function getMaxHearts(context){
    return context.MaxHearts.value;
}

function addSpoons(context, amount){
    context.Spoons.value += amount;
}

function addGems(context, amount){
    context.Gems.value += amount;
}

function addHugs(context, amount){
    context.Hugs.value += amount;
}

function addProvisions(context, amount){
    context.Provisions.value += amount;
}

function addHearts(context, amount){
    context.Hearts.value += amount;
}

function addMaxProvisions(context, amount){
    context.MaxProvisions.value += amount;
}

function addMaxHearts(context, amount){
    context.MaxHearts.value += amount;
}

exports.newPurse = newPurse;
