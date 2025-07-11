import { useState } from 'react';

import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <p>Ceci est un test de l'application React avec Material UI</p>
      <Button variant="contained" color="primary">
        Click here
      </Button>
    </div>
  );
}

export default App;
