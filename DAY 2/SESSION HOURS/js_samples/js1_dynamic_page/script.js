const colorPicker = document.getElementById('colorPicker');

colorPicker.addEventListener('input', (event) => {
  // Change the background color based on user input
  document.body.style.backgroundColor = event.target.value;
});