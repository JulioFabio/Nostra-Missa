const bottomPanel = document.getElementById('bottomPanel');
const panelHeader = document.getElementById('expandButton');  // Garante que estamos usando o botão correto
let isPanelOpen = false;

// Função para alternar o painel
function togglePanel(abrir) {
    isPanelOpen = abrir !== undefined ? abrir : !isPanelOpen;
    bottomPanel.classList.toggle('open', isPanelOpen);  // Alterna a classe 'open'
}

// Evento para abrir ou fechar o painel ao clicar no "Arraste para Explorar"
panelHeader.addEventListener('click', () => {
    togglePanel();  // Alterna o painel
});

// Detecta rolagem para abrir ou fechar o painel
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0 && !isPanelOpen) {
        togglePanel(true);  // Abre o painel ao rolar para baixo
    } else if (event.deltaY < 0 && isPanelOpen) {
        togglePanel(false);  // Fecha o painel ao rolar para cima
    }
});


// Função para alternar entre os modos claro e escuro
function toggleDarkMode() {
    // Alterna a classe dark-mode no corpo
    document.body.classList.toggle('dark-mode');

    // Alterna a classe dark-mode na top-bar
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
        topBar.classList.toggle('dark-mode');
    }

    // Alterna a classe dark-mode na bottom-panel
    const bottomPanel = document.querySelector('.bottom-panel');
    if (bottomPanel) {
        bottomPanel.classList.toggle('dark-mode');
    }

    // Alterna a classe dark-mode nos botões "Peça Agora"
    const allOrderButtons = document.querySelectorAll('.order-button');
    allOrderButtons.forEach(button => {
        button.classList.toggle('dark-mode');
    });
}



toggleButton.addEventListener('click', toggleDarkMode);
console.log(document.body.classList);
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});

window.addEventListener('beforeunload', () => {
    document.body.classList.add('loading');
});

document.querySelectorAll('.fade-in').forEach((el) => {
    el.classList.add('fade-in');
});