document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.querySelector('input[name="surname"]');
    
    fetch('/travellers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ surname: input.value })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('name').textContent = data.name;
      document.getElementById('surname').textContent = data.surname;
      document.getElementById('dates').textContent = data.dates;
    })
    .catch(error => console.error('Error:', error));
  });
});
