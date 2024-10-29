import { getGoAddress } from '../../utils/PageAddressUtil';

export default function AbstractGo({ link }) {
    const gotoLink = getGoAddress(link);
    return (
        <div className="source-site-go">
            <a href={gotoLink}><h4>[阅读原文]</h4></a>
        </div>
    )
}