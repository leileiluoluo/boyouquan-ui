import { Box, Flex, TextField, TextArea, Text, Button, Link, Avatar } from '@radix-ui/themes';
import { Form } from '@radix-ui/react-form';
import { ImageIcon } from '@radix-ui/react-icons';
import { useRef, useState } from 'react';
import { isEmailValid } from '../../utils/EmailUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { MOMENTS_ADDRESS } from '../../utils/PageAddressUtil';

export default function MomentsInput() {
    const inputRef = useRef(null);
    const [blogInfo, setBlogInfo] = useState();
    const [formData, setFormData] = useState({});
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
                console.log(respBody[0]);
            }
        }
    }

    const submit = async () => {
        const resp = await RequestUtil.post('/api/moments',
            JSON.stringify(formData),
            { 'Content-Type': 'application/json' }
        );

        if (resp.status != 201) {
            const respBody = await resp.json();
            setError(respBody);
        } else {
            setError({ code: '', message: '' });
            redirectTo(MOMENTS_ADDRESS);
        }
    }

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setFormData({ ...formData, ['email']: email });

        var error = emailValidation(email);
        if (null === error) {
            getBlogInfo(email);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = formData['email'];
        const description = formData['description'];
        const imageURL = formData['imageURL'];
        var error = emailValidation(email);
        if (null === error) {
            if (undefined === description || null == description || '' === description.trim()) {
                error = { code: 'description_invalid', message: '未提供描述！' };
            }
        }

        if (null === error) {
            if (undefined === imageURL || null == imageURL) {
                error = { code: 'file_invalid', message: '未上传图片！' };
            }
        }

        if (null === error) {
            if (null == blogInfo) {
                error = { code: 'blog_info_invalid', message: '未查询到对应的博客！' };
            }
        }

        if (null !== error) {
            setError(error);
            return;
        }

        setFormData({ ...formData, ['blogDomainName']: blogInfo.domainName });
        submit();
    }

    const handleIconClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileFormData = new FormData();
        fileFormData.append('file', file);

        const resp = await RequestUtil.post('/images/uploads',
            fileFormData,
            {}
        );

        const respBody = await resp.json();
        if (resp.status == 413) {
            setError({ code: 'file_invalid', message: '文件需要小于 10 M' });
        } else if (resp.status != 200) {
            setError(respBody);
        } else {
            setError({ code: '', message: '' })
        }

        const imageURL = respBody['imageURL'];
        setFormData({ ...formData, ['imageURL']: imageURL });
    };

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
                                blogInfo ? <Link size="1">{blogInfo.name}</Link> :
                                    <Text size="1">匿名用户</Text>
                            }
                        </Flex>
                    </Box>
                    <Box width="100%">
                        <Flex gap="2" direction="column">
                            <Box>
                                <TextField.Root style={{ fontSize: '12px' }} name="email" placeholder="请输入邮箱" id="email" onChange={handleEmailChange} />
                            </Box>

                            <Box>
                                <TextArea size="1" style={{ fontSize: '12px' }} name="description" placeholder="请写一段话 ..." id="description" onChange={handleChange} />
                            </Box>

                            <Flex justify="between">
                                <Box>
                                    <input
                                        type="file"
                                        ref={inputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <Link size="4"><ImageIcon size="4" onClick={handleIconClick} /></Link>
                                </Box>
                                <Box>
                                    <Text size="2" color="red">{error.code !== null ? error.message : ''}</Text>
                                </Box>
                                <Box>
                                    <Button type="submit" onClick={handleSubmit}>发布</Button>
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Form>
        </Box>
    )
}