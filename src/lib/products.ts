import { getStoreProducts, getProductDetail } from "@/lib/printful"
import type { PrintfulProduct, PrintfulProductDetail } from "@/types/printful"

// Next.jsのfetch cacheを利用してAPI呼び出しを最小化
export async function fetchProducts(): Promise<PrintfulProduct[]> {
  try {
    return await getStoreProducts()
  } catch (error) {
    console.error("Failed to fetch products from Printful:", error)
    return []
  }
}

export async function fetchProductDetail(id: string): Promise<PrintfulProductDetail | null> {
  try {
    return await getProductDetail(id)
  } catch (error) {
    console.error(`Failed to fetch product ${id} from Printful:`, error)
    return null
  }
}

// 表示用の価格フォーマット（USD）
export function formatPrice(price: string | number): string {
  const num = typeof price === "string" ? parseFloat(price) : price
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num)
}

// Printful商品のメインサムネイル画像URL取得
export function getProductImage(product: PrintfulProduct): string {
  return product.thumbnail_url || "/placeholder.png"
}
