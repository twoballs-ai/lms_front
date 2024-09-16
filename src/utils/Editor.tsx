'use client' // only in App Router

import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    Alignment, BlockQuote, Bold, CodeBlock, Essentials, FontColor, Heading, Italic,
    Link, List, Paragraph, SourceEditing, Table, TableToolbar, Undo, ClassicEditor 
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css'; // Importing CKEditor styles

// Определение типов для пропсов
interface EditorProps {
    data: string;
    onChange: (data: string) => void;
}

class Editor extends Component<EditorProps> {
    render() {
        return (
            <div className="App">
                <h5>Начните заполнять этот блок для добавления основной информации об уроке.</h5>
                <CKEditor
                    editor={ ClassicEditor }
                    config={{
                        plugins: [
                            Alignment, BlockQuote, Bold, CodeBlock, Essentials, FontColor, Heading, Italic,
                            Link, List, Paragraph, SourceEditing, Table, TableToolbar, Undo
                        ],
                        toolbar: [
                            'heading', '|',
                            'bold', 'italic', 'alignment', 'fontColor', 'link', 'bulletedList', 'numberedList', '|',
                            'blockQuote', 'codeBlock', 'sourceEditing', '|',
                            'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
                            'undo', 'redo'
                        ],
                        codeBlock: {
                            languages: [
                                { language: 'plaintext', label: 'Plain text' },
                                { language: 'python', label: 'Python' },
                                { language: 'javascript', label: 'JavaScript' },
                                { language: 'java', label: 'Java' },
                                { language: 'cpp', label: 'C++' },
                                // Add other languages as needed
                            ]
                        },
                        table: {
                            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                        },
                        alignment: {
                            options: ['left', 'center', 'right', 'justify']
                        },
                        fontColor: {
                            colors: [
                                {
                                    color: 'hsl(0, 0%, 0%)',
                                    label: 'Black'
                                },
                                {
                                    color: 'hsl(0, 75%, 60%)',
                                    label: 'Red'
                                },
                                {
                                    color: 'hsl(30, 75%, 60%)',
                                    label: 'Orange'
                                },
                                {
                                    color: 'hsl(60, 75%, 60%)',
                                    label: 'Yellow'
                                },
                                {
                                    color: 'hsl(90, 75%, 60%)',
                                    label: 'Light Green'
                                },
                                {
                                    color: 'hsl(120, 75%, 60%)',
                                    label: 'Green'
                                },
                                {
                                    color: 'hsl(150, 75%, 60%)',
                                    label: 'Aquamarine'
                                },
                                {
                                    color: 'hsl(180, 75%, 60%)',
                                    label: 'Turquoise'
                                },
                                {
                                    color: 'hsl(210, 75%, 60%)',
                                    label: 'Light Blue'
                                },
                                {
                                    color: 'hsl(240, 75%, 60%)',
                                    label: 'Blue'
                                },
                                {
                                    color: 'hsl(270, 75%, 60%)',
                                    label: 'Purple'
                                }
                            ]
                        }
                    }}
                    data={this.props.data}
                    onReady={ () => {
                        // Если вам не нужно использовать переменную "editor", уберите ее из обработчика
                        // console.log('Editor is ready to use!');
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        this.props.onChange(data);
                        // Если вам не нужно использовать переменную "event", уберите ее из обработчика
                        // console.log(data);
                    }}
                    onBlur={() => {
                        // Удалите переменные, если они не используются
                        // console.log('Blur.');
                    }}
                    onFocus={() => {
                        // Удалите переменные, если они не используются
                        // console.log('Focus.');
                    }}
                />
            </div>
        );
    }
}

export default Editor;
