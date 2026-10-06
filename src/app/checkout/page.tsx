// Checkout route (TSX) – collects delivery details and sends the order via WhatsApp.
import PageHeader from "@/components/PageHeader";
import WhatsAppCheckout from "./WhatsAppCheckout";

export const metadata = { title: "Order on WhatsApp" };

export default function CheckoutPage() {
  return (
    <>
      <PageHeader title="Order on WhatsApp" crumb="Checkout" sub="Add your delivery details. We'll open WhatsApp with your order ready to send." />
      <WhatsAppCheckout />
    </>
  );
}
