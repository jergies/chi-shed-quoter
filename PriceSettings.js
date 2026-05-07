<!-- Price Settings Screen -->
<div id="priceSettings" class="hidden">
  <div class="p-4 border-b flex items-center justify-between bg-white sticky top-0">
    <h2 class="text-xl font-bold">Price Settings</h2>
    <button onclick="goBackToMain()" 
            class="px-5 py-2 bg-gray-300 hover:bg-gray-400 rounded font-medium">
      ← Back
    </button>
  </div>
  
  <div class="p-6 space-y-8">
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
        <!-- Add more material fields here as needed -->
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
        <!-- Add more labor fields here as needed -->
      </div>
    </div>
  </div>
</div>
