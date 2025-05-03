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
        <div class="menu-columns">
          <!-- Coluna de pizzas salgadas -->
          <div class="menu-column salgadas">
            <h2 class="headline-central">Pizzas Salgadas</h2>
          </div>
          <!-- Coluna de pizzas doces -->
          <div class="menu-column doces">
            <h2 class="headline-central">Pizzas Doces</h2>
          </div>
        </div>
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
        <!-- PAINEL CONTATO -->
  <div class="bottom-panel open" id="bottomPanel" style="position: fixed; z-index: -1;">
    <div class="bottom-panel-header">
      ▲ Envie uma mensagem para nós
    </div>
  
    <div class="bottom-panel-content">
      <section class="contato fade-in">
        <h2 class="headline-central">Fale Conosco</h2>
  
        <form class="contato-form">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" placeholder="Enter your Name" required />
          </div>
  
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter a valid email address" required />
          </div>
  
          <button type="submit" class="btn-enviar">Enviar Mensagem</button>
        </form>
      </section>
    </div>
  </div>
  
  <div class="loading-spinner" id="loadingSpinner"></div>

  <!-- Scripts -->
  <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
  <script src="project_root/js/script.js"></script>
</body>
</html>
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

// Lista completa de pizzas (salgadas e doces)
const pizzas = [
  // — SALGADAS —
  { name: "ABOBRINHA",         desc: "Molho tomates frescos, muçarela, abobrinha em rodelas temperadas, parmesão, mais molho de tomate, azeitonas",                                                        price: "R$ 79,90", type: "salgada" },
  { name: "ALCATRA (CHARMOSA)",desc: "Molho de tomates frescos, muçarela, Alcatra, gorgonzola, cebola roxa marinada no balsâmico e mel, orégano e azeitonas",                                            price: "R$ 87,90", type: "salgada" },
  { name: "ALHO PORÓ",         desc: "Molho tomates frescos, muçarela, cream cheese, alho poró puxado na manteiga e vinho branco, azeitonas",                                                      price: "R$ 84,90", type: "salgada" },
  { name: "ALICHE",            desc: "Molho tomates frescos, muçarela, aliche, azeitonas",                                                                                                          price: "R$ 84,90", type: "salgada" },
  { name: "AMERICANA",         desc: "Molho tomates frescos, muçarela, calabresa, bacon, cebola, molho barbecue, azeitonas",                                                                       price: "R$ 79,90", type: "salgada" },
  { name: "AMOROSA",           desc: "Molho de tomates frescos, muçarela, peito de peru, cream cheese, geleia de amora, azeitonas",                                                               price: "R$ 79,90", type: "salgada" },
  { name: "ATUM",              desc: "Molho tomate, muçarela, atum em pedaços, rodelas de tomate, cebola, azeitonas",                                                                            price: "R$ 87,90", type: "salgada" },
  { name: "ATUM DO CHEF",      desc: "Molho tomates frescos, muçarela, atum em pedaços, brócolis, rodelas de tomate, cebola, azeitonas",                                                        price: "R$ 89,90", type: "salgada" },
  { name: "ATUM HOLL",         desc: "Molho tomates frescos, muçarela, atum em pedaços, cream cheese, molho tare, cheiro verde, azeitonas",                                                      price: "R$ 87,90", type: "salgada" },
  { name: "À MODA DA CASA",    desc: "Molho tomates frescos, muçarela, calabresa, lombinho defumado, milho, bacon, rodelas de tomate, requeijão cremoso, azeitonas",                                price: "R$ 84,90", type: "salgada" },

  { name: "BACALHAU",          desc: "Molho tomates frescos, muçarela, bacalhau em lascas, ovo, tomates frescos, cebola, pimentão, azeitonas",                                                     price: "R$ 89,90", type: "salgada" },
  { name: "BAJANA ESPECIAL",   desc: "Molho tomates frescos, muçarela, calabresa, pimenta, tomate seco, creme de espinafre, rodelas de tomate, manjericão, azeitonas",                             price: "R$ 79,90", type: "salgada" },
  { name: "BOLONHESA",         desc: "Molho tomates frescos, muçarela, calabresa, bacon, palmito, requeijão, azeitonas",                                                                         price: "R$ 82,90", type: "salgada" },
  { name: "BRÓCOLIS COM REQU", desc: "Molho tomates frescos, muçarela, brócolis, requeijão cremoso, azeitonas",                                                                                  price: "R$ 78,90", type: "salgada" },
  { name: "BRÓCOLIS DO CHEF",  desc: "Molho tomates frescos, muçarela, brócolis, palmito, tomate seco, creme de espinafre, azeitonas",                                                       price: "R$ 79,90", type: "salgada" },

  { name: "CALABRESA",         desc: "Molho tomates frescos, muçarela, calabresa, cebola, azeitonas",                                                                                             price: "R$ 79,90", type: "salgada" },
  { name: "CALABRIA",          desc: "Molho tomates frescos, muçarela, calabresa, tomates selecionados, requeijão, cebola selecionada fatiada, pimenta, azeitonas",                               price: "R$ 82,90", type: "salgada" },
  { name: "CALIFÓRINA",        desc: "Molho tomates frescos, muçarela, lombinho, pêssego, abacaxi, figo, ameixa e cereja",                                                                  price: "R$ 86,90", type: "salgada" },
  { name: "CAMARÃO",           desc: "Molho tomates frescos, muçarela, camarão ao molho de tomate fresco, requeijão, azeitonas",                                                             price: "R$ 108,90", type: "salgada" },
  { name: "CAPRESE",           desc: "Molho tomates frescos, muçarela, rodelas de tomates selecionados, pesto de azeitonas pretas, muçarela de búfala, manjericão fresco, azeitonas",           price: "R$ 82,90", type: "salgada" },
  { name: "CARIJÓ",            desc: "Molho tomates frescos, muçarela, frango, milho, requeijão, ovo, bacon, azeitonas",                                                                     price: "R$ 81,90", type: "salgada" },
  { name: "CINCO QUEIJOS",     desc: "Molho tomates frescos, muçarela, parmesão, gorgonzola, requeijão, cheddar, azeitonas",                                                                  price: "R$ 83,90", type: "salgada" },

  { name: "DIVINA",            desc: "Molho de tomates frescos, muçarela, pepperoni, pimentão amarelo e vermelho, champignon, cebolas, orégano e azeitonas",                                     price: "R$ 79,90", type: "salgada" },
  { name: "DOG (CACHORRO QUENTE)", desc: "Molho tomates frescos, muçarela, molho de tomate com salsichas, requeijão, milho, batata palha, azeitonas",                                            price: "R$ 79,90", type: "salgada" },
  { name: "DORITOS",           desc: "Molho tomates frescos, muçarela, bacon, cheddar, doritos, azeitonas",                                                                                  price: "R$ 81,90", type: "salgada" },

  { name: "ESCAROLA",          desc: "Molho tomates frescos, muçarela, escarola, bacon, tomate, azeitonas",                                                                                  price: "R$ 79,90", type: "salgada" },
  { name: "ESPECIAL DO CLIENTE (06 INGREDIENTES)", desc: "Escolha até 6 ingredientes: Muçarela, calabresa, lombinho, peito de peru, pepperoni, bacon, parmesão, gorgonzola, requeijão, cheddar, cream cheese, palmito, tomate, cebola, milho, ervilha, ovo, brócolis, pimenta, tomate seco, champignon, frango", price: "R$ 89,90", type: "salgada" },
  { name: "ESTROGONOFE DE CARNE", desc: "Molho tomates frescos, muçarela, estrogonofe de carne com champignon, requeijão cremoso, azeitonas",                                                  price: "R$ 87,90", type: "salgada" },
  { name: "ESTROGONOFE DE FRANGO", desc: "Molho tomates frescos, muçarela, estrogonofe de frango com champignon, requeijão cremoso, azeitonas",                                                price: "R$ 81,90", type: "salgada" },

  { name: "FIGO COM 3 QUEIJOS", desc: "Molho tomates frescos, muçarela, gorgonzola, requeijão cremoso e figo caramelizado",                                                                price: "R$ 76,90", type: "salgada" },
  { name: "FILÉ MIGNON",        desc: "Molho tomates frescos, muçarela, Filé mignon em cubos, gotas de requeijão, azeitonas",                                                             price: "R$ 118,90", type: "salgada" },
  { name: "FIORENTINI",         desc: "Molho tomates frescos, muçarela, peito de peru defumado, milho, requeijão cremoso, parmesão, azeitonas",                                              price: "R$ 83,90", type: "salgada" },
  { name: "FRANGO COM REQUEIJÃO",desc: "Molho tomates frescos, muçarela, frango desfiado, requeijão cremoso, azeitonas",                                                                   price: "R$ 77,90", type: "salgada" },

  { name: "HOT HOLL (SALMÃO)",  desc: "Molho tomates frescos, muçarela, salmão, cream cheese, cebolinha, molho tare, azeitonas",                                                       price: "R$ 108,90", type: "salgada" },

  { name: "IMPERIAL",           desc: "Molho tomates frescos, muçarela, cream cheese, geleia de pimenta, azeitonas",                                                                     price: "R$ 79,90", type: "salgada" },
  { name: "INGLESA",            desc: "Molho tomates frescos, muçarela, lombinho defumado, ovo, cebola, requeijão, azeitonas",                                                            price: "R$ 79,90", type: "salgada" },
  { name: "ITALIANA",           desc: "Molho tomates frescos, muçarela, molho carne moída, palmito, requeijão, azeitonas",                                                               price: "R$ 81,90", type: "salgada" },

  { name: "LIGHT ESPECIAL",     desc: "Molho tomates frescos, queijo branco, peito de peru, brócolis, rodelas de tomate, azeitonas",                                                    price: "R$ 77,90", type: "salgada" },
  { name: "LINGUIÇA ARTESANAL", desc: "Molho de tomates frescos, muçarela, linguiça artesanal, requeijão, pimentão, pimenta biquinho, queijo coalho, cheiro verde, orégano e azeitonas", price: "R$ 91,90", type: "salgada" },
  { name: "LOMBINHO COM REQU",   desc: "Molho tomates frescos, muçarela, lombinho canadense, requeijão cremoso, azeitonas",                                                             price: "R$ 79,90", type: "salgada" },
  { name: "LOMBINHO DO CHEF",   desc: "Molho tomates frescos, muçarela, lombinho canadense, tomate seco, bacon, requeijão cremoso, azeitonas",                                          price: "R$ 81,90", type: "salgada" },

  { name: "MARGUERITA",         desc: "Molho tomates frescos, muçarela, manjericão fresco, e mais molho de tomates, azeitonas",                                                          price: "R$ 69,90", type: "salgada" },
  { name: "MILHO",              desc: "Molho tomates frescos, muçarela, milho, requeijão, bacon, azeitonas",                                                                             price: "R$ 79,90", type: "salgada" },
  { name: "MUÇARELA",           desc: "Molho tomates frescos, muçarela, rodelas de tomate, azeitonas",                                                                                   price: "R$ 63,90", type: "salgada" },

  { name: "NAPOLITANA",         desc: "Molho tomates frescos, muçarela, parmesão, rodelas de tomate, manjericão fresco, azeitonas",                                                       price: "R$ 79,90", type: "salgada" },
  { name: "NORDESTINA COM REQU", desc: "Molho tomates frescos, muçarela, carne seca desfiada, rodelas de tomates frescos, cebola, requeijão, azeitonas",                                      price: "R$ 94,90", type: "salgada" },

  { name: "PALMITO",            desc: "Molho tomates frescos, muçarela, palmito, azeitonas",                                                                                            price: "R$ 81,90", type: "salgada" },
  { name: "PALMITO DO CHEF",    desc: "Molho tomates frescos, palmito, champignon, tomate seco, bacon, requeijão cremoso, azeitonas",                                                    price: "R$ 83,90", type: "salgada" },
  { name: "PÃO DE ALHO",        desc: "Muçarela, creme de alho temperado, requeijão, bacon, azeitonas",                                                                                 price: "R$ 79,90", type: "salgada" },
  { name: "PAULISTA",           desc: "Molho tomates frescos, muçarela, presunto picado, ervilha, palmito, bacon, azeitonas",                                                            price: "R$ 79,90", type: "salgada" },
  { name: "PEITO PERU",         desc: "Molho tomates frescos, muçarela, peito de peru picado, alho poró temperado, cream cheese, azeitonas",                                             price: "R$ 85,90", type: "salgada" },
  { name: "PEPPERONI",          desc: "Molho tomates frescos, muçarela, pepperoni, azeitonas",                                                                                         price: "R$ 81,90", type: "salgada" },
  { name: "PIZZAIOLO",          desc: "Molho tomates frescos, muçarela, pepperoni, palmito, tomate seco, bacon, azeitonas",                                                            price: "R$ 81,90", type: "salgada" },
  { name: "PORTUGUESA",         desc: "Molho tomates frescos, muçarela, presunto, palmito, ervilha, ovo, cebola, azeitonas",                                                           price: "R$ 79,90", type: "salgada" },
  { name: "PRECIOSA",           desc: "Molho tomates frescos, muçarela, pepperoni, cream cheese, gorgonzola, tomate cereja, manjericão, azeitonas",                                     price: "R$ 88,90", type: "salgada" },
  { name: "PRESUNTO E MUCARELA",desc: "Molho tomates frescos, muçarela, presunto, tomates, azeitonas",                                                                                 price: "R$ 78,90", type: "salgada" },
  { name: "PRESUNTO PARMA",     desc: "Molho tomates frescos, muçarela, rúcula, tomate cereja, presunto parma, parmesão, azeitonas",                                                    price: "R$ 89,90", type: "salgada" },
  { name: "PRIMAVERA",          desc: "Molho tomates frescos, muçarela, palmito, brócolis, manjericão fresco, rodelas de tomate, requeijão cremoso, azeitonas",                            price: "R$ 78,90", type: "salgada" },

  { name: "QUATRO QUEIJOS",     desc: "Molho tomates frescos, muçarela, parmesão, gorgonzola, requeijão cremoso, azeitonas",                                                             price: "R$ 81,80", type: "salgada" },

  { name: "ROMANA",             desc: "Molho tomates frescos, muçarela, lombinho canadense, champignon, rodelas tomates, manjericão, requeijão cremoso, azeitonas",                         price: "R$ 79,90", type: "salgada" },
  { name: "RÚCULA DO CHEF",     desc: "Molho tomates frescos, muçarela, rúcula, molho a base de mostarda, acceto balsâmico, mel, tomate seco, creme de queijo branco, azeitonas",          price: "R$ 79,90", type: "salgada" },

  { name: "SHIMEJI",            desc: "Molho tomates frescos, muçarela, shimeji na manteiga, cream cheese, cebolinha",                                                                price: "R$ 86,90", type: "salgada" },
  { name: "SUPREMA",            desc: "Molho tomates frescos, muçarela, carne bovina em cubos, pepperoni, champignon, pimentão, azeitonas",                                              price: "R$ 89,90", type: "salgada" },

  // — DOCES —
  { name: "ABACAXI C/ CHOC BRANCO", desc: "Massa fina, abacaxi, chocolate branco, leite condensado e coco",                                                                         price: "R$ 74,90", type: "doce" },
  { name: "BANANA C/ CHOC BRANCO",  desc: "Massa fina, banana, chocolate branco e canela",                                                                                         price: "R$ 74,90", type: "doce" },
  { name: "BOMBOM DE KITKAT",        desc: "Massa fina, brigadeiro artesanal, creme de leite ninho, Kit Kat, morango",                                                                 price: "R$ 74,90", type: "doce" },
  { name: "BOMBOM DE UVA",           desc: "Massa fina, brigadeiro artesanal, creme de leite ninho, uva",                                                                            price: "R$ 74,90", type: "doce" },
  { name: "BRIGADEIRO",              desc: "Massa fina, Brigadeiro artesanal e chocolate granulado",                                                                               price: "R$ 74,90", type: "doce" },
  { name: "CASADINHO",               desc: "Massa fina, chocolate ao leite com chocolate branco",                                                                                   price: "R$ 74,90", type: "doce" },
  { name: "CHOCOLATE BRANCO",        desc: "Massa fina, chocolate branco",                                                                                                         price: "R$ 74,90", type: "doce" },
  { name: "NUTELLA C/ MORANGO",      desc: "Massa fina, Nutella, creme de leite e morango",                                                                                         price: "R$ 77,90", type: "doce" },
  { name: "PAÇOQUINHA NOVIDADE",     desc: "Massa fina, chocolate ao leite, paçoquinha",                                                                                            price: "R$ 70,90", type: "doce" },
  { name: "PISTACHE",                desc: "Massa fina, Ganache de pistache e amêndoas de pistache",                                                                                price: "R$ 85,90", type: "doce" },
  { name: "PRESTÍGIO",               desc: "Massa fina, Brigadeiro artesanal com doce de coco",                                                                                     price: "R$ 74,90", type: "doce" },
  { name: "ROMEU E JULIETA",         desc: "Massa fina, muçarela, goiabada cremosa",                                                                                              price: "R$ 73,90", type: "doce" }
];

// Função que renderiza as pizzas nas colunas
function renderCardapio() {
  const colSalgadas = document.querySelector('.menu-column.salgadas');
  const colDoces    = document.querySelector('.menu-column.doces');

  // limpa antes de popular
  colSalgadas.querySelectorAll('.menu-item').forEach(el => el.remove());
  colDoces   .querySelectorAll('.menu-item').forEach(el => el.remove());

  // Filtra e ordena cada tipo
  const salgadas = pizzas
    .filter(p => p.type === 'salgada')
    .sort((a, b) => a.name.localeCompare(b.name, 'pt'));
  const doces = pizzas
    .filter(p => p.type === 'doce')
    .sort((a, b) => a.name.localeCompare(b.name, 'pt'));

  // Gera e insere o HTML para cada pizza
  for (const p of salgadas) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
      <h3>${p.name}<span class="price">${p.price}</span></h3>
      <p>${p.desc}</p>
    `;
    colSalgadas.appendChild(div);
  }
  for (const p of doces) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
      <h3>${p.name}<span class="price">${p.price}</span></h3>
      <p>${p.desc}</p>
    `;
    colDoces.appendChild(div);
  }
}

// Modifique o evento DOMContentLoaded para incluir a carga de conteúdo específico
document.addEventListener('DOMContentLoaded', () => {
  carregarConteudoEspecifico(); // Carregar conteúdo específico para a página atual
  
  if (getCurrentPage() === 'cardapio') {
    renderCardapio();
  }

  debugButton.addEventListener('click', () => {
    carregarConteudoEspecifico();
    if (getCurrentPage() === 'cardapio') renderCardapio();
    corrigirVisibilidadeConteudo();
  });
  document.body.appendChild(debugButton);
}); 