import { notFound } from "next/navigation"
import { fetchProductDetail } from "@/lib/products"
import { ProductDetailClient } from "@/components/ProductDetailClient"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const detail = await fetchProductDetail(id)
  if (!detail) notFound()

  const { sync_product, sync_variants } = detail

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <ProductDetailClient
        productId={String(sync_product.id)}
        productName={sync_product.name}
        thumbnailUrl={sync_product.thumbnail_url}
        variants={sync_variants}
      />
    </main>
  )
}
