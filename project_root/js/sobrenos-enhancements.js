// Arquivo: project_root\js\sobrenos-enhancements.js
// Script complementar para melhorar a interatividade da página Sobre Nós

document.addEventListener('DOMContentLoaded', function() {
  // Verifica se estamos na página Sobre Nós
  if (window.location.pathname.includes('sobrenos.html')) {
    console.log('Inicializando melhorias para a página Sobre Nós');
    
    // 1. Melhora o efeito de hover nos itens do sobre nós

    enhanceSobreItems();



    
    // 2. Removido: Não adiciona estatísticas aqui, pois já estão no HTML
    // addEstatisticas(); 
    
    // 3. Adiciona timeline interativa
    addTimeline();
    
    // 4. Inicializa os elementos adicionados
    setTimeout(initElements, 1000);
    
    // 5. Preserva o comportamento original do painel
    preservePanelBehavior();
  }
});

// Função para preservar o comportamento original do painel
function preservePanelBehavior() {
  const bottomPanel = document.getElementById('bottomPanel');
  const panelContent = document.getElementById('panelContent');
  const expandButton = document.getElementById('expandButton');
  
  if (!bottomPanel || !panelContent || !expandButton) return;
  
  // Observa mudanças na classe do painel para detectar quando é fechado
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class') {
        const isPanelOpen = bottomPanel.classList.contains('open');
        
        // Quando o painel é fechado, rola o conteúdo para o topo
        if (!isPanelOpen) {
          setTimeout(() => {
            panelContent.scrollTop = 0;
          }, 300); // Pequeno atraso para permitir que a animação de fechamento termine
        }
      }
    });
  });
  
  // Inicia a observação do painel
  observer.observe(bottomPanel, { attributes: true });
  
  // Também adiciona um ouvinte de eventos ao botão para garantir o comportamento
  expandButton.addEventListener('click', function() {
    const isPanelOpen = bottomPanel.classList.contains('open');
    if (!isPanelOpen) {
      // Se o painel está sendo fechado, rola para o topo
      setTimeout(() => {
        panelContent.scrollTop = 0;
      }, 300);
    }
  });
}

// Função para melhorar os itens existentes
function enhanceSobreItems() {
  const sobreItems = document.querySelectorAll('.sobre-item');
  
  sobreItems.forEach(item => {
    // Adiciona classe para efeitos visuais melhorados
    item.classList.add('enhanced');
    
    // Adiciona ícone de info para expandir detalhes
    const infoIcon = document.createElement('div');
    infoIcon.className = 'info-icon';
    infoIcon.innerHTML = '<i class="fas fa-info-circle"></i>';
    item.appendChild(infoIcon);
    
    // Adiciona evento de clique para mostrar mais informações
    item.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
  });
}

// Função para adicionar estatísticas
function addEstatisticas() {
  // Verifica se a seção de estatísticas já existe
  if (document.querySelector('.estatisticas')) {
    console.log('Seção de estatísticas já existe, pulando criação');
    return;
  }
  
  const sobreNosGrid = document.querySelector('.sobre-nos-grid');
  if (!sobreNosGrid) return;
  
  const estatisticasHTML = `
    <div class="estatisticas-section">
      <h3 class="headline-central">Nostra Massa em Números</h3>
      <div class="estatisticas-container">
        <div class="estatistica-item">
          <div class="estatistica-icon">🍕</div>
          <div class="contador" data-target="15000">0</div>
          <p>Pizzas por Mês</p>
        </div>
        <div class="estatistica-item">
          <div class="estatistica-icon">👨‍🍳</div>
          <div class="contador" data-target="25">0</div>
          <p>Colaboradores</p>
        </div>
        <div class="estatistica-item">
          <div class="estatistica-icon">🌟</div>
          <div class="contador" data-target="35">0</div>
          <p>Sabores</p>
        </div>
        <div class="estatistica-item">
          <div class="estatistica-icon">🏆</div>
          <div class="contador" data-target="9">0</div>
          <p>Anos de História</p>
        </div>
      </div>
    </div>
  `;
  
  sobreNosGrid.insertAdjacentHTML('afterend', estatisticasHTML);
  
  // Adiciona estilos para as estatísticas
  const style = document.createElement('style');
  style.textContent = `
    .estatisticas-section {
      margin-top: 40px;
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
    }
    
    .estatisticas-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      gap: 20px;
      margin-top: 20px;
    }
    
    .estatistica-item {
      text-align: center;
      flex: 1 1 150px;
      padding: 15px;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      transition: transform 0.3s ease, background-color 0.3s ease;
      cursor: pointer;
    }
    
    .estatistica-item:hover {
      transform: translateY(-5px);
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .estatistica-icon {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    
    .contador {
      font-size: 2.5rem;
      font-weight: bold;
      color: #ffdab9;
      margin: 10px 0;
    }
    
    .estatistica-item p {
      font-size: 1rem;
      color: #d8d2d2;
    }
    
    /* Melhorias para os itens existentes */
    .sobre-item.enhanced {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.4s ease;
    }
    
    .sobre-item.enhanced:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7);
    }
    
    .sobre-item.enhanced::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #e63946, #ffba08);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
    }
    
    .sobre-item.enhanced:hover::before {
      transform: scaleX(1);
    }
    
    .info-icon {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 1.2rem;
      transition: transform 0.3s ease, color 0.3s ease;
    }
    
    .sobre-item:hover .info-icon {
      transform: scale(1.2);
      color: #e63946;
    }
    
    .sobre-item.expanded {
      height: auto;
      min-height: 200px;
    }
  `;
  
  document.head.appendChild(style);
}

// Função para adicionar timeline
function addTimeline() {
  const depoimentos = document.querySelector('.depoimentos');
  if (!depoimentos) return;
  
  const timelineHTML = `
    <section class="timeline-section">
      <h2 class="headline-central">Nossa Jornada</h2>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-content">
            <h3>2016</h3>
            <p>Fundação da Nostra Massa em Cravinhos com apenas 3 funcionários e 10 sabores de pizza.</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h3>2018</h3>
            <p>Expansão do cardápio e inauguração da área de eventos para pequenas celebrações.</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h3>2020</h3>
            <p>Adaptação para delivery durante a pandemia e criação de novos sabores exclusivos.</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h3>2022</h3>
            <p>Abertura da segunda unidade e lançamento da linha de massas artesanais para preparo em casa.</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h3>Hoje</h3>
            <p>Continuamos crescendo, mantendo nossa essência e qualidade que nos tornaram referência na região.</p>
          </div>
        </div>
      </div>
    </section>
  `;
  
  depoimentos.insertAdjacentHTML('afterend', timelineHTML);
  
  // Adiciona estilos para a timeline
  const style = document.createElement('style');
  style.textContent = `
    .timeline-section {
      padding: 40px 0;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .timeline {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .timeline::after {
      content: '';
      position: absolute;
      width: 6px;
      background-color: rgba(255, 255, 255, 0.2);
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -3px;
    }
    
    .timeline-item {
      padding: 10px 40px;
      position: relative;
      background-color: inherit;
      width: 50%;
      box-sizing: border-box;
      margin-bottom: 30px;
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.8s ease;
    }
    
    .timeline-item:nth-child(odd) {
      left: 0;
    }
    
    .timeline-item:nth-child(even) {
      left: 50%;
    }
    
    .timeline-item::after {
      content: '';
      position: absolute;
      width: 25px;
      height: 25px;
      right: -17px;
      background-color: #e63946;
      border: 4px solid #ffdab9;
      top: 15px;
      border-radius: 50%;
      z-index: 1;
    }
    
    .timeline-item:nth-child(even)::after {
      left: -16px;
    }
    
    .timeline-content {
      padding: 20px 30px;
      background-color: rgba(255, 255, 255, 0.05);
      position: relative;
      border-radius: 6px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;
    }
    
    .timeline-content:hover {
      transform: translateY(-5px);
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .timeline-content h3 {
      margin-top: 0;
      color: #ffdab9;
      font-size: 1.5rem;
    }
    
    .timeline-content p {
      margin-bottom: 0;
    }
    
    .timeline-item.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    @media screen and (max-width: 768px) {
      .timeline::after {
        left: 31px;
      }
      
      .timeline-item {
        width: 100%;
        padding-left: 70px;
        padding-right: 25px;
      }
      
      .timeline-item:nth-child(odd),
      .timeline-item:nth-child(even) {
        left: 0;
      }
      
      .timeline-item:nth-child(odd)::after,
      .timeline-item:nth-child(even)::after {
        left: 15px;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Função para inicializar os elementos adicionados
function initElements() {
  // Inicializa os contadores
  const counters = document.querySelectorAll('.contador');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100;
    let currentCount = 0;
    
    const updateCounter = () => {
      if (currentCount < target) {
        currentCount += increment;
        counter.textContent = Math.ceil(currentCount);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
  
  // Anima os itens da timeline
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('visible');
    }, 300 * index);
  });
  
  // Adiciona observador de interseção para animar elementos quando visíveis
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  document.querySelectorAll('.fade-in, .timeline-item, .estatistica-item').forEach(item => {
    observer.observe(item);
  });
}