// import React, { useState } from 'react';
// import { CodeMirror } from '@uiw/react-codemirror';
// import 'codemirror/keymap/sublime'; // Импорт используемой раскладки клавиатуры (опционально)
// import 'codemirror/theme/material.css'; // Импорт темы (можно выбрать другую тему)

// const CodeEditor = () => {
//     const [code, setCode] = useState('');

//     const handleChange = (editor, data, value) => {
//         setCode(value);
//     };

//     return (
//         <div>
//             <h1>CodeMirror в React</h1>
//             <CodeMirror
//                 value={code}
//                 onChange={handleChange}
//                 options={{
//                     mode: 'javascript',
//                     theme: 'material',
//                     lineNumbers: true
//                 }}
//             />
//         </div>
//     );
// };

// export default CodeEditor;