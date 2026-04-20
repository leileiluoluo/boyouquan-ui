import React from 'react';
import { Typography } from 'antd';
import { getGoAddress } from '@utils/PageAddressUtil';

const { Link } = Typography;

interface AbstractGoProps {
    link: string;
}

export default function AbstractGo({ link }: AbstractGoProps) {
    const gotoLink = getGoAddress(link);
    
    return (
        <div>
            <Link 
                href={gotoLink} 
                strong 
                style={{ fontSize: 14 }}
            >
                [阅读原文]
            </Link>
        </div>
    );
}