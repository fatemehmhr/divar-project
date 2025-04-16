import styles from './DropdownMenu.module.css';

function DropdownButton({ onClick, isOpen, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={styles.dropdownButton}
      aria-label="منوی دیوار من"
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      <span className={styles.buttonContent}>
        <img src="profile.svg" alt="آیکون پروفایل" className={styles.profileIcon} />
        <p>دیوار من</p>
      </span>
    </button>
  );
}

export default DropdownButton;