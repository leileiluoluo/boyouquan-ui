import { Navigate, useParams } from 'react-router-dom';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import Article from '../components/article/Article';

import { META_2024, REPORT_INFO_2024 } from '../const/annual-reports/AnnualReport2024';

const getMetaAndYearInfo = (year) => {
    let meta = null
    let reportInfo = null
    switch (year) {
        case '2024':
            meta = META_2024;
            reportInfo = REPORT_INFO_2024;
            break;
        default:
    }
    return { meta, reportInfo }
}

export default function AnnualReportPage() {
    const { year } = useParams();
    const { meta, reportInfo } = getMetaAndYearInfo(year);

    if (meta === null || reportInfo === null) {
        return <Navigate to='/annual-reports' />
    }

    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Article
                    title={reportInfo.title}
                    content={reportInfo.content}
                    publishedAt={reportInfo.publishedAt} />
            </main>
            <CommonFooter />
        </>
    )
}