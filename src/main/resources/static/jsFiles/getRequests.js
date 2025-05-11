linkForGetRealParamClimate = "https://seyrelf.tech/realParamClimate/getLast";
linkForGetRealParamDevive = "https://seyrelf.tech/realDeviceClimate/getLast";
linkForGetAllMode = "https://seyrelf.tech/mode/getLast";
linkForGetSettingsParamClimate = "https://seyrelf.tech/settingsClimate/getLast";
linkForGetSettingsParamDevice = "https://seyrelf.tech/settingsDevice/getLast";
linkForGetModeByName = "https://seyrelf.tech/mode/getModeByName";
/*Метод отвечает за отправку get запроса для получения информации о состоянии микроклимота в помещении*/
async function getRealParamClimate(){
    try {
        const response = await fetch(linkForGetRealParamClimate);
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        const data = await response.json();
        return data;// Парсим ответ в JSON
    }
        catch(error){
            console.error('Произошла ошибка:', error);
            throw error;
        }
}

/*Метод отвечает за отправку get запроса для получения информации о состоянии приборов в помещении*/
async function getRealParamDevice(){
    try {
        const response = await fetch(linkForGetRealParamDevive);
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        const data = await response.json();
        return data;// Парсим ответ в JSON
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

/*Метод отвечает за отправку get запроса для получения информации о режимах работы контуров*/
async function getAllMode(){
    try {
        const response = await fetch(linkForGetAllMode);
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        const data = await response.json();
        return data;// Парсим ответ в JSON
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

/*Метод отвечает за отправку get запроса для получения информации о режимах работы контуров*/
async function getMode(name){
    const url = linkForGetModeByName + '?message=$' + name;
    try {
        console.log(url)
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        const data = await response.json();
        return data;// Парсим ответ в JSON
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

/*Метод отвечает за отправку get запроса для получения информации о заданиях для микроклимота в помещении*/
async function getSettingsParamClimate(){
    try {
        const response = await fetch(linkForGetSettingsParamClimate);
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        const data = await response.json();
        return data;// Парсим ответ в JSON
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

/*Метод отвечает за отправку get запроса для получения информации о заданиях для оборудования в помещении*/
async function getSettingsParamDevice(){
    try {
        const response = await fetch(linkForGetSettingsParamDevice);
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



