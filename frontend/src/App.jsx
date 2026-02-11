import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import { UiProvider } from './context/UiContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { isDashboardAuthed } from './utils/authStorage';

function LandingPage() {
    return (
        <div className="bg-velno min-h-screen pt-20">
            <Nav />
            <Home />
            <Footer />
            <WhatsAppFloat />
        </div>
    );
}

function RequireAuth({ children }) {
    return isDashboardAuthed() ? children : <Navigate to="/login" replace />;
}

function App() {
    return (
        <UiProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </UiProvider>
    );
}

export default App;
