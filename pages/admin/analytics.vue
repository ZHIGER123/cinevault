<template>
  <div>
    <h1 class="text-2xl font-bold text-white mb-8">Аналитика</h1>
    <div class="glass rounded-xl p-6">
      <h2 class="text-lg font-semibold text-white mb-4">Просмотры по месяцам</h2>
      <canvas ref="chartRef" height="120"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

definePageMeta({ middleware: 'auth', layout: 'admin' })

const chartRef = ref<HTMLCanvasElement>()

onMounted(() => {
  if (!chartRef.value) return
  new Chart(chartRef.value, {
    type: 'line',
    data: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
      datasets: [{
        label: 'Просмотры (тыс.)',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: '#E50914',
        backgroundColor: 'rgba(229,9,20,0.1)',
        tension: 0.4,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: '#9ca3af' } } },
      scales: {
        x: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      },
    },
  })
})
</script>