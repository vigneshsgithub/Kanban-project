"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"; 
import { toggleDarkMode } from "../redux/themeSlice"; 

export default function Switch() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

 
  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="switch-container">
      <h1 className="switch-text">light</h1>
    <label className="switch">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={handleToggle} 
      />
      <span className="slider">
        <div className="star star_1"></div>
        <div className="star star_2"></div>
        <div className="star star_3"></div>
        <div className="cloud"></div>
      </span>
    </label>
    <h1 className="switch-text">dark</h1>
   
    </div>
  );
}
