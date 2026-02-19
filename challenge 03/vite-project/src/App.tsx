import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LinkedListPage from './pages/LinkedListPage';
import DoublyLinkedListPage from './pages/DoublyLinkedListPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/linked-list" element={<LinkedListPage />} />
        <Route path="/doubly-linked-list" element={<DoublyLinkedListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
