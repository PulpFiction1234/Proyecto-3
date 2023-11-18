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
  
  function mostrarResultados(data) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
  
    if (data.results.length === 0) {
      resultadosDiv.innerHTML = 'No se encontraron resultados.';
    } else {
      const personaje = data.results[0];
      resultadosDiv.innerHTML += '<h2>Datos del Personaje:</h2>';
      resultadosDiv.innerHTML += `<p>Nombre: ${personaje.name}</p>`;
      resultadosDiv.innerHTML += `<p>Color de pelo: ${personaje.hair_color}</p>`;
      resultadosDiv.innerHTML += `<p>Color de ojos: ${personaje.eye_color} </p>`;
      resultadosDiv.innerHTML += `<p>Color de piel: ${personaje.skin_color} </p>`;
    }
  }
  
  function obtenerNombrePersonaje() {
    return document.getElementById('characterName').value;
  }
  
  let myChart;
  
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