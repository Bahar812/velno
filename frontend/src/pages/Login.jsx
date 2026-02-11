import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_PASSWORD, isDashboardAuthed, setDashboardAuthed } from '../utils/authStorage';

function Login() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isDashboardAuthed()) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    const onSubmit = (event) => {
        event.preventDefault();
        if (password === DASHBOARD_PASSWORD) {
            setDashboardAuthed();
            navigate('/dashboard', { replace: true });
            return;
        }
        setError('Password salah. Coba lagi.');
    };

    return (
        <div className="login-shell">
            <div className="login-card">
                <div className="login-header">
                    <span className="login-kicker">Velno</span>
                    <h1>Masuk Dashboard</h1>
                    <p>Masukkan password untuk mengakses editor landing page.</p>
                </div>
                <form onSubmit={onSubmit} className="login-form">
                    <label className="login-label" htmlFor="login-password">
                        Password
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        className="login-input"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                            if (error) {
                                setError('');
                            }
                        }}
                        placeholder="Masukkan password"
                    />
                    {error ? <div className="login-error">{error}</div> : null}
                    <button type="submit" className="login-btn">
                        Masuk
                    </button>
                </form>
                <p className="login-note">
                    Password default tersimpan di kode. Ubah di file authStorage kalau diperlukan.
                </p>
            </div>
        </div>
    );
}

export default Login;
