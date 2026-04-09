import Abstract from '@components/abstract/Abstract';

interface AbstractPageProps {
    isSharingPage: boolean;
}

export default function AbstractPage({ isSharingPage }: AbstractPageProps) {
    return (
        <>
            <Abstract isSharingPage={isSharingPage} />
        </>
    );
}

