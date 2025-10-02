async function predictNews() {
  const text = document.getElementById("newsInput").value;
  if (!text) {
    document.getElementById("result").innerText = "⚠️ Please enter some news text.";
    return;
  }

  try {
    const res = await fetch("https://fake-news-backend-9.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    });

    const data = await res.json();
    if (data.error) {
      document.getElementById("result").innerText = "❌ " + data.error;
    } else {
      document.getElementById("result").innerText =
        `Prediction: ${data.prediction} (Confidence: ${data.confidence}%)`;
    }
  } catch (err) {
    document.getElementById("result").innerText = "⚠️ Failed to connect to backend.";
  }
}

