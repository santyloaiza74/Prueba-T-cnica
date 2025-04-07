// Referencias a elementos del DOM
const prevBtn = document.querySelector("#prev-btn"); // Botón para ir a la página anterior
const nextBtn = document.querySelector("#next-btn"); // Botón para ir a la página siguiente
const book = document.querySelector("#book"); // Contenedor principal del libro

const paper1 = document.querySelector("#p1"); // Primera página del libro
const paper2 = document.querySelector("#p2"); // Segunda página del libro
const paper3 = document.querySelector("#p3"); // Tercera página del libro

// Listeners de eventos
prevBtn.addEventListener("click", anteriorpag); // Escucha clics en el botón "anterior"
nextBtn.addEventListener("click", siguientepag); // Escucha clics en el botón "siguiente"
document.addEventListener("keydown", teclas); // Escucha teclas presionadas (izquierda/derecha)

// Lógica de negocio
let currentLocation = 1; // Página actual del libro
let numOfPapers = 3; // Número total de páginas
let maxLocation = numOfPapers + 1; // Máxima ubicación (fuera del rango de páginas)

// Función para abrir el libro
function abrirlibro() {
    book.style.transform = "translateX(50%)"; // Mueve el libro al centro
    prevBtn.style.transform = "translateX(-180px)"; // Mueve el botón "anterior" hacia la izquierda
    nextBtn.style.transform = "translateX(180px)"; // Mueve el botón "siguiente" hacia la derecha
}

// Función para cerrar el libro
function cerrarlibro(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)"; // Cierra el libro hacia la izquierda
    } else {
        book.style.transform = "translateX(100%)"; // Cierra el libro hacia la derecha
    }
    prevBtn.style.transform = "translateX(0px)"; // Restaura la posición del botón "anterior"
    nextBtn.style.transform = "translateX(0px)"; // Restaura la posición del botón "siguiente"
}

// Función para pasar a la página siguiente
function siguientepag() {
    if (currentLocation < maxLocation) {
        switch (currentLocation) {
            case 1:
                abrirlibro(); // Abre el libro
                paper1.classList.add("flipped"); // Marca la primera página como volteada
                paper1.style.zIndex = 1; // Ajusta la posición en el eje Z
                break;
            case 2:
                paper2.classList.add("flipped"); // Marca la segunda página como volteada
                paper2.style.zIndex = 2; // Ajusta la posición en el eje Z
                break;
            case 3:
                paper3.classList.add("flipped"); // Marca la tercera página como volteada
                paper3.style.zIndex = 3; // Ajusta la posición en el eje Z
                cerrarlibro(false); // Cierra el libro hacia la derecha
                break;
            default:
                throw new Error("unkown state"); // Manejo de errores para estados desconocidos
        }
        currentLocation++; // Incrementa la ubicación actual
    }
}

// Función para regresar a la página anterior
function anteriorpag() {
    if (currentLocation > 1) {
        switch (currentLocation) {
            case 2:
                cerrarlibro(true); // Cierra el libro hacia la izquierda
                paper1.classList.remove("flipped"); // Desmarca la primera página como volteada
                paper1.style.zIndex = 3; // Ajusta la posición en el eje Z
                break;
            case 3:
                paper2.classList.remove("flipped"); // Desmarca la segunda página como volteada
                paper2.style.zIndex = 2; // Ajusta la posición en el eje Z
                break;
            case 4:
                abrirlibro(); // Abre el libro
                paper3.classList.remove("flipped"); // Desmarca la tercera página como volteada
                paper3.style.zIndex = 1; // Ajusta la posición en el eje Z
                break;
            default:
                throw new Error("unkown state"); // Manejo de errores para estados desconocidos
        }
        currentLocation--; // Decrementa la ubicación actual
    }
}

// Función para manejar eventos de teclado
function teclas(e) {
    if (e.key === "ArrowLeft") {
        anteriorpag(); // Si se presiona la flecha izquierda, retrocede una página
    } else if (e.key === "ArrowRight") {
        siguientepag(); // Si se presiona la flecha derecha, avanza una página
    }
}
