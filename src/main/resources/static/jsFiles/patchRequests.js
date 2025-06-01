linkForPatchRealParamClimate = baseUrl + "realParamClimate/update";
linkForPatchRealParamDevive = baseUrl + "realDeviceClimate/update";
linkForPatchMode = baseUrl + "mode/update";
linkForPatchPID = baseUrl + "pid/update";
linkForPatchSettingsParamClimate = baseUrl + "settingsClimate/update";
linkForPatchSettingsParamDevice = baseUrl + "settingsDevice/update";
linkForPatchSettingsWithHighLowParamClimate = baseUrl + "http://localhost:8080/settingsClimate/updateWHL";
linkForPatchRealParamClimateLight = baseUrl + "settingsClimate/updateTaskForLight";
linkForPatchRealParamClimateCO2 = baseUrl + "settingsClimate/updateTaskForCO2"

/*Метод отвечает за отправку patch запроса на контроллер модов, тем самым обновляя состояние режима работы контура,
в качестве входных данных отправляем id для поиска нужного контура и новое значение режима работы*/
async function updateModeByName(name,mode){
    try {
        const response = await fetch(linkForPatchMode,
            {method:'PATCH',
            body: JSON.stringify(
                {
                    "paramName" : name,
                    "newMode" : mode
                }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

/*Метод отвечает за отправку patch запроса на контроллер регуляторов*/
async function updatePIDByName(name,paramP,paramI,paramD){
    try {
        const response = await fetch(linkForPatchPID,
            {method:'PATCH',
                body: JSON.stringify(
                    {
                        "name" : name,
                        "paramP" : paramP,
                        "paramI" : paramI,
                        "paramD" : paramD
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

/*Метод отвечает за отправку patch запроса на контроллер заданий для параметров климата, тем самым обновляя задание для
 параметра климата, в качестве входных данных отправляем id для поиска нужного параметра и новое значение задания*/
async function updateClimateTaskById(id,task){
    try {
        const response = await fetch(linkForPatchSettingsParamClimate,
            {method:'PATCH',
                body: JSON.stringify(
                    {
                        "paramName" : id,
                        "paramTask" : task
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}


/*Метод отвечает за отправку patch запроса на контроллер заданий для параметров климата, тем самым обновляя задание для
 параметра климата, в качестве входных данных отправляем id для поиска нужного параметра и новое значение задания*/
async function updateClimateTaskByIdWithHighLow(id,taskLow,taskHigh){
    try {
        const response = await fetch(linkForPatchSettingsWithHighLowParamClimate,
            {method:'PATCH',
                body: JSON.stringify(
                    {
                        "paramName" : id,
                        "paramTaskHigh" : taskHigh,
                        "paramTaskLow": taskLow
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

/*Метод отвечает за отправку patch запроса на контроллер заданий для параметров приборов, тем самым обновляя задание для
 прибора, в качестве входных данных отправляем id для поиска нужного оборудования и новое значение задания*/
async function updateDeviceTaskById(id,task){
    try {
        const response = await fetch(linkForPatchSettingsParamDevice,
            {method:'PATCH',
                body: JSON.stringify(
                    {
                        "paramName" : id,
                        "paramTask" : task
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

/*Метод отвечает за отправку patch запроса на контроллер заданий для параметров приборов, тем самым обновляя задание для
 прибора, в качестве входных данных отправляем id для поиска нужного оборудования и новое значение задания*/
async function updateCO2Task(id,taskLow,taskHigh,minLightTask){
    try {
        const response = await fetch(linkForPatchRealParamClimateCO2,
            {method:'PATCH',
                body: JSON.stringify(
                    {
                        "paramName" : id,
                        "paramTaskHigh" : taskHigh,
                        "paramTaskLow": taskLow,
                        "minLightTask": minLightTask
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

/*Метод отвечает за отправку patch запроса на контроллер заданий для параметров приборов, тем самым обновляя задание для
 прибора, в качестве входных данных отправляем id для поиска нужного оборудования и новое значение задания*/
async function updateLightTask(id,task,startLight,endLight){
    try {
        const response = await fetch(linkForPatchRealParamClimateLight,
            {method:'PATCH',
                body: JSON.stringify(
                    {
                        "paramName" : id,
                        "paramTask" : task,
                        "startLight" : startLight,
                        "endLight" : endLight,
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}