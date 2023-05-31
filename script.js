var div=document.getElementById("jatekter")
var matrix=[];
var tabla1=0;
var tabla2=0;
var mines=0;
var sarkok=new Array()
var szam=0;
var talalt=0
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
function randomszam(also, felso){
    return Math.floor(Math.random()*(felso-also+1)+also)
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
            trid=trid.replace('t', '')
            td.value = [Number(trid) ,td.id]
            td.setAttribute("onclick", "kattintas(this)")
            td.addEventListener("contextmenu", function(ev){zaszlo(td)
                ev.preventDefault();
                return false;
            },false)
            tr.appendChild(td)
            td.dataset.click=Number(0)
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
function minefeltoltes(){
    let i=0;
    do{
        let x=randomszam(1, tabla1)
        let y=randomszam(1, tabla2)
        if(matrix[x][y]==0){
            matrix[x][y]=-1
            i++;
        }
    }
    while(i<mines){
    }
}
function megszamolas(){
    for(let i = 1; i < tabla1+1; i++){
        for(let j = 1; j < tabla2+1; j++){
            if(matrix[i][j]!=-1){
                let kord=[i, j]
                aknaszam(kord)
                matrix[i][j]=szam;
                szam=0;
            }
        }
    }
}
function aknaszam(kord){
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


function kattintas(td){
   var kord=[Number(td.value[0]), Number(td.value[1])]
   td.removeAttribute("onclick", "kattintas(this)")
   if(matrix[kord[0]][kord[1]]==-1){
        td.style.backgroundColor="lightgray"
        td.innerHTML="<img src='mine.png'>"
        aknafelfedes()
   }
   else{
       if(matrix[kord[0]][kord[1]]==0){
            rekurzio(kord[0], kord[1])
            td.style.backgroundColor = "lightgray"
            td.innerHTML = "";  
            td.removeAttribute("onclick", "kattintas(this)")
            td.removeEventListener("contextmenu", function(){zaszlo(td)})  
       }
       else{
            td.style.backgroundColor = "lightgray"
            td.innerHTML=matrix[kord[0]][kord[1]]
            td.style.color=szamszin(Number(matrix[kord[0]][kord[1]]));
       }
    }
}

function zaszlo(td){
    td.style.backgroundColor = "lightgray"
    td.dataset.click=Number(td.dataset.click)+1
    if(td.dataset.click==1){
        td.innerHTML="<img src='flag.png'>"
    }
    else if(td.dataset.click==2){
        td.innerHTML="<img src='kerdojel.png'>"
    }
    else if(td.dataset.click==3){
        td.innerHTML="<img src='alap.png'>"
        td.dataset.click=Number(0)
    }
    console.log(td.dataset.click);
    td.dataset.ertek=Number(-1)
    nyerte()
    if(talalt===mines){
        for (let i = 1; i <= tabla1-1; i++) {
            let tr=document.getElementById(i+"t")
            for (let j = 0; j < tabla2; j++) {
                let td=tr.children[j]
                td.removeAttribute("onclick", "kattintas(this)")
                td.removeEventListener("contextmenu", function(){zaszlo(td)})
            }
        }
        setTimeout(() => {
            alert("nyertel!")
        }, 300);
        gomb.disabled=false;
    }
    talalt=0;
}

function rekurzio(x, y) {
    if (x>0 && y>0 && x<=tabla1 && y<=tabla2) {
        let tr = document.getElementById((x) + "t");
        let td = tr.children[y-1];
        if (matrix[x][y]>0 && matrix[x][y]!=-1){
            td.style.backgroundColor = "lightgray";
            td.innerHTML = matrix[x][y];
            td.style.color=szamszin(Number(matrix[x][y]))
            td.removeAttribute("onclick", "kattintas(this)")
            td.removeEventListener("contextmenu", function(){zaszlo(td)})  
        } 
        else if(td.innerHTML!=""){
            td.style.backgroundColor = "lightgray";
            td.innerHTML = "";  
            td.removeAttribute("onclick", "kattintas(this)")
            td.removeEventListener("contextmenu", function(){zaszlo(td)})  
            rekurzio(x, y - 1);
            rekurzio(x, y + 1);
            rekurzio(x - 1, y);
            rekurzio(x + 1, y);            
            rekurzio(x-1, y + 1);
            rekurzio(x - 1, y-1);
            rekurzio(x+1, y - 1);
            rekurzio(x + 1, y+1);
        } 
    }
}

function aknafelfedes(){
    for (let i = 1; i <= tabla1; i++) {  
        let tr=document.getElementById(i+"t")
        for (let j = 1; j < tabla2; j++) {
            let td=tr.children[j-1]
            if(matrix[i][j]==-1){
                td.style.backgroundColor="lightgray"
                td.innerHTML="<img src='mine.png'>"
            }
        }     
    }

    for (let i = 1; i <= tabla1; i++) {
        let tr=document.getElementById(i+"t")
        for (let j = 0; j < tabla2; j++) {
            let td=tr.children[j]
            td.removeAttribute("onclick", "kattintas(this)")
            td.removeEventListener("contextmenu", function(){zaszlo(td)})
        }
    }
    gomb.disabled=false;
}

function nyerte(){
    for (let i = 1; i < tabla1; i++) {
        let tr=document.getElementById(i+"t")
        for (let j = 1; j < tabla2; j++) {
            let td=tr.children[j-1]
            if(matrix[i][j]==-1 && td.dataset.ertek==-1) {
                talalt++
            }
        }       
    }
    return talalt;
}


function Main(){
    fokozatkivalasztas()
    uresmatrix(matrix)
    minefeltoltes()
    console.log(matrix)
    div.innerHTML="";
    tablazat()
    megszamolas();
}