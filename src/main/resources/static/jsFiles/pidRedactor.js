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
        windowForRemove = document.getElementById("windowPIDSettings");
        windowForRemove.remove();
    }
    data = await getAllPIDData();
    windowPIDSettings = document.createElement("div");
    windowPIDSettings.id = "window-pid";
    headerForWindow = document.createElement("div");
    headerForWindow.id = "headerForWindow";
    closeWindowBtn = document.createElement('button');
    closeWindowBtn.type = "button";
    closeWindowBtn.ariaLabel = "Close";
    closeWindowBtn.textContent = "X";
    closeWindowBtn.id = 'close-btn-for-usersSetting'
    closeWindowBtn.onclick = function (){
        forDel = document.getElementById("window-pid");
        forDel.remove();
    }
    headerForWindow.appendChild(closeWindowBtn);
    windowPIDSettings.appendChild(headerForWindow);
    mainBody.appendChild(windowPIDSettings);
}
