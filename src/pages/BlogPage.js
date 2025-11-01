import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogDetail from '../components/blog/BlogDetail';
import { Box, Container, Flex } from '@radix-ui/themes';
import { redirectTo } from '../utils/CommonUtil';
import RequestUtil from '../utils/APIRequestUtil';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BlogPage() {
    const [loaded, setLoaded] = useState(false);

    const { domain } = useParams();

    const hasNewDomain = async (domain) => {
        const resp = await RequestUtil.get(`/api/new-domain-names?domainName=${domain}`);

        if (resp.status == 200) {
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
                loaded ? <><CommonHeader />
                    <main className="main">
                        <Box>
                            <Container size="2">
                                <Flex direction="column" gap="4">
                                    <BlogDetail domain={domain} />
                                </Flex>
                            </Container>
                        </Box>
                    </main>
                    <CommonFooter /></> : ''
            }
        </>
    )
}