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

window.addEventListener('wheel', (event) => {
    const scrollTop = window.scrollY;
    const atTop = scrollTop <= 30;

    // Ignorar se o scroll veio de dentro do painel
    const isFromPanel = bottomPanel.contains(event.target);
    if (isFromPanel) return;

    if (event.deltaY > 0 && !isPanelOpen) {
        togglePanel(true);
    } else if (event.deltaY < 0 && isPanelOpen && atTop) {
        togglePanel(false);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }
});

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

    <div class="sobre-nos-texto">
        <p>
            Fundada em 2016 no coração de Cravinhos, a <strong>Nostra Massa</strong> nasceu da paixão por pizza e pelo desejo de criar experiências memoráveis. Desde o início, nosso objetivo sempre foi ir além de apenas alimentar — queremos despertar sensações, reunir pessoas e criar memórias ao redor de uma boa fatia.
        </p>
        <p>
            Nosso diferencial está na dedicação com que tratamos cada etapa: da seleção dos ingredientes à forma como recebemos nossos clientes. Utilizamos <strong>massas de fermentação lenta</strong>, ingredientes frescos e combinações que equilibram tradição com criatividade. O resultado? Uma pizza artesanal que encanta no sabor e no carinho com que é feita.
        </p>
        <p>
            Com um ambiente acolhedor e uma equipe apaixonada pelo que faz, a Nostra Massa se tornou parte da rotina e da história de muitos moradores da cidade. E mesmo com o crescimento, mantemos viva a nossa essência: ser um ponto de encontro, de afeto e de sabor.
        </p>
        <p>
            Seja no salão, no delivery ou na retirada, cada pedido é uma oportunidade de entregar mais que uma pizza: é entregar cuidado, aconchego e aquele toque especial que só quem ama o que faz consegue colocar.
        </p>
    </div>

    <div class="sobre-nos-grid">
        <div class="sobre-item">
            <h3>🍕 A Pizza Artesanal</h3>
            <p>Utilizamos ingredientes frescos, massas de fermentação lenta e combinações de sabores que vão do clássico ao exclusivo. Cada pizza é feita com amor e cuidado.</p>
        </div>
        <div class="sobre-item">
            <h3>🧡 Atendimento com Carinho</h3>
            <p>Nosso time está sempre pronto para receber você com simpatia, garantindo uma experiência acolhedora, seja no salão, delivery ou retirada.</p>
        </div>
        <div class="sobre-item">
            <h3>🏡 Tradição Local</h3>
            <p>Fazemos parte da história de Cravinhos com orgulho! E continuamos evoluindo, sem nunca perder nossa essência: oferecer uma experiência única em cada fatia.</p>
        </div>
    </div>
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


