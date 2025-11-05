import React, { useEffect, useState } from 'react';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogDetail from '../components/blog/BlogDetail';
import { Box, Container, Flex } from '@radix-ui/themes';
import { redirectTo } from '../utils/CommonUtil';
import RequestUtil from '../utils/APIRequestUtil';
import { useParams } from 'react-router-dom';

export default function BlogPage(): React.JSX.Element {
    const [loaded, setLoaded] = useState<boolean>(false);

    const { domain } = useParams<{ domain: string }>();

    const hasNewDomain = async (domainName: string | undefined): Promise<void> => {
        if (!domainName) return;
        
        const resp = await RequestUtil.get(`/api/new-domain-names?domainName=${domainName}`);
        
        if (typeof resp !== 'string' && resp.status === 200) {
            const respBody = await resp.json();
            const newDomainName = respBody.newDomainName;
            redirectTo(`/blogs/${newDomainName}`);
            return;
        }

        setLoaded(true);
    };

    useEffect(() => {
        hasNewDomain(domain);
    }, [domain]);

    return (
        <>
            {
                loaded ? (
                    <>
                        <CommonHeader />
                        <main className="main">
                            <Box>
                                <Container size="2">
                                    <Flex direction="column" gap="4">
                                        <BlogDetail domain={domain || ''} />
                                    </Flex>
                                </Container>
                            </Box>
                        </main>
                        <CommonFooter />
                    </>
                ) : null
            }
        </>
    );
}

