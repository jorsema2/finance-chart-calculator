// Declare a variable to hold the Chart.js instance
let investmentChart = null;

// Function to initialize and render the chart with default values
function initializeChart() {
    const initialInvestment = 10000; // Example initial investment
    const yearlyContribution = 5000; // Example yearly contribution
    const growthRate = 8; // Example growth rate (%)

    renderChart(initialInvestment, yearlyContribution, growthRate);
}

// Function to calculate investment growth and render chart
function renderChart(initialInvestment, yearlyContribution, growthRate) {
    // Prepare data for Chart.js
    const years = [];
    const values = [];

    let currentValue = initialInvestment;

    // Calculate investment growth for 30 years (adjust as needed)
    for (let year = 0; year <= 30; year++) {
        years.push(year);
        values.push(currentValue);

        // Calculate investment growth for the current year
        currentValue = currentValue * (1 + growthRate / 100) + yearlyContribution;
    }

    // Check if chart instance already exists, destroy it before creating new one
    if (investmentChart) {
        investmentChart.destroy();
    }

    // Chart.js setup
    const ctx = document.getElementById('investmentChart').getContext('2d');
    investmentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Investment Growth',
                data: values,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Function to handle button click event
function calculateAndDisplay() {
    // Get user inputs
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const yearlyContribution = parseFloat(document.getElementById('yearlyContribution').value);
    const growthRate = parseFloat(document.getElementById('growthRate').value);

    // Validate inputs (optional)
    if (isNaN(initialInvestment) || isNaN(yearlyContribution) || isNaN(growthRate)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    // Render chart with user inputs
    renderChart(initialInvestment, yearlyContribution, growthRate);
}

// Initialize the chart with default values
initializeChart();
