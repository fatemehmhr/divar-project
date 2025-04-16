import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getCookie, removeCookie } from 'utils/cookie';
import { getProfile } from 'services/user';
import DropdownButton from './DropdownButton';
import MenuItem from './MenuItem';
import useDropdown from 'src/hooks/useDropDown';
import styles from './DropdownMenu.module.css';
import adminPanelIcon from '../../../public/adminPanel.png';
import loginIcon from '../../../public/login.png';
import logoutIcon from '../../../public/logout.png';


function DropdownMenu() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isOpen, setIsOpen, toggleMenu, buttonRef, menuRef } = useDropdown();

  // بررسی اولیه وجود توکن
  const hasToken = !!getCookie('accessToken');

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: hasToken,
  });

  const isLoggedIn = !!data;
  const isAdmin = data && data.data.role === 'ADMIN';

  // تابع خروج
  const handleLogout = useCallback(() => {
    removeCookie();
    queryClient.invalidateQueries(['profile']);
    setIsOpen(false);
    navigate('/auth');
    toast.success('با موفقیت خارج شدید');
  }, [navigate, queryClient, setIsOpen]);

  return (
    <nav className={styles.dropdownContainer}>
      <DropdownButton onClick={toggleMenu} isOpen={isOpen} buttonRef={buttonRef} />

      {isOpen && (
        <div ref={menuRef} className={styles.dropdownMenu} role="menu">
          {isAdmin && (
            <MenuItem
              label="پنل ادمین"
              icon={adminPanelIcon}
              onClick={() => navigate('/admin')}
              closeMenu={() => setIsOpen(false)}
            />
          )}

          {isLoggedIn ? (
            <MenuItem
              label="خروج"
              icon={logoutIcon}
              onClick={handleLogout}
              closeMenu={() => setIsOpen(false)}
            />
          ) : (
            <MenuItem
              label="ورود"
              icon={loginIcon}
              onClick={() => navigate('/auth')}
              closeMenu={() => setIsOpen(false)}
            />
          )}
        </div>
      )}
    </nav>
  );
}

export default DropdownMenu;