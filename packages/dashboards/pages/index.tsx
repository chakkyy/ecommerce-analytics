import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import styled from 'styled-components';
import { checkAuthLogin } from '@utils/checkAuth';
import WelcomeScreen from '@components/welcome-screen';
import ChatBase from '@components/head/chatbase';
import { GetServerSidePropsContext } from 'next';
import { Theme } from '../theme/theme';

const StyledMain = styled.main`
  display: flex;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>ecommerce Ecommerce</title>
        <meta name='description' content='ecommerce Ecommerce' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <ChatBase />
      </Head>

      <StyledMain>
        <WelcomeScreen />
      </StyledMain>
    </>
  );
}

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
      ...(await serverSideTranslations(locale, ['index', 'common'], null, ['es', 'en', 'pt'])),
    },
  };
}
