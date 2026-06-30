// ============================================
// DATOS: Arreglo de experiencias
// ============================================
// Este arreglo contiene al menos 6 objetos con información de cada experiencia
const experiencias = [
  {
    id: 1,
    nombre: "Capillas de Mármol",
    categoria: "Navegación",
    lugar: "Puerto Río Tranquilo",
    precio: 35000,
    cuposDisponibles: 8,
    descripcion: "Navegación por el Lago General Carrera hacia las espectaculares Capillas de Mármol. Experiencia única de la Patagonia.",
    icono: "⛵"
  },
  {
    id: 2,
    nombre: "Trekking Cerro Castillo",
    categoria: "Trekking",
    lugar: "Villa Santa Lucía",
    precio: 25000,
    cuposDisponibles: 12,
    descripcion: "Ascenso al Cerro Castillo con vistas panorámicas de la Carretera Austral y sus alrededores montañosos.",
    icono: "🥾"
  },
  {
    id: 3,
    nombre: "Laguna San Rafael",
    categoria: "Navegación",
    lugar: "Puerto Aysén",
    precio: 45000,
    cuposDisponibles: 6,
    descripcion: "Navegación hacia el Glaciar San Rafael, uno de los espectáculos naturales más impresionantes de Chile.",
    icono: "🚤"
  },
  {
    id: 4,
    nombre: "Pesca con Mosca",
    categoria: "Pesca",
    lugar: "Río Mañihuales",
    precio: 30000,
    cuposDisponibles: 10,
    descripcion: "Pesca deportiva con mosca en ríos cristalinos de la Patagonia. Apto para principiantes y expertos.",
    icono: "🎣"
  },
  {
    id: 5,
    nombre: "Kayak en Fiordos",
    categoria: "Navegación",
    lugar: "Fiordo Aysén",
    precio: 28000,
    cuposDisponibles: 15,
    descripcion: "Navegación en kayak por los fiordos patagónicos. Avistamiento de fauna marina y paisajes vírgenes.",
    icono: "🛶"
  },
  {
    id: 6,
    nombre: "Patrimonio Cultural",
    categoria: "Cultura",
    lugar: "Coyhaique",
    precio: 15000,
    cuposDisponibles: 20,
    descripcion: "Recorrido por museos y sitios históricos de la región. Conoce la historia de los primeros pobladores.",
    icono: "🏛️"
  }
];

// ============================================
// FUNCIÓN: Renderizar tarjetas dinámicamente
// ============================================
// Esta función recorre el arreglo experiencias y crea una tarjeta HTML por cada una
function renderExperiencias(lista) {
  // Obtiene el contenedor donde se mostrarán las tarjetas
  const contenedor = document.getElementById("contenedor-experiencias");
  
  // Limpia el contenedor (elimina tarjetas anteriores)
  contenedor.innerHTML = "";
  
  // Recorre cada experiencia del arreglo
  lista.forEach(exp => {
    // Crea el elemento tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    
    // Genera el HTML de la tarjeta con los datos del objeto experiencia
    tarjeta.innerHTML = `
      <div class="tarjeta-header">
        <span class="tarjeta-icono">${exp.icono}</span>
        <h3 class="tarjeta-nombre">${exp.nombre}</h3>
      </div>
      <div class="tarjeta-body">
        <div class="tarjeta-info"><strong>Categoría:</strong> ${exp.categoria}</div>
        <div class="tarjeta-info"><strong>Lugar:</strong> ${exp.lugar}</div>
        <div class="tarjeta-info"><strong>Precio:</strong> $${exp.precio.toLocaleString()}</div>
        <div class="tarjeta-info"><strong>Cupos:</strong> ${exp.cuposDisponibles}</div>
        <div class="tarjeta-descripcion">
          <p>${exp.descripcion}</p>
        </div>
        <button class="boton-detalles" data-id="${exp.id}">Ver más</button>
      </div>
    `;
    
    // Añade la tarjeta al contenedor
    contenedor.appendChild(tarjeta);
  });
  
  // Añade eventos a los botones "Ver más/menos"
  agregarEventosBotones();
}

// ============================================
// FUNCIÓN: Agregar eventos a botones
// ============================================
// Esta función añade el evento click a todos los botones "Ver más/menos"
function agregarEventosBotones() {
  // Selecciona todos los botones de detalles
  const botones = document.querySelectorAll(".boton-detalles");
  
  // Añade evento click a cada botón
  botones.forEach(boton => {
    boton.addEventListener("click", function() {
      // Encuentra la descripción de la tarjeta actual
      const descripcion = this.parentElement.querySelector(".tarjeta-descripcion");
      
      // Alterna la clase "mostrada" para mostrar/ocultar la descripción
      descripcion.classList.toggle("mostrada");
      
      // Cambia el texto del botón
      if (descripcion.classList.contains("mostrada")) {
        this.textContent = "Ver menos";
      } else {
        this.textContent = "Ver más";
      }
    });
  });
}

// ============================================
// FUNCIÓN: Filtrar experiencias por categoría
// ============================================
// Esta función filtra el arreglo de experiencias según la categoría seleccionada
function filtrarPorCategoria(categoria) {
  // Si la categoría es "Todos", retorna todo el arreglo
  if (categoria === "Todos") {
    return experiencias;
  }
  
  // Si no, retorna solo las experiencias que coinciden con la categoría
  return experiencias.filter(exp => exp.categoria === categoria);
}

// ============================================
// FUNCIÓN: Validar formato de email
// ============================================
// Verifica si el email tiene un formato válido usando expresión regular
function validarEmail(email) {
  // Expresión regular para validar email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ============================================
// FUNCIÓN: Mostrar mensaje de error
// ============================================
// Inserta un mensaje de error junto al campo del formulario
function mostrarError(idCampo, mensaje) {
  // Obtiene el elemento de error correspondiente
  const elementoError = document.getElementById("error-" + idCampo);
  
  // Asigna el mensaje de error usando textContent (seguro, no permite inyección de HTML)
  elementoError.textContent = mensaje;
}

// ============================================
// FUNCIÓN: Limpiar errores
// ============================================
// Limpia todos los mensajes de error del formulario
function limpiarErrores() {
  // Selecciona todos los elementos con clase "error"
  const errores = document.querySelectorAll(".error");
  
  // Limpia el contenido de cada error
  errores.forEach(error => {
    error.textContent = "";
  });
}

// ============================================
// FUNCIÓN: Validar formulario
// ============================================
// Valida todos los campos del formulario antes de permitir la reserva
function validarFormulario(evento) {
  // Previene el envío automático del formulario
  evento.preventDefault();
  
  // Limpia errores previos
  limpiarErrores();
  
  // Obtiene los valores de los campos del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const experienciaId = document.getElementById("experiencia").value;
  const personas = parseInt(document.getElementById("personas").value);
  const fecha = document.getElementById("fecha").value;
  
  // Variable para controlar si hay errores
  let hayErrores = false;
  
  // Valida que el nombre no esté vacío
  if (nombre === "") {
    mostrarError("nombre", "El nombre es obligatorio");
    hayErrores = true;
  }
  
  // Valida que el email no esté vacío
  if (email === "") {
    mostrarError("email", "El email es obligatorio");
    hayErrores = true;
  }
  // Valida que el email tenga formato correcto
  else if (!validarEmail(email)) {
    mostrarError("email", "El email no es válido");
    hayErrores = true;
  }
  
  // Valida que se haya seleccionado una experiencia
  if (experienciaId === "") {
    mostrarError("experiencia", "Debes seleccionar una experiencia");
    hayErrores = true;
  }
  
  // Valida que el número de personas sea mayor a 0
  if (personas <= 0) {
    mostrarError("personas", "Debe haber al menos 1 persona");
    hayErrores = true;
  }
  
  // Obtiene la experiencia seleccionada para validar cupos
  const experienciaSeleccionada = experiencias.find(exp => exp.id === parseInt(experienciaId));
  
  // Valida que haya cupos disponibles
  if (experienciaSeleccionada && personas > experienciaSeleccionada.cuposDisponibles) {
    mostrarError("personas", `Solo hay ${experienciaSeleccionada.cuposDisponibles} cupos disponibles`);
    hayErrores = true;
  }
  
  // Valida que la fecha no esté vacía
  if (fecha === "") {
    mostrarError("fecha", "La fecha es obligatoria");
    hayErrores = true;
  }
  
  // Si no hay errores, procesa la reserva
  if (!hayErrores) {
    procesarReserva(experienciaSeleccionada, personas);
  }
}

// ============================================
// FUNCIÓN: Procesar reserva
// ============================================
// Descuenta los cupos y muestra el mensaje de éxito
function procesarReserva(experiencia, personas) {
  // Descuenta los cupos de la experiencia
  experiencia.cuposDisponibles -= personas;
  
  // Oculta el formulario y muestra el mensaje de éxito
  document.getElementById("formulario").style.display = "none";
  document.getElementById("mensaje-exito").style.display = "block";
  
  // Vuelve a renderizar las tarjetas para actualizar los cupos
  renderExperiencias(experiencias);
  
  // Después de 3 segundos, limpia el formulario y lo vuelve a mostrar
  setTimeout(() => {
    document.getElementById("formulario").reset();
    document.getElementById("formulario").style.display = "block";
    document.getElementById("mensaje-exito").style.display = "none";
  }, 3000);
}

// ============================================
// FUNCIÓN: Cargar opciones en el select
// ============================================
// Llena el select de experiencias con las opciones del arreglo
function cargarOpcionesSelect() {
  // Obtiene el elemento select
  const select = document.getElementById("experiencia");
  
  // Recorre cada experiencia
  experiencias.forEach(exp => {
    // Crea una opción
    const option = document.createElement("option");
    
    // Asigna el valor (id) y el texto (nombre)
    option.value = exp.id;
    option.textContent = exp.nombre;
    
    // Añade la opción al select
    select.appendChild(option);
  });
}

// ============================================
// INICIALIZACIÓN: Ejecuta al cargar la página
// ============================================
// Cuando la página carga, ejecuta estas funciones
document.addEventListener("DOMContentLoaded", function() {
  // Renderiza las tarjetas inicialmente
  renderExperiencias(experiencias);
  
  // Carga las opciones del select
  cargarOpcionesSelect();
  
  // Añade evento click a los botones de filtro
  const botonesFiltro = document.querySelectorAll(".boton-filtro");
  botonesFiltro.forEach(boton => {
    boton.addEventListener("click", function() {
      // Obtiene la categoría del botón
      const categoria = this.getAttribute("data-categoria");
      
      // Remueve la clase "activo" de todos los botones
      botonesFiltro.forEach(btn => btn.classList.remove("activo"));
      
      // Añade la clase "activo" al botón clickeado
      this.classList.add("activo");
      
      // Filtra las experiencias por categoría y las renderiza
      const experienciasFiltradas = filtrarPorCategoria(categoria);
      renderExperiencias(experienciasFiltradas);
    });
  });
  
  // Añade evento submit al formulario
  const formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", validarFormulario);
});
