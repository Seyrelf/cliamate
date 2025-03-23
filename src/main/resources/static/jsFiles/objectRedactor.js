

/*Функция для создания шапки окна настройки*/
function createHeadWindow(name,paramSettingsId){
    head = document.createElement('div');
    head.className = "header";
    nameWindow = document.createElement('span');
    nameWindow.textContent = name;
    nameWindow.id = "paramName";
    closeWindowBtn = document.createElement('button');
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

/*Функция для отрисовки и открытия окна настройки контуром*/
async function createParamSettings(obj,name){
    paramId = obj.querySelector('span').id;
    modeForParam =  await getModeByName(paramId);
    settingsForParam = await getSettingClimateByName(paramId);
    console.log(modeForParam);
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettings';
    head = createHeadWindow(name,paramSettings);
    paramSettings.appendChild(head);
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
            updateModeById(paramId, paramSettings.querySelector("select").value);
            updateClimateTaskById(paramId,inputTask.value);
            forDel = document.getElementById(paramSettings.id);
            forDel.remove();}
        else {
            input = task.querySelector("input");
            input.style.color = "red";
        }

    }
    paramSettings.appendChild(mode);
    paramSettings.appendChild(task);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}


async function createParamSettingsWithLowHigh(obj,name){
    paramId = obj.querySelector('span').id;
    modeForParam =  await getModeByName(paramId);
    settingsForParam = await getSettingClimateByName(paramId);
    lowValue = settingsForParam[0];
    highValue = settingsForParam[1];
    console.log(modeForParam);
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettings';
    head = createHeadWindow(name,paramSettings);
    paramSettings.appendChild(head);
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
    taskLow = createTaskInput(lowValue, "inputTaskLow", "Мин. порог");
    taskHigh = createTaskInput(highValue, "inputTaskHigh", "Макс. порог");
    okBtn = document.createElement('button');
    okBtn.type = "button";
    okBtn.textContent = "Применить";
    okBtn.id = "updateParamBtn";
    okBtn.onclick = function (){
        if(checkUserRole(okBtn)){
            return;
        }
        const regex = /^(\d|.)+$/;
        inputTaskLow = document.getElementById("inputTaskLow");
        inputTaskHigh = document.getElementById("inputTaskHigh");
        if(regex.test(inputTaskLow.value) && regex.test(inputTaskHigh.value)){
            updateModeById(paramId, paramSettings.querySelector("select").value);
            updateClimateTaskByIdWithHighLow(paramId,inputTaskLow.value,inputTaskHigh.value);
            forDel = document.getElementById(paramSettings.id);
            forDel.remove();}
        else {
            errorSpan = createErrorInfoLabel("Некоректные значения ввода!");
            if(!document.getElementById("errorSpan")===null){
                paramSettings.appendChild(errorSpan);}
        }

    }
    paramSettings.appendChild(mode);
    paramSettings.appendChild(taskLow);
    paramSettings.appendChild(taskHigh);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}


function createErrorInfoLabel(textError){
    errorSpan = document.createElement("span");
    errorSpan.id = "errorSpan";
    errorSpan.textContent = textError;
    return errorSpan;
}

function checkUserRole(okBtn){
    if(window.role === "ROLE_USER"){
        console.log("У вас нет прав");
        okBtn.textContent = "Недостаточно прав";
        okBtn.style.color = "red";
        return true;
    }
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
    okBtn = document.createElement('button');
    okBtn.type = "button";
    okBtn.textContent = "Применить";
    okBtn.id = "updateParamBtn";
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

/*Функция для отрисовки и открытия окна настройки с числовым заданием*/
async function createParamSettingsWithoutModeNumber(obj,name){
    paramId = obj.querySelector('span').id;
    console.log(paramId);
    settingsForDevice = await getSettingDeviceByName(paramId);
    console.log(settingsForDevice)
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettingsWithoutMode';
    head = createHeadWindow(name,paramSettings);
    paramSettings.appendChild(head);
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
            updateDeviceTaskById(paramId,inputTask.value);
            forDel = document.getElementById(paramSettings.id);
            forDel.remove();}
        else {
            input = task.querySelector("input");
            input.style.color = "red";
        }
    }
    paramSettings.appendChild(task);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}


/*Функция для отрисовки и открытия окна настройки с числовым заданием для задания света*/
async function createParamSettingsWithoutModeNumberForLight(obj,name){
    paramId = obj.querySelector('span').id;
    console.log(paramId);
    settingsForParam = await getSettingClimateByName(paramId);
    console.log(settingsForDevice)
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettingsWithoutMode';
    head = createHeadWindow(name,paramSettings);
    paramSettings.appendChild(head);
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
            updateClimateTaskById(paramId,inputTask.value);
            forDel = document.getElementById(paramSettings.id);
            forDel.remove();}
        else {
            input = task.querySelector("input");
            input.style.color = "red";
        }

    }
    paramSettings.appendChild(task);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
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

function openParamSettingsWithLowHigh(obj,name){
    closeParamSettingsAll();
    createParamSettingsWithLowHigh(obj,name);
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
function openParamSettingsWithoutModeNumberForLight(obj,name){
    closeParamSettingsAll();
    createParamSettingsWithoutModeNumberForLight(obj,name);
}

