import React from 'react';
import { useState, useRef } from 'react';
import { isEmailValid } from '../../utils/EmailUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { BLOG_REQUEST_ADD_ADDRESS } from '../../utils/PageAddressUtil';
import BlogRequestEmailValidationForm from './BlogRequestEmailValidationForm';
import { FormError } from '../../types';

function startCountdown(button: HTMLButtonElement, countdownInterval: NodeJS.Timeout | undefined, countdown: number): NodeJS.Timeout {
    button.textContent = `重新发送(${countdown}s)`;

    const interval = setInterval(function () {
        countdown--;
        button.textContent = `重新发送(${countdown}s)`;

        if (countdown <= 0) {
            clearInterval(interval);
            button.disabled = false;
            button.textContent = '重发验证码';
            countdown = 120;
        }
    }, 1000);
    
    return interval;
}

export default function BlogRequestEmailValidation(): React.JSX.Element {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [error, setError] = useState<FormError>({});

    const adminEmailInputRef = useRef<HTMLInputElement>(null);
    const sendCodeInputRef = useRef<HTMLButtonElement>(null);
    const emailValidationCodeInputRef = useRef<HTMLInputElement>(null);
    const emailValidationButtonRef = useRef<HTMLButtonElement>(null);

    const sendEmailVerificationCode = async (formDataParam: Record<string, string>): Promise<void> => {
        const resp = await RequestUtil.post('/api/blog-requests/validation-code',
            JSON.stringify(formDataParam),
            { 'Content-Type': 'application/json' }
        );

        if (typeof resp === 'string' || resp.status !== 201) {
            if (typeof resp !== 'string') {
                const respBody = await resp.json();
                setError(respBody as FormError);
            }
        } else {
            // display
            if (sendCodeInputRef.current) {
                sendCodeInputRef.current.disabled = true;
            }
            let countdownInterval: NodeJS.Timeout | undefined;
            let countdown = 120;

            if (adminEmailInputRef.current) {
                adminEmailInputRef.current.disabled = true;
            }
            if (emailValidationCodeInputRef.current) {
                emailValidationCodeInputRef.current.style.display = 'block';
            }
            if (emailValidationButtonRef.current) {
                emailValidationButtonRef.current.style.display = 'block';
            }

            if (sendCodeInputRef.current) {
                startCountdown(sendCodeInputRef.current, countdownInterval, countdown);
            }
        }
    };

    const verifiyEmailAndCode = async (formDataParam: Record<string, string>): Promise<void> => {
        const resp = await RequestUtil.post('/api/blog-requests/email-validation',
            JSON.stringify(formDataParam),
            { 'Content-Type': 'application/json' }
        );

        if (typeof resp === 'string' || resp.status !== 200) {
            if (typeof resp !== 'string') {
                const respBody = await resp.json();
                setError(respBody as FormError);
            }
        } else {
            const adminEmail = formDataParam['adminEmail'];
            const emailVerificationCode = formDataParam['emailVerificationCode'];
            const address = BLOG_REQUEST_ADD_ADDRESS + `?adminEmail=${adminEmail}&emailVerificationCode=${emailVerificationCode}`;
            redirectTo(address);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'emailVerificationCode'
                ? value.replace(/[^0-9]/g, '').slice(0, 6)
                : value
        });
    };

    const handleValidationButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        const adminEmail = formData['adminEmail'];
        if (!adminEmail || !isEmailValid(adminEmail)) {
            const error: FormError = { code: 'blog_request_admin_email_invalid', message: '请输入正确的邮箱' };
            setError(error);
            return;
        }

        setError({ code: '', message: '' });

        // send request
        sendEmailVerificationCode(formData);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        verifiyEmailAndCode(formData);
    };

    return (
        <BlogRequestEmailValidationForm
            formData={formData}
            error={error}
            adminEmailInputRef={adminEmailInputRef}
            sendCodeInputRef={sendCodeInputRef}
            emailValidationCodeInputRef={emailValidationCodeInputRef}
            emailValidationButtonRef={emailValidationButtonRef}
            handleValidationButtonClick={handleValidationButtonClick}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isAdminPage={false} />
    );
}