import React, { useEffect, useState, useContext, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null); // Initialize as null
    const [isLoading, setIsLoading] = useState(true);

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const LogoutUser = () => {
        setToken(null);
        localStorage.removeItem("token");
        setUser(null); // Clear user state on logout
    };

    // New centralized login function
    const loginUser = async (loginData) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const result = await response.json();
                const accessToken = result.data.accessToken;
                storeTokenInLS(accessToken);
                // The fetchUserData useEffect will now automatically run and update the user state.
                return { success: true, message: result.message || 'Login successful!' };
            } else {
                const errorResult = await response.json();
                return { success: false, message: errorResult.message || 'Login failed.' };
            }
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, message: "An unexpected error occurred." };
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserData = async () => {
        if (!token) {
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch('/api/v1/users/current-user', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User data from API:", data.data);
                setUser(data.data);
            } else {
                setUser(null);
                localStorage.removeItem("token");
                setToken(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [token]);

    const isLoggedIn = !!token;

    console.log("Is logged in:", isLoggedIn);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, fetchUserData, isLoading, token, loginUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the AuthProvider");
    }
    return authContextValue;
};