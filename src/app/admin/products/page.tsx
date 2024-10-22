import { NewProductDialog } from "./_components/NewProductDialog";
import { PageHeader } from "../_components/PageHeader";
import db from "@/db/db";

import { ProductsTable } from "./ProductsTable";
import { Product } from "@prisma/client";
import { RefreshProducts } from "./_components/ProductAction";

export default async function AdminProductsPage({ id }: Product) {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      description: true,
      filePath: true,
      imagePath: true,
      _count: { select: { Orders: true } },
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <div className="flex justify-between gap-4">
        <PageHeader>Products</PageHeader>
        <div className="flex gap-3">
          <NewProductDialog />
          <RefreshProducts />
        </div>
      </div>
      <ProductsTable products={products} />
    </>
  );
}
