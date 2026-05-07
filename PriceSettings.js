<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shed Quoting Tool</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, sans-serif; }
    input[type="number"] { -moz-appearance: textfield; }
  </style>
</head>
<body class="bg-gray-100 min-h-screen">

  <!-- MAIN SCREEN -->
  <div id="mainScreen">
    <div class="bg-blue-600 text-white p-4 text-center text-xl font-bold">
      Shed Quoting Tool
    </div>

    <div class="p-4 space-y-6 max-w-lg mx-auto">

      <div>
        <label class="block text-sm font-medium mb-1">Shed Width (ft)</label>
        <input type="number" id="width" value="12" class="w-full p-3 border rounded-lg text-lg" onchange="calculate()">
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Shed Length (ft)</label>
        <input type="number" id="length" value="16" class="w-full p-3 border rounded-lg text-lg" onchange="calculate()">
      </div>

      <div class="flex items-center gap-3">
        <input type="checkbox" id="insulation" checked onchange="calculate()">
        <label class="font-medium">Include Insulation</label>
      </div>

      <div class="pt-4 border-t">
        <button onclick="showPriceSettings()" 
                class="w-full bg-gray-700 text-white py-3 rounded-lg font-medium">
          ⚙️ Price Settings
        </button>
      </div>

      <div id="total" class="text-3xl font-bold text-center py-6 bg-white rounded-xl shadow">
        Total: $0
      </div>
    </div>
  </div>

  <!-- PRICE SETTINGS SCREEN -->
  <div id="priceSettings" class="hidden">
    <div class="p-4 border-b flex items-center justify-between bg-white sticky top-0 shadow">
      <h2 class="text-xl font-bold">Price Settings</h2>
      <button onclick="goBackToMain()" 
              class="px-5 py-2 bg-gray-300 hover:bg-gray-400 rounded font-medium">
        ← Back
      </button>
    </div>
    
    <div class="p-6 space-y-8 max-w-lg mx-auto">
      <!-- Material Prices -->
      <div>
        <h3 class="font-semibold text-lg mb-3">Material Prices (per sq ft)</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Siding</label>
            <input type="number" id="priceSiding" step="0.01" value="4.50" 
                   class="w-full p-3 border rounded-lg text-lg" onchange="savePriceSettings()">
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Roofing</label>
            <input type="number" id="priceRoofing" step="0.01" value="3.25" 
                   class="w-full p-3 border rounded-lg text-lg" onchange="savePriceSettings()">
          </div>
        </div>
      </div>

      <!-- Labor Rates -->
      <div>
        <h3 class="font-semibold text-lg mb-3">Labor Rates (per sq ft)</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Siding Install</label>
            <input type="number" id="laborSiding" step="0.01" value="2.75" 
                   class="w-full p-3 border rounded-lg text-lg" onchange="savePriceSettings()">
          </div>
        </div>
      </div>
    </div>
  </div>

<script>
// ====================== PRICE SETTINGS ======================
function savePriceSettings() {
  const settings = {
    priceSiding: parseFloat(document.getElementById('priceSiding').value) || 4.50,
    priceRoofing: parseFloat(document.getElementById('priceRoofing').value) || 3.25,
    laborSiding: parseFloat(document.getElementById('laborSiding').value) || 2.75,
  };
  localStorage.setItem('shedPriceSettings', JSON.stringify(settings));
}

function loadPriceSettings() {
  const saved = localStorage.getItem('shedPriceSettings');
  if (saved) {
    const s = JSON.parse(saved);
    document.getElementById('priceSiding').value = s.priceSiding || 4.50;
    document.getElementById('priceRoofing').value = s.priceRoofing || 3.25;
    document.getElementById('laborSiding').value = s.laborSiding || 2.75;
  }
}

// ====================== NAVIGATION ======================
function showPriceSettings() {
  document.getElementById('mainScreen').classList.add('hidden');
  document.getElementById('priceSettings').classList.remove('hidden');
}

function goBackToMain() {
  document.getElementById('priceSettings').classList.add('hidden');
  document.getElementById('mainScreen').classList.remove('hidden');
  calculate();
}

// ====================== CALCULATION ======================
function calculate() {
  const width = parseFloat(document.getElementById('width').value) || 0;
  const length = parseFloat(document.getElementById('length').value) || 0;
  const area = width * length;
  
  const includeInsulation = document.getElementById('insulation').checked;

  const priceSiding = parseFloat(document.getElementById('priceSiding').value) || 4.50;
  const priceRoofing = parseFloat(document.getElementById('priceRoofing').value) || 3.25;
  const laborSiding = parseFloat(document.getElementById('laborSiding').value) || 2.75;

  let total = 0;
  total += area * priceSiding;
  total += area * priceRoofing;
  total += area * laborSiding;

  if (includeInsulation) {
    total += area * 2.50;   // Default insulation price
  }

  document.getElementById('total').textContent = `Total: $${total.toFixed(0)}`;
}

// Load everything
window.addEventListener('load', () => {
  loadPriceSettings();
  calculate();
});
</script>

</body>
</html>
