// ✅ Use your Render backend API URL here
const API_URL = "https://fake-news-backend-2-4vy7.onrender.com/api/predict";

document.getElementById("predictBtn").addEventListener("click", async () => {
  const text = document.getElementById("newsText").value.trim();
  const resultDiv = document.getElementById("result");

  if (!text) {
    resultDiv.textContent = "⚠️ Please enter some text first!";
    return;
  }

  resultDiv.textContent = "⏳ Checking...";

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!resp.ok) {
      throw new Error(`Server error: ${resp.status}`);
    }

    const data = await resp.json();

    if (data.error) {
      resultDiv.textContent = "⚠️ Error: " + data.error;
    } else {
      resultDiv.innerHTML = `
        <b>Prediction:</b> ${data.label.toUpperCase()} <br>
        <b>Confidence:</b> ${(data.probability * 100).toFixed(1)}%
      `;
    }
  } catch (err) {
    resultDiv.textContent = "❌ Request failed: " + err.message;
  }
});
