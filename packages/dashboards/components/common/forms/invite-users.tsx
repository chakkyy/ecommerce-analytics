import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { ReactMultiEmail } from 'react-multi-email';
import { show } from '@ebay/nice-modal-react';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import Tabs from '@ui/tabs';
import TextBody from '@ui/text-body';
import InviteUserSuccessPopup from '@ui/modals/invite-users-sucess-popup';
import { emailRegex } from '@utils/regex';
import useSendInvitations from '@hooks/api/user/useSendInvitations';
import useSaveUserInvites from '@hooks/api/user/useSaveUserInvites';
import CSVDropzone from '@ui/csv-dropzone';
import 'react-multi-email/dist/style.css';
import { Theme } from '../../../theme/theme';

export const StyledForm = styled.form`
  margin-top: 16px;
  width: 500px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    margin-top: 8px;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xs}) {
    margin-top: 8px;
    width: 100%;
  }
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 32px;
    gap: 8px;
    button {
      width: 100%;
      margin-top: 16px;
    }
  }
`;

export const StyledFormTitle = styled.h4`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    font-size: 24px;
  }
`;

const StyledSpreadSheetContainer = styled.div`
  margin-top: 48px;
`;

const StyledIntroDropzoneText = styled(TextBody)`
  margin-bottom: 16px;
  span {
    cursor: pointer;
    color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
    font-weight: 700;
  }
`;

const StyledParagraphInviteUser = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const StyledDivInputEmail = styled.div`
  width: 100%;
  margin-top: 48px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    margin-top: 32px;
  }
`;

const EmailDataTag = styled.div`
  height: 40px;
  font-size: 16px !important;
  font-weight: 300 !important;
  margin: 10px !important;
  background: #f4f9ff !important;
  color: #111827 !important;
  div[data-tag-item] {
    height: 20px;
    background: #f4f9ff;
  }
  span[data-tag-handle] {
    height: 20px;
    background: #f4f9ff;
  }
`;

export const StyledButtonsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 24px;
  max-width: 604px;
  justify-content: flex-end;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    justify-content: flex-end;
    flex-direction: column-reverse;
    gap: 0px;
    button {
      margin-top: 16px;
      width: 100%;
    }
  }
`;

type InviteUsersForm = {
  email: string | string[];
};

const InviteUser = () => {
  const { t } = useTranslation('signup');
  const { mutateAsync: mutateAsyncInvitations } = useSendInvitations();
  const { mutateAsync: mutateAsyncInvites } = useSaveUserInvites();

  const csvInvitationEnabled =
    process.env.NEXT_PUBLIC_CSV_INVITATION_ENABLED && process.env.NEXT_PUBLIC_CSV_INVITATION_ENABLED === 'true';

  const tabs = [t('VIA_EMAIL')];
  if (csvInvitationEnabled) tabs.push(t('VIA_CSV'));
  const emailRegExp: RegExp = emailRegex;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [emails, setEmails] = useState<string[]>([]);

  const { handleSubmit } = useForm<InviteUsersForm>({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = handleSubmit(async () => {
    setIsLoading(true);
    try {
      await mutateAsyncInvites(emails);
      await mutateAsyncInvitations(emails);
      setIsLoading(false);
      setEmails([]);
      show(InviteUserSuccessPopup);
    } catch (err) {
      // show error
    }
  });

  useEffect(() => {
    setActiveTab(tabs[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const isSubmitButtonDisabled = emails.length === 0;

  return (
    <div data-aos='fade-left' data-aos-duration='500'>
      <StyledForm>
        <StyledTitleContainer>
          <StyledFormTitle>{t('INVITE_USERS_TITLE')}</StyledFormTitle>
          <TextBody variant='light'>{`${t('SUB_INVITE_USERS')} ${
            csvInvitationEnabled ? t('SUB_INVITE_USERS_CSV') : ''
          }`}</TextBody>
        </StyledTitleContainer>
        {/* form */}
        <Tabs tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
        {activeTab === t('VIA_CSV') ? (
          <StyledSpreadSheetContainer>
            <StyledIntroDropzoneText variant='light'>
              {t('INVITE_CSV_FORMAT')}
              <br /> <span>{t('INVITE_CSV_DOWNLOAD')}</span> {t('INVITE_CSV_REFERENCE')}
            </StyledIntroDropzoneText>
            <CSVDropzone onChange={() => {}} />
          </StyledSpreadSheetContainer>
        ) : (
          <StyledDivInputEmail>
            <StyledParagraphInviteUser>{t('LABEL.INVITE_USERS')}</StyledParagraphInviteUser>
            <ReactMultiEmail
              placeholder='user@ecommerce.com'
              emails={emails}
              onChange={(_emails: string[]) => {
                setEmails(_emails.filter(email => emailRegExp.test(email)));
              }}
              autoFocus
              style={{ border: '1px solid #111827' }}
              getLabel={(email, index, removeEmail) => {
                return (
                  <EmailDataTag data-tag key={index}>
                    <div data-tag-item>{email}</div>
                    <span aria-hidden='true' data-tag-handle onClick={() => removeEmail(index)}>
                      ×
                    </span>
                  </EmailDataTag>
                );
              }}
            />
          </StyledDivInputEmail>
        )}
        <StyledButtonsContainer style={{ marginTop: '72px' }}>
          <Link href='/dashboards'>
            <Button variant='secondary' onClick={() => {}}>
              {t('SKIP')}
            </Button>
          </Link>
          <Button onClick={onSubmit} disabled={isSubmitButtonDisabled} icon={isLoading ? <Spinner /> : null}>
            {activeTab === t('VIA_CSV') ? t('PROCESS_FILE') : t('SEND_INVITE')}
          </Button>
        </StyledButtonsContainer>
      </StyledForm>
    </div>
  );
};

export default InviteUser;
