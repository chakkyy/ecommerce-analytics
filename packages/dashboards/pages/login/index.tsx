import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import LoginHeader from '@components/login/login-header';
import LoginForm from '@components/login/login-form';
import { checkAuthLogin } from '@utils/checkAuth';
import { GetServerSidePropsContext } from 'next';
import ChatBase from '@components/head/chatbase';

const LoginLayout = () => {
  useTranslation(['login', 'signup']);
  return (
    <>
      <Head>
        <title>ecommerce | Login</title>
        <meta name='description' content='ecommerce | Login' />
        <ChatBase />
      </Head>
      <LoginHeader />
      <LoginForm />
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const destination = await checkAuthLogin(ctx);
  const locale = ctx.locale || 'en';

  if (destination) {
    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['login', 'common', 'signup'], null, ['es', 'en', 'pt'])),
    },
  };
}

export default LoginLayout;
