"use client"

import { useState } from "react"
import { useCart } from "@/store/cart"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/products"
import { ShoppingCart, Check } from "lucide-react"

type Variant = {
  id: string
  name: string
  price: string
  currency: string
}

type Props = {
  productId: string
  productName: string
  thumbnailUrl: string
  variants: Variant[]
}

export function AddToCartButton({ productId, productName, thumbnailUrl, variants }: Props) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id)
  const [added, setAdded] = useState(false)
  const addItem = useCart((s) => s.addItem)

  const selectedVariant = variants.find((v) => v.id === selectedVariantId)

  function handleAddToCart() {
    if (!selectedVariant) return
    addItem({
      productId,
      variantId: selectedVariant.id,
      name: productName,
      variantName: selectedVariant.name,
      price: parseFloat(selectedVariant.price),
      thumbnailUrl,
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* バリアント選択 */}
      <div>
        <p className="text-sm font-medium mb-2">옵션 선택</p>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariantId(v.id)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                selectedVariantId === v.id
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-gray-500"
              }`}
            >
              {v.name.split(" / ").slice(-2).join(" / ")}
            </button>
          ))}
        </div>
      </div>

      {selectedVariant && (
        <p className="text-lg font-semibold">
          {formatPrice(selectedVariant.price)}
        </p>
      )}

      <Button
        className="w-full gap-2"
        size="lg"
        onClick={handleAddToCart}
        disabled={added}
      >
        {added ? (
          <>
            <Check className="w-4 h-4" />
            장바구니에 담겼습니다
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            장바구니에 담기
          </>
        )}
      </Button>
    </div>
  )
}
