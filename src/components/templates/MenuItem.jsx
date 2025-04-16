import React from 'react';
import styles from './DropdownMenu.module.css';

function MenuItem({ label, icon, onClick, closeMenu }) {
  return (
    <div className={styles.menuItem} role="menuitem" onClick={closeMenu}>
      <button onClick={onClick} className={styles.menuButton}>
        <span className={styles.icon}>
          <img src={icon} alt={`${label} icon`} />
        </span>
        {label}
      </button>
    </div>
  );
}

export default MenuItem;