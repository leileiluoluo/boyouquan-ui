import { Fragment, Suspense, useEffect, useState, lazy } from 'react';
import { useParams } from 'react-router-dom';
import RequestUtil from '../../utils/RequestUtil';
import Meta from '../common/Meta';
import BlogDetailMain from './BlogDetailMain';
import BlogDetailSummary from './BlogDetailSummary';

const BlogCharts = lazy(() => import('./BlogCharts'));
const RandomBlogs = lazy(() => import('./RandomBlogs'));
const BlogPosts = lazy(() => import('./BlogPosts'));

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

const getMeta = (name, description) => {
    return {
        title: `${name} - 博友圈 · 博客人的朋友圈！`,
        keywords: name,
        description: description
    }
}

export default function BlogDetail() {
    const [loaded, setLoaded] = useState(false);
    const [blogDetail, setBlogDetail] = useState({});

    const domain = getDomain();

    const fetchData = async (domain) => {
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/blogs?domainName=${domain}`);

        setBlogDetail(resp);
        setLoaded(true);
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    return (
        <>
            {loaded ?
                <Fragment>
                    <Meta meta={getMeta(blogDetail.name, blogDetail.description)} />
                    <BlogDetailMain
                        name={blogDetail.name}
                        domainName={blogDetail.domainName}
                        address={blogDetail.address}
                        description={blogDetail.description}
                        statusOk={blogDetail.statusOk}
                        submittedInfo={blogDetail.submittedInfo}
                        submittedInfoTip={blogDetail.submittedInfoTip}
                        statusUnOkInfo={blogDetail.statusUnOkInfo}
                        blogAdminLargeImageURL={blogDetail.blogAdminLargeImageURL}
                        blogServerLocation={blogDetail.blogServerLocation} />
                    <BlogDetailSummary
                        postCount={blogDetail.postCount}
                        accessCount={blogDetail.accessCount}
                        latestPublishedAt={blogDetail.latestPublishedAt}
                        collectedAt={blogDetail.collectedAt} />
                    <Suspense>
                        <BlogCharts domain={domain} />
                        <BlogPosts domain={domain} blogStatusOk={blogDetail.statusOk} />
                        <RandomBlogs domain={domain} />
                    </Suspense>
                </Fragment> : ''
            }
        </>
    )
}