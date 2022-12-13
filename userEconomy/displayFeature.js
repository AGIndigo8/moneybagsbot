function displayFeature(name, value){
    const context = {
        name: name,
        value: value,
        max: -1,
    }
    return {
        name: name,
        setValue: (value) => setValue(context, value),
        getValue: () => getValue(context),
        setMax: (value) => setMax(context, value),
        add: (amount) => add(context, amount),
        subtract: (amount) => subtract(context, amount),
        maxOut: () => maxOut(context),
        reset: () => reset(context),
        checkBalance: (amount) => checkBalance(context, amount),
        getDisplayString: () => getDisplayString(context),
    }
}

function setValue(context, value) {
    context.value = value;
}

function getValue(context) {
    return context.value;
}

function getDisplayString(context){
    let {name, value, max} = context;
    if(max > -1){
        return `${name}: ${value}/${max}`;
    }
    return `${name}: ${value}`;
}

function setMax(context, value){
    context.max = value;
}

function add(context,  amountToAdd){
    let {max} = context;
    context.value += amountToAdd;
    if(context.value > max && max > -1){
        let change = context.value - max;
        context.value = max;
        return change;
    }
    return 0;
}

function subtract(context, amountToSubtract){
    let {max} = context;
    context.value -= amountToSubtract;
    if(context.value < 0){
        let change = context.value;
        context.value = 0;
        return change;
    }
    return 0;
}

function maxOut(context){
    let {max} = context;
    if(max > -1){
        let change = max - context.value;
        context.value = max;
        return change;
    }
    return 0;
}

function reset(context){
    let {max} = context;
    let change = context.value;
    context.value = 0;
    return change;
}

function checkBalance(context, amount){
    if(context.value >= amount){
        return true;
    }
    return false;
}

exports.displayFeature = displayFeature;