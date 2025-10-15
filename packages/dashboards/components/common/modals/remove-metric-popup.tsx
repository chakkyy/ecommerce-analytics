import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Popup from '@ui/popup';
import { useTranslation } from 'next-i18next';
import TrashIcon from '@icons/trash-icon';

type Props = {
  onDelete: (id: number) => void;
  metricId: number;
};

const RemoveMetricPopup = NiceModal.create(({ onDelete, metricId }: Props) => {
  const { remove } = useModal();
  const { t } = useTranslation('dashboards');

  const handleConfirm = () => {
    remove();
    onDelete(metricId);
  };

  return (
    <Popup
      isOpen
      onClose={remove}
      titleIcon={<TrashIcon width={32} height={32} fill='#004DBC' />}
      title={t('METRICS.KPI.MODAL.TITLE')}
      description={t('METRICS.KPI.MODAL.DESC')}
      cancelText={t('METRICS.KPI.MODAL.CANCEL')}
      onCancel={remove}
      confirmText={t('METRICS.KPI.MODAL.CONFIRM')}
      onConfirm={handleConfirm}
      isDangerButton
    />
  );
});

export default RemoveMetricPopup;
