const GAME_DURATION = 30;
const SPAWN_INTERVAL = 800;
const ITEM_LIFETIME = 1200;
const ITEM_POINTS = 1;

const areaJogo = document.getElementById('areaJogo');
const pontosSpan = document.getElementById('pontos');
const tempoSpan = document.getElementById('tempo');
const btnIniciar = document.getElementById('btnIniciar');
const btnReiniciar = document.getElementById('btnReiniciar');

let pontos = 0;
let tempoRestante = GAME_DURATION;
let intervaloSpawnId = null;
let intervaloTempoId = null;
let jogoAtivo = false;

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function atualizarPlacar(){
    pontosSpan.textContent = pontos;
}

function atualizarTempo(){
    tempoSpan.textContent = tempoRestante
}

function criarItem(){
    if (!jogoAtivo) return;
    const RECT = areaJogo.getBoundingClientRect()
    
    const ITEM_SIZE = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--itemSize')) || 64;
    
    const MAX_X = RECT.width - ITEM_SIZE;
    const MAX_Y = RECT.height - ITEM_SIZE;
    
    const POS_X = aleatorio(0, Math.max(0, Math.floor(MAX_X)))
    const POS_Y = aleatorio(0, Math.max(0, Math.floor(MAX_Y)))
    
    const ITEM = document.createElement('div');
    ITEM.className = 'item';
    ITEM.setAttribute('role', 'button');
    ITEM.setAttribute('aria-label', 'Item coletável')
    
    ITEM.style.left = `${POS_X}px`;
    ITEM.style.top = `${POS_Y}px`;
    
    ITEM.addEventListener('click', () =>{
        if (!jogoAtivo) return;
        pontos += ITEM_POINTS;
        atualizarPlacar();
        ITEM.remove();
    
    });
    
    areaJogo.appendChild(ITEM);
    
    setTimeout(() =>{
        if (ITEM.isConnected) ITEM.remove();
    }, ITEM_LIFETIME);
}



function iniciarTempo(){
    atualizarTempo();
    intervaloTempoId = setInterval(() =>{
        tempoRestante--;
        atualizarTempo();

        if (tempoRestante <= 0){
            encerrarJogo();
        }
    },1000);
}

function iniciarSpawn(){
    criarItem();
    intervaloSpawnId = setInterval(criarItem, SPAWN_INTERVAL);
}

function iniciarJogo(){
    if (jogoAtivo) return;

    jogoAtivo = true;
    pontos = 0;
    tempoRestante = GAME_DURATION;
    atualizarPlacar();
    atualizarTempo();

    limparItens();

    btnIniciar.disabled = true;
    btnReiniciar.disabled = false;

    iniciarTempo();
    iniciarSpawn();

    areaJogo.focus();
}

function encerrarJogo(){
    jogoAtivo = false;

    clearInterval(intervaloSpawnId);
    clearInterval(intervaloTempoId);
    intervaloTempoId = null;
    intervaloSpawnId = null;

    btnIniciar.disabled = false;
    btnReiniciar.disabled = false;

    mostrarMensagemFinal();
}

function reiniciarJogo(){
    encerrarJogo();
    iniciarJogo();
}

function limparItens(){
    areaJogo.querySelectorAll('.item').forEach(el => el.remove());
}

function mostrarMensagemFinal(){
    const msg = document.createElement('div');

    msg.textContent = `Fim! você fez ${pontos} ponto(s).`;
    msg.style.position = 'absolute';
    msg.style.left = '50%';
    msg.style.top = '50%';
    msg.style.transform = 'translate(-50%, -50%)';
    msg.style.background = 'rgba(0,0,0,0.8)';
    msg.style.color = '#fff';
    msg.style.padding = '12px 16px';
    msg.style.borderRadius = '10px';
    msg.style.fontWeight = 'bold';
    msg.style.zIndex = '999';

    areaJogo.appendChild(msg)

    setTimeout(() => msg.remove(), 2200)
}

btnIniciar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', reiniciarJogo);


