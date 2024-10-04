import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Update import
import { Home, List, Login, Register, Create, Update, Leave, Holiday, Profile } from "./components";
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-user" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/holiday-list" element={<Holiday />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
