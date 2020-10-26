import { GetServerSideProps } from 'next';
import Link from 'next/link';

import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';

import { client } from '@/lib/prismic';

import SEO from '@/components/SEO';

import { Title } from '@/styles/pages/Home';

interface IHomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: IHomeProps) {
  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce!"
        shouldExcludeTitleSuffix
      />

      <section>
        <Title>Produtos</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
};
