const inventoryType = require("./displayFeature.js").displayFeature;

function newPurse(){
    const context = getContext();
    const purse = {
        raw: context,
        addToElement: (amount, element) => addToElement(context, amount, element),
        subtractFromElement: (amount, element) => subtractFromElement(context, amount, element),
        checkBalance: (amount, element) => checkBalance(context, amount, element),
        getDisplayString: () => getDisplayString(context),
    }
    
    return purse;
}

function getDisplayString(context){
    let displayString = ``;
    for (const element in context){
        displayString += `${context[element].getDisplayString()}` + `\n`;
    }
    return displayString;
}

function addToElement(context, amount, element){
    const target = context[element];
    return target.add(amount);
}

function subtractFromElement(context, amount, element){
    const target = context[element];
    target.subtract(amount);
}

function checkBalance(context, amount, element){
    const target = context[element];
    return target.checkBalance(amount);
}

function getContext(){
    const provisions = inventoryType("Provisions", 5);
    provisions.setMax(10);
    const hearts = inventoryType("Hearts", 20);
    hearts.setMax(20);
    
    const context = {
        Spoons: inventoryType("Spoons", 10),
        Gems: inventoryType("Gems", 5),
        Hugs: inventoryType("Hugs", 0),
        Provisions: provisions,
        Hearts: hearts,
    };
    return context;
}

exports.newPurse = newPurse;
