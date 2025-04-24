// script.js

// 1) Painel Inferior
const bottomPanel = document.getElementById('bottomPanel');
const panelContent = document.getElementById('panelContent');
const panelHeader = document.getElementById('expandButton');
let isPanelOpen = false;

function togglePanel(abrir) {
  isPanelOpen = abrir !== undefined ? abrir : !isPanelOpen;
  bottomPanel.classList.toggle('open', isPanelOpen);
  if (!isPanelOpen) {
    panelContent.scrollTop = 0;
  } else {
    reanimarSobreItens();
  }
}

panelHeader.addEventListener('click', () => togglePanel());

window.addEventListener('wheel', (e) => {
  const atTop = window.scrollY <= 30;
  if (bottomPanel.contains(e.target)) return;
  if (e.deltaY > 0 && !isPanelOpen) togglePanel(true);
  if (e.deltaY < 0 && isPanelOpen && atTop) togglePanel(false);
});

// 2) Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.top-bar')?.classList.toggle('dark-mode');
  bottomPanel.classList.toggle('dark-mode');
}

// 3) Reanima itens do grid
function reanimarSobreItens() {
  document.querySelectorAll('.sobre-item').forEach(item => {
    item.style.animation = 'none';
    item.offsetHeight;
    item.style.animation = '';
  });
}

// 4) Conteúdos das páginas
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
    <h2 class="headline-central fade-in">Quem Somos</h2>
    <div class="accordion fade-in">
      <div class="accordion-item">
        <button class="accordion-header">Nossa História</button>
        <div class="accordion-body">
          <p>Fundada em 2016 no coração de Cravinhos, a <strong>Nostra Massa</strong> nasceu da paixão por pizza e pelo desejo de criar experiências memoráveis. Desde o início, nosso objetivo sempre foi ir além de apenas alimentar — queremos despertar sensações, reunir pessoas e criar memórias ao redor de uma boa fatia.</p>
        </div>
      </div>
      <div class="accordion-item">
        <button class="accordion-header">Nosso Jeito</button>
        <div class="accordion-body">
          <p>Utilizamos <strong>massas de fermentação lenta</strong>, ingredientes frescos e combinações que equilibram tradição com criatividade. Cada etapa é feita com cuidado: da seleção dos melhores ingredientes ao forno, garantindo uma massa leve e crocante.</p>
        </div>
      </div>
      <div class="accordion-item">
        <button class="accordion-header">Nossa Conexão</button>
        <div class="accordion-body">
          <p>Com um ambiente acolhedor e uma equipe apaixonada pelo que faz, a Nostra Massa se tornou parte da rotina e da história de muitos moradores da cidade. Participamos de eventos locais e apoiamos projetos sociais para fortalecer nossa comunidade.</p>
        </div>
      </div>
      <div class="accordion-item">
        <button class="accordion-header">Mais que Pizza</button>
        <div class="accordion-body">
          <p>Seja no salão, no delivery ou na retirada, cada pedido é uma oportunidade de entregar mais que uma pizza: é entregar cuidado, aconchego e aquele toque especial que só quem ama o que faz consegue colocar.</p>
        </div>
      </div>
    </div>

    <div class="sobre-nos-grid">
      <div class="sobre-item fade-in">
        <h3>🍕 Pizza Artesanal</h3>
        <p>Ingredientes frescos, massas leves e sabores que surpreendem em cada fatia.</p>
      </div>
      <div class="sobre-item fade-in">
        <h3>🧡 Atendimento com Carinho</h3>
        <p>Equipe acolhedora, pronta para receber você como parte da família Nostra Massa.</p>
      </div>
      <div class="sobre-item fade-in">
        <h3>🏡 Orgulho Local</h3>
        <p>Fazemos parte da história de Cravinhos com orgulho, levando nosso sabor à região.</p>
      </div>
    </div>

    <section class="depoimentos fade-in">
      <h2 class="headline-central">O que dizem nossos clientes</h2>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <blockquote>"Melhor pizza da região!" <cite>— Maria S.</cite></blockquote>
          </div>
          <div class="swiper-slide">
            <blockquote>"Ambiente incrível e atendimento nota 10." <cite>— João P.</cite></blockquote>
          </div>
          <div class="swiper-slide">
            <blockquote>"Sempre surpreende com novos sabores." <cite>— Ana R.</cite></blockquote>
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </section>

    
  `,
  contato: `
    <h2>Fale Conosco</h2>
    <p>WhatsApp: (16) 99999-9999<br>Email: contato@nostramassa.com</p>
  `
};

// 5) Inicializações de Accordion, Fade-in e Swiper
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('active'));
  });
}

function initFadeInOnScroll() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
}

function initSwiper() {
  new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true
  });
}

// 6) Carrega conteúdo e dispara init’s
function carregarConteudo(page, mudarURL = true) {
  panelContent.innerHTML = conteudos[page] || '<h2>Conteúdo não encontrado</h2>';
  if (mudarURL) {
    history.pushState({ page }, '', `/${page === 'home' ? '' : page}`);
  }
  // se for Sobre, inicializa interações após o DOM atualizar
  if (page === 'sobre') {
    setTimeout(() => {
      initAccordion();
      initFadeInOnScroll();
      initSwiper();
      reanimarSobreItens();
    }, 50);
  }
}

// 7) SPA navigation
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    carregarConteudo(link.dataset.page);
    togglePanel(true);
  });
});

// tratar back/forward
window.addEventListener('popstate', e => {
  carregarConteudo(e.state?.page || 'home', false);
});

// carregamento inicial
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.replace('/', '') || 'home';
  carregarConteudo(path, false);
});
