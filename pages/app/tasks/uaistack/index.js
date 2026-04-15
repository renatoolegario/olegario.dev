import Head from 'next/head';
import AppTaskDetail from '../../../../components/organisms/AppTaskDetail';
import { requireAppAuth } from '../../../../utils/appAuth';
import { getAppTaskBySlug } from '../../../../utils/appTasks';

const uaistackTask = getAppTaskBySlug('uaistack');

export default function UaistackTaskPage() {
  return (
    <>
      <Head>
        <title>Criação UaiStack | Olegário.Dev</title>
      </Head>
      <AppTaskDetail task={uaistackTask} />
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
