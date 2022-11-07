import { NextPage } from 'next';
import Link from 'next/link';

interface IProps {
  pageProps: {
    title?: string;
    description?: string;
  }
}

const IndexPage: NextPage<IProps> = ({ pageProps }) => {
  return (
    <>
      <h1>{pageProps.title}</h1>
      <h1>{pageProps.description}</h1>
      <Link href='/'>To Index</Link>
    </>
  )
}

// IndexPage.getInitialProps = () => {
//   return {
//     pageProps: {
//       title: '123',
//       description: '2',
//     }
//   }
// }

export default IndexPage;
