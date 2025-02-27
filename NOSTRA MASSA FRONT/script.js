const bottomPanel = document.getElementById('bottomPanel');
const panelHeader = document.querySelector('.bottom-panel-header');
let isPanelOpen = false;

// Abre ou fecha a seção ao clicar na barra superior
panelHeader.addEventListener('click', () => {
    togglePanel();
});

// Rola a seção automaticamente ao detectar rolagem do mouse
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0 && !isPanelOpen) {
        // Rolar para baixo abre o painel
        togglePanel(true);
    } else if (event.deltaY < 0 && isPanelOpen && window.scrollY === 0) {
        // Rolar para cima fecha o painel se estiver no topo da página
        togglePanel(false);
    }
});

function togglePanel(abrir) {
    isPanelOpen = abrir !== undefined ? abrir : !isPanelOpen;
    bottomPanel.classList.toggle('open', isPanelOpen);
}
