function addButtonOpenWindowPIDSettings(){
    btnOpenWindowSettignsPID = document.createElement("button");
    btnOpenWindowSettignsPID.id = "btnOpenWindowSettignsPID";
    btnOpenWindowSettignsPID.type = "button";
    btnOpenWindowSettignsPID.onclick = createWindowPIDSettings;
    btnOpenWindowSettignsPID.textContent = "Настройки ПИД"
    mainHeader = document.getElementById("headerButton");
    mainHeader.appendChild(btnOpenWindowSettignsPID);
}

async function createWindowPIDSettings(){
    mainBody = document.querySelector("body");
    if(document.getElementById("window-pid") !== null){
        windowForRemove = document.getElementById("window-pid");
        windowForRemove.remove();
    }
    data = await getAllPIDData();
    windowPIDSettings = document.createElement("div");
    windowPIDSettings.id = "window-pid";
    headerForWindow = document.createElement("div");
    headerForWindow.id = "headerForWindow";
    headerForWindow.textContent = "Настройки для ПИД регуляторов"
    paramP = createTaskInput(data[0].pparam,"inputParamP","П коэффициент");
    paramI = createTaskInput(data[0].iparam,"inputParamI","И коэффициент");
    paramD = createTaskInput(data[0].dparam,"inputParamD","Д коэффициент");
    switchPID = createSwithPID(data);
    switchPID.onchange = function (){
        pidName = document.getElementById("formSelectPID").value;
        dataForParam = getPIDData(pidName);
        console.log(dataForParam);
        document.getElementById("inputParamP").value = dataForParam.pparam;
        document.getElementById("inputParamI").value = dataForParam.iparam;
        document.getElementById("inputParamD").value = dataForParam.dparam;
    }
    closeWindowBtn = document.createElement('button');
    closeWindowBtn.type = "button";
    closeWindowBtn.ariaLabel = "Close";
    closeWindowBtn.textContent = "X";
    closeWindowBtn.id = 'close-btn-for-usersSetting'
    closeWindowBtn.onclick = function (){
        forDel = document.getElementById("window-pid");
        forDel.remove();
    }
    okBtn = createOkBtn();
    headerForWindow.appendChild(closeWindowBtn);
    windowPIDSettings.appendChild(headerForWindow);
    windowPIDSettings.appendChild(switchPID);
    windowPIDSettings.appendChild(paramP);
    windowPIDSettings.appendChild(paramI);
    windowPIDSettings.appendChild(paramD);
    windowPIDSettings.appendChild(okBtn);
    mainBody.appendChild(windowPIDSettings);
}


function createSwithPID(data){
    pid = document.createElement('div');
    pid.className = 'pid';
    textMode = document.createElement('span');
    textMode.textContent = "Название регулятора";
    textMode.id = "textMode";
    allPID = document.createElement('select');
    allPID.className = "form-select";
    allPID.id = "formSelectPID";
    allPID.ariaLabel = "Default select example";
    for (let i = 0; i < data.length; i++) {
        pidName = document.createElement('option');
        pidName.textContent = data[i].name;
        allPID.appendChild(pidName);
    }
    pid.appendChild(textMode);
    pid.appendChild(allPID);
    return pid;
}