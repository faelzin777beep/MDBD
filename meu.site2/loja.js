
const produtos = [
  { id: 1, nome: "Raquete Profissional", descricao: "Raquete carbono para jogadores avancados.", preco: 350.00 },
  { id: 2, nome: "Mesa Oficial", descricao: "Mesa com medidas oficiais ITTF.", preco: 2800.00 },
  { id: 3, nome: "Bolas 3 Estrelas (6un)", descricao: "Bolas aprovadas para competicoes.", preco: 45.00 },
  { id: 4, nome: "Rede com Suporte", descricao: "Rede oficial com suporte ajustavel.", preco: 120.00 }
];

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderProdutos() {
  const container = document.getElementById('produtos');
  if (!container) return;

  container.innerHTML = produtos.map(p => `
    <div class="produto">
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <p class="preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</p>
      <button class="botao" onclick="adicionarAoCarrinho(${p.id})">
        Adicionar ao Carrinho
      </button>
    </div>
  `).join('');
}

function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  const item = carrinho.find(c => c.id === id);

  if (item) {
    item.qtd++;
  } else {
    carrinho.push({ ...produto, qtd: 1 });
  }

  salvar();
  atualizarContador();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(c => c.id !== id);
  salvar();
  atualizarContador();
  renderCarrinho();
}

function alterarQtd(id, delta) {
  const item = carrinho.find(c => c.id === id);

  if (item) {
    item.qtd += delta;

    if (item.qtd <= 0) {
      removerDoCarrinho(id);
      return;
    }
  }

  salvar();
  atualizarContador();
  renderCarrinho();
}

function salvar() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarContador() {
  const el = document.getElementById('contador');

  if (el) {
    const total = carrinho.reduce((s, c) => s + c.qtd, 0);
    el.textContent = total;
  }
}

function toggleCarrinho() {
  const modal = document.getElementById('carrinho-modal');

  if (modal) {
    modal.classList.toggle('ativo');
    renderCarrinho();
  }
}

function renderCarrinho() {
  const container = document.getElementById('itens-carrinho');
  const totalEl = document.getElementById('total');

  if (!container) return;

  if (carrinho.length === 0) {
    container.innerHTML = '<p>O carrinho esta vazio.</p>';
    if (totalEl) totalEl.textContent = '0,00';
    return;
  }

  container.innerHTML = carrinho.map(c => `
    <div class="item-carrinho">
      <span>${c.nome}</span>
      <div class="qtd-controle">
        <button onclick="alterarQtd(${c.id}, -1)">-</button>
        <span>${c.qtd}</span>
        <button onclick="alterarQtd(${c.id}, 1)">+</button>
      </div>
      <span>R$ ${(c.preco * c.qtd).toFixed(2).replace('.', ',')}</span>
      <button class="remover" onclick="removerDoCarrinho(${c.id})">🗑️</button>
    </div>
  `).join('');

  const total = carrinho.reduce((s, c) => s + c.preco * c.qtd, 0);
  if (totalEl) totalEl.textContent = total.toFixed(2).replace('.', ',');
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho esta vazio!");
    return;
  }

  alert("Compra finalizada com sucesso! Obrigado por comprar na Ping Pong Pro.");
  carrinho = [];
  salvar();
  atualizarContador();
  toggleCarrinho();
}

document.addEventListener('DOMContentLoaded', () => {
  renderProdutos();
  atualizarContador();
});