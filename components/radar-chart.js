// ─── Radar Chart Component ────────────────────────────────────────────────
const SkillRadar = {
  chartInstance: null,

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create a canvas inside the container
    container.innerHTML = '<canvas id="skillRadarCanvas"></canvas>';
    const ctx = document.getElementById('skillRadarCanvas').getContext('2d');

    // Fetch progress data from App state via getModuleProgress
    const getProgress = (m) => {
      return (typeof App !== 'undefined' && typeof App.getModuleProgress === 'function') ? App.getModuleProgress(m) : 0;
    };
    
    const data = [
      getProgress('foundations'),
      getProgress('gates'),
      getProgress('algorithms'),
      getProgress('cryptography'),
      getProgress('error'),
      getProgress('qml')
    ];

    const labels = [
      'Foundations', 
      'Gates & Circuits', 
      'Algorithms', 
      'Cryptography', 
      'Error Correction', 
      'Quantum ML'
    ];

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    // Theme detection
    const isLight = document.documentElement.classList.contains('light-mode');
    const labelColor    = isLight ? '#371a12' : 'rgba(251, 248, 247, 0.75)';
    const gridColor     = isLight ? 'rgba(154, 62, 38, 0.12)' : 'rgba(238, 109, 79, 0.15)';
    const datasetBgColor     = isLight ? 'rgba(238, 109, 79, 0.12)' : 'rgba(238, 109, 79, 0.18)';
    const datasetBorderColor = isLight ? 'rgba(238, 109, 79, 0.85)' : 'rgba(238, 109, 79, 0.9)';
    const datasetPointBgColor = isLight ? '#c0392b' : '#d4af37';

    // Chart.js configuration
    this.chartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Skill Proficiency',
          data: data,
          backgroundColor: datasetBgColor,
          borderColor: datasetBorderColor,
          pointBackgroundColor: datasetPointBgColor,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: datasetPointBgColor,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: gridColor
            },
            grid: {
              color: gridColor
            },
            pointLabels: {
              color: labelColor,
              font: {
                family: 'Inter, sans-serif',
                size: 11
              }
            },
            min: 0,
            max: 100,
            ticks: {
              display: false,
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: isLight ? 'rgba(255, 243, 240, 0.97)' : 'rgba(20, 10, 6, 0.95)',
            titleFont: { family: 'Inter, sans-serif', size: 13 },
            bodyFont: { family: 'Inter, sans-serif', size: 12, weight: 'bold' },
            bodyColor: isLight ? '#9a3e26' : '#ee6d4f',
            titleColor: isLight ? '#371a12' : '#fbf8f7',
            borderColor: isLight ? 'rgba(238,109,79,0.3)' : 'rgba(238,109,79,0.2)',
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return context.raw + '% Complete';
              }
            }
          }
        }
      }
    });
  },

  update() {
    if (this.chartInstance) {
      const getProgress = (m) => {
        return (typeof App !== 'undefined' && typeof App.getModuleProgress === 'function') ? App.getModuleProgress(m) : 0;
      };
      this.chartInstance.data.datasets[0].data = [
        getProgress('foundations'),
        getProgress('gates'),
        getProgress('algorithms'),
        getProgress('cryptography'),
        getProgress('error'),
        getProgress('qml')
      ];
      this.chartInstance.update();
    }
  }
};
