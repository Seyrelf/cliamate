linkForPatchRealParamClimate = "https://seyrelf.tech/realParamClimate/update";
linkForPatchRealParamDevive = "https://seyrelf.tech/realDeviceClimate/update";
linkForPatchAllMode = "https://seyrelf.tech/mode/update";
linkForPatchSettingsParamClimate = "https://seyrelf.tech/settingsClimate/update";
linkForPatchSettingsParamDevice = "https://seyrelf.tech/settingsDevice/update";

/*Метод отвечает за отправку patch запроса на контроллер модов, тем самым обновляя состояние режима работы контура,
в качестве входных данных отправляем id для поиска нужного контура и новое значение режима работы*/
async function updateModeById(id,mode){
    try {
        const response = await fetch(linkForPatchAllMode,
            {method:'PATCH',
            body: JSON.stringify(
                {
                    "paramName" : id,
                    "newMode" : mode
                }),
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
        console.log('Данные отправлены ' + response.statusText);
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
        console.log('Данные отправлены ' + response.statusText);
    }
    catch(error){
        console.error('Произошла ошибка:', error);
        throw error;
    }
}