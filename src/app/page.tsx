import { fetchProducts } from "@/lib/products"
import { getProductDetail } from "@/lib/printful"
import { ProductCard } from "@/components/ProductCard"

export const revalidate = 3600

export default async function HomePage() {
  const products = await fetchProducts()

  const productsWithPrice = await Promise.all(
    products.map(async (product) => {
      try {
        const detail = await getProductDetail(String(product.id))
        const prices = detail.sync_variants
          .map((v) => parseFloat(v.retail_price))
          .filter((p) => !isNaN(p))
        const minPrice = prices.length > 0 ? Math.min(...prices).toFixed(2) : undefined
        return { product, minPrice }
      } catch {
        return { product, minPrice: undefined }
      }
    })
  )

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">
          🇯🇵 일본 직배송 굿즈샵
        </h1>
        <p className="text-muted-foreground text-lg">
          일본에서 직접 제작한 애니메이션 스타일 커스텀 굿즈를 한국으로 배송해드립니다
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          일본 직제작 · 빠른배송 · 고품질 인쇄
        </p>
      </section>

      {products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-4xl mb-4">🛍️</p>
          <p>현재 등록된 상품이 없습니다</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productsWithPrice.map(({ product, minPrice }) => (
            <ProductCard
              key={product.id}
              product={product}
              minPrice={minPrice}
            />
          ))}
        </div>
      )}
    </main>
  )
}
