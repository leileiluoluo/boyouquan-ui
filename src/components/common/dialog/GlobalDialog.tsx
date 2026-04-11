import React from 'react';
import { Modal, Button, Flex } from 'antd';

export default function GlobalDialog({ title, titleColor, message, closeButtonName, dialogOpen, setDialogOpen }) {
    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <Modal
            title={<span style={{ color: titleColor || undefined }}>{title}</span>}
            open={dialogOpen}
            onCancel={handleClose}
            footer={
                <Flex justify="flex-end">
                    <Button onClick={handleClose}>
                        {closeButtonName}
                    </Button>
                </Flex>
            }
            width={450}
        >
            <div>{message}</div>
        </Modal>
    );
}