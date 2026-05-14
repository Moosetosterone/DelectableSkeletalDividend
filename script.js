function handleInterestSubmit() {
  const form = document.getElementById('interestForm');

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  form.style.display = 'none';
  document.getElementById('successMsg').style.display = 'block';
}
