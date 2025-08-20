import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogDetail from '../components/blog/BlogDetail';
import { Box, Container, Flex } from '@radix-ui/themes';
import { redirectTo } from '../utils/CommonUtil';
import RequestUtil from '../utils/APIRequestUtil';
import { useEffect } from 'react';

const getDomain = () => {
    let { domain, sub, subsub } = useParams();
    if (undefined !== sub) {
        domain += '/' + sub;
    }
    if (undefined !== subsub) {
        domain += '/' + subsub;
    }
    return domain;
}

export default function BlogPage() {
    const domain = getDomain();

    const hasNewDomain = async (domain) => {
        const resp = await RequestUtil.get(`/api/new-domain-names?domainName=${domain}`);

        if (resp.status == 200) {
            const respBody = await resp.json();
            const newDomainName = respBody.newDomainName;
            redirectTo(`/blogs/${newDomainName}`);
            return;
        }
    };

    useEffect(() => {
        hasNewDomain(domain);
    }, [domain]);

    return (
        <>
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <Flex direction="column" gap="4">
                            <BlogDetail domain={domain} />
                        </Flex>
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}