import { OrderItem } from './dashboard';

export type StepStatus = 'active' | 'inactive' | 'completed' | 'skipped';

export type Step = {
  label: string;
  status: StepStatus;
};

export type Steps = { [key: string]: Step };

export type SignUpProps = {
  steps: { [key: string]: Step };
  setStep: (updates: { [key: string]: Step }) => void;
  withInvitation: boolean;
  invitationToken?: string;
};

export interface PersonalDataForm {
  firstName: string;
  lastName: string;
  email: string;
  confirm_email: string;
  phoneNumber: string;
  password: string;
  confirm_password: string;
  locale: string;
  invitationToken?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface UpdatePersonalDataForm {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface CompanyDataForm {
  company: string;
  countryId: number;
  employees: string;
  logo: string;
  sectorId: number;
}

export interface UserLoginForm {
  email: string;
  password: string;
}

export interface SyncEcommerceDataForm {
  url: string;
  publicKey: string;
  secretKey: string;
}

export interface EcommerceCredentialsDataForm {
  ecommerceKey: string;
  keyType: string;
  keyValue: string;
}

interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

interface Id {
  id: number;
}

export interface Country extends Timestamps, Id {
  name: string;
  code: string;
  iso: string;
}

export interface Sector extends Timestamps, Id {
  name: string;
}

export interface ChartType {
  id: number;
  name: string;
}

export interface FilterType {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  category: string;
}

export interface RecipeConfig {
  id: number;
  title: string;
  filterTypeDetail: string;
  metricId: number;
  recipeId: number;
  chartTypeId: number;
  filterTypeId: number;
  segmentId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  chartType: ChartType;
  filterType: FilterType;
  recipe: Recipe;
}

export interface SegmentDataItem {
  total: string;
  createdAt: string;
  userId: string;
}
export interface SegmentedData {
  [key: string]: Array<{ total: string; createdAt: string; userId: string }>;
}

export type Metric = {
  id: number;
  title: string;
  textTooltip: string;
  positionX: number;
  positionY: number;
  spanX: number;
  spanY: number;
  dashboardId: number;
  recipeConfig: RecipeConfig;
  value: number | OrderItem[] | SegmentedData;
  metricType: string;
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  minW: number;
  maxW: number;
  component: React.ReactElement;
  data: RowData[] | ChartData;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

interface Dataset {
  data: number[] | { x: string; y: number } | { x: string; y: number }[];
  label?: string;
  backgroundColor: string[] | string;
  borderColor: string[] | string;
  borderWidth?: number;
}
export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

export interface RowData {
  id: string;
  date: string;
  price: string;
  status: string;
}
export interface DashboardData {
  id: number;
  name: string;
  ecommerceConnectId: number;
  companyId: number;
  creatorId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metrics: Metric[];
  value: any;
  ecommerceConnect: {
    id: number;
    strategy: string;
  };
}

export type GoogleUserDataType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  googleId: string;
  password: string;
  phoneNumber: string;
};
