import { Navigate, useParams } from 'react-router-dom';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import Article from '../components/article/Article';
import { META_V1_10, RELEASE_INFO_V1_10 } from '../const/release-notes/ReleaseNoteV1.10';
import { META_V1_9, RELEASE_INFO_V1_9 } from '../const/release-notes/ReleaseNoteV1.9';
import { META_V1_8, RELEASE_INFO_V1_8 } from '../const/release-notes/ReleaseNoteV1.8';
import { META_V1_7, RELEASE_INFO_V1_7 } from '../const/release-notes/ReleaseNoteV1.7';
import { META_V1_6, RELEASE_INFO_V1_6 } from '../const/release-notes/ReleaseNoteV1.6';
import { META_V1_5, RELEASE_INFO_V1_5 } from '../const/release-notes/ReleaseNoteV1.5';
import { META_V1_4, RELEASE_INFO_V1_4 } from '../const/release-notes/ReleaseNoteV1.4';
import { META_V1_3, RELEASE_INFO_V1_3 } from '../const/release-notes/ReleaseNoteV1.3';
import { META_V1_2, RELEASE_INFO_V1_2 } from '../const/release-notes/ReleaseNoteV1.2';
import { META_V1_1, RELEASE_INFO_V1_1 } from '../const/release-notes/ReleaseNoteV1.1';
import { META_V1_0, RELEASE_INFO_V1_0 } from '../const/release-notes/ReleaseNoteV1.0';
import { META_V2_0, RELEASE_INFO_V2_0 } from '../const/release-notes/ReleaseNoteV2.0';

const getMetaAndVersionInfo = (version) => {
    let meta = null
    let releaseInfo = null
    switch (version) {
        case 'v2.0':
            meta = META_V2_0;
            releaseInfo = RELEASE_INFO_V2_0;
            break;
        case 'v1.10':
            meta = META_V1_10;
            releaseInfo = RELEASE_INFO_V1_10;
            break;
        case 'v1.9':
            meta = META_V1_9;
            releaseInfo = RELEASE_INFO_V1_9;
            break;
        case 'v1.8':
            meta = META_V1_8;
            releaseInfo = RELEASE_INFO_V1_8;
            break;
        case 'v1.7':
            meta = META_V1_7;
            releaseInfo = RELEASE_INFO_V1_7;
            break;
        case 'v1.6':
            meta = META_V1_6;
            releaseInfo = RELEASE_INFO_V1_6;
            break;
        case 'v1.5':
            meta = META_V1_5;
            releaseInfo = RELEASE_INFO_V1_5;
            break;
        case 'v1.4':
            meta = META_V1_4;
            releaseInfo = RELEASE_INFO_V1_4;
            break;
        case 'v1.3':
            meta = META_V1_3;
            releaseInfo = RELEASE_INFO_V1_3;
            break;
        case 'v1.2':
            meta = META_V1_2;
            releaseInfo = RELEASE_INFO_V1_2;
            break;
        case 'v1.1':
            meta = META_V1_1;
            releaseInfo = RELEASE_INFO_V1_1;
            break;
        case 'v1.0':
            meta = META_V1_0;
            releaseInfo = RELEASE_INFO_V1_0;
            break;
        default:
    }
    return { meta, releaseInfo }
}

export default function ReleaseNotePage() {
    const { version } = useParams();
    const { meta, releaseInfo } = getMetaAndVersionInfo(version);

    if (meta === null || releaseInfo === null) {
        return <Navigate to='/release-notes' />
    }

    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Article
                    title={releaseInfo.title}
                    content={releaseInfo.content}
                    publishedAt={releaseInfo.publishedAt} />
            </main>
            <CommonFooter />
        </>
    )
}