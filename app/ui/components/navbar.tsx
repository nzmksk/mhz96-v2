"use client";

import { useEffect } from "react";
import styles from "@/app/ui/home.module.css";

export default function ScrollableNavBar() {
  // useEffect is necessary to fix "window is not defined" error
  useEffect(() => {
    let prevScrollPosition: number = window.scrollY;

    window.onscroll = () => {
      const currentScrollPosition: number = window.scrollY;
      const navbar = document.getElementById(`${styles.navbar}`) as HTMLElement;

      // Hides navbar while scrolling downwards
      navbar.style.top =
        prevScrollPosition > currentScrollPosition ? "0" : "-162px";
      navbar.style.opacity =
        prevScrollPosition > currentScrollPosition ? "1" : "0";

      prevScrollPosition = currentScrollPosition;
    };
  }, []);

  return (
    <nav id={styles.navbar}>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#projects">Projects</a>
      <a href="#apps">Apps</a>
      <a href="#blog">Blog</a>
      <a href="#contact">Contact</a>
    </nav>
  );
}
