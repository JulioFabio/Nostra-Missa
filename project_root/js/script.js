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
  { category:'salgada', title:'ABOBRINHA', desc:'Molho tomates frescos, muçarela, abobrinha em rodelas temperadas, parmesão, mais molho de tomate, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'ALCATRA (CHARMOSA)', desc:'Molho de tomates frescos, muçarela, Alcatra, gorgonzola, cebola roxa marinada no balsâmico e mel, orégano e azeitonas', price:'R$ 87,90' },
  { category:'salgada', title:'ALHO PORÓ', desc:'Molho tomates frescos, muçarela, cream cheese, alho poró puxado na manteiga e vinho branco, azeitonas', price:'R$ 84,90' },
  { category:'salgada', title:'ALICHE', desc:'Molho tomates frescos, muçarela, aliche, azeitonas', price:'R$ 84,90' },
  { category:'salgada', title:'AMERICANA', desc:'Molho tomates frescos, muçarela, calabresa, bacon, cebola, molho barbecue, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'AMOROSA', desc:'Molho de tomates frescos, muçarela, peito de peru, cream cheese, geleia de amora, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'ATUM', desc:'Molho tomate, muçarela, atum em pedaços, rodelas de tomate, cebola, azeitonas', price:'R$ 87,90' },
  { category:'salgada', title:'ATUM DO CHEF', desc:'Molho tomates frescos, muçarela, atum em pedaços, brócolis, rodelas de tomate, cebola, azeitonas', price:'R$ 89,90' },
  { category:'salgada', title:'ATUM HOLL', desc:'Molho tomates frescos, muçarela, atum em pedaços, cream cheese, molho tare, cheiro verde, azeitonas', price:'R$ 87,90' },
  { category:'salgada', title:'À MODA DA CASA', desc:'Molho tomates frescos, muçarela, calabresa, lombinho defumado, milho, bacon, rodelas de tomate, requeijão cremoso, azeitonas', price:'R$ 84,90' },
  { category:'salgada', title:'BACALHAU', desc:'Molho tomates frescos, muçarela, bacalhau em lascas, ovo, tomates frescos, cebola, pimentão, azeitonas', price:'R$ 89,90' },
  { category:'salgada', title:'BAIANA ESPECIAL', desc:'Molho tomates frescos, muçarela, calabresa, pimenta, tomate seco, creme de espinafre, rodelas de tomate, manjericão, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'BOLONHESA', desc:'Molho tomates frescos, muçarela, calabresa, bacon, palmito, requeijão, azeitonas', price:'R$ 82,90' },
  { category:'salgada', title:'BRÓCOLIS COM REQU', desc:'Molho tomates frescos, muçarela, brócolis, requeijão cremoso, azeitonas', price:'R$ 78,90' },
  { category:'salgada', title:'BRÓCOLIS DO CHEF', desc:'Molho tomates frescos, muçarela, brócolis, palmito, tomate seco, creme de espinafre, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'CALABRESA', desc:'Molho tomates frescos, muçarela, calabresa, cebola, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'CALABRIA', desc:'Molho tomates frescos, muçarela, calabresa, tomates selecionados, requeijão, cebola selecionada fatiada, pimenta, azeitonas', price:'R$ 82,90' },
  { category:'salgada', title:'CALIFÓRINA', desc:'Molho tomates frescos, muçarela, lombinho, pêssego, abacaxi, figo, ameixa e cereja', price:'R$ 86,90' },
  { category:'salgada', title:'CAMARÃO', desc:'Molho tomates frescos, muçarela, camarão ao molho de tomate fresco, requeijão, azeitonas', price:'R$ 108,90' },
  { category:'salgada', title:'CAPRESE', desc:'Molho tomates frescos, muçarela, rodelas de tomates selecionados, pesto de azeitonas pretas, muçarela de búfala, manjericão fresco, azeitonas', price:'R$ 82,90' },
  { category:'salgada', title:'CARIJÓ', desc:'Molho tomates frescos, muçarela, frango, milho, requeijão, ovo, bacon, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'CINCO QUEIJOS', desc:'Molho tomates frescos, muçarela, parmesão, gorgonzola, requeijão, cheddar, azeitonas', price:'R$ 83,90' },
  { category:'salgada', title:'DIVINA', desc:'Molho de tomates frescos, muçarela, pepperoni, pimentão amarelo e vermelho, champignon, cebolas, orégano e azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'DOG (CACHORRO QUENTE)', desc:'Molho tomates frescos, muçarela, molho de tomate com salsichas, requeijão, milho, batata palha, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'DORITOS', desc:'Molho tomates frescos, muçarela, bacon, cheddar, doritos, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'ESCAROLA', desc:'Molho tomates frescos, muçarela, escarola, bacon, tomate, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'ESPECIAL DO CLIENTE (06 INGREDIENTES)', desc:'Escolha até 6 ingredientes: Muçarela, calabresa, lombinho, peito de peru, pepperoni, bacon, parmesão, gorgonzola, requeijão, cheddar, cream cheese, palmito, tomate, cebola, milho, ervilha, ovo, brócolis, pimenta, tomate seco, champignon, frango', price:'R$ 89,90' },
  { category:'salgada', title:'ESTROGONOFE DE CARNE', desc:'Molho tomates frescos, muçarela, estrogonofe de carne com champignon, requeijão cremoso, azeitonas', price:'R$ 87,90' },
  { category:'salgada', title:'ESTROGONOFE DE FRANGO', desc:'Molho tomates frescos, muçarela, estrogonofe de frango com champignon, requeijão cremoso, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'FIGO COM 3 QUEIJOS', desc:'Molho tomates frescos, muçarela, gorgonzola, requeijão cremoso e figo caramelizado', price:'R$ 76,90' },
  { category:'salgada', title:'FILÉ MIGNON', desc:'Molho tomates frescos, muçarela, Filé mignon em cubos, gotas de requeijão, azeitonas', price:'R$ 118,90' },
  { category:'salgada', title:'FIORENTINI', desc:'Molho tomates frescos, muçarela, peito de peru defumado, milho, requeijão cremoso, parmesão, azeitonas', price:'R$ 83,90' },
  { category:'salgada', title:'FRANGO COM REQUEIJÃO', desc:'Molho tomates frescos, muçarela, frango desfiado, requeijão cremoso, azeitonas', price:'R$ 77,90' },
  { category:'salgada', title:'HOT HOLL (SALMÃO)', desc:'Molho tomates frescos, muçarela, salmão, cream cheese, cebolinha, molho tare, azeitonas', price:'R$ 108,90' },
  { category:'salgada', title:'IMPERIAL', desc:'Molho tomates frescos, muçarela, cream cheese, geleia de pimenta, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'INGLESA', desc:'Molho tomates frescos, muçarela, lombinho defumado, ovo, cebola, requeijão, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'ITALIANA', desc:'Molho tomates frescos, muçarela, molho carne moída, palmito, requeijão, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'LIGHT ESPECIAL', desc:'Molho tomates frescos, queijo branco, peito de peru, brócolis, rodelas de tomate, azeitonas', price:'R$ 77,90' },
  { category:'salgada', title:'LINGUIÇA ARTESANAL', desc:'Molho de tomates frescos, muçarela, linguiça artesanal, requeijão, pimentão, pimenta biquinho, queijo coalho, cheiro verde, orégano e azeitonas', price:'R$ 91,90' },
  { category:'salgada', title:'LOMBINHO COM REQU', desc:'Molho tomates frescos, muçarela, lombinho canadense, requeijão cremoso, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'LOMBINHO DO CHEF', desc:'Molho tomates frescos, muçarela, lombinho canadense, tomate seco, bacon, requeijão cremoso, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'MARGUERITA', desc:'Molho tomates frescos, muçarela, manjericão fresco, e mais molho de tomates, azeitonas', price:'R$ 69,90' },
  { category:'salgada', title:'MILHO', desc:'Molho tomates frescos, muçarela, milho, requeijão, bacon, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'MUÇARELA', desc:'Molho tomates frescos, muçarela, rodelas de tomate, azeitonas', price:'R$ 63,90' },
  { category:'salgada', title:'NAPOLITANA', desc:'Molho tomates frescos, muçarela, parmesão, rodelas de tomate, manjericão fresco, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'NORDESTINA COM REQU', desc:'Molho tomates frescos, muçarela, carne seca desfiada, rodelas de tomates frescos, cebola, requeijão, azeitonas', price:'R$ 94,90' },
  { category:'salgada', title:'PALMITO', desc:'Molho tomates frescos, muçarela, palmito, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'PALMITO DO CHEF', desc:'Molho tomates frescos, palmito, champignon, tomate seco, bacon, requeijão cremoso, azeitonas', price:'R$ 83,90' },
  { category:'salgada', title:'PÃO DE ALHO', desc:'Muçarela, creme de alho temperado, requeijão, bacon, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'PAULISTA', desc:'Molho tomates frescos, muçarela, presunto picado, ervilha, palmito, bacon, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'PEITO PERU', desc:'Molho tomates frescos, muçarela, peito de peru picado, alho poró temperado, cream cheese, azeitonas', price:'R$ 85,90' },
  { category:'salgada', title:'PEPPERONI', desc:'Molho tomates frescos, muçarela, pepperoni, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'PIZZAIOLO', desc:'Molho tomates frescos, muçarela, pepperoni, palmito, tomate seco, bacon, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'PORTUGUESA', desc:'Molho tomates frescos, muçarela, presunto, palmito, ervilha, ovo, cebola, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'PRECIOSA', desc:'Molho tomates frescos, muçarela, pepperoni, cream cheese, gorgonzola, tomate cereja, manjericão, azeitonas', price:'R$ 88,90' },
  { category:'salgada', title:'PRESUNTO E MUÇARELA', desc:'Molho tomates frescos, muçarela, presunto, tomates, azeitonas', price:'R$ 78,90' },
  { category:'salgada', title:'PRESUNTO PARMA', desc:'Molho tomates frescos, muçarela, rúcula, tomate cereja, presunto parma, parmesão, azeitonas', price:'R$ 89,90' },
  { category:'salgada', title:'PRIMAVERA', desc:'Molho tomates frescos, muçarela, palmito, brócolis, manjericão fresco, rodelas de tomate, requeijão cremoso, azeitonas', price:'R$ 78,90' },
  { category:'salgada', title:'QUATRO QUEIJOS', desc:'Molho tomates frescos, muçarela, parmesão, gorgonzola, requeijão cremoso, azeitonas', price:'R$ 81,80' },
  { category:'salgada', title:'ROMANA', desc:'Molho tomates frescos, muçarela, lombinho canadense, champignon, rodelas tomates, manjericão, requeijão cremoso, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'RÚCULA DO CHEF', desc:'Molho tomates frescos, muçarela, rúcula, molho a base de mostarda, acceto balsâmico, mel, tomate seco, creme de queijo branco, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'SHIMEJI', desc:'Molho tomates frescos, muçarela, shimeji na manteiga, cream cheese, cebolinha', price:'R$ 86,90' },
  { category:'salgada', title:'SUPREMA', desc:'Molho tomates frescos, muçarela, carne bovina em cubos, pepperoni, champignon, pimentão, azeitonas', price:'R$ 89,90' },

  // — DOCES —
  { category:'doce', title:'ABACAXI C/ CHOC BRANCO', desc:'Massa fina, abacaxi, chocolate branco, leite condensado e coco', price:'R$ 74,90' },
  { category:'doce', title:'BANANA C/ CHOC BRANCO', desc:'Massa fina, banana, chocolate branco e canela', price:'R$ 74,90' },
  { category:'doce', title:'BOMBOM DE KITKAT', desc:'Massa fina, brigadeiro artesanal, creme de leite ninho, Kit Kat, morango', price:'R$ 74,90' },
  { category:'doce', title:'BOMBOM DE UVA', desc:'Massa fina, brigadeiro artesanal, creme de leite ninho, uva', price:'R$ 74,90' },
  { category:'doce', title:'BRIGADEIRO', desc:'Massa fina, Brigadeiro artesanal e chocolate granulado', price:'R$ 74,90' },
  { category:'doce', title:'CASADINHO', desc:'Massa fina, chocolate ao leite com chocolate branco', price:'R$ 74,90' },
  { category:'doce', title:'CHOCOLATE BRANCO', desc:'Massa fina, chocolate branco', price:'R$ 74,90' },
  { category:'doce', title:'NUTELLA C/ MORANGO', desc:'Massa fina, Nutella, creme de leite e morango', price:'R$ 77,90' },
  { category:'doce', title:'PAÇOQUINHA NOVIDADE', desc:'Massa fina, chocolate ao leite, paçoquinha', price:'R$ 70,90' },
  { category:'doce', title:'PISTACHE', desc:'Massa fina, Ganache de pistache e amêndoas de pistache', price:'R$ 85,90' },
  { category:'doce', title:'PRESTÍGIO', desc:'Massa fina, Brigadeiro artesanal com doce de coco', price:'R$ 74,90' },
  { category:'doce', title:'ROMEU E JULIETA', desc:'Massa fina, muçarela, goiabada cremosa', price:'R$ 73,90' },

  // — FONDUE —
  { category: 'fondue', title: 'FONDUE - chocolate', desc: '5 acompanhamentos disponíveis no dia', price: 'R$ 39,90' },

  // — CALDOS —
  { category:'caldo', title:'Cabotia c/ carne seca', desc:'Caldo de cabotia com carne seca desfiada', price:'R$ 26,90' },
  { category:'caldo', title:'Feijão', desc:'Caldo de feijão, calabresa e bacon', price:'R$ 26,90' },
  { category:'caldo', title:'Legumes', desc:'Cabotia, cenoura, mandioquinha, chuchu, mandioca e abobrinha', price:'R$ 26,90' },
  { category:'caldo', title:'Mandioca com bacon', desc:'Caldo de mandioca com bacon', price:'R$ 26,90' },

  // — SALADAS —
  { category:'salada', title:'Completa', desc:'Rúcula, alface, tomate, cebola, ervilha, muçarela, ovo, palmito, azeitonas', price:'R$ 29,90' },

  // — MASSAS —
  { category:'massa', title:'Lasanha 4 Queijos', desc:'Molho branco', price:'R$ 29,90' },
  { category:'massa', title:'Lasanha Presunto e Muçarela', desc:'Molho bolonhesa ou ao sugo. Escolher em adicionais', price:'R$ 29,90' },
  { category:'massa', title:'Mac & Cheese', desc:'Massa caracolina com creme de cheddar finalizado com bacon e farofa panko temperada', price:'R$ 34,90' },
  { category:'massa', title:'Nhoque c/ Muçarela', desc:'Recheado com muçarela. Escolher 1 molho em adicionais', price:'R$ 29,90' },
  { category:'massa', title:'Rondeli Presunto e Muçarela', desc:'Presunto e muçarela. Escolher 1 molho em adicionais', price:'R$ 29,90' },

  // — MASSAS – TALHARIM —
  { category:'talharim', title:'Talharim ao Molho Bolonhesa', desc:'Talharim ao molho bolonhesa, queijo parmesão', price:'R$ 29,90' },
  { category:'talharim', title:'Talharim ao Molho Branco', desc:'Talharim ao molho branco, queijo parmesão', price:'R$ 29,90' },
  { category:'talharim', title:'Talharim ao Molho Camarão', desc:'Talharim ao molho branco com camarões, queijo parmesão', price:'R$ 39,90' },
  { category:'talharim', title:'Talharim ao Molho Sugo', desc:'Talharim ao molho sugo, queijo parmesão', price:'R$ 29,90' },
  { category:'talharim', title:'Talharim c/ Brócolis e Bacon', desc:'Talharim ao molho branco, brócolis e bacon, queijo parmesão', price:'R$ 29,90' },

  // — PORÇÕES —
  { category:'porcao', title:'Batata Frita Completa', desc:'Muçarela, bacon, cheddar, requeijão', price:'R$ 34,90' },
  { category:'porcao', title:'Calabresa Acebolada', desc:'', price:'R$ 34,90' },
  { category:'porcao', title:'Estrogonofe de Carne', desc:'Acompanhamento: arroz, batata palha e salada (porção para 2 pessoas)', price:'R$ 54,90' },
  { category:'porcao', title:'Estrogonofe de Frango', desc:'Acompanhamento: arroz, batata palha e salada (porção para 2 pessoas)', price:'R$ 47,90' },
  { category:'porcao', title:'Frango no Varal', desc:'Porção de frango no varal acompanhado de fritas', price:'R$ 34,90' },

  // — BEBIDAS – ÁGUAS E REFRIGERANTES —
  { category:'bebida-agua', title:'Água c/ gás 500ml', desc:'', price:'R$ 4,00' },
  { category:'bebida-agua', title:'Água sem gás 500ml', desc:'', price:'R$ 3,50' },
  { category:'bebida-agua', title:'Coca-Cola 2 litros', desc:'', price:'R$ 13,50' },
  { category:'bebida-agua', title:'Coca-Cola 600ml', desc:'', price:'R$ 8,90' },
  { category:'bebida-agua', title:'Coca-Cola Lata', desc:'', price:'R$ 6,50' },
  { category:'bebida-agua', title:'Coca-Cola Zero 600ml', desc:'', price:'R$ 8,90' },
  { category:'bebida-agua', title:'Coca-Cola Zero Lata', desc:'', price:'R$ 6,50' },
  { category:'bebida-agua', title:'Fanta laranja 2 litros', desc:'', price:'R$ 13,50' },
  { category:'bebida-agua', title:'Fanta laranja Lata', desc:'', price:'R$ 6,50' },
  { category:'bebida-agua', title:'Fanta uva Lata', desc:'', price:'R$ 6,50' },
  { category:'bebida-agua', title:'Guaraná Antarctica 2 litros', desc:'', price:'R$ 13,50' },
  { category:'bebida-agua', title:'Guaraná Antarctica 600ml', desc:'', price:'R$ 8,90' },
  { category:'bebida-agua', title:'Guaraná Zero 2 litros', desc:'', price:'R$ 13,50' },
  { category:'bebida-agua', title:'H2O Limoneto 500ml', desc:'', price:'R$ 7,90' },
  { category:'bebida-agua', title:'Sprite 2 litros', desc:'', price:'R$ 13,50' },
  { category:'bebida-agua', title:'Sprite Lata', desc:'', price:'R$ 6,50' },

  // — BEBIDAS – SUCOS NATURAIS —
  { category:'bebida-suco', title:'Del Valle Goiaba Lata', desc:'', price:'R$ 6,90' },
  { category:'bebida-suco', title:'Del Valle Manga Lata', desc:'', price:'R$ 6,90' },
  { category:'bebida-suco', title:'Del Valle Pêssego Lata', desc:'', price:'R$ 6,90' },
  { category:'bebida-suco', title:'Del Valle Uva Lata', desc:'', price:'R$ 6,90' },
  { category:'bebida-suco', title:'Suco Natural Abacaxi (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Abacaxi c/ Ameixa (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Abacaxi c/ Hortelã (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Natural Laranja (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Laranja c/ Morango (350ml)', desc:'', price:'R$ 15,90' },
  { category:'bebida-suco', title:'Suco Natural Limão (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Natural Maracujá (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Natural Morango (350ml)', desc:'', price:'R$ 11,90' },

  // — BEBIDAS – CERVEJAS —
  { category:'bebida-cerveja', title:'Amstel (Puro Malte) Lata 350ml', desc:'', price:'R$ 6,90' },
  { category:'bebida-cerveja', title:'Antarctica Lata 350ml', desc:'', price:'R$ 6,90' },
  { category:'bebida-cerveja', title:'Brahma Lata 350ml', desc:'', price:'R$ 6,90' },
  { category:'bebida-cerveja', title:'Corona Extra Long Neck 330ml', desc:'', price:'R$ 12,90' },
  { category:'bebida-cerveja', title:'Heineken (Puro Malte) Long Neck 330ml', desc:'', price:'R$ 11,90' },
  { category:'bebida-cerveja', title:'Heineken Zero Long Neck 330ml', desc:'', price:'R$ 11,90' },
  { category:'bebida-cerveja', title:'Skol Lata 350ml', desc:'', price:'R$ 6,90' },
  { category:'bebida-cerveja', title:'Spaten Long Neck 330ml', desc:'', price:'R$ 10,90' },
  { category:'bebida-cerveja', title:'Stella Artois Long Neck 330ml', desc:'', price:'R$ 11,90' },

  // — BEBIDAS – VINHOS —
  { category:'bebida-vinho', title:'Vinho Girola Branco Seco 750ml', desc:'', price:'R$ 32,50' },
  { category:'bebida-vinho', title:'Vinho Girola Branco Suave 750ml', desc:'', price:'R$ 32,50' },
  { category:'bebida-vinho', title:'Vinho Girola Rosé Suave 750ml', desc:'', price:'R$ 32,50' },
  { category:'bebida-vinho', title:'Vinho Girola Tinto Seco 750ml', desc:'', price:'R$ 32,50' },
  { category:'bebida-vinho', title:'Vinho Girola Tinto Suave 750ml', desc:'', price:'R$ 32,50' }
];

// Função que renderiza todo o cardápio
function renderCardapio() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = '';

  // 1) Colunas de Pizzas
  const wrapper = document.createElement('div');
  wrapper.className = 'menu-columns';
  ['salgada','doce'].forEach(tipo => {
    const col = document.createElement('div');
    col.className = `menu-column ${tipo}`;
    col.innerHTML = `<h2 class="headline-central">${tipo === 'salgada' ? 'Pizzas Salgadas' : 'Pizzas Doces'}</h2>`;

    pizzas
      .filter(item => item.category === tipo)
      .sort((a, b) => a.title.localeCompare(b.title, 'pt'))
      .forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
          <h3>${item.title}<span class="price">${item.price}</span></h3>
          <p>${item.desc}</p>
        `;
        col.appendChild(div);
      });
    wrapper.appendChild(col);
  });
  panel.appendChild(wrapper);

  // Seções adicionais para outras categorias, como Fondue, Caldos, etc
  const sections = [
    { key: 'fondue', title: 'Fondue' },
    { key: 'caldo', title: 'Caldos' },
    { key: 'salada', title: 'Saladas' },
    { key: 'massa', title: 'Massas' },
    { key: 'talharim', title: 'Massas – Talharim' },
    { key: 'porcao', title: 'Porções' },
    { key: 'bebida-agua', title: 'Bebidas – Águas/Refri' },
    { key: 'bebida-suco', title: 'Bebidas – Sucos' },
    { key: 'bebida-cerveja', title: 'Bebidas – Cervejas' },
    { key: 'bebida-vinho', title: 'Bebidas – Vinhos' }
  ];

  sections.forEach(sec => {
    const itens = pizzas.filter(i => i.category === sec.key);
    if (!itens.length) return;

    // Linha na Seção de Fondue
    if (sec.key === 'fondue') {
      const hr = document.createElement('hr');
      hr.style.border = 'none';
      hr.style.height = '2px';
      hr.style.backgroundColor = '#e63946';
      hr.style.opacity = '0.5';
      hr.style.margin = '30px';
      panel.appendChild(hr);
    }

    // título da seção
    const H2 = document.createElement('h2');
    H2.className = 'headline-central';
    H2.textContent = sec.title;
    panel.appendChild(H2);
    // itens
    itens.forEach(item => {
      const div = document.createElement('div');
      div.className = 'menu-item';
      div.innerHTML = `
        <h3>${item.title}<span class="price">${item.price}</span></h3>
        <p>${item.desc}</p>
      `;
      panel.appendChild(div);
    });
  });
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