document.getElementById("predictBtn").addEventListener("click", () => {
  const text = document.getElementById("newsText").value.trim();
  if (!text) {
    alert("Please enter some text.");
    return;
  }

  fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: text })
  })
  .then(response => response.json())
  .then(data => {
    if (data.prediction) {
      document.getElementById("result").innerText = `Prediction: ${data.prediction}`;
    } else if (data.error) {
      document.getElementById("result").innerText = `Error: ${data.error}`;
    }
  })
  .catch(err => {
    console.error("Error while calling API:", err);
    document.getElementById("result").innerText = "Error calling prediction service.";
  });
});
