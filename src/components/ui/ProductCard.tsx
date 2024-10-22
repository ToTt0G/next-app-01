import { formatCurrency } from "@/lib/formaters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "./skeleton";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

export function ProductCard({
  name,
  priceInCents,
  description,
  id,
  imagePath,
}: ProductCardProps) {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <Skeleton className="w-full aspect-video rounded-none" />
      </div>
      <CardHeader>
        <Skeleton className="w-3/4 h-6" />
        <Skeleton className="w-1/3 h-4" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="w-full h-4 mb-0.5 rounded-b-none" />
        <Skeleton className="w-full h-4 mb-0.5 rounded-t-none rounded-bl-none" />
        <Skeleton className="w-3/4 h-4 rounded-t-none" />
      </CardContent>
      <CardFooter className="animate-pulse">
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
