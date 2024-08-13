import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useLoginData } from '../auth/AuthContext';
import useLogout from '../auth/hooks/useLogout';
import { useUser } from '../auth/hooks/useUser';

import { User } from '@/shared/types';

export function Navigation() {
    const { loginResponseData } = useLoginData();
    const { currentUser } = useUser();

    const logout = useLogout();
    const [user, setUser] = useState<User | undefined>(currentUser);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser, loginResponseData]);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav
            aria-label='Main navigation'
            className='from-customLightBlue bg-gradient-to-b to-white'
        >
            <div className='text-customDarkBlue m-auto flex h-[98px] w-[1440px] items-center justify-between text-lg font-bold'>
                <span className='ml-20'>{user ? `Welcome, ${user?.email}` : ''}</span>
                {user && (
                    <ul className='mr-20 flex items-center space-x-20'>
                        {user.userRole === 'admin' && (
                            <>
                                <li>
                                    <Link to={'/admin/users'}>Users</Link>
                                </li>
                                <li>
                                    <Link to='/admin/projects'>Projects</Link>
                                </li>
                                <li>
                                    <Link
                                        className='primaryBtn'
                                        to='/admin/projectForm?action=create'
                                    >
                                        Create project
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <button className='logoutBtn' onClick={handleLogout}>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H11C11.2833 3 11.521 3.096 11.713 3.288C11.905 3.48 12.0007 3.71733 12 4C11.9993 4.28267 11.9033 4.52033 11.712 4.713C11.5207 4.90567 11.2833 5.00133 11 5H5V19H11C11.2833 19 11.521 19.096 11.713 19.288C11.905 19.48 12.0007 19.7173 12 20C11.9993 20.2827 11.9033 20.5203 11.712 20.713C11.5207 20.9057 11.2833 21.0013 11 21H5ZM17.175 13H10C9.71667 13 9.47933 12.904 9.288 12.712C9.09667 12.52 9.00067 12.2827 9 12C8.99933 11.7173 9.09533 11.48 9.288 11.288C9.48067 11.096 9.718 11 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44567 16 7.437C16.2833 7.42833 16.525 7.52433 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2877 16.571 16.013 16.563C15.7383 16.555 15.5007 16.4507 15.3 16.25C15.1167 16.05 15.0293 15.8127 15.038 15.538C15.0467 15.2633 15.1423 15.034 15.325 14.85L17.175 13Z'
                                        fill='#008CFF'
                                    />
                                </svg>
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}
