document.addEventListener('DOMContentLoaded', function () {
  const storiesContainer = document.getElementById('storiesContainer');

  // Get stories from localStorage
  function getStories() {
    return JSON.parse(localStorage.getItem('stories')) || [];
  }

  // Display stories in grid
  function displayStories() {
    const stories = getStories();
    storiesContainer.innerHTML = '';

    stories.forEach(story => {
      const storyElement = document.createElement('div');
      storyElement.className = 'story-box';
      storyElement.innerHTML = `
                <img src="${story.imageUrl}" alt="${story.title}">
                <div class="story-content">
                    <h3>${story.title}</h3>
                    <p class="story-meta">By ${story.author} on ${story.date}</p>
                    <p>${story.description}</p>
                </div>
            `;
      storiesContainer.appendChild(storyElement);
    });
  }

  // Initial display
  displayStories();
});
