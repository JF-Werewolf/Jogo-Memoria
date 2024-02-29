let imagem_virada = [];             //define se as cartas estão viradas ou não
let imagens_src = [];               //define o caminho das imagens
let imagem_indices_validos = [];    //define os indices válidos para usar a randomização
let imagem_virada_indice = [];     //grava quais cartas estao viradas
let cartas_viradas_id = [];         //grava quais os ids das cartas viradas
let quant_viradas = 0;              //conta quantas cartas estao viradas
let quant_pares = 0;                //conta quantos pares foram completados
const quant_pares_jogo = 6;
const quantidade_cartas = 12;




// --------------------**********************----------------------
// Funções iniciais

function inicializa_jogo() {
    inicializaArrayImagens();
    let nome_imagem = 0;
    while (imagem_indices_validos.length > 0) {
        nome_imagem++;
        if (nome_imagem > quant_pares_jogo) nome_imagem = nome_imagem - quant_pares_jogo;
        adicionaSrcRandomizadoNasImagens(nome_imagem);
    }
}

//  Função que vai zerar o caminho das imagens e os indices para serem randomizados
function inicializaArrayImagens(){
    for(let i=0;i<quantidade_cartas;i++){
        imagens_src.push(false);
        imagem_virada.push(false);
        imagem_indices_validos.push(i);
    }
}

function adicionaSrcRandomizadoNasImagens(nome_imagem){
    let quant_indices = imagem_indices_validos.length - 1;
    let indice_aleatorio = getRandomInt(quant_indices); //Gera um index aleatorio
    let indice = imagem_indices_validos[indice_aleatorio];
    imagens_src[indice] = nome_imagem;
    imagem_indices_validos.splice(indice_aleatorio, 1); //Remove o valor do array. O valor é usado para manter os indices ainda válidos vazios
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



// --------------------**********************----------------------
// Funções do jogo

function clicaCarta(numero_id_imagem) {
    let id_imagem = "img" + numero_id_imagem;
    let elemento_id = document.getElementById(id_imagem);   //gravo elemento html
    cartas_viradas_id[quant_viradas] = elemento_id;         //gravo o elemento html alterado
    imagem_virada_indice[quant_viradas] = dispositivoCelularComputador(numero_id_imagem);   //gravo a posição do alterada do array imagem_virada

    troca_imagem(elemento_id);

    quant_viradas++;
    if(quant_viradas == 2) {
        duasImagens();
    }    
}

function dispositivoCelularComputador(numero_id_imagem) {
    let dispositivo = numero_id_imagem - quantidade_cartas;
    if (dispositivo >= 0) {
        let celular = dispositivo;
        return celular;
    }
    let computador = numero_id_imagem;
    return computador;
}

function troca_imagem(elemento_id) {
    if (imagem_virada[imagem_virada_indice[quant_viradas]]) {
        elemento_id.src = "img/virada.png";
        imagem_virada[imagem_virada_indice[quant_viradas]] = false;
    }
    else {
        elemento_id.src = "img/" + imagens_src[imagem_virada_indice[quant_viradas]] + ".jpg";
        imagem_virada[imagem_virada_indice[quant_viradas]] = true;
    }
}

function duasImagens(){
    if (cartas_viradas_id[0] != cartas_viradas_id[1]) {
        verifica_par();
    }
    else {
        resetaQuantViradas();
    }
}

function verifica_par() {
    if (imagens_src[imagem_virada_indice[0]] == imagens_src[imagem_virada_indice[1]]) {
        par_perfeito(cartas_viradas_id[0],cartas_viradas_id[1]);
    }
    else {
        par_errado(cartas_viradas_id[0],cartas_viradas_id[1]);
    }
}

function resetaQuantViradas(){
    cartas_viradas_id = [];
    imagem_virada_indice = [];
    quant_viradas = 0;
}

function par_perfeito(elemento1, elemento2) {
    elemento1.onclick = null;
    elemento2.onclick = null;
    quant_viradas = 0;
    quant_pares++;
    fim_jogo();
}

function par_errado(elemento1, elemento2) {
    let imgs = document.getElementsByTagName('img');
    for (const elemento of imgs) {
        elemento.prev_click = elemento.onclick;     //salva o valor do onclick
        elemento.onclick = false;                   //remove o onclick
    }
    setTimeout(function () {
        elemento1.src = "img/virada.png";
        elemento2.src = "img/virada.png";
        quant_viradas = 0;
        imagem_virada[imagem_virada_indice[0]] = false;
        imagem_virada[imagem_virada_indice[1]] = false;
        
        for (const elemento of imgs){
            elemento.onclick = elemento.prev_click; //restaura o onclick
        }
    }, 1000);
}

function fim_jogo() {
    if (quant_pares == quant_pares_jogo) {
        setTimeout(function () {
            document.getElementById("fim_jogo").style.display = "flex";
        }, 1000);
    }
}

function reseta_jogo() {
    quant_viradas = 0;
    cartas_viradas_id = [];
    imagem_virada_indice = [];
    for (let i = 0; i < 24; i++) {
        let elemento = document.getElementById("img" + i);
        elemento.src = "img/virada.png";
        elemento.onclick = function onclick(event) {
            clicaCarta(i);
        };
        imagem_virada[i] = false;
    }
    quant_pares = 0;
    document.getElementById("fim_jogo").style.display = "none";
    inicializa_jogo();
}


//  inicializa o jogo
inicializa_jogo();