// DropdownMenu.js
import React from 'react';

function DropdownMenu({ onDeleteAccount }) {
  const handleDeleteAccount = () => {
    onDeleteAccount();
  };

  return (
    <div className="dropdown-menu">
      <button onClick={handleDeleteAccount}>Delete Account</button>
      {}
    </div>
  );
}

export default DropdownMenu;