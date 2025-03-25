/*document.addEventListener('DOMContentLoaded', function (){
    addButtonOpenWindowUserSettings();
})*/


function addButtonOpenWindowUserSettings(){
    btnOpenWindowSettignsUser = document.createElement("button");
    btnOpenWindowSettignsUser.id = "btnOpenWindowSettignsUser";
    btnOpenWindowSettignsUser.type = "button";
    btnOpenWindowSettignsUser.onclick = createWindowUserSettings;
    btnOpenWindowSettignsUser.textContent = "Пользователи"
    mainHeader = document.getElementById("headerButton");
    mainHeader.appendChild(btnOpenWindowSettignsUser);
}

async function createWindowUserSettings(){
    mainBody = document.querySelector("body");
    if(document.getElementById("windowUsersSettings") !== null){
        windowForRemove = document.getElementById("windowUsersSettings");
        windowForRemove.remove();
    }
    data = await getAllUsersData();
    windowUsersSettings = document.createElement("div");
    windowUsersSettings.id = "windowUsersSettings";
    headerForWindow = document.createElement("div");
    headerForWindow.id = "headerForWindow";
    openWindowNewUserBtn = document.createElement("button");
    openWindowNewUserBtn.type = "button";
    openWindowNewUserBtn.id = "openWindowNewUserBtn";
    openWindowNewUserBtn.onclick = openWindowCreateUser;
    openWindowNewUserBtn.textContent = "Новый пользователь";
    closeWindowBtn = document.createElement('button');
    closeWindowBtn.type = "button";
    closeWindowBtn.ariaLabel = "Close";
    closeWindowBtn.textContent = "X";
    closeWindowBtn.id = 'close-btn-for-usersSetting'
    closeWindowBtn.onclick = function (){
        forDel = document.getElementById("windowUsersSettings");
        forDel.remove();
    }
    headerForWindow.appendChild(openWindowNewUserBtn);
    headerForWindow.appendChild(closeWindowBtn);
    windowUsersSettings.appendChild(headerForWindow);
    tableContainer = document.createElement("div");
    tableContainer.className = "table-container";
    tableContainer.id = "tableContainer";
    table = document.createElement("table");
    table.id = "userTable";
    table.className = "table table-bordered";
    tableHead = document.createElement("thead");
    trElem = document.createElement("tr");
    thId = createTh("id");
    thId.id = "thId";
    trElem.appendChild(thId);
    thUsername = createTh("Username");
    thUsername.id = "thUsername";
    trElem.appendChild(thUsername);
    thRole = createTh("Role");
    thRole.id = "thRole";
    trElem.appendChild(thRole);
    thComand = createTh("Comand");
    thComand.id = "thComand";
    trElem.appendChild(thComand);
    tableHead.appendChild(trElem);
    table.appendChild(tableHead);
    tableBody = document.createElement("tbody");
    tableBody.id = "tableBody";
    for(let i = 0; i < data.length;i++ ){
        tableBody.appendChild(createTrForData(data[i]));
    }
    table.appendChild(tableBody);
    tableContainer.appendChild(table)
    windowUsersSettings.appendChild(tableContainer);
    mainBody.appendChild(windowUsersSettings);
}

function createTrForData(data){
    trElem = document.createElement("tr");
    console.log(data);
    trElem.appendChild(createTd(data.id));
    trElem.appendChild(createTd(data.username));
    trElem.appendChild(createTd(data.role));
    trElem.appendChild(createTdBtn(data.id,data.username,data.role));
    return trElem;
}

function delUserBtn(userId){
    btn = document.createElement("button");
    btn.id = "btnWithIcon";
    btn.type = "button";
    imgForBtn = document.createElement("img");
    imgForBtn.id = "imgForBtn";
    imgForBtn.src = "images/delUser.png";
    imgForBtn.alt = "Icon";
    btn.appendChild(imgForBtn);
    btn.onclick = function (){
        delUserById(userId);
        console.log(this.parentElement.parentElement)
        this.parentElement.parentElement.remove();
    }
    return btn
}

function changeUserBtn(userId,userName,userRole){
    btn = document.createElement("button");
    btn.id = "btnWithIcon";
    btn.type = "button";
    imgForBtn = document.createElement("img");
    imgForBtn.id = "imgForBtn";
    imgForBtn.src = "images/changeUser.png";
    imgForBtn.alt = "Icon";
    btn.appendChild(imgForBtn);
    btn.onclick = function (){
        openWindowChangeUser(btn.parentElement,userId,userName,userRole);
    }
    return btn
}

function createTdBtn(userId,userName,userRole){
    tdElem = document.createElement("td");
    tdElem.appendChild(changeUserBtn(userId,userName,userRole));
    tdElem.appendChild(delUserBtn(userId));
    return tdElem;
}

function createTd(data){
    tdElem = document.createElement("td");
    tdElem.textContent = data;
    return tdElem;
}


function createTh(data){
    thElem = document.createElement("th");
    thElem.scope = "col";
    thElem.textContent = data;
    return thElem;
}

function openWindowCreateUser(){
    mainWindow = document.createElement("div");
    mainWindow.id = "windowUserCreate";
    if(document.getElementById("windowUserCreate") !== null){
        document.getElementById("windowUserCreate").remove();
    }

    nameModule = document.createElement("div");
    nameModule.id = "divNameUser";
    spanName = document.createElement("span");
    spanName.textContent = "Никнейм";
    spanName.id = "spanUser";
    inputName = document.createElement("input");
    inputName.className = "form-control";
    inputName.maxLength = 12;
    nameModule.appendChild(spanName);
    nameModule.appendChild(inputName);

    passwordModule = document.createElement("div");
    passwordModule.id = "divPasswordUser";
    spanPassword = document.createElement("span");
    spanPassword.id = "spanUser";
    spanPassword.textContent = "Пароль";
    inputPassword = document.createElement("input");
    inputPassword.className = "form-control";
    inputPassword.maxLength = 12;
    passwordModule.appendChild(spanPassword);
    passwordModule.appendChild(inputPassword);

    roleModule = document.createElement("div");
    roleModule.id = "divRoleUser";
    spanRole = document.createElement("span");
    spanRole.id = "spanUser";
    spanRole.textContent = "Роль";
    selectRole = document.createElement("select");
    selectRole.className = "form-select";
    adminOption = document.createElement("option");
    adminOption.textContent = "ROLE_ADMIN";
    workerOption = document.createElement("option");
    workerOption.textContent = "ROLE_WORKER";
    userOption = document.createElement("option");
    userOption.textContent = "ROLE_USER";
    selectRole.appendChild(adminOption);
    selectRole.appendChild(workerOption);
    selectRole.appendChild(userOption);
    roleModule.appendChild(spanRole);
    roleModule.appendChild(selectRole);
    btnModule = document.createElement("div");
    btnModule.id = "divBtnUser";
    createBtn = document.createElement("button");
    createBtn.type = "button";
    createBtn.textContent = "Создать";
    createBtn.id = "btnsWindowUser";
    createBtn.onclick = async function (){
        if(inputName.value.length !== 0 && inputPassword.value.length !== 0){
            data = await createUser(inputName.value,inputPassword.value,selectRole.value);
            newUserTr = createTrForData(data);
            document.getElementById("tableBody").appendChild(newUserTr);
            document.getElementById("windowUserCreate").remove();}
        else{
            if(document.getElementById("errorSpan")===null){
                document.getElementById("windowUserCreate").appendChild(createErrorInfoLabel("Некорректные данные ввода!"));}
        }

    }
    cancelBtn = document.createElement("button");
    cancelBtn.type ="button";
    cancelBtn.textContent = "Отмена";
    cancelBtn.id = "btnsWindowUser";
    cancelBtn.onclick = function (){
        document.getElementById("windowUserCreate").remove();
    }
    btnModule.appendChild(cancelBtn);
    btnModule.appendChild(createBtn);
    mainWindow.appendChild(nameModule);
    mainWindow.appendChild(passwordModule);
    mainWindow.appendChild(roleModule);
    mainWindow.appendChild(btnModule);
    mainBody = document.querySelector("body");
    mainBody.appendChild(mainWindow);
}



function openWindowChangeUser(parent,userId,userName,userRole){
    mainWindow = document.createElement("div");
    mainWindow.id = "windowUserChange";
    if(document.getElementById("windowUserChange") !== null){
        document.getElementById("windowUserChange").remove();
    }

    nameModule = document.createElement("div");
    nameModule.id = "divNameUser";
    spanName = document.createElement("span");
    spanName.textContent = "Никнейм";
    spanName.id = "spanUser";
    inputName = document.createElement("input");
    inputName.className = "form-control";
    inputName.maxLength = 12;
    inputName.value = userName;
    nameModule.appendChild(spanName);
    nameModule.appendChild(inputName);

    passwordModule = document.createElement("div");
    passwordModule.id = "divPasswordUser";
    spanPassword = document.createElement("span");
    spanPassword.id = "spanUser";
    spanPassword.textContent = "Пароль";
    inputPassword = document.createElement("input");
    inputPassword.className = "form-control";
    inputPassword.maxLength = 12;
    passwordModule.appendChild(spanPassword);
    passwordModule.appendChild(inputPassword);

    roleModule = document.createElement("div");
    roleModule.id = "divRoleUser";
    spanRole = document.createElement("span");
    spanRole.id = "spanUser";
    spanRole.textContent = "Роль";
    selectRole = document.createElement("select");
    selectRole.className = "form-select";
    adminOption = document.createElement("option");
    adminOption.textContent = "ROLE_ADMIN";
    workerOption = document.createElement("option");
    workerOption.textContent = "ROLE_WORKER";
    userOption = document.createElement("option");
    userOption.textContent = "ROLE_USER";
    selectRole.appendChild(adminOption);
    selectRole.appendChild(workerOption);
    selectRole.appendChild(userOption);
    selectRole.value = userRole;
    roleModule.appendChild(spanRole);
    roleModule.appendChild(selectRole);
    btnModule = document.createElement("div");
    btnModule.id = "divBtnUserChange";
    createBtn = document.createElement("button");
    createBtn.type = "button";
    createBtn.textContent = "Изменить с паролем";
    createBtn.id = "btnsWindowUserChange";
    createBtn.onclick = async function (){
        if(inputName.value.length !== 0 && inputPassword.value.length !== 0){
            data = await updateUserFull(userId,inputName.value,inputPassword.value,selectRole.value);
            changeUserTr = createTrForData(data);
            console.log(document.getElementById("windowUserChange").parentElement.parentElement);
            document.getElementById("windowUserChange").parentElement.parentElement = changeUserTr;
            document.getElementById("windowUserChange").remove();
        }
        else{
            if(document.getElementById("errorSpan")===null){
                document.getElementById("windowUserChange").appendChild(createErrorInfoLabel("Некорректные данные ввода!"));}
        }
    }
    createWPBtn = document.createElement("button");
    createWPBtn.type = "button";
    createWPBtn.textContent = "Изменить без пароля";
    createWPBtn.id = "btnsWindowUserChange";
    createWPBtn.onclick = async function (){
        if(inputName.value.length !== 0 ){
            data = await updateUserWithoutPassword(userId,inputName.value,selectRole.value);
            changeUserTr = createTrForData(data);
            document.getElementById("windowUserChange").remove();}
        else {
            if(document.getElementById("errorSpan")===null){
                document.getElementById("windowUserChange").appendChild(createErrorInfoLabel("Некорректные данные ввода!"));}
        }

    }
    cancelBtn = document.createElement("button");
    createBtn.type = "button";
    cancelBtn.textContent = "Отмена";
    cancelBtn.id = "btnsWindowUserChange";
    cancelBtn.onclick = function (){
        document.getElementById("windowUserChange").remove();
    }
    btnModule.appendChild(cancelBtn);
    btnModule.appendChild(createBtn);
    btnModule.appendChild(createWPBtn);
    mainWindow.appendChild(nameModule);
    mainWindow.appendChild(passwordModule);
    mainWindow.appendChild(roleModule);
    mainWindow.appendChild(btnModule);
    parent.appendChild(mainWindow);

}

