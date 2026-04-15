import Head from 'next/head';
import AppTaskDetail from '../../../../components/organisms/AppTaskDetail';
import { requireAppAuth } from '../../../../utils/appAuth';
import { getAppTaskBySlug } from '../../../../utils/appTasks';

const youtubeTask = getAppTaskBySlug('youtube');

export default function YoutubeTaskPage() {
  return (
    <>
      <Head>
        <title>Movimentação do YouTube | Olegário.Dev</title>
      </Head>
      <AppTaskDetail task={youtubeTask} />
    </>
  );
}

export async function getServerSideProps(context) {
  const authRedirect = requireAppAuth(context);
  if (authRedirect) {
    return authRedirect;
  }

  return {
    props: {},
  };
}
