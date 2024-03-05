// ClearLocalStorageButton.tsx
import React from 'react';
import { Button, Alert } from 'react-bootstrap';

interface ClearLocalStorageButtonProps {
  onClear: () => void;
}

const ClearLocalStorageButton: React.FC<ClearLocalStorageButtonProps> = ({
  onClear,
}) => {
  const handleClearLocalStorage = () => {
    const confirmed = window.confirm(
      'Är du säker på att du vill rensa localStorage?'
    );
    if (confirmed) {
      localStorage.clear();
      if (onClear) {
        onClear();
      }
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleClearLocalStorage}>
        Clear localStorage
      </Button>
      {/* Visa en Bootstrap alert med instruktioner för att rensa localStorage */}
      <Alert variant="danger" className="mt-3">
        Klicka på knappen ovan för att rensa localStorage. Observera att detta
        åtgärd inte kan ångras.
      </Alert>
    </div>
  );
};

export default ClearLocalStorageButton;
