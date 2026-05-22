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
            className="absolute top-3.5 right-12 md:-right-2 md:top-1  mr-1 flex size-6 z-10 cursor-pointer items-center justify-center rounded-xl px-1 py-1 border bg-white/80 border-white/80 dark:border-neutral-800 dark:bg-background"
        >
            <FaMoon className="absolute inset-0 m-auto size-5 shrink-0 scale-100 text-neutral-700 transition-all duration-200 dark:scale-0 dark:rotate-77" />
            <FaSun className="absolute inset-0 m-auto size-5 shrink-0 scale-0 rotate-77 text-white transition-all duration-200 dark:scale-100 dark:rotate-0 " />
        </button>
    );
};

export default ModeToggle;