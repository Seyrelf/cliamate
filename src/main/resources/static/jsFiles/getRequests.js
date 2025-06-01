
linkForGetRealParamClimate = baseUrl + "realParamClimate/getLast";
linkForGetRealParamDevive = baseUrl + "realDeviceClimate/getLast";
linkForGetAllMode = baseUrl + "mode/getLast";
linkForGetSettingsParamClimate = baseUrl + "settingsClimate/getLast";
linkForGetSettingsParamDevice = baseUrl + "settingsDevice/getLast";
linkForGetModeByName = baseUrl + "mode/getModeByName";
linkForGetPIDSettings = baseUrl + "pid/getLast";
linkForGetPIDByName = baseUrl + "pid/getPIDByName";


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

/*Метод отвечает за отправку get запроса для получения информации о режиме работы контура*/
async function getMode(name){
    const url = linkForGetModeByName + '?name=' + name;
    try {
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

/*Метод отвечает за отправку get запроса для получения информации о настройках регуляторов*/
async function getAllPIDData(){
    try {
        const response = await fetch(linkForGetPIDSettings);
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

/*Метод отвечает за отправку get запроса для получения информации о настройках регулятора*/
async function getPIDData(name){
    const url = linkForGetPIDByName + '?name=' + name;
    try {
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



