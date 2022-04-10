interface ContainerProps {
  children: React.ReactNode;
}
const BlogContainer = ({ children }: ContainerProps) => {
  return <>{children}</>;
};

export default BlogContainer;
