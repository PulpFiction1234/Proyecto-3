# Proyecto 3


## 1. Intro
##### Este repositorio es el proyecto solicitado por el staff de UDD Bootcamps DWFS
**PROYECTO 3: Tablero de Datos** 
##### A continuación podrán ver el proceso de desarrollo ocupado para esta página donde explicaremos algunos pasos y funcionalidad.


------------

## 2. Desarrollo html, css y js

##### Como primer paso de este proyecto se creó un archivo html:5, en el cual debíamos incluir una etiqueta llamada canvas  para crear un gráfico utilizando el consumo de una api, también se me solicito aplicar algunos selectores de css.


- Aplicar HTML5.
- Aplicar selectores en CSS.
- Sección de gráficos (Chart.js utiliza canvas).
- Uso de fetch o axios para el consumo de datos.
- Modularización con import y export.
- Uso de promesas o async-await.



##### Sabiendo esto cree mi archivo html en el cual incorpore mi archivo canvas para más adelante generar un grafico
```html
 <div class="chart-container"> 
        <canvas id="chart"></canvas>
 </div>
```
##### Una vez creado mi html y creada la primera sección cree los archivos css y js los cuales tuve que linkear a mi archivo html .

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proyecto 3</title>
  <link rel="stylesheet" href="./public/index.css">
</head>
```
```html
</footer>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script type="module" src="./public/api.js"></script>
</body>
```
##### Luego de esto comencé a trabajar en mi archivo js para consumir mi api, la api que seleccione es utilizada para recaudar información de los personajes de la saga StarWars

```javascript
async function buscarPersonaje(nombrePersonaje) {
    try {
      const response = await fetch(`https://swapi.dev/api/people/?search=${nombrePersonaje}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      throw error;
    }
  }
```
##### También inclui la función para crear mi grafico con chart.js mediante los datos que me proporcionaba nuestra api.
```javascript
function mostrarResultados(data) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
  
    if (data.results.length === 0) {
      resultadosDiv.innerHTML = 'No se encontraron resultados.';
    } else {
      const personaje = data.results[0];
      resultadosDiv.innerHTML += '<h2>Datos del Personaje:</h2>';
      resultadosDiv.innerHTML += `<p>Nombre: ${personaje.name}</p>`;
```
```javascript
function mostrarGrafico(data) {
    const chartCanvas = document.getElementById('chart');
    const ctx = chartCanvas.getContext('2d');
    const personaje = data.results[0];
  
    if (myChart) {
      myChart.destroy();
    }
  
    myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Altura', 'Peso'],
        datasets: [{
          data: [personaje.height, personaje.mass],
          backgroundColor: ['#F4F6F7', '#797D7F'],
          borderColor: 'transparent',
        }],
      },
      options: {
        cutoutPercentage: 50,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              const label = data.labels[tooltipItem.index];
              const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return `${label}: ${value} ${label === 'Altura' ? 'cm' : 'kg'}`;
            },
          },
        },
      },
    });
  }
```
##### Luego de esto cree un input y un button en mi archivo html los cuales fueron llamados mediante una función para ejecutar mi api, también agregue los export y import solicitados.
```html
<div class="sub-caja">
          <h1>Wiki Wars</h1>
          <label for="characterName"><p>Buscar Personaje:</p></label>
          <input  class="buscador" type="text" id="characterName" placeholder="Ingrese el nombre del personaje">
          <button id="searchButton">Buscar</button>
        </div>
```
```javascript
  export async function buscarYMostrar() {
    const nombrePersonaje = obtenerNombrePersonaje();
    try {
      const data = await buscarPersonaje(nombrePersonaje);
      mostrarResultados(data);
      mostrarGrafico(data);
    } catch (error) {
      console.error('Error al buscar y mostrar:', error);
    }
  }
```
```javascript
import { buscarYMostrar } from "./main.js";


document.getElementById('searchButton').addEventListener('click', buscarYMostrar);
```


##### Ya teniendo mi api codificada y funcional comencé a trabajar en mi css en este archivo se le dieron selectores y estilos a cada una de nuestras secciones dentro del archivo html utilizando clases y etiquetas.
```css
*{
    margin: 0;
    padding: 0;
}

ul{
    display: flex;
    justify-content: center;
}

body{
    background-image: url(../images/star-wars-backgrounds-14_856985d9.jpeg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh; 
```
##### Una vez dado todos los estilos a mis etiquetas html di por concluido mi proyecto de tabla de datos con el consumo de la api funcionando de manera correcta.

## 3. Dependencias

###### - Chart.JS
###### - Express
###### - Node-fetch
