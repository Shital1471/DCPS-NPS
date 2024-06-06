document.addEventListener("DOMContentLoaded", function() {
  const menuIcon = document.querySelector('.menu-icon');
  const menuItems = document.querySelector('.menu-items');

  menuIcon.addEventListener('click', function() {
    menuItems.style.display = menuItems.style.display === 'flex' ? 'none' : 'flex';
  });
});


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeEHF16yzYfnXmezIdH3HwU7I8c8EN6BI",
    authDomain: "postupload-515e6.firebaseapp.com",
    databaseURL: "https://postupload-515e6-default-rtdb.firebaseio.com",
    projectId: "postupload-515e6",
    storageBucket: "postupload-515e6.appspot.com",
    messagingSenderId: "681377336651",
    appId: "1:681377336651:web:1e3ac1a3d43464af1facce",
    measurementId: "G-NMW7YFENK8"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Function to display posts
  function displayPosts() {
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = '';
      snapshot.forEach(doc => {
        const post = doc.data();
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
          <div class="image-container">
            <img src="${post.imageUrl}" alt="Post Image" class="post-image" onerror="handleImageError(this)">
            <div class="loading-indicator" id="loading-indicator"></div>
          </div>
          <h2 class="post-title">${post.title}</h2>
          <p class="post-message">${post.content}</p>
          <div class="post-actions">
            <button class="like-button" onclick="likePost('${doc.id}')">
              <i class="fas fa-thumbs-up"></i> Like <span id="like-count-${doc.id}">${post.likes || 0}</span>
            </button>
            <button class="comment-button" onclick="commentPost('${doc.id}')">
              <i class="fas fa-comment"></i> Comment
            </button>
            <button class="share-button" onclick="sharePost('${doc.id}')">
              <i class="fas fa-share"></i> Share
            </button>
          </div>
        `;
        postsContainer.appendChild(postElement);
      });
    });
  }
  
  // Function to handle image error
  function handleImageError(image) {
    image.src = 'default-image.jpg';
  }
  
  // Like post function
  async function likePost(postId) {
    const postRef = db.collection('posts').doc(postId);
    const postDoc = await postRef.get();
    if (postDoc.exists) {
      const currentLikes = postDoc.data().likes || 0;
      await postRef.update({
        likes: currentLikes + 1
      });
    }
  }
  
  // Comment post function
  function commentPost(postId) {
    const comment = prompt('Enter your comment:');
    if (comment) {
      db.collection('posts').doc(postId).collection('comments').add({
        text: comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  }
  
  // Share post function
  function sharePost(postId) {
    alert('Post shared successfully!');
  }
  

  window.onload = displayPosts;
  