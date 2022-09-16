import { BreadcrumbsProps } from './Breadcrumbs.props';
import styles from './Breadcrumbs.module.css';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface IPathArray {
  breadcrumb: string;
  href: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = (): JSX.Element => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<IPathArray[] | null>(null);

  useEffect(() => {
    console.log('router.asPath', router.asPath);
    if (router) {
      const linkPath = router.asPath.split('/');
      console.log('linkPath', linkPath);
      linkPath.shift();
      console.log('linkPath.shift()', linkPath);

      const pathArray: IPathArray[] = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return <></>;
  }
  console.log('breadcrums:', breadcrumbs);
  return (
    <nav aria-label="breadcrumbs">
      <ul className="breadcrumb">
        <a href="/"> home / </a>

        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <Link href={breadcrumb.href}>
              <a key={breadcrumb.href}>{breadcrumb.breadcrumb} / </a>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};
