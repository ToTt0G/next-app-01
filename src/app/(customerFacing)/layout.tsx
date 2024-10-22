import { Nav, NavLink } from "@/components/ui/Nav";

export const dynamic = "force-dynamic";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center flex-wrap">
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>

      <div className="container my-6 mx-4">{children}</div>
    </div>
  );
}
