import { PageContextProvider } from './usePageContext';
import './PageShell.css';
import { ReactNode } from 'preact/compat';

export { PageShell };

function PageShell({
  pageContext,
  children,
}: {
  pageContext: { urlPathname: string };
  children: ReactNode;
}) {
  return (
    <PageContextProvider pageContext={pageContext}>
      <Header url={pageContext.urlPathname} />
      <main>{children}</main>
    </PageContextProvider>
  );
}

export function Header({ url }: { url: string }) {
  return (
    <header>
      <nav>
        <a href="/" className={url == '/' && 'active'}>
          Home
        </a>
        <a href="/clock">clock</a>
        <a href="/404" className={url == '/404' && 'active'}>
          404
        </a>
      </nav>
    </header>
  );
}
