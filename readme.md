# Next-Next-SPA

nest-next-spa provide states from nest-next via SPA mode. 

## Installation
```
yarn add nest-next-spa

# or

npm install nest-next-spa
```

## Usage

```ts
// app.module.ts
import { NestNextSpaModule } from 'nest-next-spa';

@Module({
  controllers: [AppController],
  imports: [NestNextSpaModule],
})
export class AppModule {}

// app.controller.ts
import { Page } from 'nest-next-spa';

@Controller()
export class AppController {
	@Page('index')
	public index() {
		return {
			title: 'Hello World!',
		}
	}
}
```

```tsx
// _app.tsx
import { INestNextApp, getNestNextInitialProps } from 'nest-next-spa';

const App: INestNextApp = ({ Component, pageProps }) => {
  return (
    <Component pageProps={pageProps} />
  );
};

App.getInitialProps = getNestNextInitialProps(() => {
  description: 'my description'
})

```
