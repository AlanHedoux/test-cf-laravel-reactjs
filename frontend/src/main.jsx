import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter.jsx';

import './index.css';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
  document.getElementById('root')
);
