import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown/with-html";
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css';
import dart from 'react-syntax-highlighter/dist/cjs/languages/hljs/dart';
import ts from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript';

SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('dart', dart);
SyntaxHighlighter.registerLanguage('typescript', ts);

const customHighlightStyle = {
  hljs: {
    display: "block",
    overflowX: "auto",
    padding: "1em",
    background: "var(--color-background)",
    color: "var(--color-text)",
  },
  "hljs-name": {
    fontWeight: "bold",
  },
  "hljs-strong": {
    fontWeight: "bold",
  },
  "hljs-code": {
    fontStyle: "italic",
    color: "#888",
  },
  "hljs-emphasis": {
    fontStyle: "italic",
  },
  "hljs-tag": {
    color: "var(--color-primary)",
  },
  "hljs-variable": {
    color: "var(--color-tertiary)",
  },
  "hljs-template-variable": {
    color: "var(--color-tertiary)",
  },
  "hljs-selector-id": {
    color: "var(--color-tertiary)",
  },
  "hljs-selector-class": {
    color: "var(--color-tertiary)",
  },
  "hljs-string": {
    color: "var(--color-code-string)",
  },
  "hljs-bullet": {
    color: "#d36363",
  },
  "hljs-type": {
    color: "var(--color-accent)",
  },
  "hljs-title": {
    color: "var(--color-accent)",
  },
  "hljs-section": {
    color: "var(--color-accent)",
  },
  "hljs-attribute": {
    color: "var(--color-accent)",
  },
  "hljs-quote": {
    color: "var(--color-accent)",
  },
  "hljs-built_in": {
    color: "var(--color-accent)",
  },
  "hljs-builtin-name": {
    color: "var(--color-accent)",
  },
  "hljs-number": {
    color: "var(--color-accent)",
  },
  "hljs-symbol": {
    color: "var(--color-accent)",
  },
  "hljs-keyword": {
    color: "var(--color-primary)",
  },
  "hljs-selector-tag": {
    color: "var(--color-primary)",
  },
  "hljs-literal": {
    color: "var(--color-primary)",
  },
  "hljs-comment": {
    color: "#888",
  },
  "hljs-deletion": {
    color: "#333",
    backgroundColor: "#fc9b9b",
  },
  "hljs-regexp": {
    color: "#c6b4f0",
  },
  "hljs-link": {
    color: "#c6b4f0",
  },
  "hljs-meta": {
    color: "#fc9b9b",
  },
  "hljs-addition": {
    backgroundColor: "#a2fca2",
    color: "#333",
  },
};

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter
        style={customHighlightStyle}
        language={language}
        children={value}
      />
    );
  },
};

interface MarkdownProps {
  readonly className?: string;
  readonly markdown: string;
}

const Markdown: FunctionComponent<MarkdownProps> = function ({ markdown }) {
  return <ReactMarkdown renderers={renderers} children={markdown} allowDangerousHtml />;
};

export default Markdown;
