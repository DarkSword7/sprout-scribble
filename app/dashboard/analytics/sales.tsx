import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  TableRow,
  TableCaption,
  TableHead,
} from "@/components/ui/table";
import { TotalOrders } from "@/lib/infer-type";
import Image from "next/image";
import placeholderUser from "@/public/placeholder-user.jpg";

export default function Sales({ totalOrders }: { totalOrders: TotalOrders[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Sales</CardTitle>
        <CardDescription>Check your sales and orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalOrders.map(
              ({ order, product, quantity, productVariants }) => (
                <TableRow className="font-medium" key={order.id}>
                  <TableCell>
                    {order.user.image && order.user.name ? (
                      <div className="flex gap-2 items-center">
                        <Image
                          src={order.user.image}
                          alt={order.user.name}
                          width={25}
                          height={25}
                          className="rounded-full"
                        />
                        <p className="text-xs font-medium">{order.user.name}</p>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <Image
                          src={placeholderUser}
                          alt="user not found"
                          width={25}
                          height={25}
                          className="rounded-full"
                        />
                        <p className="text-xs font-medium">User not found</p>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>
                    <Image
                      src={productVariants.variantImages[0].url}
                      alt={product.title}
                      width={48}
                      height={48}
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
