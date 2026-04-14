import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex } from 'antd';

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
            {loaded && (
                <BlogDetail domain={domain || ''} />
            )}
        </>
    );
}