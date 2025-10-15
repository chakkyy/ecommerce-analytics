import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Button from '@ui/button';
import SelectDashboardDropdown from '@ui/dropdowns/select-dashboard-dropdown';
import Modal from '@ui/modal';
import { Theme } from '../../../theme/theme';

const StyledTitle = styled.h4`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
    text-align: center;
  }
`;

const StyledForm = styled.form``;

const StyledButtonsWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 48px;
  justify-content: flex-end;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    button {
      width: 100%;
    }
  }
`;

const SelectDashboardModal = NiceModal.create(() => {
  const { remove } = useModal();
  const { t } = useTranslation(['segments', 'common', 'dashboards']);

  const router = useRouter();

  const [selected, setSelected] = useState<{ value: string; label: string }>();

  const handleChange = (selectedOption: { value: string; label: string }) => {
    setSelected(selectedOption);
  };

  const handlePush = async () => {
    await router.push('/recipe_conversions');
    remove();
  };

  return (
    <Modal isOpen onClose={remove}>
      <StyledTitle>{t('SEGMENT_DETAIL.DATA_MODAL.TITLE_MODAL')}</StyledTitle>
      <StyledForm>
        <SelectDashboardDropdown handleChange={handleChange} />
      </StyledForm>
      <StyledButtonsWrapper>
        <Button onClick={remove} variant='secondary'>
          {t('dashboards:CANCEL')}
        </Button>
        {selected ? (
          <Button onClick={handlePush}>{t('dashboards:CONFIRM')}</Button>
        ) : (
          <Button disabled>{t('dashboards:CONFIRM')}</Button>
        )}
      </StyledButtonsWrapper>
    </Modal>
  );
});

export default SelectDashboardModal;
