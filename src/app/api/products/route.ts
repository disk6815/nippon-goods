import { NextResponse } from "next/server"
import { fetchProducts } from "@/lib/products"

// 開発環境のみ有効（本番では404を返す）
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  const products = await fetchProducts()
  return NextResponse.json({ products, count: products.length })
}
