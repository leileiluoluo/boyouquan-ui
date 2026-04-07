import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Flex } from '@radix-ui/themes';

import { CommonHeader, CommonFooter } from '@components/common';
import BlogDetail from '@components/blog/BlogDetail';
import { redirectTo } from '@utils/CommonUtil';
import RequestUtil from '@utils/APIRequestUtil';

export default function BlogPage() {
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

