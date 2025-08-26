import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';

const RegisterPage = () => {
    return (
        <>
            <header className="text-3xl font-bold text-center p-4">GEMX</header>
        <div className="bg-gray-200 min-h-screen p-8 flex flex-col items-center justify-center">
            <RegisterForm />
        </div>
            <Footer />
        </>
    );
}

export default RegisterPage;