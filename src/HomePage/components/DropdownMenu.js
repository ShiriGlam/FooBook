// DropdownMenu.js
import React from 'react';

function DropdownMenu({ onDeleteAccount }) {
  const handleDeleteAccount = () => {
    onDeleteAccount();
  };

  return (
    <div className="dropdown-menu">
      <button onClick={handleDeleteAccount}>Delete Account</button>
      {/* Add other menu items here */}
    </div>
  );
}

export default DropdownMenu;