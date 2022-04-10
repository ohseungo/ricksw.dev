import { Root } from "./Blockquote.styled";

interface BlockQuoteProps {
  children: React.ReactNode;
}

const BlockQuote = ({ children }: BlockQuoteProps) => {
  return <Root>{children}</Root>;
};
export default BlockQuote;
