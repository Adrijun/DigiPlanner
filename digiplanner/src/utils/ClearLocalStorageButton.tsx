// ClearLocalStorageButton.tsx
import React from 'react';
import { Button, Alert, Col } from 'react-bootstrap';

interface ClearLocalStorageButtonProps {
  onClear: () => void;
}

const ClearLocalStorageButton: React.FC<ClearLocalStorageButtonProps> = ({
  onClear,
}) => {
  const handleClearLocalStorage = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all data?'
    );
    if (confirmed) {
      localStorage.clear();
      if (onClear) {
        onClear();
        window.location.reload();
      }
    }
  };

  return (
    <Col xs={8} xl={4} className="m-4">
      <article className="m-2 ">
        <Alert variant="info" className="">
          <Alert.Heading>Good job!</Alert.Heading>
          <hr />
          <p>
            If you want to start over, just click the button to clear the data.
          </p>
          <Button
            className="btn-success mb-1"
            variant="info"
            onClick={handleClearLocalStorage}
          >
            Clear data
          </Button>
        </Alert>
      </article>
    </Col>
  );
};

export default ClearLocalStorageButton;
