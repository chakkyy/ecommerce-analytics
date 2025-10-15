import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import InviteUserSuccessPopup from '@ui/modals/invite-users-sucess-popup';
import Button from '@ui/button';
import Modal from '@ui/modal';
import Spinner from '@ui/spinner';
import { emailRegex } from '@utils/regex';
import { ReactMultiEmail } from 'react-multi-email';
import useSendInvitations from '@hooks/api/user/useSendInvitations';
import useSaveUserInvite from '@hooks/api/user/useSaveUserInvites';
import { useRouter } from 'next/router';
import 'react-multi-email/dist/style.css';
import { Theme } from '../../../theme/theme';

const StyledTitle = styled.h4`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
`;

const StyledForm = styled.form``;

const StyledButtonsWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 48px;
  justify-content: flex-end;
`;

const StyledDivInputEmail = styled.div`
  width: 100%;
  margin-top: 48px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledParagraphInviteUser = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
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

type InviteUsersForm = {
  email: string | string[];
};

type ModalProps = {
  isCreatingDashboard?: boolean;
};

const InviteToDashboardModal = NiceModal.create(({ isCreatingDashboard }: ModalProps) => {
  const { t } = useTranslation('dashboards');
  const { remove } = useModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const { mutateAsync: mutateAsyncInvitation } = useSendInvitations();
  const { mutateAsync: mutateAsyncInvite } = useSaveUserInvite();
  const { show: showInviteUserSuccessPopup } = useModal(InviteUserSuccessPopup);

  const { handleSubmit } = useForm<InviteUsersForm>({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await mutateAsyncInvitation(emails);
      await mutateAsyncInvite(emails);
      setLoading(false);
      setEmails([]);
      await showInviteUserSuccessPopup();
    } catch (err) {
      // show error
    }
  });

  const isSubmitButtonDisabled = loading || emails.length === 0;

  const handleSkip = async () => {
    remove();
    await router.push('/dashboard_empty');
  };

  return (
    <Modal isOpen onClose={remove}>
      <StyledTitle>{t('INVITE_USERS')}</StyledTitle>
      <StyledForm onSubmit={onSubmit}>
        <StyledDivInputEmail>
          <StyledParagraphInviteUser>{t('LABEL.INVITE_USERS')}</StyledParagraphInviteUser>
          <ReactMultiEmail
            placeholder='user@ecommerce.com'
            emails={emails}
            onChange={(_emails: string[]) => {
              setEmails(_emails.filter(email => emailRegex.test(email)));
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
      </StyledForm>
      <StyledButtonsWrapper>
        <Button onClick={handleSkip} variant='secondary'>
          {t('SKIP')}
        </Button>
        <Button onClick={onSubmit} icon={loading ? <Spinner /> : null} disabled={isSubmitButtonDisabled}>
          {loading ? t('SENDING') : t('SEND_INVITE')}
        </Button>
      </StyledButtonsWrapper>
    </Modal>
  );
});

export default InviteToDashboardModal;
