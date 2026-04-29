import axios from "axios"
import type {
  PrintfulProduct,
  PrintfulProductDetail,
  PrintfulCreateOrderPayload,
} from "@/types/printful"

const BASE_URL = "https://api.printful.com"

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
    "Content-Type": "application/json",
  },
})

export async function getStoreProducts(): Promise<PrintfulProduct[]> {
  const res = await client.get("/store/products", {
    params: { limit: 100 },
  })
  return res.data.result
}

export async function getProductDetail(id: string): Promise<PrintfulProductDetail> {
  const res = await client.get(`/store/products/${id}`)
  return res.data.result
}

export async function createOrder(payload: PrintfulCreateOrderPayload) {
  const res = await client.post("/orders", {
    ...payload,
    confirm: true,
  })
  return res.data.result
}

export async function getOrder(printfulOrderId: string) {
  const res = await client.get(`/orders/${printfulOrderId}`)
  return res.data.result
}
