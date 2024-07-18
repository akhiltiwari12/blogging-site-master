const blogSection = document.querySelector('.blogs-section');

// Check if user is authenticated
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        document.getElementById('logout-link').style.display = 'block';
        document.getElementById('login-link').style.display = 'none';
        loadBlogs(user); // Load blogs for authenticated user
    } else {
        // No user is signed in
        document.getElementById('logout-link').style.display = 'none';
        document.getElementById('login-link').style.display = 'block';
        loadBlogs(); // Load blogs without user context
    }
});

// Function to load blogs
function loadBlogs(user) {
    blogSection.innerHTML = ''; // Clear previous content

    // Fetch blogs from Firestore
    db.collection("blogs").get().then((querySnapshot) => {
        querySnapshot.forEach((blog) => {
            // Exclude current blog page from displaying
            if (blog.id !== decodeURI(location.pathname.split("/").pop())) {
                createBlog(blog, user); // Create HTML for each blog
            }
        });
    }).catch((error) => {
        console.error('Error loading blogs:', error);
    });
}

// Function to create HTML for each blog
function createBlog(blog, user) {
    let data = blog.data();
    let blogHTML = `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">Read</a>
    `;
    
    // Display edit and delete buttons for authenticated users
    if (user) {
        blogHTML += `
        <button class="btn edit-btn" onclick="editBlog('${blog.id}')">Edit</button>
        <button class="btn delete-btn" onclick="deleteBlog('${blog.id}')">Delete</button>
        `;
    }
    
    blogHTML += `</div>`;
    blogSection.innerHTML += blogHTML;
}

// Function to edit a blog post
window.editBlog = function (id) {
    // Redirect to editor page with blog ID
    window.location.href = `/editor?id=${id}`;
};

// Function to delete a blog post
window.deleteBlog = function (id) {
    if (confirm('Are you sure you want to delete this blog?')) {
        db.collection('blogs').doc(id).delete().then(() => {
            loadBlogs(auth.currentUser); // Reload blogs after deletion
        }).catch((error) => {
            console.error('Error deleting blog:', error);
        });
    }
};
