"use client";

import Editor from "@monaco-editor/react";
import React from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = "python",
  height = "200px"
}) => {
  return (
    <Editor
      height={height}
      language={language}
      theme="vs-dark"
      value={value}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: "on",
        tabSize: 4
      }}
      onChange={(value) => onChange(value || "")}
    />
  );
};

export default CodeEditor;