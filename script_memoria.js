let imagens_src = [];               //define o caminho das imagens     
let acertos = 0;                //conta quantos pares foram completados
const quant_pares = 6;
const quantidade_cartas = 12;
let selecionadas = [];

// --------------------**********************----------------------
// Funções iniciais

function inicializa_jogo() {
    inicializaArrayImagens();
    randomizaImagens();
}

function inicializaArrayImagens(){
    for(let x=0;x<quantidade_cartas;x++){
        imagens_src.push(Math.ceil(x/2 +0.00001));
    }
}

function randomizaImagens(){
    let random_position = 0;
    let temp = 0;
    for(let x = 0; x< quantidade_cartas; x++){
        random_position = getRandomInt(quantidade_cartas -1);
        temp = imagens_src[x];
        imagens_src[x] = imagens_src[random_position];
        imagens_src[random_position] = temp;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// --------------------**********************----------------------
// Funções do jogo

function clicaCarta(indiceCarta) {

    if(selecionadas.length < 2){
        selecionadas.push(indiceCarta);
        mostraFrente(indiceCarta);
    }

    if(selecionadas.length == 2) {
        if(selecionadas[0] == selecionadas[1]){
            mostraVerso(indiceCarta);
            selecionadas.length=0;
        }
        else comparaImagens();
    }   

    if(acertos == quant_pares) fim_jogo();
}

function mostraFrente(indice) {
    let elemento = document.getElementById("img" + indice);
    elemento.src = "img/" + imagens_src[indice] + ".png";
}

function mostraVerso(indice){
    let elemento = document.getElementById("img" + indice);
    elemento.src = "img/virada.png";
}

function comparaImagens(){
    
    if (imagens_src[selecionadas[0]] != imagens_src[selecionadas[1]]){
        parErrado();
    }
    
    if (imagens_src[selecionadas[0]] == imagens_src[selecionadas[1]]){
        parCerto();
    }
}

function parCerto(){
    let elemento = document.getElementById("img"+selecionadas[0]);
    elemento.onclick = null
    elemento = document.getElementById("img"+selecionadas[1]);
    elemento.onclick = null
    acertos++;
    selecionadas.length = 0;
}

function parErrado(){
    setTimeout(function () {
        let elemento = document.getElementById("img"+selecionadas[0]);
        elemento.src = "img/virada.png";
        elemento = document.getElementById("img"+selecionadas[1]);
        elemento.src = "img/virada.png";
        selecionadas.length = 0;
    }, 1000);
}

function fim_jogo() {
    acertos = 0;
    setTimeout(function () {
        document.getElementById("fim_jogo").style.display = "flex";
    }, 1000);
}

function reseta_jogo() {
    for (let i = 0; i < 24; i++) {
        let elemento = document.getElementById("img" + i);
        elemento.src = "img/virada.png";
        elemento.onclick = function onclick(event) {
            clicaCarta(i);
        };
    }
    document.getElementById("fim_jogo").style.display = "none";
    inicializa_jogo();
}

//  inicializa o jogo
inicializa_jogo();