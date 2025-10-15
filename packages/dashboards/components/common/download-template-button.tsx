import { useTranslation } from 'next-i18next';
import Button from '@ui/button';
import DownloadIcon from '@icons/download-icon';

const DownloadTemplateButton = ({ fileName }: { fileName: string }) => {
  const { t } = useTranslation(['signup', 'store']);

  const handleDownload = () => {
    const fileUrl = `/download/templates/${fileName}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <Button small variant='secondary' icon={<DownloadIcon />} onClick={handleDownload}>
      {t('store:SELECT_TEMPLATE.DOWNLOAD_TEMPLATE_TITLE')}
    </Button>
  );
};

export default DownloadTemplateButton;
