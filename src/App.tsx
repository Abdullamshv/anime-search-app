import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './features/search/SearchPage';
import DetailPage from './features/detail/DetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/anime/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

