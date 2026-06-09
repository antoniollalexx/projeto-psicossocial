

const alternativas = [
{texto:"Nunca",classe:"nunca",valor:1},
{texto:"Raramente",classe:"raramente",valor:2},
{texto:"Às vezes",classe:"asvezes",valor:3},
{texto:"Frequentemente",classe:"freq",valor:4},
{texto:"Sempre",classe:"sempre",valor:5}
];

const secoes = {

questions1:[
"Diferentes setores exigem coisas difíceis de conciliar?",
"Tenho prazos impossíveis de cumprir?",
"Preciso trabalhar com muita intensidade?",
"Preciso deixar tarefas de lado devido à demanda?"
],

questions2:[
"Posso decidir quando fazer uma pausa?",
"Tenho autonomia para decidir meu trabalho?",
"Posso definir meu ritmo de trabalho?"
],

questions3:[
"Recebo informações que ajudam no trabalho?",
"Posso contar com meu supervisor?",
"Recebo incentivo da liderança?"
],

questions4:[
"Meus colegas podem me ajudar?",
"Recebo apoio dos colegas?",
"Recebo respeito dos colegas?"
]

};

function criarPerguntas(id, perguntas){

const container = document.getElementById(id);

perguntas.forEach((pergunta,index)=>{

const card=document.createElement("div");
card.className="question-card";

card.innerHTML=`
<div class="question">${index+1}. ${pergunta}</div>
<div class="options">
${alternativas.map(a=>`
<button
type="button"
class="option ${a.classe}"
data-group="${id}_${index}"
data-value="${a.valor}">
${a.texto}
</button>
`).join("")}
</div>
`;

container.appendChild(card);

});

}

Object.keys(secoes).forEach(id=>{
criarPerguntas(id,secoes[id]);
});

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("option")){

const grupo=e.target.dataset.group;

document
.querySelectorAll(`[data-group='${grupo}']`)
.forEach(btn=>btn.classList.remove("selected"));

e.target.classList.add("selected");

}

});

let pagina=0;
const steps=document.querySelectorAll(".step");

function atualizarBarra(){
document.getElementById("progressBar").style.width=
((pagina+1)/steps.length)*100+"%";
}

function validarPagina(){

const perguntas=
steps[pagina].querySelectorAll(".question-card");

for(let p of perguntas){

if(!p.querySelector(".selected")){
alert("Responda todas as perguntas.");
return false;
}

}

return true;
}

function proximo(){

if(!validarPagina()) return;

if(pagina<steps.length-1){

steps[pagina].classList.add("hidden");
pagina++;
steps[pagina].classList.remove("hidden");

atualizarBarra();

}else{

gerarResultado();

}

}

function voltar(){

if(pagina>0){

steps[pagina].classList.add("hidden");
pagina--;

steps[pagina].classList.remove("hidden");

atualizarBarra();

}

}

function gerarResultado(){

let respostas={};

document.querySelectorAll(".selected").forEach(item=>{

respostas[item.dataset.group]=item.dataset.value;

});

document.getElementById("resultado").innerHTML=
"<h2>Resultado Capturado</h2><br>" +
JSON.stringify(respostas,null,4);

console.log(respostas);

}

atualizarBarra();