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
  function fetchPosts() {
    db.collection("posts").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        renderPost(doc.data());
      });
    });
  }
  function renderPost(postData) {
    const postsContainer = document.getElementById('posts-container');
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
  
    postDiv.innerHTML = `
      <div class="displayname">
        <div class="box1">
          <div class="person-icon"><i class='bx bxs-user'></i></div>
          <div class="user-name">${postData.email}</div>
        </div>
        <div class="menu-icon"><i class='bx bx-dots-horizontal-rounded'></i></div>
      </div>
      <div class="post-content"><img src="${postData.imageUrl}" alt="Post Image" class="post-image" onerror="handleImageError(this)">
            <div class="loading-indicator" id="loading-indicator"></div>
</div>
      <div class="post-actions">
        <div>
           <button class="like-button"  onclick="likePost('${postData.id}')">${postData.likes === 0 ? '<i class="bx bxs-like"></i>' : `<i class="bx bxs-like"></i>`}</button>
        <button class="dislike-button" onclick="dislikePost('${postData.id}')">${postData.dislikes === 0 ? '<i class="bx bxs-dislike"></i>' : `<i class="bx bxs-dislike"></i> `}</button>
        </div>
        <div>
          <button class="share-button" onclick="sharePost('${postData.id}')"><i class='bx bxs-share'></i></button>
          <button class="save-button" onclick="savePost('${postData.id}')"><i class='bx bxs-save'></i></button>
        </div>
      </div>
      <div class="caption">${postData.title} </div>
      <p>${postData.content}</p>
    `;
  
    postsContainer.appendChild(postDiv);
  }
  
  function handleImageError(image) {
    image.src = 'default-image.jpg'; // Replace with your default image path
  }
  
  // Function to like a post
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
  
  // Function to dislike a post
  async function dislikePost(postId) {
    const postRef = db.collection('posts').doc(postId);
    const postDoc = await postRef.get();
    if (postDoc.exists) {
      const currentDislikes = postDoc.data().dislikes || 0;
      await postRef.update({
        dislikes: currentDislikes + 1
      });
    }
  }
  
  // Function to save a post
  function savePost(postId) {
    // Implement your save logic here, for example, add to a "saved" collection or toggle save state
    alert('Post saved successfully!');
  }
  
  // Function to share a post
  function sharePost(postId) {
    alert('Post shared successfully!');
  }
  window.onload = function() {
    fetchPosts();
  };
  