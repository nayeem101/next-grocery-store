import styles from "../styles/Navbar.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>&copy;Smart Grocery ltd; {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
