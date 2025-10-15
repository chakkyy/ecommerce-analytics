import { memo } from 'react';
import useGetMe from '@hooks/api/common/useGetMe';
import DownloadIcon from '@icons/download-icon';
import Button from '@ui/button';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const S3_BUCKET =
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
    ? 'private1'
    : 'private';

const DownloadCsvButton = memo(({ segmentId }: { segmentId: number | string }) => {
  const { t } = useTranslation('segments');
  const { data: userData } = useGetMe();

  return (
    <Link target='_blank' href={`${S3_BUCKET}/segments/${userData?.selectedCompany?.database}-${segmentId}.csv`}>
      <Button small variant='secondary' icon={<DownloadIcon />} onClick={() => {}}>
        {t('SEGMENT_DETAIL.DOWNLOAD_BUTTON')}
      </Button>
    </Link>
  );
});

export default DownloadCsvButton;
