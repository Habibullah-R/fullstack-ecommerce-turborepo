import CartClient from "@/components/CartClient";
import { Suspense } from "react";

const CartPage = () => {
  return (
    <>
      <Suspense>
        <CartClient />
      </Suspense>
    </>
  );
};

export default CartPage;
