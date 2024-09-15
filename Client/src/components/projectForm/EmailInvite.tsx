import { ComponentPropsWithoutRef, useCallback, useEffect, useState } from 'react';
import { UseFormClearErrors, useFormContext, UseFormSetError } from 'react-hook-form';

import cn from '../../util/cn';
import { ProjectFormDataType } from './types';

type UserSelectorProps = {
    inviteEmails: string[];
    setInviteEmails: React.Dispatch<React.SetStateAction<string[]>>;
    error: string | undefined;
    field: string;
    selectedError: string[];
    setError: UseFormSetError<ProjectFormDataType>;
    clearErrors: UseFormClearErrors<ProjectFormDataType>;
} & ComponentPropsWithoutRef<'input'>;

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export default function EmailInvite({
    inviteEmails,
    setInviteEmails,
    error,
    field,
    selectedError,
    setError,
    clearErrors,
    ...props
}: UserSelectorProps) {
    const [input, setInput] = useState<string>('');
    const [isBlur, setIsBlur] = useState(false);

    const { register } = useFormContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleAddEmail = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;

            if (e.code === 'Space' && isValidEmail(target.value.trim())) {
                setInviteEmails((emails) => [...emails, target.value.trim()]);
                setInput('');
            }
        },
        [setInviteEmails, setInput]
    );

    const handleRemoveEmail = (emailToRemove: string) => {
        setInviteEmails(inviteEmails.filter((email) => email !== emailToRemove));
    };

    useEffect(() => {
        if (selectedError.length === 0 && isBlur) {
            setError('inviteEmails', { message: 'Please add invite email' });
        } else {
            clearErrors('inviteEmails');
        }
    }, [selectedError, isBlur, setError, clearErrors]);

    return (
        <div className='place-items-center'>
            <div
                className={cn(
                    error ? 'border-customRed' : 'border-customBlue',
                    'relative w-full rounded-xl border  text-sm'
                )}
            >
                <input value={inviteEmails} id={field} {...register(field)} className='hidden' />
                {inviteEmails.length ? (
                    <div className='relative flex w-full flex-wrap gap-2 rounded-md  p-2.5'>
                        {inviteEmails.map((email) => {
                            return (
                                <div
                                    key={email}
                                    className='flex w-fit items-center gap-2  px-3  text-customDarkBlue'
                                >
                                    <span>{email}</span>
                                    <div
                                        className='cursor-pointer text-customRed'
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleRemoveEmail(email)}
                                    >
                                        X
                                    </div>
                                </div>
                            );
                        })}
                        <div className='flex-grow text-right'>
                            <span className='cursor-pointer ' onClick={() => setInviteEmails([])}>
                                Clear all
                            </span>
                        </div>
                    </div>
                ) : null}
                <div className='flex w-full items-center justify-between gap-2.5 p-2.5'>
                    <input
                        className='flex-1 bg-transparent text-sm outline-none'
                        {...props}
                        type='text'
                        value={input}
                        onChange={handleInputChange}
                        onBlur={() => setIsBlur(true)}
                        onKeyDown={handleAddEmail}
                    />
                </div>
            </div>
        </div>
    );
}
