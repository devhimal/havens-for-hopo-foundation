document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const addStoryBtn = document.getElementById('addStoryBtn');
  const modal = document.getElementById('storyModal');
  const closeBtn = document.querySelector('.close');
  const cancelBtn = document.getElementById('cancelBtn');
  const storyForm = document.getElementById('storyForm');
  const storiesTableBody = document.getElementById('storiesTableBody');
  const donationTableBody = document.getElementById('donationTableBody');
  const currentDateTimeElement = document.getElementById('currentDateTime');

  // Initialize stories from localStorage
  let stories = JSON.parse(localStorage.getItem('stories')) || [];
  let donations = JSON.parse(localStorage.getItem('donations')) || [];

  console.log(donations)


  // Update current date time
  function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
    currentDateTimeElement.textContent = formattedDate;
    return formattedDate;
  }

  // Update time every second
  setInterval(updateDateTime, 1000);
  updateDateTime(); // Initial update

  // Open modal
  addStoryBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.getElementById('date').value = updateDateTime();
    storyForm.reset();
    document.getElementById('storyId').value = '';
    document.querySelector('.modal-header h2').textContent = 'Add New Story';
  });

  // Close modal
  function closeModal() {
    modal.style.display = 'none';
    storyForm.reset();
  }

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Form submission
  storyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const storyId = document.getElementById('storyId').value;
    const storyData = {
      id: storyId || Date.now(),
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      date: document.getElementById('date').value,
      imageUrl: document.getElementById('imageUrl').value,
      description: document.getElementById('description').value,
      createdBy: 'admin',
      createdAt: updateDateTime()
    };

    if (storyId) {
      // Update existing story
      const index = stories.findIndex(s => s.id === parseInt(storyId));
      if (index !== -1) {
        stories[index] = storyData;
      }
    } else {
      // Add new story
      stories.push(storyData);
    }

    localStorage.setItem('stories', JSON.stringify(stories));
    displayStories();
    closeModal();
    showNotification(storyId ? 'Story updated successfully!' : 'Story added successfully!');
  });

  // Display stories in table
  function displayStories() {
    storiesTableBody.innerHTML = '';

    stories.forEach(story => {
      const row = document.createElement('tr');
      row.innerHTML = `
                <td>${story.title}</td>
                <td>${story.author}</td>
                <td>${story.date}</td>
                <td>
                    <button onclick="editStory(${story.id})" class="action-btn edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteStory(${story.id})" class="action-btn delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
      storiesTableBody.appendChild(row);
    });
  }

  function displayDonation() {
    donationTableBody.innerHTML = '';

    donations.forEach(donation => {
      const row = document.createElement('tr');
      row.innerHTML = `
                <td>${donation.name}</td>
                <td>${donation.email}</td>
                <td>${donation.country}</td>
                <td>${donation.city}</td>
                <td>${donation.state}</td>
                <td>${donation.amount}</td>
                <td>
                    <button onclick="editDonation(${donation.id})" class="action-btn edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteDonation(${donation.id})" class="action-btn delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
      `;
      donationTableBody.appendChild(row);
    })

  }


  displayDonation();



  window.editDonation = function (id) {

    alert("You can't edit the donor details as  " + id + " is not implemented yet.");


  };

  window.deleteDonation = function (id) {
    if (confirm('Are you sure you want to delete this donation?')) {
      donations = donations.filter(donation => donation.id !== id);
      localStorage.setItem('donations', JSON.stringify(donations));
      displayDonation();
      showNotification('Donation deleted successfully!');
    }
  };



  // Edit story
  window.editStory = function (id) {
    const story = stories.find(s => s.id === id);
    if (story) {
      document.getElementById('storyId').value = story.id;
      document.getElementById('title').value = story.title;
      document.getElementById('author').value = story.author;
      document.getElementById('date').value = story.date;
      document.getElementById('imageUrl').value = story.imageUrl;
      document.getElementById('description').value = story.description;

      document.querySelector('.modal-header h2').textContent = 'Edit Story';
      modal.style.display = 'block';
    }
  };

  // Delete story
  try {
    window.deleteStory = function (id) {
      console.log('Before deletion:', stories);
      if (confirm('Are you sure you want to delete this story?')) {
        stories = stories.filter(story => story.id !== Number(id));
        localStorage.setItem('stories', JSON.stringify(stories));
        if (typeof displayStories === 'function') displayStories();
        if (typeof showNotification === 'function') showNotification('Story deleted successfully!');
      }
      console.log('After deletion:', stories);
    };
  } catch (err) {
    console.error('Error deleting story:', err);
  }


  // Show notification
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Initial display of stories
  displayStories();
});
