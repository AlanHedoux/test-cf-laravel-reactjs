import { CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress color="success" />
      <p>Chargement...</p>
    </div>
  );
};

export default Loader;
