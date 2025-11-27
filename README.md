# Atención Fugaz

## Descripción

Aplicación web interactiva diseñada para evaluar la capacidad de atención visual rápida. El juego presenta secuencias de letras y números que aparecen rápidamente en pantalla, donde el usuario debe identificar dos números específicos entre las letras.

El juego consta de 8 rondas que aumentan progresivamente en dificultad, incrementando tanto la velocidad de presentación como la cantidad de caracteres mostrados.

## Estructura del Proyecto

```
game/
├── app.py                          # Aplicación Flask principal
├── requirements.txt                # Dependencias del proyecto
├── static/
│   ├── css/
│   │   ├── style.css              # Estilos de la pantalla de juego
│   │   └── sytle_resultado.css    # Estilos de la pantalla de resultados
│   └── js/
│       └── juego.js               # Lógica del juego
└── templates/
    ├── base.html                  # Plantilla base
    ├── index.html                 # Pantalla principal del juego
    └── resultado.html             # Pantalla de resultados
```

## Requisitos del Sistema

- Python 3.7 o superior
- pip (gestor de paquetes de Python)
- Navegador web moderno (Chrome, Firefox, Edge)

## Instalación

### 1. Verificar Python

Confirmar que Python está instalado:

```bash
python --version
```

Si no está instalado, descargarlo desde [python.org](https://www.python.org/downloads/)

### 2. Descargar el Proyecto

Clonar el repositorio o descargar los archivos:

```bash
git clone <url-del-repositorio>
cd Atencion_Fugaz/game
```

O navegar a la carpeta del proyecto:

```bash
cd "ruta/al/proyecto/game"
```

### 3. Crear Entorno Virtual (Recomendado)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

Cuando esté activado, verás `(venv)` al inicio de la línea de comandos.

### 4. Instalar Dependencias

```bash
pip install -r requirements.txt
```

O instalar Flask directamente:

```bash
pip install Flask
```

### 5. Ejecutar la Aplicación

```bash
python app.py
```

Deberías ver un mensaje como:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

### 6. Acceder al Juego

Abrir el navegador y visitar:
- `http://127.0.0.1:5000/` o
- `http://localhost:5000/`

## Cómo Funciona

### Mecánica del Juego

1. **Inicio**: Presionar el botón "INICIAR" para comenzar
2. **Observación**: Aparecerá una secuencia rápida de letras y números en el centro de la pantalla
3. **Identificación**: Memorizar los dos números que aparecen entre las letras
4. **Respuesta**: Cuando termine la secuencia, ingresar los dos números en orden usando las teclas del 1 al 9
5. **Progresión**: Completar las 8 rondas para ver los resultados

### Características del Juego

- **8 rondas** con dificultad creciente
- **Secuencia inicial**: 10 caracteres, aumenta 2 caracteres por ronda
- **Velocidad inicial**: 250 milisegundos entre caracteres
- **Incremento de velocidad**: Se reduce 30ms por ronda (mínimo 50ms)
- **Evaluación**: Se mide el tiempo de respuesta y la precisión en cada ronda

### Pantalla de Resultados

Al finalizar las 8 rondas, se muestra:
- Estado general del desempeño
- Tabla con los resultados de cada ronda:
  - Número de ronda
  - Tiempo de respuesta (en segundos)
  - Resultado (correcto/incorrecto)

## Solución de Problemas

### Python no se reconoce como comando
- Agregar Python al PATH durante la instalación
- Reiniciar la terminal después de instalar Python

### No module named 'flask'
- Verificar que el entorno virtual esté activado
- Reinstalar Flask: `pip install Flask`

### Port 5000 is already in use
- Cerrar aplicaciones que usen el puerto 5000
- Cambiar el puerto en `app.py` (ver sección Configuración)

### Permission denied
- Windows: Ejecutar la terminal como administrador
- macOS/Linux: Usar `sudo` si es necesario

## Tecnologías Utilizadas

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Almacenamiento**: Session Storage (navegador)

## Información del Proyecto

**Institución**: Universidad Autonoma de Occidente
**Curso**: Videojuegos 2D - 7° Semestre  
**Año**: 2025