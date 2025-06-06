/*Функция для отрисовки и открытия окна настройки контуром*/
async function createParamSettings(obj,name){
    paramId = obj.querySelector('span').id;
    modeForParam =  await getModeByName(paramId);
    settingsForParam = await getSettingClimateByName(paramId);
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettings';
    head = createHeadWindow(name,paramSettings);
    paramSettings.appendChild(head);
    mode = createSwithMode(modeForParam);
    task = createTaskInput(settingsForParam,"inputTask","Задание ");
    okBtn = document.createElement('button');
    okBtn.type = "button";
    okBtn.textContent = "Применить";
    okBtn.id = "updateParamBtn";
    okBtn.onclick = function (){
        if(checkUserRole(okBtn)){
            return;
        }
        const regex = /^(\d|.)+$/;
        if(regex.test(inputTask.value)){
            nameForFind = document.getElementById(paramId).parentElement.parentElement.getElementsByClassName("mode-char")[0].getElementsByClassName("text-center")[0].id;
            updateModeByName(nameForFind, paramSettings.querySelector("select").value);
            if(paramId === "powerVentilatorInReal"){
                if(inputTask.value > 100){
                    inputTask.value = "100";
                }
                updateDeviceTaskById(paramId,inputTask.value);
            }
            else{
                updateClimateTaskById(paramId,inputTask.value);}
            forDel = document.getElementById(paramSettings.id);
            forDel.remove();}
        else {
            errorSpan = createErrorInfoLabel("Некоректные значения ввода!");
            if(document.getElementById("errorSpan")===null){
                document.getElementById("paramSettings").appendChild(errorSpan);}
        }

    }
    paramSettings.appendChild(mode);
    paramSettings.appendChild(task);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}

/*Функция для отрисовки и открытия окна настройки с минимальным и максимальным значением*/
async function createParamSettingsWithLowHigh(obj,name){
    paramId = obj.querySelector('span').id;
    modeForParam =  await getModeByName(paramId);
    settingsForParam = await getSettingClimateByName(paramId);
    lowValue = settingsForParam[0];
    highValue = settingsForParam[1];
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettings';
    head = createHeadWindow(name,paramSettings);
    paramSettings.appendChild(head);
    mode = createSwithMode(modeForParam);
    taskLow = createTaskInput(lowValue, "inputTaskLow", "Мин. порог");
    taskHigh = createTaskInput(highValue, "inputTaskHigh", "Макс. порог");
    okBtn = createOkBtn();
    okBtn.onclick = function (){
        if(checkUserRole(okBtn)){
            return;
        }
        const regex = /^(\d|.)+$/;
        inputTaskLow = document.getElementById("inputTaskLow");
        inputTaskHigh = document.getElementById("inputTaskHigh");
        if(regex.test(inputTaskLow.value) && regex.test(inputTaskHigh.value)){
            if(Number(inputTaskLow.value) < Number(inputTaskHigh.value)){
                nameForFind = document.getElementById(paramId).parentElement.parentElement.getElementsByClassName("mode-char")[0].getElementsByClassName("text-center")[0].id;
                updateModeByName(nameForFind, paramSettings.querySelector("select").value);
                updateClimateTaskByIdWithHighLow(paramId,inputTaskLow.value,inputTaskHigh.value);
                forDel = document.getElementById(paramSettings.id);
                forDel.remove();
            }
            else{
                errorSpan = createErrorInfoLabel("Минимальное значение должно быть меньше максимального!");
                if(document.getElementById("errorSpan")===null){
                    document.getElementById("paramSettings").appendChild(errorSpan);}
            }
}
        else {
            errorSpan = createErrorInfoLabel("Некоректные значения ввода!");
            if(document.getElementById("errorSpan")===null){
                document.getElementById("paramSettings").appendChild(errorSpan);}
        }

    }
    paramSettings.appendChild(mode);
    paramSettings.appendChild(taskLow);
    paramSettings.appendChild(taskHigh);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}

/*Функция для отрисовки и открытия окна настройки co2 контура*/
async function createParamSettingsForCO2(obj,name){
    paramId = obj.querySelector('span').id;
    modeForParam =  await getModeByName(paramId);
    settingsForParam = await getSettingClimateByName(paramId);
    lowValue = settingsForParam[0];
    highValue = settingsForParam[1]
    minLight = settingsForParam[2];
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettings';
    head = createHeadWindow(name,paramSettings);
    mode = createSwithMode(modeForParam);
    taskLow = createTaskInputInt(lowValue, "inputTaskLow", "Мин. порог");
    taskHigh = createTaskInputInt(highValue, "inputTaskHigh", "Макс. порог");
    taskMinLight = createTaskInputInt(minLight, "inputMinLight", "Мин. ур. света");
    okBtn = createOkBtn();
    okBtn.onclick = function (){
        if(checkUserRole(okBtn)){
            return;
        }
        const regex = /^(\d|.)+$/;
        inputTaskLow = document.getElementById("inputTaskLow");
        inputTaskHigh = document.getElementById("inputTaskHigh");
        inputTaskMinLight = document.getElementById("inputMinLight");
        if(regex.test(inputTaskLow.value) && regex.test(inputTaskHigh.value) && regex.test(inputTaskMinLight.value)){
            if(Number(inputTaskLow.value) < Number(inputTaskHigh.value)){
                nameForFind = document.getElementById(paramId).parentElement.parentElement.getElementsByClassName("mode-char")[0].getElementsByClassName("text-center")[0].id;
                updateModeByName(nameForFind, paramSettings.querySelector("select").value);
                updateCO2Task(paramId,validateIntegerInput(inputTaskLow.value),validateIntegerInput(inputTaskHigh.value),validateIntegerInput(inputTaskMinLight.value));
                forDel = document.getElementById(paramSettings.id);
                forDel.remove();
            }
            else{
                errorSpan = createErrorInfoLabel("Минимальное значение должно быть меньше максимального!");
                if(document.getElementById("errorSpan")===null){
                    document.getElementById("paramSettings").appendChild(errorSpan);}
            }
        }
        else {
            errorSpan = createErrorInfoLabel("Некоректные значения ввода!");
            if(document.getElementById("errorSpan")===null){
                document.getElementById("paramSettings").appendChild(errorSpan);}
        }
    }
    paramSettings.appendChild(head);
    paramSettings.appendChild(mode);
    paramSettings.appendChild(taskLow);
    paramSettings.appendChild(taskHigh);
    paramSettings.appendChild(taskMinLight);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}

/*Функция для отрисовки и открытия окна настройки с текстовым заданием*/
async function createParamSettingsWithoutModeText(obj,name){
    paramId = obj.querySelector('span').id;
    settingsForDevice = await getSettingDeviceByName(paramId);
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettingsWithoutMode';
    head = createHeadWindow(name,paramSettings);
    paramSettings.appendChild(head);
    task = document.createElement('div');
    task.className = 'task';
    textTask = document.createElement('span');
    textTask.textContent = "Задание ";
    textTask.id = "textTask";
    workSwitch = document.createElement('select');
    workSwitch.className = "form-select";
    workSwitch.id = "formSelect";
    workSwitch.ariaLabel = "Default select example";
    onSwitch = document.createElement('option');
    onSwitch.textContent = "ВКЛ";
    offSwitch = document.createElement('option');
    offSwitch.textContent = "ВЫКЛ";
    switch (settingsForDevice) {
        case 'ВКЛ':
            workSwitch.appendChild(onSwitch);
            workSwitch.appendChild(offSwitch);
            break;
        case 'ВЫКЛ':
            workSwitch.appendChild(offSwitch);
            workSwitch.appendChild(onSwitch);
            break;
    }
    task.appendChild(textTask);
    task.appendChild(workSwitch);
    okBtn = createOkBtn();
    okBtn.onclick = function (){
        if(checkUserRole(okBtn)){
            return;
        }
        updateDeviceTaskById(paramId,workSwitch.value);
        forDel = document.getElementById(paramSettings.id);
        forDel.remove();
    }
    paramSettings.appendChild(task);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}

/*Функция для отрисовки и открытия окна настройки с числовым заданием*/
async function createParamSettingsWithoutModeNumber(obj,name){
    paramId = obj.querySelector('span').id;
    settingsForDevice = await getSettingDeviceByName(paramId);
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettingsWithoutMode';
    head = createHeadWindow(name,paramSettings);
    paramSettings.appendChild(head);
    task = createTaskInput(settingsForDevice,"inputTask","Задание ");
    okBtn = createOkBtn();
    okBtn.onclick = function (){
        if(checkUserRole(okBtn)){
            return;
        }
        const regex = /^(\d|.)+$/;
        if(regex.test(inputTask.value)){
            if(inputTask.value > 100){
               inputTask.value = '100';
            }
            updateDeviceTaskById(paramId,inputTask.value);
            forDel = document.getElementById(paramSettings.id);
            forDel.remove();}
        else {
            errorSpan = createErrorInfoLabel("Некоректные значения ввода!");
            if(document.getElementById("errorSpan")===null){
                document.getElementById("paramSettingsWithoutMode").appendChild(errorSpan);}
        }
    }
    paramSettings.appendChild(task);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}

/*Функция для отрисовки и открытия окна настройки с числовым заданием для задания света*/
async function createParamSettingsForLight(obj,name){
    paramId = obj.querySelector('span').id;
    modeForParam =  await getModeByName(paramId);
    settingsForParam = await getSettingClimateByName(paramId);
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettings';
    head = createHeadWindow(name,paramSettings);
    paramSettings.appendChild(head);
    mode = createSwithMode(modeForParam);
    lightTask = createTaskInputInt(settingsForParam[0],"inputTask","Задание ");
    timeStartTask = createTimeTask(settingsForParam[1],"inputTaskLow","Вкл. освещения ");
    timeEndTask = createTimeTask(settingsForParam[2],"inputTaskHigh","Откл. освещения ")
    okBtn = createOkBtn();
    okBtn.onclick = function (){
        if(checkUserRole(okBtn)){
            return;
        }
        const regex = /^(\d|.)+$/;
        lightTaskValue = document.getElementById("inputTask").value;
        if(regex.test(lightTaskValue)){
            lightTaskValue = validateIntegerInput(lightTaskValue);
            inputStartTime = document.getElementById("inputTaskLow").value;
            inputEndTime = document.getElementById("inputTaskHigh").value;
            if(inputStartTime > inputEndTime){
                errorSpan = createErrorInfoLabel("Время начала не должно быть раньше времени окончания в сутках");
                if(document.getElementById("errorSpan")===null){
                    document.getElementById("paramSettings").appendChild(errorSpan);}
            }
            else {
                nameForFind = document.getElementById(paramId).parentElement.parentElement.getElementsByClassName("mode-char")[0].getElementsByClassName("text-center")[0].id;
                updateModeByName(nameForFind, paramSettings.querySelector("select").value);
                updateLightTask(paramId,lightTaskValue,inputStartTime,inputEndTime);
                forDel = document.getElementById(paramSettings.id);
                forDel.remove();}
            }

        else {
            errorSpan = createErrorInfoLabel("Некоректные значения ввода!");
            if(document.getElementById("errorSpan")===null){
                document.getElementById("paramSettings").appendChild(errorSpan);}
        }

    }
    paramSettings.appendChild(mode);
    paramSettings.appendChild(lightTask);
    paramSettings.appendChild(timeStartTask);
    paramSettings.appendChild(timeEndTask);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}

/*Функция для создания шапки окна настройки*/
function createHeadWindow(name,paramSettingsId){
    head = document.createElement('div');
    head.className = "header";
    nameWindow = document.createElement('span');
    nameWindow.textContent = name;
    nameWindow.id = "paramName";
    closeWindowBtn = document.createElement('button');
    closeWindowBtn.type = "button";
    closeWindowBtn.ariaLabel = "Close";
    closeWindowBtn.textContent = "X";
    closeWindowBtn.id = 'close-btn'
    closeWindowBtn.onclick = function (){
        forDel = document.getElementById(paramSettings.id);
        forDel.remove();
    }
    head.appendChild(nameWindow);
    head.appendChild(closeWindowBtn);
    return head;
}

/*Функция для создания блока задания окна настройки*/
function createTaskInput(settingsForDevice,id,text){
    task = document.createElement('div');
    task.className = 'task';
    textTask = document.createElement('span');
    textTask.textContent = text;
    textTask.id = "textTask";
    inputTask = document.createElement("input");
    inputTask.type = "number";
    inputTask.min = 0;
    inputTask.oninput = "validity.valid||(value='');";
    inputTask.id = id;
    inputTask.value = settingsForDevice;
    inputTask.className = "form-control";
    task.appendChild(textTask);
    task.appendChild(inputTask);
    return task;
}

/*Функция для создания блока задания с целочисленными значениями окна настройки*/
function createTaskInputInt(settingsForDevice,id,text){
    task = document.createElement('div');
    task.className = 'task';
    textTask = document.createElement('span');
    textTask.textContent = text;
    textTask.id = "textTask";
    inputTask = document.createElement("input");
    inputTask.type = "number";
    inputTask.min = 0;
    inputTask.step = 1;
    inputTask.oninput = "validity.valid||(value='');";
    inputTask.id = id;
    inputTask.value = settingsForDevice;
    inputTask.className = "form-control";
    task.appendChild(textTask);
    task.appendChild(inputTask);
    return task;
}

/*Функция фильтрации целочисленного задания окна настройки*/
function validateIntegerInput(value) {
    // Удаляем все символы, кроме цифр
    value = Math.floor(value)
    // Проверяем минимальное значение
    if (value < 0) {
        value = 0;
    }
    return value;
}


/*Функция фильтрации целочисленного задания окна настройки*/
function validateIntegerInput(value) {
    // Удаляем все символы, кроме цифр
    value = Math.floor(value)
    // Проверяем минимальное значение
    if (value < 0) {
        value = 0;
    }
    return value;
}

/*Функция для создания блока выбора мода окна настройки*/
function createSwithMode(modeForParam){
    mode = document.createElement('div');
    mode.className = 'mode';
    textMode = document.createElement('span');
    textMode.textContent = "Режим Управления";
    textMode.id = "textMode";
    allMode = document.createElement('select');
    allMode.className = "form-select";
    allMode.id = "formSelect";
    allMode.ariaLabel = "Default select example";
    autoMode = document.createElement('option');
    autoMode.textContent = "Автоматический";
    handMode = document.createElement('option');
    handMode.textContent = "Ручной";
    switch (modeForParam) {
        case 'Ручной':
            allMode.appendChild(handMode);
            allMode.appendChild(autoMode);
            break;
        case 'Автоматический':
            allMode.appendChild(autoMode);
            allMode.appendChild(handMode);
            break;
    }
    mode.appendChild(textMode);
    mode.appendChild(allMode);
    return mode;
}

/*Функция для создания кнопки применить*/
function createOkBtn(){
    okBtn = document.createElement('button');
    okBtn.type = "button";
    okBtn.textContent = "Применить";
    okBtn.id = "updateParamBtn";
    return okBtn;
}

/*Функция для создания блока задания временного диапозона настройки*/
function createTimeTask(settingsForDevice,id,text){
    task = document.createElement('div');
    task.className = 'task';
    textTask = document.createElement('span');
    textTask.textContent = text;
    textTask.id = "textTask";
    inputTask = document.createElement("input");
    inputTask.type = "time";
    inputTask.id = id;
    inputTask.value = settingsForDevice;
    inputTask.className = "form-control";
    task.appendChild(textTask);
    task.appendChild(inputTask);
    return task;
}

/*Функция для создания блока вывода ошибки окна настройки*/
function createErrorInfoLabel(textError){
    errorSpan = document.createElement("div");
    errorSpan.id = "errorSpan";
    errorSpan.textContent = textError;
    return errorSpan;
}

/*Функция для проверки роли пользователя с обработкой ошибки*/
function checkUserRole(okBtn){
    if(window.role === "ROLE_USER"){
        okBtn.textContent = "Недостаточно прав";
        okBtn.style.color = "red";
        return true;
    }
}

/*Данная функция закрывает все открытые окна настройки*/
function closeParamSettingsAll(){
    if(document.getElementById('paramSettings') !== null) {
        paramSettings = document.getElementById('paramSettings');
        paramSettings.remove();
    }
    else if(document.getElementById('paramSettingsWithoutMode') !== null){
        paramSettings = document.getElementById('paramSettingsWithoutMode');
        paramSettings.remove();
    }
}

/*Данная функция вызывает функцию закрытия всех открытые окна настройки и открывает окно настройки контура*/
function openParamSettings(obj,name){
    closeParamSettingsAll();
    createParamSettings(obj,name);
}

/*Данная функция вызывает функцию закрытия всех открытые окна настройки и открывает окно настройки контура*/
function openParamSettingsWithLowHigh(obj,name){
    closeParamSettingsAll();
    createParamSettingsWithLowHigh(obj,name);
}

/*Данная функция вызывает функцию закрытия всех открытые окна настройки и открывает окно настройки контура*/
function openParamSettingsForCo2(obj,name){
    closeParamSettingsAll();
    createParamSettingsForCO2(obj,name);
}

/*Данная функция закрывает все открытые окна настройки и открывает окно настройки обьекта с заданием в виде текста*/
function openParamSettingsWithoutModeText(obj,name){
    closeParamSettingsAll();
    createParamSettingsWithoutModeText(obj,name);
}

/*Данная функция закрывает все открытые окна настройки и открывает окно настройки обьекта с заданием в виде числа*/
function openParamSettingsWithoutModeNumber(obj,name){
    closeParamSettingsAll();
    createParamSettingsWithoutModeNumber(obj,name);
}

/*Данная функция закрывает все открытые окна настройки и открывает окно настройки задания света*/
function openParamSettingsForLight(obj,name){
    closeParamSettingsAll();
    createParamSettingsForLight(obj,name);
}

