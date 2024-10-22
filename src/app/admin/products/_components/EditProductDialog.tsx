"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ProductForm } from "./ProductForm";

interface Props {
  selectedProduct: {
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
  } | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  isDesktop: boolean;
}

export function EditProductDialog({
  selectedProduct,
  open,
  setOpen,
  isDesktop,
}: Props) {
  if (typeof window === "undefined") {
    return null;
  }

  if (selectedProduct == null) console.log("null dialog"); //Testing

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Edit
          </DropdownMenuItem>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Edit your product here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            product={selectedProduct}
            onSubmit={() => console.log("close dialog")}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Edit</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-min">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Product</DrawerTitle>
          <DrawerDescription>
            Edit your product here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProductForm
          product={selectedProduct}
          onSubmit={() => console.log("close drawer")}
          className="px-4"
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
