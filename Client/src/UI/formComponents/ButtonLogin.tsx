import { ReactNode } from 'react';

interface ChildrenProps {
    children: ReactNode;
    handleLogin: () => void;
}

const ButtonLogin = ({ children, handleLogin }: ChildrenProps) => {
    return (
        <button
            onClick={handleLogin}
            type='button'
            className='mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
            {children}
        </button>
    );
};

export default ButtonLogin;
