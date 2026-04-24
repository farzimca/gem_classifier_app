import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

const ModeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [systemTheme, setSystemTheme] = useState("light");

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark");
        setSystemTheme(mediaQuery.matches ? "dark" : "light");

        const handleChange = (e) => {
            setSystemTheme(mediaQuery.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const SWITCH_THEME = () => {
        switch (theme) {
            case "light": {
                setTheme("dark");
                return;
            }
            case "dark": {
                setTheme("light");
                return;
            }
            case "system": {
                setTheme(systemTheme === "dark" ? "light" : "dark");
                return;
            }
        }
    }

    return (
        <button onClick={SWITCH_THEME}
            className="fixed bottom-3 lg:bottom-5 right-2 lg:right-5 flex size-10 md:size-12 z-10 cursor-pointer items-center justify-center rounded-xl p-3 border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-200 bg-neutral-900"
        >
            <FaSun className="absolute inset-0 m-auto size-9 p-1 shrink-0 scale-100 text-neutral-200 transition-all duration-300 dark:scale-0 dark:rotate-45 " />
            <FaMoon className="absolute inset-0 m-auto size-9 p-1 shrink-0 scale-0 rotate-45 text-neutral-500 transition-all duration-300 dark:scale-100 dark:rotate-0 dark:text-neutral-900" />
        </button>
    );
};

export default ModeToggle;