export type PrintfulProduct = {
  id: number
  external_id: string
  name: string
  variants: number
  synced: number
  thumbnail_url: string
  is_ignored: boolean
}

export type PrintfulVariant = {
  id: number
  external_id: string
  sync_product_id: number
  name: string
  synced: boolean
  variant_id: number
  retail_price: string
  currency: string
  is_ignored: boolean
  sku: string
  product: {
    variant_id: number
    product_id: number
    image: string
    name: string
  }
  files: PrintfulFile[]
  options: PrintfulOption[]
  main_category_id: number
  warehouse_product_variant_id: number | null
}

export type PrintfulFile = {
  id: number
  type: string
  hash: string
  url: string | null
  filename: string
  mime_type: string
  size: number
  width: number
  height: number
  dpi: number
  status: string
  created: number
  thumbnail_url: string
  preview_url: string
  visible: boolean
  is_temporary: boolean
}

export type PrintfulOption = {
  id: string
  value: string
}

export type PrintfulProductDetail = {
  sync_product: PrintfulProduct
  sync_variants: PrintfulVariant[]
}

export type PrintfulOrderItem = {
  sync_variant_id: number
  quantity: number
  retail_price?: string
  name?: string
}

export type PrintfulRecipient = {
  name: string
  address1: string
  city: string
  state_code: string
  country_code: string
  zip: string
  email?: string
  phone?: string
}

export type PrintfulCreateOrderPayload = {
  external_id?: string
  shipping?: string
  recipient: PrintfulRecipient
  items: PrintfulOrderItem[]
  retail_costs?: {
    currency: string
    subtotal: string
    shipping: string
    tax: string
    total: string
  }
}
