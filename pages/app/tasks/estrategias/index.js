import Head from 'next/head';
import AppTaskDetail from '../../../../components/organisms/AppTaskDetail';
import { requireAppAuth } from '../../../../utils/appAuth';
import { getAppTaskBySlug } from '../../../../utils/appTasks';

const estrategiasTask = getAppTaskBySlug('estrategias');

export default function EstrategiasTaskPage() {
  return (
    <>
      <Head>
        <title>Criação de Estratégias | Olegário.Dev</title>
      </Head>
      <AppTaskDetail task={estrategiasTask} />
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
