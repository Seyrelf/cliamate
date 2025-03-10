linkForGetRealParamClimate = "http://localhost:8080/realParamClimate/getLast";
linkForGetRealParamDevive = "http://localhost:8080/realDeviceClimate/getLast";
linkForGetAllMode = "http://localhost:8080/mode/getLast";
linkForGetSettingsParamClimate = "http://localhost:8080/settingsClimate/getLast";
linkForGetSettingsParamDevice = "http://localhost:8080/settingsDevice/getLast";

/*Метод отвечает за отправку get запроса для получения информации о состоянии микроклимота в помещении*/
async function getRealParamClimate(){
    try {
        const response = await fetch(linkForGetRealParamClimate);
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

/*Метод отвечает за отправку get запроса для получения информации о состоянии приборов в помещении*/
async function getRealParamDevice(){
    try {
        const response = await fetch(linkForGetRealParamDevive);
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

/*Метод отвечает за отправку get запроса для получения информации о режимах работы контуров*/
async function getAllMode(){
    try {
        const response = await fetch(linkForGetAllMode);
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

/*Метод отвечает за отправку get запроса для получения информации о заданиях для микроклимота в помещении*/
async function getSettingsParamClimate(){
    try {
        const response = await fetch(linkForGetSettingsParamClimate);
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



