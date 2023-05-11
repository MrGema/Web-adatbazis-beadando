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
            td.innerHTML="<img src='alap.png'>"
            td.id=j
            trid=tr.id
            trid=trid.slice(0, 1)
            td.value = [Number(trid) ,td.id]
            td.setAttribute("onclick", "kattintas(this)")
            td.addEventListener("contextmenu", function(){zaszlo(td)})
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
   var kord=[Number(td.value[0]), Number(td.value[1])]
   console.log(kord);
   td.removeAttribute("onclick", "kattintas(this)")
   if(matrix[kord[0]][kord[1]]==-1){
        aknafelfedes()
   }
   else{
       if(matrix2[kord[0]][kord[1]]==0){
           rekurzio(kord[0], kord[1])
       }
        td.style.backgroundColor = "lightgray"
        td.innerHTML=matrix2[kord[0]][kord[1]]
        td.style.color=szamszin(Number(matrix2[kord[0]][kord[1]]));
    }
}
function zaszlo(td) {
    td.removeEventListener("contextmenu", function(){zaszlo(td)})
    td.style.backgroundColor = "lightgray"
    td.innerHTML="<img src='flag.png'>"
}

/*
function rekurzio(x, y){
    if(x-1==tabla2-1 || x+1==1 || y+1==tabla1-1 || y-1==1){
        return;
    }
    else if(matrix2[x][y]==0){
        let tr=document.getElementById(x+"t")
        let td=tr.children[y]
        td.style.backgroundColor = "lightgray"
        td.innerHTML="";
        rekurzio(x, y-1)
        rekurzio(x, y+1)
        rekurzio(x-1, y)
        rekurzio(x+1, y)
    }
}
*/
function rekurzio(x, y) {
    if (x-1<=0 || x+1<tabla1-1 || y+1<tabla2-1 || y-1<=0) {
      return;
    } else if (matrix2[x][y] === 0) {
      let tr = document.getElementById(x + "t");
      let td = tr.children[y];
      td.style.backgroundColor = "lightgray";
      td.innerHTML = "";
  
      rekurzio(x, y - 1);
      rekurzio(x, y + 1);
      rekurzio(x - 1, y);
      rekurzio(x + 1, y);
    } else {
      return;
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

function aknafelfedes(){
    for (let i = 1; i < tabla1-2; i++) {  
        let tr=document.getElementById(i+"t")
        for (let j = 1; j < tabla2-2; j++) {
            let td=tr.children[j-1]
            if(matrix[i][j]==-1){
                td.style.backgroundColor="lightgray"
                td.innerHTML="<img src='mine.png'>"
            }
        }     
    }

    for (let i = 1; i < tabla1+1; i++) {
        let tr=document.getElementById(i+"t")
        for (let j = 0; j < tabla2; j++) {
            let td=tr.children[j]
            td.removeAttribute("onclick", "kattintas(this)")
            td.removeEventListener("contextmenu", function(){zaszlo(td)})
        }
    }
    gomb.disabled=false;
}


function Main(){
    fokozatkivalasztas()
    uresmatrix(matrix)
    uresmatrix(matrix2)
    minefeltoltes()
    console.log(matrix)
    div.innerHTML="";
    tablazat()
    megszamolas();
    console.log(matrix2)
    gomb.disabled=true;
}