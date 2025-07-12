const ErrorMessage = ({ message }) => {
  return (
    <div style={{ color: 'red', margin: '20px' }}>
      <strong>Error:</strong> {message}
    </div>
  );
};

export default ErrorMessage;
