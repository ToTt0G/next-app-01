"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, MoreVertical, X } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formaters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "./_components/ProductAction";
import { EditProductDialog } from "./_components/EditProductDialog";
import { useEffect, useState } from "react";

interface Props {
  products: {
    id: string;
    name: string;
    priceInCents: number;
    isAvailableForPurchase: boolean;
    description: string;
    filePath: string;
    imagePath: string;
    _count: { Orders: number };
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export function ProductsTable({ products }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    priceInCents: number;
    isAvailableForPurchase: boolean;
    description: string;
    filePath: string;
    imagePath: string;
    _count: { Orders: number };
    createdAt: Date;
    updatedAt: Date;
  } | null>(null);

  if (selectedProduct == null) console.log("null table"); //Testing

  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  if (products.length === 0) return <p>No products found</p>;

  return (
    <>
      <EditProductDialog
        selectedProduct={selectedProduct}
        open={openDialog}
        setOpen={setOpenDialog}
        isDesktop={isDesktop}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0">
              <span className="sr-only">Available For Purchase</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.isAvailableForPurchase ? (
                  <>
                    <Check />
                    <span className="sr-only">Available</span>
                  </>
                ) : (
                  <>
                    <X className="stroke-destructive" />
                    <span className="sr-only">Unavailable</span>
                  </>
                )}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {formatCurrency(product.priceInCents / 100)}
              </TableCell>
              <TableCell>{formatNumber(product._count.Orders)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <a
                        download
                        href={`/admin/products/${product.id}/download`}
                      >
                        Download
                      </a>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        setOpenDialog(true);
                        setSelectedProduct(product);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>

                    <ActiveToggleDropdownItem
                      id={product.id}
                      isAvailableForPurchase={product.isAvailableForPurchase}
                    />

                    <DropdownMenuSeparator />

                    <DeleteDropdownItem
                      disabled={product._count.Orders > 0}
                      id={product.id}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
