// Declare a variable to hold the Chart.js instance
let investmentChart = null;

// Function to initialize and render the chart with default values
function initializeChart() {
    const initialInvestment = 10000; // Example initial investment
    const yearlyContribution = 5000; // Example yearly contribution
    const growthRate1 = 8; // Example growth rate for scenario 1 (%)
    const growthRate2 = 6; // Example growth rate for scenario 2 (%)

    renderChart(initialInvestment, yearlyContribution, growthRate1, growthRate2);
}

// Function to calculate investment growth and render chart
function renderChart(initialInvestment, yearlyContribution, growthRate1, growthRate2) {
    const years = [];
    const values1 = [];
    const values2 = [];

    let currentValue1 = initialInvestment;
    let currentValue2 = initialInvestment;

    for (let year = 0; year <= 30; year++) {
        years.push(year);
        values1.push(currentValue1);
        values2.push(currentValue2);

        currentValue1 = currentValue1 * (1 + growthRate1 / 100) + yearlyContribution;
        currentValue2 = currentValue2 * (1 + growthRate2 / 100) + yearlyContribution;
    }

    if (investmentChart) {
        investmentChart.destroy();
    }

    const ctx = document.getElementById('investmentChart').getContext('2d');
    investmentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'First Scenario',
                data: values1,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }, {
                label: 'Second Scenario',
                data: values2,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });
}

// Function to handle button click event
function calculateAndDisplay() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const yearlyContribution = parseFloat(document.getElementById('yearlyContribution').value);
    const growthRate1 = parseFloat(document.getElementById('growthRate1').value);
    const growthRate2 = parseFloat(document.getElementById('growthRate2').value);

    if (isNaN(initialInvestment) || isNaN(yearlyContribution) || isNaN(growthRate1) || isNaN(growthRate2)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    renderChart(initialInvestment, yearlyContribution, growthRate1, growthRate2);
}

// Initialize the chart with default values
initializeChart();
