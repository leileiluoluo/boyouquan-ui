import { getGoAddress } from '../../utils/PageAddressUtil';

export default function AbstractTitle({ isSharingPage, title, link }) {
    const gotoLink = getGoAddress(link);
    return (
        <header className={isSharingPage ? 'entry-header sharing' : 'entry-header'}>
            {
                isSharingPage ? <h4>发现一篇有趣的文章：「<a href={gotoLink}><strong>{title}</strong></a>」</h4>
                    : <h4>文章摘要：「<a href={gotoLink}><strong>{title}</strong></a>」</h4>
            }
        </header>
    )
}