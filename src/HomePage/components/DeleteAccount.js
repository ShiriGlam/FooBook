
import React, { useState } from 'react';
import './DeleteAccount.css'
function DeleteAccount({ onDeleteAccount }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteAccount = () => {
    if (showConfirmation) {
      onDeleteAccount();
      // Close the confirmation dialog after deletion
      setShowConfirmation(false); 
    } else {
      // Show the confirmation dialog
      setShowConfirmation(true); 
    }
  };

  return (
    <div className="dropdown-menu">
      <button onClick={handleDeleteAccount}>Delete Account</button>
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-dialog">
            <p>Are you sure you want to delete this account? This will permanently delete this account and everything associated with it.</p>
            <div className="confirmation-buttons">
              <button onClick={handleDeleteAccount}>Confirm Delete</button>
              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;