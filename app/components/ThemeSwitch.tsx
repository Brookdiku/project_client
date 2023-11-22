"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/button";
import { FiSun, FiMoon } from "react-icons/fi";
export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div>
      <Button
        onPress={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
        isIconOnly
        color="warning"
        aria-label="Like"
      >
        {theme === "dark" ? <FiSun /> : <FiMoon />}
      </Button>
    </div>
  );
}
