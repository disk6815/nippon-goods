import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/products"
import type { PrintfulProduct, PrintfulVariant } from "@/types/printful"

type Props = {
  product: PrintfulProduct
  minPrice?: string
}

export function ProductCard({ product, minPrice }: Props) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {product.variants}가지 옵션 {/* 〇種類のオプション */}
          </p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
          {minPrice && (
            <span className="font-bold text-sm">
              {formatPrice(minPrice)}~
            </span>
          )}
          <Badge variant="secondary" className="text-xs">
            일본 직배송 {/* 日本直送 */}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  )
}
