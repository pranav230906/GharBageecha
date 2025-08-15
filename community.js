// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const langToggle = document.getElementById('langToggle');
const postContent = document.getElementById('postContent');
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const postBtn = document.getElementById('postBtn');
const postCategory = document.getElementById('postCategory');
const emojiBtn = document.getElementById('emojiBtn');
const emojiModal = document.getElementById('emojiModal');
const closeEmoji = document.getElementById('closeEmoji');
const emojiGrid = document.getElementById('emojiGrid');
const imageModal = document.getElementById('imageModal');
const closeImageModal = document.getElementById('closeImageModal');
const modalImage = document.getElementById('modalImage');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');
const postsFeed = document.getElementById('postsFeed');
const filterTabs = document.querySelectorAll('.filter-tab');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const aiIdeasBtn = document.getElementById('aiIdeasBtn');
const aiModal = document.getElementById('aiModal');
const closeAiModal = document.getElementById('closeAiModal');
const aiSuggestionsList = document.getElementById('aiSuggestionsList');
const aiLoader = document.getElementById('aiLoader');
const aiError = document.getElementById('aiError');

// Global Variables
let selectedImages = [];
let currentFilter = 'all';
let posts = [];
let loadedPosts = 6;
let isHindi = false;
let currentImageIndex = 0;
let currentImageSet = [];
const API_KEY = ""; // Use an empty string for the API key, as it will be provided at runtime.

   // Profile Button
        document.addEventListener('DOMContentLoaded', () => {
    // Other event listeners and initialization code...

    const profileButton = document.querySelector('.profile-btn button');
    if (profileButton) {
        profileButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default link behavior
            window.location.href = 'profilepage.html'; // Navigate to the profile page
        });
    }

    // Rest of your event listeners...
});

// Emoji collections
const emojiCategories = {
    plants: ['🌱', '🌿', '🌳', '🌲', '🌴', '🌵', '🌾', '🍀', '🌸', '🌺', '🌻', '🌹', '🌷', '🌼'],
    vegetables: ['🍅', '🥒', '🥕', '🌶️', '🥬', '🥦', '🧄', '🧅', '🥔', '🌽'],
    fruits: ['🍎', '🍊', '🍋', '🍌', '🍓', '🍑', '🥭', '🍍', '🥝', '🍈'],
    weather: ['☀️', '🌤️', '⛅', '🌦️', '🌧️', '💧', '🌈', '⚡'],
    tools: ['🪴', '🌿', '🔧', '🪣', '🚿', '👨‍🌾', '👩‍🌾', '✂️'],
    feelings: ['😊', '😍', '🤩', '😎', '🥰', '😂', '💚', '❤️', '💪', '👍', '✨', '🎉']
};

// Sample data for posts
const samplePosts = [
    {
        id: 1,
        author: 'Priya Sharma',
        avatar: 'https://thumbs.dreamstime.com/b/vibrant-animated-character-glasses-overalls-teal-background-colorful-digital-art-confident-woman-cartoon-319250858.jpg',
        time: '2 hours ago',
        category: 'vegetables',
        content: 'Finally harvested my first batch of tomatoes! 🍅 The organic fertilizer really made a difference. These beauties taste so much better than store-bought ones. Any tips for preserving them? Planning to make some fresh tomato chutney tonight! 😊',
        images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop', 'https://4.imimg.com/data4/YY/VR/MY-19424998/tomatos.jpg'],
        likes: 24,
        comments: [
            {
                author: 'Raj Kumar',
                avatar: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/ea726477-e66b-4c73-bcbd-8efcdf91df1b/9c3e73e5-b967-40bb-8d30-01abe8470cb4.png',
                content: 'Wow! They look amazing. Try making tomato paste - it lasts for months!',
                time: '1 hour ago'
            }
        ],
        shares: 5
    },
    {
        id: 2,
        author: 'Anjali Patel',
        avatar: 'https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg',
        time: '5 hours ago',
        category: 'flowers',
        content: 'My marigolds are blooming beautifully this season! 🌼 Perfect timing for the upcoming festivals. They not only look gorgeous but also keep pests away from my vegetable garden. Nature\'s own pest control! 🌻✨',
        images: ['https://i0.wp.com/blog.organicbazar.net/wp-content/uploads/2023/12/7-27.jpg?resize=680%2C453&ssl=1'],
        likes: 18,
        comments: [
            {
                author: 'Meera Joshi',
                avatar: 'https://img.freepik.com/premium-photo/3d-cartoon-avatar-woman-minimal-3d-character_652053-2061.jpg',
                content: 'Beautiful! Marigolds are such hardy flowers. Perfect for Indian climate.',
                time: '3 hours ago'
            }
        ],
        shares: 3
    },
    {
        id: 3,
        author: 'Vikram Singh',
        avatar: 'https://img.freepik.com/premium-photo/male-cartoon-character_1338461-827.jpg',
        time: '1 day ago',
        category: 'herbs',
        content: 'Started a small herb garden on my balcony. Mint, coriander, and curry leaves growing strong! 🌿 Fresh herbs make such a difference in cooking. The aroma when I water them in the morning is just heavenly! Who else is growing herbs at home? 🍃💚',
        images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'],
        likes: 31,
        comments: [
            {
                author: 'Sunita Reddy',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc7adDV3hb6XqdLk1A5kHbUiwR6dFA0x406V2DPHpPU-RVGMeBpV_4MEfUW0MeWTkh2aI&usqp=CAU',
                content: 'Great idea! I grow tulsi and mint too. Try growing fenugreek leaves - super easy!',
                time: '18 hours ago'
            },
            {
                author: 'Arun Gupta',
                avatar: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4861.jpg?w=360',
                content: 'Balcony gardens are the best! How do you manage watering?',
                time: '12 hours ago'
            }
        ],
        shares: 8
    },
    {
        id: 4,
        author: 'Deepika Nair',
        avatar: 'https://img.freepik.com/premium-photo/3d-cartoon-avatar-girl-minimal-3d-character_652053-2348.jpg',
        time: '2 days ago',
        category: 'tips',
        content: '💡 Pro tip: Used tea leaves make excellent compost! I\'ve been adding them to my soil for months and the plants love it. Just make sure to let them dry first to avoid mold. My roses have never been happier! ☕🌹 #SustainableGardening',
        images: ['https://media.istockphoto.com/id/1330987502/photo/tea-tree-leaves-for-background.jpg?s=612x612&w=0&k=20&c=1EsKVOpYie8Xc7lAeyF_Y4U0IIulRkZVeaOzgWQc_Rw='],
        likes: 42,
        comments: [
            {
                author: 'Kiran Jain',
                avatar: 'https://img.favpng.com/1/9/15/3d-male-avatar-cartoon-man-with-glasses-Bnq3PC7J_t.jpg',
                content: 'This is so useful! I was throwing away tea leaves. Will start composting them now.',
                time: '1 day ago'
            }
        ],
        shares: 15
    },
    {
        id: 5,
        author: 'Rahul Mehta',
        avatar: 'https://thumbs.dreamstime.com/b/d-avatar-man-classic-black-suit-white-shirt-background-suitable-depicting-lawyer-office-worker-professional-333046568.jpg',
        time: '3 days ago',
        category: 'problems',
        content: 'Help needed! My chili plants are getting yellow leaves. I water them regularly and they get good sunlight. Could it be over-watering? The fruits are still developing well but I\'m worried about the yellowing. Any suggestions would be appreciated! 🌶😟',
        images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtdSBaHeU6WCPHPfbqjOYhBYOw2mWK4qHFHkOqCfdAGJq3dWb6UcR6-RnSJ2GAQIdDung&usqp=CAU'],
        likes: 16,
        comments: [
            {
                author: 'Gardening Expert',
                avatar: 'https://t4.ftcdn.net/jpg/12/74/13/73/360_F_1274137375_hetXwsOEVXNlvvkfeQ0Uv1M08isDihw0.jpg',
                content: 'Yellow leaves often indicate over-watering or nutrient deficiency. Check soil drainage and consider adding organic fertilizer.',
                time: '2 days ago'
            },
            {
                author: 'Sita Devi',
                avatar: 'https://thumbs.dreamstime.com/b/d-icon-avatar-cute-smiling-woman-cartoon-hipster-character-people-close-up-portrait-isolated-transparent-png-background-352288997.jpg',
                content: 'I had the same issue. Reduced watering to alternate days and it helped!',
                time: '2 days ago'
            }
        ],
        shares: 4
    },
    {
        id: 6,
        author: 'Kavya Iyer',
        avatar: 'https://thumbs.dreamstime.com/b/d-icon-stylish-smiling-woman-avatar-cartoon-hipster-character-people-close-up-portrait-isolated-transparent-png-background-345422718.jpg',
        time: '4 days ago',
        category: 'success',
        content: '🎉 Success story! Started my garden journey 6 months ago with zero experience. Today I harvested enough vegetables to share with neighbors! From spinach to okra, everything is thriving. Never give up on your green dreams! The satisfaction of eating your own grown food is unmatched! 🥬🍆💚',
        images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop'],
        likes: 67,
        comments: [
            {
                author: 'Green Thumb',
                avatar: 'https://t3.ftcdn.net/jpg/06/44/10/28/360_F_644102868_xx6oa6vchEMguYtBNxfnEUn70wK6a1OK.jpg',
                content: 'Inspiring! Your garden looks amazing. Keep up the great work!',
                time: '3 days ago'
            }
        ],
        shares: 12
    },
    {
        id: 7,
        author: 'Arjun Das',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=50&h=50&fit=crop&crop=face',
        time: '5 days ago',
        category: 'vegetables',
        content: 'My bottle gourd plant is producing huge gourds! 🥒 This one weighs almost 2kg. Indian vegetables grow so well in our climate. Planning to make lauki sabzi tonight! The vines are so healthy this year. 🌿👨‍🌾',
        images: ['https://beejwala.com/cdn/shop/products/bottle-gourd-seeds-3_compressed.jpg?v=1653740226'],
        likes: 29,
        comments: [
            {
                author: 'Food Lover',
                avatar: 'https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg',
                content: 'Wow! That\'s huge! Bottle gourd curry is my favorite. Do share the recipe!',
                time: '4 days ago'
            }
        ],
        shares: 6
    },
    {
        id: 8,
        author: 'Siddharth Kapoor',
        avatar: 'https://thumbs.dreamstime.com/b/d-icon-avatar-cartoon-character-man-businessman-business-suit-looking-camera-isolated-transparent-png-background-275346235.jpg',
        time: '6 days ago',
        category: 'flowers',
        content: 'Rose garden update! 🌹 After months of care, my roses are blooming like never before. The secret? Banana peels as natural fertilizer and daily morning watering. Love the fragrance that fills my garden every morning! ✨🌺',
        images: ['https://img.freepik.com/premium-photo/single-red-rose-with-water-droplets_550296-996.jpg'],
        likes: 38,
        comments: [
            {
                author: 'Rose Expert',
                avatar: 'https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg',
                content: 'Beautiful roses! Banana peels are indeed great for roses. Rich in potassium!',
                time: '5 days ago'
            }
        ],
        shares: 9
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    posts = [...samplePosts];
    renderPosts();
    setupEventListeners();
    animateStats();
    createEmojiGrid();
}

// Enhanced Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburger?.addEventListener('click', toggleMobileMenu);
    
    // Language toggle
    langToggle?.addEventListener('click', toggleLanguage);
    
    // Image upload handling
    imageUpload?.addEventListener('change', handleImageUpload);
    
    // Post submission
    postBtn?.addEventListener('click', handlePostSubmission);
    
    // Emoji button and modal
    emojiBtn?.addEventListener('click', showEmojiModal);
    closeEmoji?.addEventListener('click', hideEmojiModal);

    // AI ideas button and modal
    aiIdeasBtn?.addEventListener('click', handleGetAiIdeas);
    closeAiModal?.addEventListener('click', hideAiModal);
    
    // Image modal
    closeImageModal?.addEventListener('click', hideImageModal);
    prevImage?.addEventListener('click', showPrevImage);
    nextImage?.addEventListener('click', showNextImage);
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => handleFilterChange(tab.dataset.filter));
    });
    
    // Load more posts
    loadMoreBtn?.addEventListener('click', loadMorePosts);
    
    // Close success modal
    closeModal?.addEventListener('click', closeSuccessModal);
    
    // Post content validation
    postContent?.addEventListener('input', validatePostForm);
    postCategory?.addEventListener('change', validatePostForm);
    
    // Auto-resize textarea
    postContent?.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Close modals on outside click
    successModal?.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });
    
    emojiModal?.addEventListener('click', (e) => {
        if (e.target === emojiModal) {
            hideEmojiModal();
        }
    });

    aiModal?.addEventListener('click', (e) => {
      if (e.target === aiModal) {
          hideAiModal();
      }
    });
    
    imageModal?.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            hideImageModal();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && hamburger && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Language toggle (placeholder)
function toggleLanguage() {
    isHindi = !isHindi;
    const textElements = document.querySelectorAll('[data-en], [data-hi]');
    textElements.forEach(el => {
        if (isHindi) {
            el.textContent = el.dataset.hi;
        } else {
            el.textContent = el.dataset.en;
        }
    });

    langToggle.innerHTML = isHindi 
        ? `<i class="fas fa-globe"></i> EN/हिं`
        : `<i class="fas fa-globe"></i> हिं/EN`;
}

// Handle image uploads and create a live preview
function handleImageUpload(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    
    imagePreview.innerHTML = '';
    selectedImages = [];

   
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataURL = e.target.result;
            selectedImages.push(imageDataURL);

            const previewItem = document.createElement('div');
            previewItem.className = 'preview-image';
            
            const imageEl = document.createElement('img');
            imageEl.src = imageDataURL;
            imageEl.alt = 'Preview';
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-image';
            removeBtn.innerHTML = '<i class="fas fa-times"></i>';
            removeBtn.onclick = (e) => {
                e.stopPropagation();
                // Remove from the array and the DOM
                selectedImages = selectedImages.filter(img => img !== imageDataURL);
                previewItem.remove();
                validatePostForm();
            };

            previewItem.appendChild(imageEl);
            previewItem.appendChild(removeBtn);
            imagePreview.appendChild(previewItem);
            
            // Add click listener to open the image modal
            previewItem.addEventListener('click', () => {
                currentImageSet = selectedImages;
                currentImageIndex = selectedImages.indexOf(imageDataURL);
                showImageModal();
            });
        };
        reader.readAsDataURL(file);
    });
    validatePostForm();
}


// Handle new post submission
function handlePostSubmission() {
    if (postContent.value.trim() === '' || postCategory.value === '') {
        return;
    }

    const newPost = {
        id: posts.length + 1,
        author: 'Current User', 
        avatar: 'https://t4.ftcdn.net/jpg/09/17/26/25/360_F_917262500_vkLHa3NChVnaXgoKThxDyYsF0Pa45dwy.jpg',
        time: 'Just now',
        category: postCategory.value,
        content: postContent.value,
        images: [...selectedImages],
        likes: 0,
        comments: [],
        shares: 0
    };

    posts.unshift(newPost); 
    renderPosts();

    
    postContent.value = '';
    postCategory.value = '';
    imageUpload.value = ''; 
    selectedImages = [];
    imagePreview.innerHTML = '';
    validatePostForm();
    
    
    successModal.classList.add('show');
}


function validatePostForm() {
    if (postContent.value.trim() !== '' && postCategory.value !== '') {
        postBtn.disabled = false;
    } else {
        postBtn.disabled = true;
    }
}


function closeSuccessModal() {
    successModal.classList.remove('show');
}


function handleFilterChange(filter) {
    currentFilter = filter;
    filterTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.filter === filter) {
            tab.classList.add('active');
        }
    });
    renderPosts();
}


function loadMorePosts() {
    const postsToLoad = 3;
    const allFilteredPosts = filterPosts();
    loadedPosts += postsToLoad;
    renderPosts();
    if (loadedPosts >= allFilteredPosts.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Filter posts based on current filter
function filterPosts() {
    if (currentFilter === 'all') {
        return posts;
    } else {
        return posts.filter(post => post.category === currentFilter);
    }
}

// Render posts to the feed
function renderPosts() {
    const filteredPosts = filterPosts();
    postsFeed.innerHTML = '';
    const postsToShow = filteredPosts.slice(0, loadedPosts);

    postsToShow.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = createPostHTML(post);
        postsFeed.appendChild(postCard);

        // Add event listeners for new elements
        const likeBtn = postCard.querySelector('.action-btn.like');
        likeBtn.addEventListener('click', () => handleLike(post, likeBtn));
        
        // Add event listeners for opening image modal
        const postImages = postCard.querySelectorAll('.post-image');
        postImages.forEach((imageEl, index) => {
            imageEl.addEventListener('click', () => {
                currentImageSet = post.images;
                currentImageIndex = index;
                showImageModal();
            });
        });
    });

    // Handle "load more" button visibility
    if (filteredPosts.length > loadedPosts) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// Generates the HTML for a single post card
function createPostHTML(post) {
    const imagesHtml = post.images.map(img => `
        <div class="post-image">
            <img src="${img}" alt="Gardening Post Image">
        </div>
    `).join('');

    let imageGridClass = '';
    if (post.images.length === 1) {
        imageGridClass = 'single';
    } else if (post.images.length === 2) {
        imageGridClass = 'double';
    } else if (post.images.length > 2) {
        imageGridClass = 'multiple';
    }

    const commentsHtml = post.comments.map(comment => `
        <div class="comment">
            <div class="comment-avatar">
                <img src="${comment.avatar}" alt="${comment.author}">
            </div>
            <div class="comment-content">
                <p class="comment-author">${comment.author}</p>
                <p class="comment-text">${comment.content}</p>
                <p class="comment-time">${comment.time}</p>
            </div>
        </div>
    `).join('');

    return `
        <div class="post-header">
            <div class="post-avatar">
                <img src="${post.avatar}" alt="${post.author}">
            </div>
            <div class="post-user-info">
                <h4>${post.author}</h4>
                <div class="post-meta">
                    <span>${post.time}</span>
                    <span class="category-badge">${post.category}</span>
                </div>
            </div>
        </div>
        <div class="post-content">
            <p class="post-text">${post.content}</p>
            <div class="post-images ${imageGridClass}">
                ${imagesHtml}
            </div>
        </div>
        <div class="post-actions">
            <div class="action-buttons">
                <button class="action-btn like" data-id="${post.id}">
                    <i class="fas fa-heart"></i>
                    <span>Like</span>
                </button>
                <button class="action-btn comment">
                    <i class="fas fa-comment-alt"></i>
                    <span>Comment</span>
                </button>
                <button class="action-btn share">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
            </div>
            <div class="post-stats">
                ${post.likes} likes, ${post.shares} shares
            </div>
        </div>
        <div class="comments-section">
            ${commentsHtml}
        </div>
    `;
}

// Handle liking a post
function handleLike(post, likeBtn) {
    const isLiked = likeBtn.classList.toggle('liked');
    if (isLiked) {
        post.likes++;
    } else {
        post.likes--;
    }
    // Re-render the specific post to update the likes count
    // A more efficient way would be to just update the count element, but this is simpler for this example.
    renderPosts(); 
}

// Enhanced Stats Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let current = 0;
                const increment = Math.ceil(target / 200); // Adjust speed
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current > target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = current.toLocaleString();
                }, 10);
                
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Emoji Modal Functions
function createEmojiGrid() {
    emojiGrid.innerHTML = '';
    Object.values(emojiCategories).forEach(category => {
        category.forEach(emoji => {
            const button = document.createElement('button');
            button.textContent = emoji;
            button.addEventListener('click', () => {
                insertEmoji(emoji);
                hideEmojiModal();
            });
            emojiGrid.appendChild(button);
        });
    });
}

function showEmojiModal() {
    emojiModal.classList.add('show');
}

function hideEmojiModal() {
    emojiModal.classList.remove('show');
}

function insertEmoji(emoji) {
    const start = postContent.selectionStart;
    const end = postContent.selectionEnd;
    const text = postContent.value;
    postContent.value = text.substring(0, start) + emoji + text.substring(end);
    postContent.focus();
    postContent.selectionEnd = start + emoji.length;
    validatePostForm();
}

// Image Modal Functions
function showImageModal() {
    modalImage.src = currentImageSet[currentImageIndex];
    imageModal.classList.add('show');
}

function hideImageModal() {
    imageModal.classList.remove('show');
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImageSet.length) % currentImageSet.length;
    modalImage.src = currentImageSet[currentImageIndex];
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImageSet.length;
    modalImage.src = currentImageSet[currentImageIndex];
}

// Keyboard shortcuts for modals
function handleKeyboardShortcuts(e) {
    if (imageModal.classList.contains('show')) {
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'Escape') hideImageModal();
    }
    if (emojiModal.classList.contains('show') && e.key === 'Escape') {
        hideEmojiModal();
    }
    if (successModal.classList.contains('show') && e.key === 'Escape') {
        closeSuccessModal();
    }
    if (aiModal.classList.contains('show') && e.key === 'Escape') {
        hideAiModal();
    }
}

// AI Suggestions Modal Functions
async function handleGetAiIdeas() {
    const category = postCategory.value;
    if (!category) {
        showAiModal("Please select a category first to get ideas.");
        hideAiLoader();
        return;
    }

    showAiModal();
    showAiLoader();
    aiSuggestionsList.innerHTML = '';
    aiError.style.display = 'none';

    try {
        const prompt = `Generate three short, creative post ideas for a gardening community app. The posts should be about the category: "${category}". Return the ideas as a JSON array of strings. Do not include any extra text outside the JSON array.`;
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: {
                        type: "STRING"
                    }
                }
            }
        };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

        let response = await fetchWithExponentialBackoff(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            
            const jsonString = result.candidates[0].content.parts[0].text;
            let ideas = null;
            try {
              ideas = JSON.parse(jsonString);
            } catch (e) {
              console.error("JSON parsing failed:", e, "Original response:", jsonString);
              showAiError("Could not retrieve AI ideas due to a format error. Please try again.");
              return;
            }

            if (Array.isArray(ideas) && ideas.length > 0) {
                displayAiSuggestions(ideas);
            } else {
                showAiError("No ideas were generated. Please try again or select a different category.");
            }

        } else {
            showAiError("Could not retrieve AI ideas. Please try again.");
        }

    } catch (error) {
        console.error('Error fetching AI ideas:', error);
        showAiError("Failed to fetch ideas due to a network or parsing error. Please check your connection or try again.");
    } finally {
        hideAiLoader();
    }
}

function showAiModal(message) {
  aiModal.classList.add('show');
  if (message) {
    aiSuggestionsList.innerHTML = `<p>${message}</p>`;
  }
}

function hideAiModal() {
  aiModal.classList.remove('show');
}

function showAiLoader() {
  aiLoader.style.display = 'block';
  aiSuggestionsList.style.display = 'none';
}

function hideAiLoader() {
  aiLoader.style.display = 'none';
  aiSuggestionsList.style.display = 'flex';
}

function showAiError(message) {
  aiError.textContent = message;
  aiError.style.display = 'block';
  aiSuggestionsList.innerHTML = '';
}

function displayAiSuggestions(ideas) {
    aiSuggestionsList.innerHTML = '';
    ideas.forEach(idea => {
        const ideaItem = document.createElement('div');
        ideaItem.className = 'ai-suggestion-item';
        ideaItem.textContent = idea.trim();
        ideaItem.addEventListener('click', () => {
            postContent.value = idea.trim();
            hideAiModal();
            validatePostForm();
        });
        aiSuggestionsList.appendChild(ideaItem);
    });
}

// Utility function for exponential backoff
async function fetchWithExponentialBackoff(url, options, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return response;
            }
        } catch (error) {
            // Log a console warning for retries, but don't show the user.
            console.warn(`Fetch failed (retry ${i + 1}/${retries}). Retrying in ${delay}ms...`);
        }
        await new Promise(resolve => setTimeout(resolve, delay * (2 ** i)));
    }
    throw new Error('All retries failed.');
}
