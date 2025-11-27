// Centralized product data exposed as window.products
(function(){
  const list = {
    "1": { id: "1", title: "Kit Escritório Premium", img: "img001.jpeg", category: "Kits Essenciais", price: "R$ 299,90", description: "Um kit completo com itens essenciais de alta qualidade para o seu dia a dia no escritório.", features: ["Canetas esferográficas de ponta fina", "Caderno capa dura A5", "Bloco de notas adesivas"] },
    "2": { id: "2", title: "Mouse Ergonômico Bluetooth", img: "mouse.jpg", category: "Tecnologia Essencial", price: "R$ 149,90", description: "Mouse confortável com conexão Bluetooth.", features: ["Conexão Bluetooth", "Design ergonômico"] },
    "3": { id: "3", title: "Caderno Capa Dura A5", img: "caderno.jpg", category: "Papelaria", price: "R$ 49,90", description: "Caderno resistente para uso diário.", features: ["Capa dura", "100 páginas"] },
    "4": { id: "4", title: "Lapiseira 0.5mm", img: "lapiseira.jpg", category: "Material de Escrita", price: "R$ 29,90", description: "Lapiseira de precisão para desenho e escrita.", features: ["Ponta 0.5mm", "Corpo em alumínio"] },
    "5": { id: "5", title: "Mesa de Trabalho Compacta", img: "mesa.jpg", category: "Móveis", price: "R$ 549,90", description: "Mesa funcional para ambientes compactos.", features: ["Estrutura em MDF", "Design compacto"] },
    "6": { id: "6", title: "Cadeira Ergonômica", img: "cadeira.jpg", category: "Móveis", price: "R$ 899,90", description: "Cadeira confortável com suporte lombar.", features: ["Suporte lombar", "Ajuste de altura"] },
    "7": { id: "7", title: "Monitor Full HD 24\"", img: "monitor.jpg", category: "Hardware", price: "R$ 899,00", description: "Monitor Full HD com boa reprodução de cores e suporte VESA.", features: ["24\" Full HD", "Conector HDMI", "Suporte VESA"] },
    "8": { id: "8", title: "Notebook 14\" - Básico", img: "notebook.jpg", category: "Computadores", price: "R$ 2.199,00", description: "Notebook 14\" para uso diário com bom desempenho em tarefas comuns.", features: ["14\" tela", "SSD 256GB", "8GB RAM"] }
  };

  // attach numeric price for totals using parsePriceBR if available later
  function attachNumericPrices() {
    if(window.parsePriceBR) {
      Object.keys(list).forEach(k => { list[k]._priceNumber = window.parsePriceBR(list[k].price); });
    }
  }

  // expose
  window.products = list;
  // if parsePriceBR already loaded, attach; otherwise wait a tick and try again
  if (window.parsePriceBR) attachNumericPrices(); else setTimeout(attachNumericPrices, 50);
})();
