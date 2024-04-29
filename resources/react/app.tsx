import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';

import '../css/app.css';

ReactDOM.createRoot(document.getElementById('root') as any).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
