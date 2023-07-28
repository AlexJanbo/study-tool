import React from 'react'
import Register from './pages/signed-out/Register';
import { AddUser } from './features/auth/AddUser';

function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      <AddUser />
    </div>
  );
}

export default App;
