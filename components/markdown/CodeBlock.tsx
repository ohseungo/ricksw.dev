import { Prism as SyntaxHighLighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  a11yDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CodeBlock = ({ inline, className, children }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || "");
  if (!inline && match)
    return (
      <SyntaxHighLighter style={a11yDark} language={match[1]} PreTag="div">
        {children}
      </SyntaxHighLighter>
    );
  else return <code className={className}>{children}</code>;
};

export default CodeBlock;
