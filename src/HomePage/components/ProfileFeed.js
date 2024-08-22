import { jwtDecode } from 'jwt-decode';

import React, { useEffect, useState } from 'react';
import './ProfileFeed.css'
function ProfileFeed()
{const [userDetails, setUserDetails] = useState(null);
const [userPosts, setUserPosts] = useState([]);

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
	const cookie = cookies[i].trim();
	if (cookie.startsWith(name + '=')) {
	  return cookie.substring(name.length + 1);
	}
  }
  return '';
}

useEffect(() => {
  // Fetch user details
  const fetchUserDetails = async () => {
	try {
	  const token = getCookie('token');
	  const response = await fetch('http://localhost:3001/api/profile', {
		headers: {
		  Authorization: `Bearer ${token}`,
		},
	  });

	  if (!response.ok) {
		throw new Error('Failed to fetch user details');
	  }

	  const data = await response.json();
	  setUserDetails(data);
	  console.log(data); 
	} catch (error) {
	  console.error('Error fetching user details:', error);
	}
  };

  // Fetch user posts
  const fetchUserPosts = async () => {
	try {
	  const token = getCookie('token');
	  const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; 
	  const response = await fetch(`http://localhost:3001/api/users/${userId}/posts`, {
		headers: {
		  Authorization: `Bearer ${token}`,
		},
	  });

	  if (!response.ok) {
		throw new Error('Failed to fetch user posts');
	  }

	  const posts = await response.json();
	  setUserPosts(posts);
	} catch (error) {
	  console.error('Error fetching user posts:', error);
	}
  };

  fetchUserDetails();
  fetchUserPosts();
}, []);

if (!userDetails) {
  return <div>Loading...</div>;
}

return (
  <div className="home">
	<div className="user-details">
	  <img src={userDetails.profilePhoto} alt={userDetails.username} className="profile-photo" />
	  <h2>{userDetails.firstName} {userDetails.lastName}</h2>
	  <p>Username: {userDetails.username}</p>
	</div>
	<div className="user-posts">
	  <h3>Your Posts</h3>
	  {userPosts.map((post) => (
		<div key={post._id} className="post">
		  {post.photo && <img src={post.photo} alt="Post" className="post-image" />}
		  <p>{post.content}</p>
		  <p><strong>{post.likes}</strong> Likes</p>
		  <div className="comments">
			<h4>Comments</h4>
			<ul>
			  {post.comments.map((comment, index) => (
				<li key={index}>{comment.author}: {comment.content}</li>
			  ))}
			</ul>
		  </div>
		</div>
	  ))}
	</div>
  </div>
);
}

export default ProfileFeed;