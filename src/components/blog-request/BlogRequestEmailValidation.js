import { useState, useRef } from 'react';
import { isEmailValid } from '../../utils/EmailUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { BLOG_REQUEST_ADD_ADDRESS, BLOG_REQUESTS_ADDRESS } from '../../utils/PageAddressUtil';
import BlogRequestEmailValidationForm from './BlogRequestEmailValidationForm';

function startCountdown(button, countdownInterval, countdown) {
    button.textContent = `重新发送(${countdown}s)`;

    countdownInterval = setInterval(function () {
        countdown--;
        button.textContent = `重新发送(${countdown}s)`;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            button.disabled = false;
            button.textContent = '重发验证码';
            countdown = 120;
        }
    }, 1000);
}

export default function BlogRequestEmailValidation() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState({});

    const adminEmailInputRef = useRef(null);
    const sendCodeInputRef = useRef(null);
    const emailValidationCodeInputRef = useRef(null);
    const emailValidationButtonRef = useRef(null);

    const sendEmailVerificationCode = async (formData) => {
        const resp = await RequestUtil.post('/api/blog-requests/validation-code',
            JSON.stringify(formData),
            { 'Content-Type': 'application/json' }
        );

        if (resp.status != 201) {
            const respBody = await resp.json();
            setError(respBody);
        }
    };

    const verifiyEmailAndCode = async (formData) => {
        const resp = await RequestUtil.post('/api/blog-requests/email-validation',
            JSON.stringify(formData),
            { 'Content-Type': 'application/json' }
        );

        if (resp.status != 200) {
            const respBody = await resp.json();
            setError(respBody);
        } else {
            redirectTo(BLOG_REQUEST_ADD_ADDRESS, 3);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'emailVerificationCode'
                ? value.replace(/[^0-9]/g, '').slice(0, 6)
                : value
        });
    };

    const handleValidationButtonClick = () => {
        const adminEmail = formData['adminEmail'];
        if (!isEmailValid(adminEmail)) {
            const e = { code: 'blog_request_admin_email_invalid', message: '请输入正确的邮箱' }
            setError(e);
            return;
        }

        setError({ code: '', message: '' });

        // send request
        sendEmailVerificationCode(formData);

        // display
        sendCodeInputRef.current.disabled = true;
        let countdownInterval;
        let countdown = 120;

        adminEmailInputRef.current.disabled = true;
        emailValidationCodeInputRef.current.style.display = 'block';
        emailValidationButtonRef.current.style.display = 'block';

        startCountdown(sendCodeInputRef.current, countdownInterval, countdown);
    };


    const handleSubmit = (e) => {
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
            handleSubmit={handleSubmit} />
    )
}