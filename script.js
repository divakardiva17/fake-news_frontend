const API_URL = "https://your-backend-service.onrender.com/api/predict"; 
// replace with actual backend URL

document.getElementById("predictBtn").addEventListener("click", async () => {
  const text = document.getElementById("newsText").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "Predicting...";

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await resp.json();
    if (data.error) {
      resultDiv.textContent = "Error: " + data.error;
    } else {
      resultDiv.innerHTML = `<b>Label:</b> ${data.label} <br> <b>Confidence:</b> ${(data.probability*100).toFixed(1)}%`;
    }
  } catch (err) {
    resultDiv.textContent = "Error: " + err.message;
  }
});
