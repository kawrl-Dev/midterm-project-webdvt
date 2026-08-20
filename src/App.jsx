import NavigationBar from './components/NavigationBar.jsx';
import WebsiteFooter from './components/WebsiteFooter.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider } from './context/ThemeContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/global.css';
import Dashboard from './pages/Dashboard.jsx';
import AddTransaction from './pages/AddTransaction.jsx';
import TransactionDetails from './pages/TransactionDetails.jsx';
import Summary from './pages/Summary.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <NavigationBar/>
          <main className="flex-grow-1 pt-5 mt-4">
            <Routes>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-transaction" element={<AddTransaction />} />
              <Route path="/transaction/:id" element={<TransactionDetails />} />
              <Route path="/summary" element={<Summary />} />
            </Routes>
          </main>
          <WebsiteFooter/>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}