const prompt = require("prompt-sync")();

// ===== Configuracoes do jogo =====//
const TAM = 5;
const NAVIOS = 3;
const TIROS = 10;

// ===== Funcoes =====//
function criarTabuleiro() {
    let tabuleiro = [];
    for (let i = 0; i < TAM; i++) {
        tabuleiro[i] = [];
        for (let j = 0; j < TAM; j++) {
            tabuleiro[i][j] = false;
        }
    }
    return tabuleiro;
}

function criarHistoricoTiros() {
    let historico = [];
    for (let i = 0; i < TAM; i++) {
        historico[i] = [];
        for (let j = 0; j < TAM; j++) {
            historico[i][j] = " "; // vazio inicialmente//
        }
    }
    return historico;
}

function posicionarNavios(tabuleiro, qtd) {
    let colocados = 0;
    while (colocados < qtd) {
        let linha = Math.floor(Math.random() * TAM);
        let coluna = Math.floor(Math.random() * TAM);
        if (tabuleiro[linha][coluna] === false) {
            tabuleiro[linha][coluna] = true;
            colocados++;
        }
    }
}

function exibirTabuleiro(tabuleiro, mostrarNavios = false) {
    console.log("     0  1  2  3  4");
    for (let i = 0; i < TAM; i++) {
        let linha = i + " |";
        for (let j = 0; j < TAM; j++) {
            if (mostrarNavios && tabuleiro[i][j] === true) {
                linha += " 🚢";
            } else if (tabuleiro[i][j] === "X") {
                linha += " 💥";
            } else {
                linha += " 🌊";
            }
        }
        console.log(linha);
    }
}

function exibirHistorico(historico) {
    console.log("=== Historico dos seus tiros ===");
    console.log("     0  1  2  3  4");
    for (let i = 0; i < TAM; i++) {
        let linha = i + " |";
        for (let j = 0; j < TAM; j++) {
            if (historico[i][j] === "A") {
                linha += " ✅"; // Acerto//
            } else if (historico[i][j] === "E") {
                linha += " ❌"; // Erro//
            } else {
                linha += "   "; // Vazio//
            }
        }
        console.log(linha);
    }
}

// ===== Inicialização =====//
let tabuleiroJogador = criarTabuleiro();
let tabuleiroMaquina = criarTabuleiro();
let historicoTirosJogador = criarHistoricoTiros();

posicionarNavios(tabuleiroJogador, NAVIOS);
posicionarNavios(tabuleiroMaquina, NAVIOS);

console.log("=== BATALHA NAVAL ===");
console.log("Meu tabuleiro:");
exibirTabuleiro(tabuleiroJogador, true);

let naviosJogador = NAVIOS;
let naviosMaquina = NAVIOS;
let tirosRestantes = TIROS;

// ===== Loop =====//
while (naviosJogador > 0 && naviosMaquina > 0 && tirosRestantes > 0) {
    console.log(`\n--- Rodada (Tiros restantes: ${tirosRestantes}) ---`);

    exibirHistorico(historicoTirosJogador);

    // Jogador ataca//
    let linha = Number(prompt("Digite a linha (0-4): "));
    let coluna = Number(prompt("Digite a coluna (0-4): "));

    if (tabuleiroMaquina[linha] && (tabuleiroMaquina[linha][coluna] === true || tabuleiroMaquina[linha][coluna] === false)) {
        if (tabuleiroMaquina[linha][coluna] === true) {
            console.log("Voce acertou um navio da maquina!");
            tabuleiroMaquina[linha][coluna] = "X";
            historicoTirosJogador[linha][coluna] = "A";
            naviosMaquina--;
        } else {
            console.log("Tiro na agua!");
            historicoTirosJogador[linha][coluna] = "E";
        }
    } else {
        console.log("Voce ja atirou aqui!");
    }

    if (naviosMaquina === 0) break;

    // Máquina ataca//
    let l = Math.floor(Math.random() * TAM);
    let c = Math.floor(Math.random() * TAM);
    console.log(`Maquina atirou em (${l},${c})`);

    if (tabuleiroJogador[l][c] === true) {
        console.log("A maquina acertou seu navio!");
        tabuleiroJogador[l][c] = "X";
        naviosJogador--;
    } else if (tabuleiroJogador[l][c] === false) {
        console.log("A maquina errou.");
        tabuleiroJogador[l][c] = "*"; // marca que a maquina ja atirou aqui//
    } else {
        console.log("A maquina atirou em um local ja atingido.");
    }

    tirosRestantes--;
}

// ===== Resultado =====
console.log("\n=== FIM DO JOGO ===");
if (naviosMaquina === 0) {
    console.log("Voce venceu!");
} else if (naviosJogador === 0) {
    console.log("A maquina venceu...");
} else {
    console.log("Acabaram os tiros! Vitoria da maquina.");
}