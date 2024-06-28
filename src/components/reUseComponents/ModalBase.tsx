import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal, ModalProps } from 'react-responsive-modal';

interface LmsModalBaseProps {
    open: boolean;
    onClose: () => void;
    content: React.ReactNode;
    modalStyles?: ModalProps['styles'];
    showCloseIcon?: boolean;
}

const LmsModalBase: React.FC<LmsModalBaseProps> = ({ open, onClose, content, modalStyles, showCloseIcon = true }) => {
    const basicModalStyles: ModalProps['styles'] = {
        modal: {
            maxWidth: '40vw',
            width: '40vw',
            height: 'auto',
            minHeight: '45vh',
            padding: '20px',
            margin: '0',
            overflow: 'none',
            borderRadius: '10px',
        },
        overlay: {
            background: 'rgba(0, 0, 0, 0.5)',
        },
    };

    const stylesToUse = modalStyles || basicModalStyles;

    return (
        <Modal open={open} onClose={onClose} center showCloseIcon={showCloseIcon} styles={stylesToUse}>
            {content}
        </Modal>
    );
};

export default LmsModalBase;
