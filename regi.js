var div=document.getElementById("jatekter")
var matrix=[];

//kene dificulty
//kezdo: 10 mine, 10x10 es tabla
//halado: 40 mine, 16x16 os tabla
//profi: 99 mine, 16x30 as tabla
var tabla1=0;
var tabla2=0;
var mines=0;
var sarkok=new Array()
var szam=0;
var gomb=document.getElementById("start")

function fokozatkivalasztas(){
    var fokozat=document.getElementById("nehezseg").value
    if(fokozat=="Kezdő"){
        tabla1=10;
        tabla2=10;
        mines=10;
    }
    else if(fokozat=="Haladó"){
        tabla1=16;
        tabla2=16;
        mines=40;
    }
    else if(fokozat=="Profi"){
        tabla1=16;
        tabla2=30;
        mines=99;
    }
}

function tablazat(){   
    let table=document.createElement("table")
    for (let i = 0; i < tabla1; i++) {
        let tr=document.createElement("tr")
        tr.id=i
        for (let j = 0; j < tabla2; j++) {
            let td=document.createElement("td")
            td.style.backgroundColor="Gray"
            tr.appendChild(td)
            td.id=j
            td.value = [tr.id ,td.id]
            td.setAttribute("onclick", "kattintas(this)")
        }  
        table.appendChild(tr)
    }
    div.appendChild(table)
}

function uresmatrix() {
    for(let i = 0; i < tabla1; i++) {
        matrix[i]=[];
        for (let j = 0; j < tabla2; j++) {
            matrix[i][j] = 0;
        }
    }
}

function kattintas(td){
   let kord=[Number(td.value[0]), Number(td.value[1])]
   if(matrix[kord[0]][kord[1]]==-1){
        alert("Veszítettél.")
        setTimeout(() => {
            div.innerHTML="";
            td.style.backgroundColor = ""
            gomb.disabled=false;
            let kep=document.createElement("img").src="mine.png"
            td.appendChild(kep)
        }, 100);
   }
    if(bennevane(kord)==true){
        sarok(kord)
    }
    else if(kord[0]==0 && bennevane(kord)==false){
        felsosor(kord)
    }
    else if(kord[0]==tabla1-1&& bennevane(kord)==false){
        alsosor(kord)
    }
    else if(kord[1]==0 && bennevane(kord)==false){
        balszele(kord)
    }
    else if(kord[1]==tabla2-1 &&bennevane(kord)==false){
        jobbszele(kord)
    }
    else{
        alap(kord)
    }
    td.style.backgroundColor = ""
    td.innerHTML=szam
    td.style.color=szamszin();
    szam=0;
}

function bennevane(kord){
    let van=false;
    for(let i=0; i<sarkok.length;i++){
        let tomb=sarkok[i]
        if(Number(tomb[0])==Number(kord[0]) && Number(tomb[1])==Number(kord[1])){
            van=true;
        }
    }
    return van;
}


function sarokkivalasztas(){
    sarkok=[
        [0, 0],
        [0, tabla2-1],
        [tabla1-1, 0],
        [tabla1-1, tabla2-1]
    ]
}

function szamszin(){
    if(szam==1){
        return "blue";
    }
    else if(szam==2){
        return "green";
    }
    else if(szam==3){
        return "red";
    }
    else if(szam==4){
        return "darkpurple";
    }
    else if(szam>4){
        return "black"
    }
}

function felsosor(kord){
    console.log("felsosor")
    if(matrix[0][kord[1]+1]==-1){ //jobb mellette
        szam++
    }
    if(matrix[0][kord[1]-1]==-1){ //bal mellette
        szam++
    }
    if(matrix[1][kord[1]]==-1){ //alatta
        szam++
    }
    if(matrix[1][kord[1]+1]==-1){ //jobb le
        szam++
    }
    if(matrix[1][kord[1]-1]==-1){ //bal le
        szam++
    }
}

function jobbszele(kord){
    console.log("jobbszele")
    if(matrix[kord[0]-1][kord[1]]==-1){ //fent
        szam++
    }
    if(matrix[kord[0]-1][kord[1]-1]==-1){//bal fent
        szam++
    }
    if(matrix[kord[0]][kord[1]-1]==-1){ //mellette
        szam++
    }
    if(matrix[kord[0]+1][kord[1]-1]==-1){ // bal le
        szam++
    }
    if(matrix[kord[0]+1][kord[1]]==-1){ //alatta
        szam++
    }
}

function alsosor(kord){
    console.log("alsosor")
    if(matrix[kord[0]][kord[1]+1]==-1){ //jobb mellette
        szam++
    }
    if(matrix[kord[0]][kord[1]-1]==-1){ //bal mellette
        szam++
    }
    if(matrix[kord[0]-1][kord[1]]==-1){ //folotte
        szam++
    }
    if(matrix[kord[0]-1][kord[1]-1]==-1){ //bal fent
        szam++
    }
    if(matrix[kord[0]-1][kord[1]+1]==-1){ //jobb fent
        szam++
    }
}

function balszele(kord){
    console.log("balszele")
    if(matrix[kord[0]-1][kord[1]]==-1){ //fent
        szam++
    }
    if(matrix[kord[0]-1][kord[1]+1]==-1){//jobb fent
        szam++
    }
    if(matrix[kord[0]][kord[1]+1]==-1){ //mellette
        szam++
    }
    if(matrix[kord[0]+1][kord[1]-1]==-1){ //jobb le
        szam++
    }
    if(matrix[kord[0]+1][kord[1]]==-1){ //alatta
        szam++
    }
}

function alap(kord){
    console.log("alap")
    if(matrix[kord[0]-1][kord[1]]==-1){ //fent
        szam++
    }
    if(matrix[kord[0]-1][kord[1]-1]==-1){//bal fent
        szam++
    }
    if(matrix[kord[0]-1][kord[1]+1]==-1){ //jobb fent
        szam++;
    }
    if(matrix[kord[0]][kord[1]-1]==-1){ //bal mellette
        szam++
    }
    if(matrix[kord[0]][kord[1]+1]==-1){ //jobb mellette
        szam++
    }
    if(matrix[kord[0]+1][kord[1]]==-1){ //alatta
        szam++
    }
    if(matrix[kord[0]+1][kord[1]-1]==-1){ //bal alatta
        szam++
    }
    if(matrix[kord[0]+1][kord[1]+1]==-1){ //jobb alatta
        szam++
    }
}

function sarok(kord){
    if(kord[0]==0 && kord[1]==0){ //bal felso sarok
        if(matrix[0][1]==-1){
            szam++;
        }
        if(matrix[1][0]==-1){
            szam++;
        }
        if(matrix[1][1]==-1){
            szam++;
        }
    }
    else if(kord[0]==tabla2-1 && kord[1]==0){  //bal also sarok
        if(matrix[kord[0]-1][kord[1]]==-1){
            szam++;
        }
        if(matrix[kord[0]-1][kord[1]+1]==-1){
            szam++;
        }
        if(matrix[kord[0]+1[kord[1]+1]]==-1){
            szam++;
        }
    }
    else if(kord[0]==0 && kord[1]==tabla2-1){ //jobb felso sarok
        if(matrix[kord[0]][kord[1]-1]==-1){
            szam++;
        }
        if(matrix[kord[0]+1][kord[1]-1]==-1){
            szam++;
        }
        if(matrix[kord[0]+1[kord[1]]]==-1){
            szam++;
        }
    }
    else if(kord[0]==tabla2-1 && kord[1]==tabla1-1){
        if(matrix[kord[0]][kord[1]-1]==-1){
            szam++;
        }
        if(matrix[kord[0]-1][kord[1]-1]==-1){
            szam++;
        }
        if(matrix[kord[0]-1[kord[1]]]==-1){
            szam++;
        }
    }
}


function randomszam(also, felso){
    return Math.floor(Math.random()*(felso-also+1)+also)
}

function minefeltoltes(){
    let i=0;
    while(i<mines){
        let mine1=randomszam(1, tabla1-2)
        let mine2=randomszam(1, tabla2-2)
        if(matrix[mine1][mine2]==0){
            matrix[mine1][mine2]=-1
            i++;
        }
        else{
            mine1=randomszam(1, tabla1-2)
            mine2=randomszam(1, tabla2-2)
        }
    }
}

function Main(){
    fokozatkivalasztas()
    sarokkivalasztas()
    uresmatrix()
    minefeltoltes()
    console.log(sarkok)
    console.log(matrix)
    tablazat()
    gomb.disabled=true;
}