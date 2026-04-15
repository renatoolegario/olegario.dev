import Head from 'next/head';
import AppTaskDetail from '../../../../components/organisms/AppTaskDetail';
import { requireAppAuth } from '../../../../utils/appAuth';
import { getAppTaskBySlug } from '../../../../utils/appTasks';

const instagramTask = getAppTaskBySlug('instagram');

export default function InstagramTaskPage() {
  return (
    <>
      <Head>
        <title>Movimentação do Instagram | Olegário.Dev</title>
      </Head>
      <AppTaskDetail task={instagramTask} />
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
