'use client'
import React, { useRef } from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import { Terminal } from 'lucide-react';

interface GrimoireEditorProps {
    initialCode: string;
    onChange: (value: string | undefined) => void;
    onValidate: () => void;
    readOnly?: boolean;
}

export default function GrimoireEditor({ initialCode, onChange, onValidate, readOnly = false }: GrimoireEditorProps) {
    const editorRef = useRef<any>(null);

    const handleEditorWillMount: BeforeMount = (monaco) => {
        // Custom "GreenScreen" Theme
        monaco.editor.defineTheme('greenscreen', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '006400', fontStyle: 'italic' },
                { token: 'keyword', foreground: '00FF00', fontStyle: 'bold' },
                { token: 'identifier', foreground: '33FF33' },
                { token: 'string', foreground: '00CC00' },
                { token: 'number', foreground: '00FF41' },
            ],
            colors: {
                'editor.background': '#000000',
                'editor.foreground': '#00FF41',
                'editorCursor.foreground': '#00FF41',
                'editorLineNumber.foreground': '#003300',
                'editor.selectionBackground': '#00330066',
                'editorIndentGuide.background': '#003300',
            }
        });
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    return (
        <div className="relative border-4 border-stone-800 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.1)] h-full flex flex-col bg-black group">
            {/* Header / Terminal Bar */}
            <div className="bg-stone-900 px-4 py-2 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-[#00FF41]" />
                    <span className="font-mono text-[10px] text-[#00FF41] uppercase tracking-[0.2em] animate-pulse">Mainframe Node v1.0.4 - Online</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-900/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-900/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-900/50"></div>
                </div>
            </div>

            <div className="flex-grow relative overflow-hidden">
                {/* CRT Scanline Effect Overlay */}
                <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                {/* Moving scanline */}
                <div className="absolute inset-0 pointer-events-none z-20 scanline" />

                <Editor
                    height="100%"
                    defaultLanguage="cobol"
                    theme="greenscreen"
                    value={initialCode}
                    onChange={onChange}
                    beforeMount={handleEditorWillMount}
                    onMount={handleEditorDidMount}
                    options={{
                        fontSize: 16,
                        fontFamily: "'Courier New', Courier, monospace",
                        lineNumbers: 'on',
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        readOnly: readOnly,
                        automaticLayout: true,
                        renderLineHighlight: 'all',
                        cursorBlinking: 'blink',
                        cursorStyle: 'block',
                    }}
                />
            </div>

            {!readOnly && (
                <button
                    onClick={onValidate}
                    className="w-full bg-[#00FF41]/5 text-[#00FF41] py-4 font-mono text-lg border-t border-stone-800 hover:bg-[#00FF41]/10 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-[0.4em] glow-text"
                >
                    <span className="animate-pulse">{">>"}</span> EXECUTE_SPELL <span className="animate-pulse">{"<<"}</span>
                </button>
            )}
        </div>
    );
}
