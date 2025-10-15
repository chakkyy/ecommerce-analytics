import { GetServerSidePropsContext } from 'next';
import { apiNoProxy } from '../lib/axios';

const getAuthData = async (ctx: GetServerSidePropsContext): Promise<{ id?: number; status: number }> => {
  const { req } = ctx;
  const { headers } = req;
  const { data, status }: { data: Partial<{ id: number }>; status: number } = await apiNoProxy.get('/auth/me', {
    headers: {
      ...headers,
    },
  });
  return { id: data?.id, status };
};

const checkAuth = async (ctx: GetServerSidePropsContext, destError?: string): Promise<string | null> => {
  try {
    const { id } = await getAuthData(ctx);
    if (!id) {
      return destError || '/';
    }
  } catch (error) {
    return destError || '/';
  }
  return null;
};

const checkAuthLogin = async (ctx: GetServerSidePropsContext): Promise<string | null> => {
  try {
    const { id } = await getAuthData(ctx);

    return '/dashboards';
  } catch (error) {
    return null;
  }
};

export { checkAuth, checkAuthLogin };
