import { NextPage, NextPageContext } from 'next/types';
import { IS_SERVER } from './constants';

export interface IPageContext extends Omit<NextPageContext, 'query'> {
  query: IPageProps;
}

export interface IPageProps {
  title?: string;
  style?: string;
}

export interface IAppInitialProps {
  pageProps: IPageProps;
}

const getPageProps = async (ctx: IPageContext): Promise<IPageProps> => {
  if (IS_SERVER) {
    return ctx.query;
  }

  if (!ctx.asPath) {
    return {};
  }

  const response = await fetch(`${ctx.asPath}?api=true`);
  const pageProps = await response.json();

  return pageProps.payload as IPageProps;
};

export const getNestNextInitialProps = <
  InitialProps extends Record<string, unknown> = Record<string, unknown>
>(callback?: (ctx: NextPageContext) => InitialProps) => {
  return async ({ctx, Component}: {ctx: NextPageContext, Component: NextPage}): Promise<IAppInitialProps & InitialProps> => {
    const appProps = await getPageProps(ctx);
    const newProps = callback?.(ctx) || {} as InitialProps;

    if (Component.getInitialProps) {
      return {
        ...newProps,
        pageProps: appProps,
        ...(await Component.getInitialProps(ctx)),
      };
    }

    return {
      ...newProps,
      pageProps: appProps,
    };
  }
}
