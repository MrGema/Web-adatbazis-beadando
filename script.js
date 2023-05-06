var div=document.getElementById("jatekter")
var matrix=[];
var matrix2=[];
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
        tr.id=i+"t"
        for (let j = 1; j < tabla2+1; j++) {
            let td=document.createElement("td")
            td.style.backgroundColor="Gray"
            td.id=j
            trid=tr.id
            trid=trid.slice(0, 1)
            td.value = [Number(trid) ,td.id]
            td.setAttribute("onclick", "kattintas(this)")
            tr.appendChild(td)
        }  
        table.appendChild(tr)
    }
    div.appendChild(table)
}

function uresmatrix(matrix) {
    for(let i = 0; i < tabla1+2; i++) {
        matrix[i]=[];
        for (let j = 0; j < tabla2+2; j++) {
            matrix[i][j]=0;
        }
    }
}

function megszamolas(){
    for(let i = 1; i < tabla1-2; i++){
        for(let j = 1; j < tabla2-2; j++){
            if(matrix[i][j]!=-1){
                let kord=[i, j]
                alap(kord)
                matrix2[i][j]=szam;
                szam=0;
            }
        }
    }
}

function kattintas(td){
   let kord=[Number(td.value[0]), Number(td.value[1])]
   if(matrix[kord[0]][kord[1]]==-1){
        aknafelfedes()
   }
   else{
        td.style.backgroundColor = ""
        td.innerHTML=matrix2[kord[0]][kord[1]]
        td.style.color=szamszin(Number(matrix2[kord[0]][kord[1]]));
    }
}

function aknafelfedes(){
    for (let i = 0; i < tabla1; i++) {  
        for (let j = 0; j < tabla2; j++) {
            if(matrix[i][j]==-1){
                let tr=document.getElementById(i+"t")
                let td=tr.children[j]
                td.style.backgroundColor=""
                td.innerHTML="<img src='mine.png'>"
            }
        }     
    }
}

function szamszin(szam){
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
    }
}

function Main(){
    fokozatkivalasztas()
    uresmatrix(matrix)
    uresmatrix(matrix2)
    minefeltoltes()
    console.log(matrix)
    tablazat()
    megszamolas();
    console.log(matrix2)
    gomb.disabled=true;
}