document.addEventListener('DOMContentLoaded', function() {
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="close">&times;</span>
      <img class="lightbox-img" src="" alt="">
      <div class="lightbox-caption"></div>
      <div class="lightbox-nav">
        <button class="prev">&#10094;</button>
        <button class="next">&#10095;</button>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  // Get all gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  // Add click event to each gallery item
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      openLightbox(item);
    });
  });

  // Open lightbox function
  function openLightbox(item) {
    const imgSrc = item.querySelector('img').src;
    const caption = item.querySelector('.gallery-overlay p').textContent;
    
    lightbox.querySelector('.lightbox-img').src = imgSrc;
    lightbox.querySelector('.lightbox-caption').textContent = caption;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  // Close lightbox
  lightbox.querySelector('.close').addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Click outside image to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Navigation between images
  lightbox.querySelector('.next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(galleryItems[currentIndex]);
  });

  lightbox.querySelector('.prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(galleryItems[currentIndex]);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(galleryItems[currentIndex]);
      } else if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(galleryItems[currentIndex]);
      } else if (e.key === 'Escape') {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  });
});