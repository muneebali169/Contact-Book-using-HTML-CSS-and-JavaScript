document.addEventListener("DOMContentLoaded", function () {
  const contacts = document.querySelector('.contacts');
  const inputForm = document.querySelector('.input-form');
  const submit = document.getElementById('submit');

  // Load saved contacts from localStorage
  const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];

  // Function to display contacts and store them in localStorage
  function displayContacts() {
    const table = contacts.querySelector('table');
    table.innerHTML = '<tr><th>Name</th><th>Phone</th><th>Delete</th></tr>';

    savedContacts.forEach((contact, index) => {
      const newRow = table.insertRow(-1);
      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);

      cell1.innerHTML = contact.name;
      cell2.innerHTML = contact.phone;

      // Create copy icons for each cell
      const copyIconName = document.createElement('img');
      const copyIconPhone = document.createElement('img');

      copyIconName.src = 'copy.svg';
      copyIconPhone.src = 'copy.svg';

      copyIconName.title = 'Copy Name';
      copyIconPhone.title = 'Copy Phone';

      // Add click event listeners to copy icons
      copyIconName.addEventListener('click', () => {
        copyToClipboard(contact.name);
      });

      copyIconPhone.addEventListener('click', () => {
        copyToClipboard(contact.phone);
      });

      cell1.appendChild(copyIconName);
      cell2.appendChild(copyIconPhone);

      // Create a delete button for each row
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        // Remove the row when the delete button is clicked
        savedContacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(savedContacts));
        displayContacts();
      });
      cell3.appendChild(deleteButton);
    });
  }

  displayContacts(); // Display existing contacts

  submit.addEventListener('click', () => {
    const nameInput = document.getElementById('Name');
    const phoneInput = document.getElementById('Phone');
    // Get input values
    const name = document.getElementById('Name').value;
    const phone = document.getElementById('Phone').value;

    if (name && phone) {
      // Save the new contact
      savedContacts.push({ name, phone });
      localStorage.setItem('contacts', JSON.stringify(savedContacts));
      alert("Contact details saved!");
      
      nameInput.value = '';
      phoneInput.value = '';
      displayContacts(); // Update the table
    } else {
      alert("Please enter all the details.");
    }
  });

  // Function to copy text to the clipboard
  function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert(`Copied: ${text}`);
  }
});
