// PriceSettings.js
import React, { useState } from 'react';

const ADMIN_PASSWORD = "11900";   // ← You can change this later

function PriceSettings() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const [prices, setPrices] = useState({
    steelPerSqFt: 11.85,
    laborPerSqFt: 4.25,
    door8x7: 1850,
    door10x10: 2450,
    deliveryFee: 375,
  });

  const handleUnlock = () => {
    if (password === ADMIN_PASSWORD) {
      setIsUnlocked(true);
      setPassword("");
    } else {
      alert("Incorrect password");
      setPassword("");
    }
  };

  const updatePrice = (key, value) => {
    setPrices(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const savePrices = () => {
    localStorage.setItem('buildingPrices', JSON.stringify(prices));
    alert("✅ Prices saved successfully!");
  };

  // Password Screen
  if (!isUnlocked) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Price Settings</h2>
        <p>Enter Password</p>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 12, fontSize: 18, width: "200px" }}
        />
        <br /><br />
        <button onClick={handleUnlock} style={{ padding: 12, fontSize: 16 }}>
          Unlock
        </button>
      </div>
    );
  }

  // Unlocked Price Screen
  return (
    <div style={{ padding: 20 }}>
      <h2>Price Settings</h2>
      
      <div style={{ margin: "15px 0" }}>
        <label>Steel per sq ft: </label>
        <input type="number" value={prices.steelPerSqFt} onChange={(e) => updatePrice('steelPerSqFt', e.target.value)} />
      </div>

      <div style={{ margin: "15px 0" }}>
        <label>Labor per sq ft: </label>
        <input type="number" value={prices.laborPerSqFt} onChange={(e) => updatePrice('laborPerSqFt', e.target.value)} />
      </div>

      <div style={{ margin: "15px 0" }}>
        <label>8x7 Door: </label>
        <input type="number" value={prices.door8x7} onChange={(e) => updatePrice('door8x7', e.target.value)} />
      </div>

      <div style={{ margin: "15px 0" }}>
        <label>10x10 Door: </label>
        <input type="number" value={prices.door10x10} onChange={(e) => updatePrice('door10x10', e.target.value)} />
      </div>

      <div style={{ margin: "15px 0" }}>
        <label>Delivery Fee: </label>
        <input type="number" value={prices.deliveryFee} onChange={(e) => updatePrice('deliveryFee', e.target.value)} />
      </div>

      <br /><br />
      <button onClick={savePrices} style={{ padding: 12, marginRight: 10 }}>Save Changes</button>
      <button onClick={() => setIsUnlocked(false)}>Lock</button>
    </div>
  );
}

export default PriceSettings;
