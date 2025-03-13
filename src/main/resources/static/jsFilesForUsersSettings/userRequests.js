linkForGetAllUsers = "https://seyrelf.tech/users/findAllUsers";
linkForDelUserById = "https://seyrelf.tech/users/deleteById";
linkForCreateUser = "https://seyrelf.tech/users/save";
linkForUpdateWithoutPasswordUser = "https://seyrelf.tech/users/updateWithoutPassword";
linkForUpdateFullUser = "https://seyrelf.tech/users/updateFull";

async function getAllUsersData(){
    try {
        const response = await fetch(linkForGetAllUsers);
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Данные получены:', data);
        return data;// Парсим ответ в JSON
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

async function delUserById(id){
    try {
        const response = await fetch(linkForDelUserById,
            {method:'DELETE',
                body: JSON.stringify(id),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        console.log('Данные отправлены ' + response.statusText);
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

async function createUser(username,password,role){
    try {
        const response = await fetch(linkForCreateUser,
            {method:'POST',
                body: JSON.stringify(
                    {
                        "username" : username,
                        "password" : password,
                        "role" : role,
                    }
                ),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        console.log('Данные отправлены ' + response.statusText);
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

async function updateUserWithoutPassword(userId,username,role){
    try {
        const response = await fetch(linkForUpdateWithoutPasswordUser,
            {method:'PATCH',
                body: JSON.stringify(
                    {
                        "id" : userId,
                        "username" : username,
                        "role" : role,
                    }
                ),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        console.log('Данные отправлены ' + response.statusText);
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

async function updateUserFull(userId,username,password,role){
    try {
        const response = await fetch(linkForUpdateFullUser,
            {method:'PATCH',
                body: JSON.stringify(
                    {
                        "id" : userId,
                        "username" : username,
                        "password" : password,
                        "role" : role,
                    }
                ),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        console.log('Данные отправлены ' + response.statusText);
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}


