// Referencias al DOM
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const dateInput = document.getElementById('date');

// Recuperar transacciones del localStorage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

let myChart = null;

// --- FUNCIÓN NUEVA: Formatear dinero (CLP) ---
// Esto convierte 10000 en "$10.000"
function formatoMoneda(cantidad) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0 
    }).format(cantidad);
}

// Añadir transacción
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '' || dateInput.value === '') {
    alert('Por favor completa todos los campos');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value, // El "+" convierte el string a número
      date: dateInput.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    updateChart();

    text.value = '';
    amount.value = '';
    dateInput.value = '';
  }
}

// Generar ID aleatorio
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Añadir transacción al DOM (Historial)
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '' : '+'; // El formatoMoneda ya pone el signo negativo, solo agregamos el + si es ganancia
  const item = document.createElement('li');

  // Clase para borde rojo o verde
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    <span>${transaction.text}</span> 
    <span class="money-tag">
        ${sign}${formatoMoneda(transaction.amount)}
    </span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
        <i class="fas fa-trash-alt"></i>
    </button>
  `;

  list.appendChild(item);
}

// Actualizar el balance, ingresos y gastos (Aquí ocurre la magia de los totales)
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  // Calcular Total General
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  // Calcular Ingresos
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  // Calcular Gastos
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  );

  // Actualizar el HTML con el formato correcto
  balance.innerText = formatoMoneda(total);
  money_plus.innerText = formatoMoneda(income);
  money_minus.innerText = formatoMoneda(expense);
}

// Eliminar transacción
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init(); // Recargamos todo para actualizar totales y gráficos
}

// Actualizar Local Storage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Inicializar App
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
  updateChart();
}

// --- Gráfico Chart.js ---
function updateChart() {
  const ctx = document.getElementById('expenseChart');
  if(!ctx) return; // Seguridad por si el canvas no ha cargado

  const incomeTotal = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
    
  const expenseTotal = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Ingresos', 'Gastos'],
      datasets: [{
        data: [incomeTotal, expenseTotal],
        backgroundColor: ['#2ecc71', '#e74c3c'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: {
              position: 'bottom'
          }
      }
    }
  });
}

// --- Exportar a CSV ---
function exportData() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if(!startDate || !endDate) {
        alert("Selecciona fechas de inicio y fin.");
        return;
    }

    const filtered = transactions.filter(t => t.date >= startDate && t.date <= endDate);

    if(filtered.length === 0) {
        alert("No hay datos en ese rango.");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Descripcion,Monto,Fecha\n";

    filtered.forEach(function(rowArray) {
        // En el CSV guardamos el número crudo para que Excel lo pueda sumar después
        let row = `${rowArray.id},${rowArray.text},${rowArray.amount},${rowArray.date}`;
        csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `finanzas_${startDate}_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

form.addEventListener('submit', addTransaction);

init();