import React from 'react';
import Footer from '../components/Footer';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
    return (
        <>
        <header className="text-3xl font-bold text-center p-4">GEMX</header>
        <div className="bg-gray-200 min-h-screen p-8 flex flex-col items-center justify-center">
            <ForgotPasswordForm />
        </div>
            <Footer />
        </>
    );
}

export default ForgotPasswordPage;