<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shed Quoting Tool</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; }
        input[type="number"] { -moz-appearance: textfield; }
        .price-panel { transition: all 0.3s ease; }
    </style>
</head>
<body class="bg-gray-100 min-h-screen">

    <!-- ==================== HEADER ==================== -->
    <div class="bg-blue-600 text-white py-6 px-4 text-center">
        <h1 class="text-3xl font-bold">Nucor / CHI Steel Shed Quoter</h1>
    </div>

    <!-- ==================== PRICE SETTINGS ==================== -->
    <div class="max-w-2xl mx-auto p-4">
        <button onclick="togglePriceSettings()" 
                class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-6 rounded-2xl flex items-center justify-center gap-3 text-xl shadow-lg">
            <span class="text-3xl">⚙️</span> 
            PRICE SETTINGS
        </button>

        <!-- PRICE SETTINGS PANEL -->
        <div id="priceSettingsPanel" class="hidden mt-6 bg-white rounded-3xl shadow-2xl border border-gray-200 price-panel p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">🔧 Edit Price Settings</h2>
                <button onclick="closePriceSettings()" 
                        class="text-4xl text-gray-400 hover:text-red-500 leading-none">×</button>
            </div>

            <input type="password" id="chi2026" 
                   placeholder="Enter password to unlock editing"
                   class="w-full p-5 border border-gray-300 rounded-2xl text-lg focus:outline-none focus:border-orange-500 mb-6"
                   onkeyup="if(event.key === 'Enter') checkPassword()">

            <div id="priceFields" class="hidden space-y-8">
                <div>
                    <label class="block text-sm font-semibold text-gray-600 mb-2">Base Price per sq ft</label>
                    <input type="number" id="basePrice" value="32" step="0.01"
                           class="w-full p-5 border border-gray-300 rounded-2xl text-2xl font-medium">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-600 mb-2">Premium Overhead Door</label>
                    <input type="number" id="overheadDoor" value="3400" step="10"
                           class="w-full p-5 border border-gray-300 rounded-2xl text-2xl font-medium">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-600 mb-2">Premium Walk Door</label>
                    <input type="number" id="walkDoor" value="1250" step="10"
                           class="w-full p-5 border border-gray-300 rounded-2xl text-2xl font-medium">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-600 mb-2">Window each</label>
                    <input type="number" id="windowPrice" value="480" step="10"
                           class="w-full p-5 border border-gray-300 rounded-2xl text-2xl font-medium">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-600 mb-2">Concrete per cu ft</label>
                    <input type="number" id="concretePrice" value="7.8" step="0.1"
                           class="w-full p-5 border border-gray-300 rounded-2xl text-2xl font-medium">
                </div>

                <div class="flex gap-4 pt-6">
                    <button onclick="saveAndClosePrices()" 
                            class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-2xl text-xl">
                        💾 Save & Close
                    </button>
                    <button onclick="closePriceSettings()" 
                            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-6 rounded-2xl text-xl">
                        ❌ Close
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- ==================== MAIN FORM (placeholder) ==================== -->
    <div class="max-w-2xl mx-auto p-4 space-y-8">
        <div class="bg-white p-6 rounded-3xl shadow">
            <label class="block text-sm font-semibold mb-2">Width (ft)</label>
            <input type="number" id="width" value="20" class="w-full p-5 border rounded-2xl text-2xl">
        </div>
        <button onclick="calculateQuote()" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-3xl text-2xl">
            Calculate Quote
        </button>
    </div>

    <script>
        // ==================== CHANGE YOUR PASSWORD HERE ====================
        const CORRECT_PASSWORD = "my settings";   // ←←← CHANGE THIS LINE TO WHATEVER YOU WANT

        // ==================== PRICE SETTINGS LOGIC ====================
        function togglePriceSettings() {
            const panel = document.getElementById('priceSettingsPanel');
            panel.classList.toggle('hidden');
            
            document.getElementById('pricePassword').value = '';
            document.getElementById('priceFields').classList.add('hidden');
        }

        function checkPassword() {
            const entered = document.getElementById('pricePassword').value.trim();
            
            if (entered === CORRECT_PASSWORD) {
                document.getElementById('priceFields').classList.remove('hidden');
                loadSavedPrices();
            } else {
                alert("❌ Wrong password");
            }
        }

        function loadSavedPrices() {
            if (localStorage.getItem('basePrice')) {
                document.getElementById('basePrice').value = localStorage.getItem('basePrice');
                document.getElementById('overheadDoor').value = localStorage.getItem('overheadDoor');
                document.getElementById('walkDoor').value = localStorage.getItem('walkDoor');
                document.getElementById('windowPrice').value = localStorage.getItem('windowPrice');
                document.getElementById('concretePrice').value = localStorage.getItem('concretePrice');
            }
        }

        function saveAndClosePrices() {
            localStorage.setItem('basePrice', document.getElementById('basePrice').value);
            localStorage.setItem('overheadDoor', document.getElementById('overheadDoor').value);
            localStorage.setItem('walkDoor', document.getElementById('walkDoor').value);
            localStorage.setItem('windowPrice', document.getElementById('windowPrice').value);
            localStorage.setItem('concretePrice', document.getElementById('concretePrice').value);
            
            alert("✅ Prices saved! You can now close the app.");
            closePriceSettings();
        }

        function closePriceSettings() {
            document.getElementById('priceSettingsPanel').classList.add('hidden');
        }

        function calculateQuote() {
            const base = parseFloat(localStorage.getItem('basePrice') || 32);
            document.getElementById('results').innerHTML = `
                <div class="bg-white p-8 rounded-3xl shadow text-center max-w-2xl mx-auto mt-6">
                    <h2 class="text-3xl font-bold text-green-600">Quote Ready</h2>
                    <p class="text-5xl font-bold my-6">$${(base * 400).toFixed(2)}</p>
                    <p class="text-gray-600">Using your saved prices</p>
                </div>
            `;
            document.getElementById('results').classList.remove('hidden');
        }

        // Load prices when page opens
        window.onload = () => {
            // Make sure results div exists
            if (!document.getElementById('results')) {
                const resultsDiv = document.createElement('div');
                resultsDiv.id = 'results';
                document.body.appendChild(resultsDiv);
            }
            loadSavedPrices();
        };
    </script>
</body>
</html>
