import { FC } from 'react';
import { AppProps } from 'next/app';
import { IAppInitialProps } from '../utils/getNestNextInitialProps';
import { NextPage, NextPageContext } from 'next/types';

export type INestNextApp = FC<AppProps> & {
  getInitialProps?(props: { ctx: NextPageContext; Component: NextPage }): Promise<IAppInitialProps>;
};
