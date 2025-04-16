const bottomPanel = document.getElementById('bottomPanel');
const panelContent = document.querySelector('.bottom-panel-content');
const panelHeader = document.getElementById('expandButton');
let isPanelOpen = false;

// Alternar o painel
function togglePanel(abrir) {
    isPanelOpen = abrir !== undefined ? abrir : !isPanelOpen;
    bottomPanel.classList.toggle('open', isPanelOpen);
}

// Clique no topo do painel
panelHeader.addEventListener('click', () => {
    togglePanel();
});

// Rolagem
window.addEventListener('wheel', (event) => {
    const scrollTop = window.scrollY;
    const atTop = scrollTop === 0;

    if (event.deltaY > 0 && !isPanelOpen) {
        // Rolar para baixo abre o painel
        togglePanel(true);
    } else if (event.deltaY < 0 && isPanelOpen && atTop) {
        // Só fecha o painel se estiver no topo da página
        togglePanel(false);
    }
});

// Modo escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.top-bar')?.classList.toggle('dark-mode');
    document.querySelector('.bottom-panel')?.classList.toggle('dark-mode');

    document.querySelectorAll('.order-button').forEach(button => {
        button.classList.toggle('dark-mode');
    });
}

const conteudos = {
    home: `
        <h2>Bem-vindo à Nostra Massa</h2>
        <p>Descubra o sabor da verdadeira pizza artesanal!</p>
    `,
    cardapio: `
        <h2>Nosso Cardápio</h2>
        <ul>
            <li>Pizza Margherita</li>
            <li>Pizza Calabresa</li>
            <li>Pizza Quatro Queijos</li>
        </ul>
    `,
    unidades: `
        <h2>Nossas Unidades</h2>
        <p>Estamos presentes em Cravinhos, Ribeirão Preto e região.</p>
    `,
    sobre: `
        <h2>Quem Somos</h2>
        <p>Somos uma pizzaria em Cravinhos, apaixonados por pizza artesanal.</p>
    `,
    contato: `
        <h2>Fale Conosco</h2>
        <p>WhatsApp: (16) 99999-9999<br>Email: contato@nostramassa.com</p>
    `
};

function carregarConteudo(page, mudarURL = true, abrirPainel = false) {
    panelContent.innerHTML = conteudos[page] || '<h2>Conteúdo não encontrado</h2>';
    if (mudarURL) {
        history.pushState({ page }, '', `/${page === 'home' ? '' : page}`);
    }
    // Só abre o painel quando o parâmetro abrirPainel for verdadeiro
    if (abrirPainel) {
        bottomPanel.classList.add('open');
    }
}

// Detecta clique nos links do menu
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        carregarConteudo(page);
    });
});

// Lida com botões "voltar" e "avançar" do navegador
window.addEventListener('popstate', (event) => {
    const page = event.state?.page || 'home';
    carregarConteudo(page, false);
});

// Carrega o conteúdo inicial baseado na URL
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.replace('/', '') || 'home';
    carregarConteudo(path, false);
});