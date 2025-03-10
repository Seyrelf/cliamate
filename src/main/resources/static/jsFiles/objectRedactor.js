async function createParamSettings(obj,name){
    paramId = obj.querySelector('span').id;
    modeForParam =  await getModeByName(paramId);
    settingsForParam = await getSettingClimateByName(paramId);
    console.log(modeForParam);
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettings';
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
        forDel = document.getElementById('paramSettings');
        forDel.remove();
    }
    head.appendChild(nameWindow);
    head.appendChild(closeWindowBtn);
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

    task = document.createElement('div');
    task.className = 'task';
    textTask = document.createElement('span');
    textTask.textContent = "Задание ";
    textTask.id = "textTask";
    inputTask = document.createElement("input");
    inputTask.type = "number";
    inputTask.id = "inputTask";
    inputTask.value = settingsForParam;
    inputTask.className = "form-control";
    task.appendChild(textTask);
    task.appendChild(inputTask);
    okBtn = document.createElement('button');
    okBtn.type = "button";
    okBtn.textContent = "Применить";
    okBtn.id = "updateParamBtn";
    okBtn.onclick = function (){
        updateModeById(paramId, paramSettings.querySelector("select").value);
        updateClimateTaskById(paramId,inputTask.value);
        forDel = document.getElementById('paramSettings');
        forDel.remove();
    }
    paramSettings.appendChild(mode);
    paramSettings.appendChild(task);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}

async function createParamSettingsWithoutModeText(obj,name){
    paramId = obj.querySelector('span').id;
    console.log(paramId);
    settingsForDevice = await getSettingDeviceByName(paramId);
    console.log(settingsForDevice)
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettingsWithoutMode';
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
        forDel = document.getElementById('paramSettingsWithoutMode');
        forDel.remove();
    }
    head.appendChild(nameWindow);
    head.appendChild(closeWindowBtn);
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
        updateDeviceTaskById(paramId,workSwitch.value);
        forDel = document.getElementById('paramSettingsWithoutMode');
        forDel.remove();
    }
    paramSettings.appendChild(task);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}

async function createParamSettingsWithoutModeNumber(obj,name){
    paramId = obj.querySelector('span').id;
    console.log(paramId);
    settingsForDevice = await getSettingDeviceByName(paramId);
    console.log(settingsForDevice)
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettingsWithoutMode';
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
        forDel = document.getElementById('paramSettingsWithoutMode');
        forDel.remove();
    }
    head.appendChild(nameWindow);
    head.appendChild(closeWindowBtn);
    paramSettings.appendChild(head);
    task = document.createElement('div');
    task.className = 'task';
    textTask = document.createElement('span');
    textTask.textContent = "Задание ";
    textTask.id = "textTask";
    inputTask = document.createElement("input");
    inputTask.type = "number";
    inputTask.id = "inputTask";
    inputTask.value = settingsForDevice;
    inputTask.className = "form-control";
    task.appendChild(textTask);
    task.appendChild(inputTask);
    okBtn = document.createElement('button');
    okBtn.type = "button";
    okBtn.textContent = "Применить";
    okBtn.id = "updateParamBtn";
    okBtn.onclick = function (){
        updateDeviceTaskById(paramId,inputTask.value);
        forDel = document.getElementById('paramSettingsWithoutMode');
        forDel.remove();
    }
    paramSettings.appendChild(task);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}



async function createParamSettingsWithoutModeNumberForLight(obj,name){
    paramId = obj.querySelector('span').id;
    console.log(paramId);
    settingsForClimate = await getSettingClimateByName(paramId);
    paramSettings = document.createElement("div");
    paramSettings.id = 'paramSettingsWithoutMode';
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
        forDel = document.getElementById('paramSettingsWithoutMode');
        forDel.remove();
    }
    head.appendChild(nameWindow);
    head.appendChild(closeWindowBtn);
    paramSettings.appendChild(head);
    task = document.createElement('div');
    task.className = 'task';
    textTask = document.createElement('span');
    textTask.textContent = "Задание ";
    textTask.id = "textTask";
    inputTask = document.createElement("input");
    inputTask.type = "number";
    inputTask.id = "inputTask";
    inputTask.value = settingsForClimate;
    inputTask.className = "form-control";
    task.appendChild(textTask);
    task.appendChild(inputTask);
    okBtn = document.createElement('button');
    okBtn.type = "button";
    okBtn.id = "updateParamBtn";
    okBtn.textContent = "Применить";
    paramSettings.appendChild(task);
    paramSettings.appendChild(okBtn);
    obj.parentElement.appendChild(paramSettings);
}


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

function openParamSettings(obj,name){
    closeParamSettingsAll();
    createParamSettings(obj,name);
}

function openParamSettingsWithoutModeText(obj,name){
    closeParamSettingsAll();
    createParamSettingsWithoutModeText(obj,name);
}

function openParamSettingsWithoutModeNumber(obj,name){
    closeParamSettingsAll();
    createParamSettingsWithoutModeNumber(obj,name);
}

function openParamSettingsWithoutModeNumberForLight(obj,name){
    closeParamSettingsAll();
    createParamSettingsWithoutModeNumberForLight(obj,name);
}

