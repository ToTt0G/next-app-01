"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formaters";
import { cn } from "@/lib/utils";
import { ComponentProps, useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";

interface Props extends ComponentProps<"form"> {
  onSubmit: () => void;
  product?: {
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
}

export function ProductForm({ className, onSubmit, product }: Props) {
  const [error, action] = useFormState(
    product ? updateProduct.bind(null, product.id) : addProduct,
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );

  if (product == null) console.log("null form"); //Testing

  return (
    <form action={action} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Product Name"
          required
          defaultValue={product?.name || ""}
        />
        {error?.name && (
          <div className="text-destructive text-xs">{error.name}</div>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="priceInCents">Price</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          placeholder="Product Price In Cents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
          defaultValue={product?.priceInCents}
        />
        {error?.priceInCents && (
          <div className="text-destructive text-xs">{error.priceInCents}</div>
        )}
      </div>
      <p className="text-muted-foreground">
        {priceInCents ? formatCurrency(priceInCents / 100) : formatCurrency(0)}
      </p>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Product Description"
          required
          defaultValue={product?.description || ""}
        />
        {error?.description && (
          <div className="text-destructive text-xs">{error.description}</div>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="file">Product File</Label>
        {product ? (
          <p className="text-muted-foreground text-sm">{product.filePath}</p>
        ) : (
          <p className="text-muted-foreground text-sm">
            The digital product to be sold.
          </p>
        )}
        <Input type="file" id="file" name="file" required={product == null} />
        {error?.file && (
          <div className="text-destructive text-xs">{error.file}</div>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">Product Image</Label>
        {product ? (
          <img
            src={product.imagePath}
            alt="Product Image"
            className="rounded-lg max-h-64 w-full object-cover"
          />
        ) : null}
        <Input type="file" id="image" name="image" required={product == null} />
        {error?.image && (
          <div className="text-destructive text-xs">{error.image}</div>
        )}
      </div>
      <SubmitButton onSubmit={onSubmit} />
    </form>
  );
}

function SubmitButton({ onSubmit }: Props) {
  const { pending } = useFormStatus();

  const onClick = () => {
    if (!pending) {
      onSubmit();
    }
  };

  return (
    <Button onClick={onClick} type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
