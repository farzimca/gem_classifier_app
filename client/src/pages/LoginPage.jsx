import React from 'react';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

const LoginPage = () => {
    return (
        <>
            <header className="text-3xl font-bold text-center p-4">GEMX</header>
        <div className="bg-gray-200 min-h-screen p-8 flex flex-col items-center justify-center">
            <LoginForm />
        </div>
            <Footer />
        </>
    );
}

export default LoginPage;