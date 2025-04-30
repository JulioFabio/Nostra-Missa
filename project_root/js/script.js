// script.js
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('sobrenos.html')) return 'sobre';
  if (path.includes('cardapio.html')) return 'cardapio';
  if (path.includes('unidades.html')) return 'unidades';
  if (path.includes('contato.html')) return 'contato';
  return 'home'; // index.html ou raiz
}

// Elementos do painel inferior
const bottomPanel = document.getElementById('bottomPanel');
const expandButton = document.getElementById('expandButton');
let isPanelOpen = false;

function corrigirEstilosCabecalho() {
  // Corrigir o estilo do cabeçalho "Quem Somos"
  const cabecalhos = document.querySelectorAll('.headline-central, h2');
  cabecalhos.forEach(cabecalho => {
    // Resetar estilos que podem estar causando o problema
    cabecalho.style.transform = 'none';
    cabecalho.style.textAlign = 'center';
    cabecalho.style.margin = '20px 0';
    cabecalho.style.position = 'relative';
  });
}

// Adicione esta função para corrigir a visibilidade do conteúdo
function corrigirVisibilidadeConteudo() {
  if (!bottomPanel) return;
  
  // Forçar visibilidade do conteúdo
  const panelContent = document.getElementById('panelContent');
  if (panelContent) {
    // Garantir que o conteúdo seja visível
    panelContent.style.opacity = '1';
    panelContent.style.visibility = 'visible';
    panelContent.style.display = 'block';
    panelContent.style.color = '#ffffff'; // Forçar cor branca para o texto
    
    // Verificar todos os elementos filhos e garantir que sejam visíveis
    Array.from(panelContent.children).forEach(child => {
      child.style.opacity = '1';
      child.style.visibility = 'visible';
      child.style.display = 'block';
    });
    
    // Corrigir estilos do cabeçalho
    corrigirEstilosCabecalho();
    
    console.log('Visibilidade do conteúdo corrigida');
  }
}

// Função para alternar o painel
function togglePanel() {
  isPanelOpen = !isPanelOpen;
  bottomPanel.classList.toggle('open', isPanelOpen);
  expandButton.setAttribute('aria-expanded', isPanelOpen);
  
  // Muda o texto do botão dependendo do estado
  if (isPanelOpen) {
    expandButton.textContent = '▼ Arraste para fechar';
    // Corrigir visibilidade quando o painel é aberto
    setTimeout(corrigirVisibilidadeConteudo, 300); // Aguardar a animação
  } else {
    expandButton.textContent = '▲ Arraste para explorar mais';
  }
}

// Adiciona evento de clique ao botão de expandir
if (expandButton) {
  expandButton.addEventListener('click', togglePanel);
}

// Evento de rolagem para abrir/fechar o painel
window.addEventListener('wheel', (e) => {
  if (!bottomPanel) return;
  
  // Se o usuário estiver rolando dentro do painel, não faça nada
  if (bottomPanel.contains(e.target)) return;
  
  const atTop = window.scrollY <= 30;
  
  // Rolando para baixo e o painel está fechado -> abre o painel
  if (e.deltaY > 0 && !isPanelOpen) {
    togglePanel();
  }
  
  // Rolando para cima e o painel está aberto e estamos no topo da página -> fecha o painel
  if (e.deltaY < 0 && isPanelOpen && atTop) {
    togglePanel();
  }
});

// Função para alternar o modo escuro
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.top-bar')?.classList.toggle('dark-mode');
  if (bottomPanel) bottomPanel.classList.toggle('dark-mode');
}


// Solução simplificada com CSS
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
}

// Versão nativa (fallback)
function initAccordionNative() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    const body = header.nextElementSibling;
    
    // Inicializa fechado
    if (body && !header.classList.contains('active')) {
      body.style.display = 'none';
    }
    
    header.addEventListener('click', function() {
      this.classList.toggle('active');
      
      if (body) {
        if (this.classList.contains('active')) {
          body.style.display = 'block';
        } else {
          body.style.display = 'none';
        }
      }
    });
  });
}

// Inicialização do Swiper
function initSwiper() {
  if (typeof Swiper !== 'undefined') {
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
}

// Função para carregar o conteúdo apropriado para cada página
function carregarConteudoEspecifico() {
  const currentPage = getCurrentPage();
  console.log('Página atual:', currentPage);
  
  // Se o painel de conteúdo não existir, não faça nada
  const panelContent = document.getElementById('panelContent');
  if (!panelContent) return;
  
  // Limpar o conteúdo atual
  panelContent.innerHTML = '';
  
  // Carregar o conteúdo apropriado para cada página
  switch (currentPage) {
    case 'home':
      panelContent.innerHTML = `
        <h2 class="headline-central">Bem-vindo à Nostra Massa</h2>
        <p>Descubra o sabor da verdadeira pizza artesanal!</p>
      `;
      break;
    case 'sobre':
      panelContent.innerHTML = `
        <section class="sobre-nos fade-in">
          <div class="container">
            <h2 class="headline-central">Quem Somos</h2>
            <div class="accordion">
              <div class="accordion-item">
                <button class="accordion-header"><i class="fa fa-history"></i>Nossa História</button>
                <div class="accordion-body">
                  <p>Fundada em 2016 no coração de Cravinhos, a <strong>Nostra Massa</strong> nasceu da paixão por pizza e pelo desejo de criar experiências memoráveis...</p>
                </div>
              </div>
              <div class="accordion-item">
                <button class="accordion-header"><i class="fa fa-pizza-slice"></i> Nosso Jeito</button>
                <div class="accordion-body">
                  <p>Utilizamos <strong>massas de fermentação lenta</strong>, ingredientes frescos e combinações que equilibram tradição e criatividade...</p>
                </div>
              </div>
              <div class="accordion-item">
                <button class="accordion-header"><i class="fa fa-users"></i>Nossa Conexão</button>
                <div class="accordion-body">
                  <p>Com um ambiente acolhedor e equipe apaixonada, nos tornamos parte da rotina de muitos moradores...</p>
                </div>
              </div>
              <div class="accordion-item">
                <button class="accordion-header"><i class="fa fa-heart"></i> Mais que Pizza</button>
                <div class="accordion-body">
                  <p>Seja no salão, delivery ou retirada, cada pedido é uma entrega de carinho e cuidado...</p>
                </div>
              </div>
            </div>

            <div class="sobre-nos-grid">
              <div class="sobre-item"><h3>🍕 Pizza Artesanal</h3><p>Ingredientes frescos, massas leves e sabores que surpreendem.</p></div>
              <div class="sobre-item"><h3>🧡 Atendimento com Carinho</h3><p>Equipe acolhedora, pronta para fazer você se sentir em casa.</p></div>
              <div class="sobre-item"><h3>🏡 Orgulho Local</h3><p>Desde Cravinhos para a região, mantendo sempre nossa essência.</p></div>
            </div>
          </div>
        </section>

        <section class="depoimentos fade-in">
          <h2 class="headline-central">O que nossos clientes dizem</h2>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <blockquote>"A melhor pizza que já comi! Sempre me surpreendo com os sabores." <cite>— João M.</cite></blockquote>
              </div>
              <div class="swiper-slide">
                <blockquote>"Ambiente acolhedor e atendimento maravilhoso. Amei!" <cite>— Maria L.</cite></blockquote>
              </div>
              <div class="swiper-slide">
                <blockquote>"A pizza de calabresa é sensacional, e o atendimento é impecável!" <cite>— Lucas F.</cite></blockquote>
              </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </section>
      `;
      break;
    case 'cardapio':
      panelContent.innerHTML = `
        <h2 class="headline-central">Nosso Cardápio</h2>
        <ul>
          <li>Pizza Margherita</li>
          <li>Pizza Calabresa</li>
          <li>Pizza Quatro Queijos</li>
        </ul>
      `;
      break;
    case 'unidades':
      panelContent.innerHTML = `
        <h2 class="headline-central">Nossas Unidades</h2>
        <p>Conheça nossas unidades espalhadas pela região.</p>
      `;
      break;
    case 'contato':
      panelContent.innerHTML = `
        <h2 class="headline-central">Fale Conosco</h2>
        <p>WhatsApp: (16) 99999-9999<br>Email: contato@nostramassa.com</p>
      `;
      break;
  }
  
  // Após carregar o conteúdo, inicialize os componentes
  initAccordion();
  initSwiper();
  
  // Adicionar classe 'visible' aos elementos fade-in
  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.add('visible');
  });
  
  // Corrigir visibilidade e estilos
  corrigirVisibilidadeConteudo();
}

// Modifique o evento DOMContentLoaded para incluir a carga de conteúdo específico
document.addEventListener('DOMContentLoaded', () => {
  // Carregar conteúdo específico para a página atual
  carregarConteudoEspecifico();
  
  
  debugButton.addEventListener('click', () => {
    carregarConteudoEspecifico();
    corrigirVisibilidadeConteudo();
  });
  document.body.appendChild(debugButton);
});