// ===== WHATSAPP =====
const WHATSAPP_NUM = '573224178831';

// ===== PRODUCTOS =====
const productos = [
  { id:1,  nombre:"Vestido Floral",         categoria:"ropa",         precio:89900,  oferta:true,  icono:"imagen/vestido floral.jpg",        desc:"Hermoso vestido floral ideal para cualquier ocasión. Tela suave y fresca, disponible en varias tallas." },
  { id:2,  nombre:"Camisa Manga Corta",      categoria:"ropa",        precio:45000,  oferta:false, icono:"imagen/Camisa manga corta.jpg",     desc:"Camisa de manga corta fresca y cómoda, perfecta para el día a día. Disponible en varios colores." },
  { id:3,  nombre:"Camisa Manga Larga",      categoria:"ropa",        precio:55000,  oferta:true,  icono:"imagen/Camisa manga larga.jpg",     desc:"Camisa de manga larga elegante, ideal para un look formal o casual. Tela de alta calidad." },
  { id:4,  nombre:"Sofá 3 Puestos",          categoria:"hogar",       precio:890000, oferta:false, icono:"imagen/Sofa 3 puestos.jpg",         desc:"Sofá moderno de 3 puestos tapizado en tela resistente. Estructura en madera sólida, color a elegir." },
  { id:5,  nombre:"Lámpara de Sala",         categoria:"hogar",       precio:120000, oferta:true,  icono:"imagen/Lampara de sala.jpg",        desc:"Lámpara de pie con diseño contemporáneo. Luz cálida regulable, ideal para sala o dormitorio." },
  { id:6,  nombre:"Cojines Decorativos",     categoria:"hogar",       precio:45000,  oferta:false, icono:"imagen/Cogines decorativos.jpg",    desc:"Set de cojines decorativos en diferentes colores y texturas. Relleno en fibra antialérgica." },
  { id:7,  nombre:"Samsung Galaxy A36",      categoria:"electronica", precio:980000, oferta:true,  icono:"imagen/Galaxy A36.jpg",             desc:"Pantalla AMOLED 6.7\", cámara de 50 MP, batería de 5000 mAh y Android 14. Garantía 1 año." },
  { id:8,  nombre:"Audífonos Inalámbricos",  categoria:"electronica", precio:75000,  oferta:false, icono:"imagen/audfonos inhalambricos.jpg", desc:"Audífonos inalámbricos con cancelación de ruido, hasta 30h de batería y sonido envolvente." },
  { id:9,  nombre:"Tablet Lya",              categoria:"electronica", precio:650000, oferta:true,  icono:"imagen/Tablet Lya.jpg",             desc:"Tablet de 10\" con procesador octa-core, 4GB RAM, 64GB almacenamiento y pantalla Full HD." },
  { id:10, nombre:"Balón de Fútbol",         categoria:"deportes",    precio:38000,  oferta:false, icono:"imagen/Balon de futbol.jpg",        desc:"Balón de cuero sintético talla 5, ideal para canchas de grama o sintético. Alta durabilidad." },
  { id:11, nombre:"Guantes de Box",          categoria:"deportes",    precio:55000,  oferta:true,  icono:"imagen/Guantes de box.jpg",         desc:"Guantes de boxeo en cuero sintético reforzado. Disponibles en 10 y 12 onzas. Incluye velcro." },
  { id:12, nombre:"Crema Hidratante",        categoria:"belleza",     precio:28000,  oferta:false, icono:"imagen/Creama hidratante.jpg",      desc:"Crema hidratante de uso diario con vitamina E y aloe vera. Para todo tipo de piel, 250ml." },
  { id:13, nombre:"Set de Maquillaje",       categoria:"belleza",     precio:95000,  oferta:true,  icono:"imagen/Set maquillaje.jpg",         desc:"Kit completo con base, sombras, labial y delineador. Larga duración y acabado profesional." },
];

// ===== CARRITO =====
let carrito = [];

// ===== RENDERIZAR PRODUCTOS =====
function renderizarProductos(lista) {
  const grid = document.getElementById('productosGrid');
  grid.innerHTML = '';

  if (lista.length === 0) {
    grid.innerHTML = '<p style="color:#777;text-align:center;grid-column:1/-1;padding:3rem">No se encontraron productos.</p>';
    return;
  }

  lista.forEach(p => {
    const precioAnterior = p.oferta
      ? `<span class="precio-old">$${Math.round(p.precio * 1.25).toLocaleString()}</span>`
      : '';
    const badge = p.oferta ? `<span class="producto-badge">OFERTA</span>` : '';

    grid.innerHTML += `
      <div class="producto-card" onclick="verProducto(${p.id})">
        <div class="producto-img bg-${p.categoria}">
          <img src="${p.icono}" alt="${p.nombre}" style="width:100%;height:100%;object-fit:cover;">
          ${badge}
        </div>
        <div class="producto-body">
          <h4>${p.nombre}</h4>
          <p class="cat-label">${p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1)}</p>
          <div class="producto-footer">
            <div>
              <span class="precio">$${p.precio.toLocaleString()}</span>
              ${precioAnterior}
            </div>
            <button class="btn-agregar" onclick="event.stopPropagation(); agregarAlCarrito(${p.id})">+ Agregar</button>
          </div>
        </div>
      </div>
    `;
  });
}

// ===== VER DETALLE DE PRODUCTO =====
function verProducto(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;

  document.getElementById('detalle-icono').innerHTML = `<img src="${p.icono}" alt="${p.nombre}" style="width:150px;height:150px;object-fit:cover;border-radius:16px;">`;
  document.getElementById('detalle-nombre').textContent = p.nombre;
  document.getElementById('detalle-categoria').textContent = p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1);
  document.getElementById('detalle-precio').textContent = `$${p.precio.toLocaleString()}`;

  const precioOld = document.getElementById('detalle-precio-old');
  if (p.oferta) {
    precioOld.textContent = `$${Math.round(p.precio * 1.25).toLocaleString()}`;
    precioOld.style.display = 'inline';
  } else {
    precioOld.style.display = 'none';
  }

  document.getElementById('detalle-desc').textContent = p.desc;

  const btnAgregar = document.getElementById('detalle-btn-agregar');
  btnAgregar.onclick = () => {
    agregarAlCarrito(p.id);
    cerrarProducto();
  };

  document.getElementById('modalProducto').style.display = 'block';
  document.getElementById('modalProductoOverlay').style.display = 'block';
}

function cerrarProducto() {
  document.getElementById('modalProducto').style.display = 'none';
  document.getElementById('modalProductoOverlay').style.display = 'none';
}

// ===== FILTROS =====
function aplicarFiltros() {
  let lista = [...productos];

  const precio    = document.getElementById('filtroPrecio').value;
  const categoria = document.getElementById('filtroCategoria').value;
  const orden     = document.getElementById('filtroOrden').value;
  const busqueda  = document.getElementById('searchInput').value.toLowerCase();

  if (categoria !== 'todos') lista = lista.filter(p => p.categoria === categoria);

  if (precio !== 'todos') {
    const [min, max] = precio.split('-').map(Number);
    lista = lista.filter(p => p.precio >= min && p.precio <= max);
  }

  if (busqueda) lista = lista.filter(p => p.nombre.toLowerCase().includes(busqueda));

  if (orden === 'az') lista.sort((a,b) => a.nombre.localeCompare(b.nombre));
  if (orden === 'za') lista.sort((a,b) => b.nombre.localeCompare(a.nombre));
  if (orden === 'menorprecio') lista.sort((a,b) => a.precio - b.precio);
  if (orden === 'mayorprecio') lista.sort((a,b) => b.precio - a.precio);

  const titulo = document.getElementById('tituloSeccion');
  titulo.textContent = categoria !== 'todos'
    ? `Productos de ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`
    : 'Nuestros productos';

  renderizarProductos(lista);
}

function buscar() { aplicarFiltros(); }

function filtrarCategoria(cat, elemento) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('activa'));
  if (elemento) elemento.classList.add('activa');
  document.getElementById('filtroCategoria').value = cat;
  aplicarFiltros();
  document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

// ===== CARRITO =====
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
  abrirCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  actualizarCarrito();
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) eliminarDelCarrito(id);
  else actualizarCarrito();
}

function actualizarCarrito() {
  const count   = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const total   = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const items   = document.getElementById('carritoItems');
  const countEl = document.getElementById('cartCount');

  countEl.textContent = count;

  if (carrito.length === 0) {
    items.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
  } else {
    items.innerHTML = carrito.map(p => `
      <div class="carrito-item">
        <img src="${p.icono}" alt="${p.nombre}" style="width:45px;height:45px;object-fit:cover;border-radius:8px;flex-shrink:0;">
        <div class="item-info">
          <p>${p.nombre}</p>
          <span>$${(p.precio * p.cantidad).toLocaleString()}</span>
        </div>
        <div class="item-controles">
          <button onclick="cambiarCantidad(${p.id}, -1)">−</button>
          <span>${p.cantidad}</span>
          <button onclick="cambiarCantidad(${p.id}, 1)">+</button>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('carritoTotal').textContent = '$' + total.toLocaleString();
}

// ===== FINALIZAR COMPRA POR WHATSAPP =====
function finalizarCompra() {
  if (carrito.length === 0) return;

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  let mensaje = '🛍️ *Hola! Quiero hacer el siguiente pedido:*\n\n';

  carrito.forEach(p => {
    mensaje += `▪️ ${p.nombre} x${p.cantidad} = $${(p.precio * p.cantidad).toLocaleString()}\n`;
  });

  mensaje += `\n💰 *Total: $${total.toLocaleString()}*`;
  mensaje += '\n\n¿Me pueden confirmar disponibilidad y forma de pago? 😊';

  const url = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

function abrirCarrito() {
  document.getElementById('carritoPanel').classList.add('abierto');
  document.getElementById('carritoOverlay').style.display = 'block';
}

function cerrarCarrito() {
  document.getElementById('carritoPanel').classList.remove('abierto');
  document.getElementById('carritoOverlay').style.display = 'none';
}

// ===== LOGIN =====
function abrirLogin() {
  document.getElementById('modalLogin').style.display  = 'block';
  document.getElementById('modalOverlay').style.display = 'block';
}

function cerrarLogin() {
  document.getElementById('modalLogin').style.display  = 'none';
  document.getElementById('modalOverlay').style.display = 'none';
}

function cambiarTab(tab, el) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('formLogin').style.display    = tab === 'login'    ? 'block' : 'none';
  document.getElementById('formRegistro').style.display = tab === 'registro' ? 'block' : 'none';
}

// ===== HEADER SE OCULTA AL HACER SCROLL =====
let ultimoScroll = 0;
const headerEl = document.getElementById('header');

window.addEventListener('scroll', () => {
  const scrollActual = window.pageYOffset;
  if (scrollActual > ultimoScroll && scrollActual > 100) {
    headerEl.style.transform = 'translateY(-100%)';
    headerEl.style.transition = 'transform 0.3s ease';
  } else {
    headerEl.style.transform = 'translateY(0)';
    headerEl.style.transition = 'transform 0.3s ease';
  }
  ultimoScroll = scrollActual;
});

// ===== INICIO =====
renderizarProductos(productos);