// Test script pour vérifier l'API
const apiUrl = 'http://localhost:8080/api/health/reports/submit';

const payload = {
  symptoms: 'Toux',
  symptomList: ['Toux'],
  description: '',
  severity: 'MILD',
  location: 'manual',
  latitude: '',
  longitude: '',
  governorate: 'Tunis',
  anonymous: true
};

console.log('Testing API endpoint:', apiUrl);
console.log('Payload:', payload);

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': ''
  },
  body: JSON.stringify(payload)
})
  .then(response => {
    console.log('Status:', response.status);
    console.log('StatusText:', response.statusText);
    return response.json();
  })
  .then(data => {
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
