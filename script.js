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
    for (let i = 1; i < tabla1+1; i++) {
        let tr=document.createElement("tr")
        tr.id=i
        for (let j = 1; j < tabla2+1; j++) {
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
    for(let i = 1; i < tabla1+1; i++) {
        matrix[0]=[];
        matrix[tabla1+1]=[];
        matrix[i]=[];
        for (let j = 1; j < tabla2+1; j++) {
            matrix[tabla1+1][j]=0;
            matrix[0][j]=0;
            matrix[i][j] = 0;
        }
    }
}

function kattintas(td){
   let kord=[Number(td.value[0]), Number(td.value[1])]
   console.log(kord)
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
    alap(kord)
    td.style.backgroundColor = ""
    td.innerHTML=szam
    td.style.color=szamszin();
    szam=0;
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
    uresmatrix()
    minefeltoltes()
    console.log(matrix)
    tablazat()
    gomb.disabled=true;
}