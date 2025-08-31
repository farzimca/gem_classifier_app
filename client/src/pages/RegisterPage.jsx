import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <>
            <header className="text-3xl font-bold text-center p-4">
                <Link to="/" className="text-purple-600 hover:text-purple-800 transition-colors">
                    GEMX
                </Link>
            </header>
            <div className="bg-gray-200 min-h-screen p-8 flex flex-col items-center justify-center">
                <RegisterForm />
            </div>
            <Footer />
        </>
    );
}

export default RegisterPage;