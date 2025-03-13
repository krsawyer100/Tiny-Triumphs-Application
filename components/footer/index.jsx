// import styles from "./style.module.css";
import Link from "next/link";

export default function Footer() {

  return (
    
    <footer>
      <div>
        <>
          <div>
            <p>
              <Link href="/about">About</Link>
            </p>
            <p>
              <Link href="/resources">Resources</Link>
            </p>
            <p>
              <Link href="/contact">Contact</Link>
            </p>
            <p>
              <Link href="/login">Login</Link>
            </p>
            <p>
              <Link href="/quiz">Try Our Quiz</Link>
            </p>
          </div>
          <div>
            <p>&copy; 2025 Tiny Triumphs - All Rights Reserved.</p>
          </div>
        </>
      </div>
    </footer>
  );
}