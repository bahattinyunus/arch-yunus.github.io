
import { useEffect, useState } from "react";

const KONAMI_CODE = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
];

export const useKonamiCode = () => {
    const [index, setIndex] = useState(0);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === KONAMI_CODE[index]) {
                const nextIndex = index + 1;
                if (nextIndex === KONAMI_CODE.length) {
                    setSuccess(current => !current); // Toggle on success
                    setIndex(0);
                } else {
                    setIndex(nextIndex);
                }
            } else {
                setIndex(0); // Reset if wrong key
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [index]);

    return success;
};
