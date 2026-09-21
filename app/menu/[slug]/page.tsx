import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/app/_components/site-footer";
import { SiteHeader } from "@/app/_components/site-header";
import { menuProducts, normalizeCategory } from "../_data/menu-products";
import { ProductDetail } from "./_components/product-detail";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...new Set(menuProducts.map((product) => product.slug))].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = menuProducts.find((item) => item.slug === slug);
  if (!product) return { title: "Dish not found | RannaGhor" };

  return {
    title: `${product.name} | RannaGhor`,
    description: `${product.description} Order from RannaGhor for ${product.price} BDT.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = menuProducts.find((item) => item.slug === slug);
  if (!product) notFound();

  const category = normalizeCategory(product.categoryId);
  const relatedProducts = menuProducts
    .filter((item) => item.id !== product.id && item.slug !== product.slug && item.available)
    .toSorted((first, second) => {
      const firstMatch = normalizeCategory(first.categoryId) === category ? 1 : 0;
      const secondMatch = normalizeCategory(second.categoryId) === category ? 1 : 0;
      return secondMatch - firstMatch || second.rating - first.rating;
    })
    .slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-dark">
      <SiteHeader />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
      <SiteFooter />
    </div>
  );
}
