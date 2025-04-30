const weatherData = {
    daily: {
        time: ["2025-04-30", "2025-05-01", "2025-05-02"],
        temperature_2m_max: [31.5, 30.9 , 29],
        temperature_2m_min: [18.3, 20.1, 20.3],
        precipitation_sum: [0.2, 1.2, 0.5],
        rain_probability: [45, 53, 53]
    }
};

function populateTable() {
    const tableBody = document.getElementById('weatherData');
    const daily = weatherData.daily;

    daily.time.forEach((date, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date}</td>
            <td>${daily.temperature_2m_max[index]}</td>
            <td>${daily.temperature_2m_min[index]}</td>
            <td>${daily.precipitation_sum[index]}</td>
            <td>${daily.rain_probability[index]}%</td>
        `;
        tableBody.appendChild(row);
    });
}

function createChart() {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    const daily = weatherData.daily;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: daily.time.map(date => new Date(date).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })),
            datasets: [
                {
                    label: 'Suhu Maksimum (°C)',
                    data: daily.temperature_2m_max,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false
                },
                {
                    label: 'Suhu Minimum (°C)',
                    data: daily.temperature_2m_min,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: false
                },
                {
                    label: 'Presipitasi (mm)',
                    data: daily.precipitation_sum,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    type: 'bar',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    title: { display: true, text: 'Suhu (°C)' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: { display: true, text: 'Presipitasi (mm)' },
                    grid: { drawOnChartArea: false }
                }
            },
            plugins: {
                title: { display: true, text: 'Grafik Suhu dan Presipitasi' }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    populateTable();
    createChart();
});