import SyncEcommerceComponent from '@ui/forms/sync-ecommerce';

type Props = {
  handleStepChange: (action: 'next' | 'prev' | 'skip') => void;
};

const InviteUserStep = ({ handleStepChange }: Props) => {
  return <SyncEcommerceComponent handleStepChange={() => handleStepChange('skip')} />;
};

export default InviteUserStep;
