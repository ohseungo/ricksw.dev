import { NextSeo } from "next-seo";

import { getAllNotePosts } from "lib/matter-util";
import { NotePostsProps } from "types/blog";
import NotePosts from "components/note/NotePosts";
import PageTitle from "components/common/PageTitle";

import metadata from "constants/metadata.json";
const NotesPage = ({ posts }: NotePostsProps) => {
  return (
    <div>
      <NextSeo
        title="Notes"
        canonical={`${metadata.site_url}/note`}
        openGraph={{
          url: `${metadata.site_url}/note`,
        }}
      />
      <PageTitle title="Notes" description="공부하고 배운 지식을 정리합니다" />
      <NotePosts posts={posts} />
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllNotePosts();
  return {
    props: {
      posts,
    },
  };
};
export default NotesPage;
