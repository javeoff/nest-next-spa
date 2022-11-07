import { FC } from 'react';
import { NextPageContext } from 'next/types';

export type INestNextPage<Props, GetInitialProps> = FC<Props & GetInitialProps> & {
  getInitialProps?(context: NextPageContext): GetInitialProps | Promise<GetInitialProps>;
}
