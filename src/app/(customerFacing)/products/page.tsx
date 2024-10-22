import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductCard";
import db from "@/db/db";
import { Product } from "@prisma/client";
import { Suspense } from "react";

function getAllProducts() {
  return db.product.findMany({ where: { isAvailableForPurchase: true } });
}

export default function ProductsPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense />
        </Suspense>
      </div>
    </>
  );
}

async function ProductSuspense() {
  return (await getAllProducts()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
