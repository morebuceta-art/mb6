document.addEventListener('DOMContentLoaded', () => {
  const convertBtn = document.getElementById('convert');
  const inputField = document.getElementById('input');
  const resultDiv = document.getElementById('result');

  convertBtn.addEventListener('click', async () => {
    const inputValue = inputField.value.trim();
    
    if (!inputValue) {
      resultDiv.textContent = 'Please enter a value';
      return;
    }

    try {
      const response = await fetch(`/api/convert?input=${encodeURIComponent(inputValue)}`);
      const data = await response.json();
      
      if (data.error) {
        resultDiv.textContent = `Error: ${data.error}`;
      } else {
        resultDiv.textContent = data.string;
      }
    } catch (err) {
      resultDiv.textContent = 'Error connecting to server';
      console.error(err);
    }
  });
});
