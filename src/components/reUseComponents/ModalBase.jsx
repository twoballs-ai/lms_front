import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
export default function LmsModalBase({ open, onClose, content }) {
    return (
        <Modal open={open} onClose={onClose} center>
            {content}
        </Modal>
    );
}
