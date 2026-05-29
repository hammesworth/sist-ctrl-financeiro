const pizza = document.getElementById('pizza');
const torta = document.getElementById('pie');

export const bar = (stats) => {

    const chartExistente = Chart.getChart("pizza");

    if (chartExistente) {
        chartExistente.destroy();
    }

    return new Chart(pizza, {
      type: 'bar',

      data: {
        labels: ['Total Gasto', 'Mínimo', 'Máximo', 'Média'],

        datasets: [{
          label: 'Gasto, em R$',
          data: [stats.gastos, stats.menorGasto, stats.maiorGasto, stats.media],

          backgroundColor: [
            '#f1c40f',
            '#3498db',
            '#9b59b6',
            '#2ecc71'
          ],

          borderWidth: 1
        }]
      },

      options: {
        responsive: true,

        plugins: {
          legend: {
            position: 'top'
          },
        }
      }
    });
}

export const pie = (stats) => {

    const chartExistente = Chart.getChart("pie");

    if (chartExistente) {
        chartExistente.destroy();
    }

    return new Chart(torta, {
      type: 'pie',

      data: {
        labels: ['Tecnologia', 'Moda', 'Jogos', 'Alimentos', 'Eletrodomésticos'],

        datasets: [{
          label: 'Gasto na categoria',
          data: [
                 stats.categorias.Tecnologia?.total ?? 0,
                 stats.categorias.Moda?.total ?? 0,
                 stats.categorias.Jogos?.total ?? 0,
                 stats.categorias.Alimentos?.total ?? 0,
                 stats.categorias.Eletrodomésticos?.total ?? 0
                ],

          backgroundColor: [
            '#f1c40f',
            '#3498db',
            '#9b59b6',
            '#2ecc71',
            '#eb3520'
          ],

          borderWidth: 1
        }]
      },

      options: {
        responsive: true,

        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Gasto, por categoria'
          }
        }
      }
    });
}