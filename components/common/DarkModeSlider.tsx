import { Root, Label } from "./DarkModeSlider.styled";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useEffect, useState } from "react";
const DarkModeSlider = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  const handleToggle = (event: any) => {
    setDarkTheme(event.target.checked);
  };

  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        document.documentElement.setAttribute("data-theme", "dark");
        window.localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        window.localStorage.setItem("theme", "light");
      }
    }
  }, [darkTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );

    setDarkTheme(initialColorValue === "dark");
  }, []);
  return (
    <Root>
      <input
        type="checkbox"
        id="idDarkModeSlider"
        className="checkbox"
        checked={darkTheme}
        onChange={handleToggle}
      />
      <Label htmlFor="idDarkModeSlider" className="label">
        <DarkModeIcon className="fa-moon" fontSize="small" />
        <LightModeIcon className="fa-sun" fontSize="small" />
        <div className="ball" />
      </Label>
    </Root>
  );
};

export default DarkModeSlider;
