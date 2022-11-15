
function getUsers(){
    const users = {};

    return {
        users, 
        addUser: (name) => addUser(name, users),
    };
    
}

function addUser(name, users){
    user = {
        name: name,
        spoons: 0,
        gems: 0,
    }
    users[name] = user;
}

exports.getUsers = getUsers;