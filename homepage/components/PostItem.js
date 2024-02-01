import React from 'react';

function PostItem({ photo }) {
  return (
    <div className="post">
      <img src={photo} alt="Post" />
    </div>
  );
}

export default PostItem;
