"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/store/cart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/products"
import { ShoppingCart, Check } from "lucide-react"
import type { PrintfulVariant } from "@/types/printful"

type Props = {
  productId: string
  productName: string
  thumbnailUrl: string
  variants: PrintfulVariant[]
}

export function ProductDetailClient({ productId, productName, thumbnailUrl, variants }: Props) {
  // カラーごとにバリアントをグループ化
  const colorMap = new Map<string, { variants: PrintfulVariant[]; previewUrl: string }>()
  for (const v of variants) {
    const parts = v.name.split(" / ")
    const color = parts.length >= 2 ? parts[1] : "Default"
    const previewUrl =
      v.files?.find((f) => f.type === "preview")?.preview_url || thumbnailUrl
    if (!colorMap.has(color)) {
      colorMap.set(color, { variants: [], previewUrl })
    }
    colorMap.get(color)!.variants.push(v)
  }

  const colors = Array.from(colorMap.entries())
  const [selectedColor, setSelectedColor] = useState(colors[0]?.[0] ?? "")
  const [selectedVariantId, setSelectedVariantId] = useState(
    colors[0]?.[1].variants[0]?.id ? String(colors[0][1].variants[0].id) : ""
  )
  const [added, setAdded] = useState(false)
  const addItem = useCart((s) => s.addItem)

  const currentColorData = colorMap.get(selectedColor)
  const currentImage = currentColorData?.previewUrl ?? thumbnailUrl
  const sizesForColor = currentColorData?.variants ?? []
  const selectedVariant = sizesForColor.find((v) => String(v.id) === selectedVariantId)
    ?? sizesForColor[0]

  function handleColorSelect(color: string) {
    setSelectedColor(color)
    const firstVariant = colorMap.get(color)?.variants[0]
    if (firstVariant) setSelectedVariantId(String(firstVariant.id))
  }

  function handleAddToCart() {
    if (!selectedVariant) return
    addItem({
      productId,
      variantId: String(selectedVariant.id),
      name: productName,
      variantName: selectedVariant.name,
      price: parseFloat(selectedVariant.retail_price),
      thumbnailUrl: currentImage,
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* 商品画像（カラー選択で切り替わる） */}
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
        <Image
          key={currentImage}
          src={currentImage}
          alt={`${productName} - ${selectedColor}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* 商品情報 */}
      <div className="flex flex-col gap-5">
        <div>
          <Badge variant="secondary" className="mb-2">일본 직배송</Badge>
          <h1 className="text-2xl font-bold">{productName}</h1>
          {selectedVariant && (
            <p className="text-2xl font-bold text-primary mt-2">
              {formatPrice(selectedVariant.retail_price)}
            </p>
          )}
        </div>

        {/* カラー選択 */}
        <div>
          <p className="text-sm font-medium mb-2">
            색상 <span className="text-muted-foreground">({selectedColor})</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map(([color, data]) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                title={color}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? "border-black scale-110 shadow-md"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                style={{
                  backgroundColor: colorNameToHex(color),
                  backgroundImage: safePrintfulUrl(data.previewUrl)
                    ? `url(${safePrintfulUrl(data.previewUrl)})`
                    : undefined,
                  backgroundSize: "cover",
                }}
              />
            ))}
          </div>
        </div>

        {/* サイズ選択 */}
        <div>
          <p className="text-sm font-medium mb-2">사이즈</p>
          <div className="flex flex-wrap gap-2">
            {sizesForColor.map((v) => {
              const size = v.name.split(" / ").slice(-1)[0]
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantId(String(v.id))}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    selectedVariantId === String(v.id)
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>✅ 일본에서 직접 제작 후 한국으로 발송</p>
          <p>✅ Printful 고품질 인쇄</p>
          <p>✅ 주문 후 3~5 영업일 제작 + 배송 7~14일</p>
        </div>

        <Button className="w-full gap-2" size="lg" onClick={handleAddToCart} disabled={added}>
          {added ? (
            <><Check className="w-4 h-4" />장바구니에 담겼습니다</>
          ) : (
            <><ShoppingCart className="w-4 h-4" />장바구니에 담기</>
          )}
        </Button>
      </div>
    </div>
  )
}

// Printful CDN URLのみ許可（CSS injection防止）
function safePrintfulUrl(url: string): string | undefined {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.endsWith(".printful.com") && parsed.protocol === "https:") {
      return url
    }
  } catch {}
  return undefined
}

// カラー名→簡易16進数変換（スウォッチ表示用）
function colorNameToHex(name: string): string {
  const map: Record<string, string> = {
    Black: "#000000",
    "Black Heather": "#1a1a1a",
    White: "#ffffff",
    Navy: "#001f5b",
    Red: "#cc0000",
    Gray: "#808080",
    Grey: "#808080",
    Blue: "#0055cc",
  }
  return map[name] ?? "#cccccc"
}
