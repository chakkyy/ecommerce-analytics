import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { checkAuthLogin } from '@utils/checkAuth';
import Stepper from '@components/signup/stepper';
import SignupForm from '@components/signup/form';
import ChatBase from '@components/head/chatbase';
import { Steps } from '@interfaces/index';
import ecommerceLogo from '@icons/ecommerce-logo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LanguageSwitcher from '@ui/language-switcher';
import Head from 'next/head';
import { Theme } from '../../theme/theme';

const StyledLayout = styled.div`
  display: flex;
  background: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  overflow: hidden;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    width: 100%;
  }
`;

const StyledSideBar = styled.div`
  height: 100vh;
  padding: 40px 105px 0 100px;
  position: relative;
  svg {
    color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    padding: 24px 24px 32px;
    height: auto;
    width: 100%;
    z-index: 99;
  }
`;

const StyleSidebarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledRightContainer = styled.div`
  background: ${({ theme }: { theme: Theme }) => theme.colors.white};
  border-radius: 24px 0px 0px 0px;
  padding: 138px 0 172px 138px;
  width: 100%;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    padding: 0 24px 24px;
    border-radius: 24px 24px 0px 0px;
  }
`;

const SyledLanguageSwitcher = styled.div`
  position: absolute;
  top: 40px;
  right: 105px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const StyledLanguageMobile = styled.div`
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const defaultSteps: Steps = {
  personalDataStep: { label: 'PERSONAL_DATA', status: 'active' },
  companyDataStep: { label: 'COMPANY_DATA', status: 'inactive' },
  storeTypeDataStep: { label: 'STORE_TYPE_DATA', status: 'inactive' },
  inviteUsersStep: { label: 'INVITE_USERS', status: 'inactive' },
};

const withInvitationSteps: Steps = {
  personalDataStep: { label: 'PERSONAL_DATA', status: 'active' },
  sectorDataStep: { label: 'SECTOR_DATA', status: 'inactive' },
};

export const SignupLayout = ({
  withInvitation,
  invitationToken,
}: {
  withInvitation: boolean;
  invitationToken: string;
}) => {
  useTranslation('signup');
  const [steps, setSteps] = useState(withInvitation ? withInvitationSteps : defaultSteps);

  const setStep = (updates: Steps) => {
    const newSteps = { ...steps };
    Object.keys(updates).forEach(stepNumber => {
      newSteps[stepNumber] = { ...newSteps[stepNumber], status: updates[stepNumber].status };
    });
    setSteps(newSteps);
  };

  return (
    <>
      <Head>
        <title>ecommerce | Signup</title>
        <meta name='description' content='ecommerce | Signup' />
        <ChatBase />
      </Head>
      <StyledLayout>
        <StyledSideBar data-aos='fade-right' data-aos-duration='800'>
          <StyleSidebarContent>
            <Link href='/'>
              <ecommerceLogo />
            </Link>
            <StyledLanguageMobile>
              <LanguageSwitcher variantColor='black' />
            </StyledLanguageMobile>
          </StyleSidebarContent>
          <Stepper steps={steps} withInvitation={withInvitation} />
        </StyledSideBar>
        <StyledRightContainer>
          <SignupForm
            steps={steps}
            setStep={setStep}
            withInvitation={withInvitation}
            invitationToken={invitationToken}
          />
          <SyledLanguageSwitcher>
            <LanguageSwitcher variantColor='black' />
          </SyledLanguageSwitcher>
        </StyledRightContainer>
      </StyledLayout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext & { query: { invitation_token?: string } }) {
  const destination = await checkAuthLogin(ctx);
  const locale = ctx.locale || 'en';

  if (destination) {
    /*
    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
    */
  }
  const invitationToken = ctx?.query?.invitation_token;
  // validar el token de la invitacion
  const withInvitation = !!(invitationToken && invitationToken?.length > 0);
  // cuando el token es valido invitation es true
  return {
    props: {
      ...(await serverSideTranslations(locale, ['signup', 'common', 'store'], null, ['es', 'en', 'pt'])),
      withInvitation,
      invitationToken: invitationToken || null,
    },
  };
}

export default SignupLayout;
