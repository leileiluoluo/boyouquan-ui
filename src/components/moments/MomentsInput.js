import { Box, Flex, TextField, TextArea, Text, Button, Link, Avatar, Tooltip } from '@radix-ui/themes';
import { Form } from '@radix-ui/react-form';
import { CheckboxIcon, ImageIcon, Link1Icon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';
import { isEmailValid } from '../../utils/EmailUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { MOMENTS_ADDRESS } from '../../utils/PageAddressUtil';
import { getCookie, setCookie } from '../../utils/CookieUtil';

export default function MomentsInput() {
    const emailInputRef = useRef(null);
    const inputRef = useRef(null);

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [blogInfo, setBlogInfo] = useState(null);
    const [email, setEmail] = useState(() => getCookie('email'));
    const [description, setDescription] = useState(null);
    const [blogDomainName, setBlogDomainName] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState({});

    const emailValidation = (email) => {
        if (undefined === email || null == email || '' === email.trim()) {
            return { code: 'email_invalid', message: '未提供邮箱！' };
        }

        if (!isEmailValid(email.trim())) {
            return { code: 'email_invalid', message: '邮箱格式不正确！' };
        }

        return null;
    }

    const getBlogInfo = async (adminEmail) => {
        const resp = await RequestUtil.get(`/api/blogs/by-admin-email?adminEmail=${adminEmail}`);

        if (resp.status == 200) {
            const respBody = await resp.json();
            if (respBody.length > 0) {
                setBlogInfo(respBody[0]);
                setBlogDomainName(respBody[0].domainName);
            } else {
                setBlogInfo(null);
                setBlogDomainName(null);
            }
        }
    }

    const submit = async () => {
        setSubmitButtonDisabled(true);
        const formDataToSend = new FormData();

        formDataToSend.append('blogDomainName', blogDomainName);
        formDataToSend.append('description', description);
        formDataToSend.append('file', file);
        const resp = await RequestUtil.post('/api/moments',
            formDataToSend,
            {}
        );

        if (resp.status == 413) {
            setError({ code: 'file_invalid', message: '文件不能大于 10 M' });
        } else if (resp.status != 201) {
            const respBody = await resp.json();
            setError(respBody);
        } else {
            setError({ code: '', message: '' });
            redirectTo(MOMENTS_ADDRESS);

            // cookie
            setCookie('email', email);
        }

        setSubmitButtonDisabled(false);
    }

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
        var error = emailValidation(email);
        if (null === error) {
            getBlogInfo(email);
        } else {
            setBlogInfo(null);
            setBlogDomainName(null);
        }
    };

    const handleChange = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var error = emailValidation(email);
        if (null === error) {
            if (undefined === description || null == description || '' === description.trim()) {
                error = { code: 'description_invalid', message: '未提供描述！' };
            }
        }

        if (null === error) {
            if (description.trim().length < 10) {
                error = { code: 'description_invalid', message: '描述不应少于 10 个字！' };
            }
        }

        if (null === error) {
            if (null == blogInfo || undefined == blogDomainName || null == blogDomainName) {
                error = { code: 'blog_info_invalid', message: '未查询到对应的博客，请输入正确的邮箱！' };
            }
        }

        if (null === error) {
            if (undefined === file || null == file) {
                error = { code: 'file_invalid', message: '未上传图片！' };
            }
        }

        if (null !== error) {
            setError(error);
            return;
        }

        setError({ code: '', message: '' });
        submit();
    }

    const handleIconClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFile(file);
        setError({ code: '', message: '' });
    };

    useEffect(() => {
        // get blog info
        const error = emailValidation(email);
        if (null === error) {
            getBlogInfo(email);
        }

        // timer
        const timer = setTimeout(() => {
            if (emailInputRef.current) {
                const value = emailInputRef.current.value;
                const name = emailInputRef.current.name;
                if ('email' === name && value !== email) {
                    setEmail(value);
                    const error = emailValidation(value);
                    if (null === error) {
                        getBlogInfo(value);
                    }
                }
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [email]);

    return (
        <Box>
            <Form>
                <Flex justify="between" gap="2">
                    <Box minWidth="100px">
                        <Flex direction="column" gap="2" align="center">
                            {
                                blogInfo ? <Link><Avatar
                                    style={{ width: '36px', height: '36px' }}
                                    src={blogInfo.blogAdminLargeImageURL}
                                    radius="full"
                                /></Link> :
                                    <Avatar
                                        style={{ width: '36px', height: '36px' }}
                                        radius="full"
                                    />
                            }
                            {
                                blogInfo ? <Link size="2">{blogInfo.name}</Link> :
                                    <Text size="2">匿名用户</Text>
                            }
                        </Flex>
                    </Box>
                    <Box width="100%">
                        <Flex gap="2" direction="column">
                            <Box>
                                <TextField.Root name="email" placeholder="请输入邮箱" id="email" ref={emailInputRef} onFocus={handleEmailChange} onInput={handleEmailChange} onChange={handleEmailChange} autoComplete="email" value={email} />
                            </Box>

                            <Box>
                                <TextArea size="2" name="description" placeholder="请写一段话 ..." id="description" onChange={handleChange} />
                            </Box>

                            <Flex justify="between">
                                <Box>
                                    <Flex gap="2" align="center">
                                        <Box>
                                            <input
                                                type="file"
                                                ref={inputRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />
                                            <Tooltip content="请上传一张图片" side="top">
                                                <Link><ImageIcon style={{ width: '20px', height: '20px' }} onClick={handleIconClick} /></Link>
                                            </Tooltip>
                                        </Box>
                                        <Box>
                                            {
                                                file && <Flex justify="center" align="center" gap="1">
                                                    <Text size="1">{file.name} </Text>
                                                    <CheckboxIcon />
                                                </Flex>
                                            }
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box>
                                    <Text size="2" color="red">{error.code !== null ? error.message : ''}</Text>
                                </Box>
                                <Box>
                                    <Button type="submit" onClick={handleSubmit} disabled={submitButtonDisabled}>发布</Button>
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Form>
        </Box>
    )
}