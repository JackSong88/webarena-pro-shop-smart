"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitOrder } from "@/server-actions/checkout";
import { AlertCircle, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CheckoutForm(props: {
  storeName: string;
  storeSlug: string;
  orderTotal: string;
  initialCustomerDetails: {
    name: string;
    email: string;
  };
}) {
  const router = useRouter();
  const [message, setMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: props.initialCustomerDetails.name,
    email: props.initialCustomerDetails.email,
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Canada",
    cardName: props.initialCustomerDetails.name,
    cardNumber: "4242424242424242",
    expiry: "12/34",
    cvc: "123",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await submitOrder({
      storeSlug: props.storeSlug,
      ...formValues,
    });

    setIsLoading(false);

    if (result.error) {
      setMessage(result.action);
      return;
    }

    router.push(result.redirectTo);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {message && (
        <div className="bg-red-100 border border-red-600 text-red-800 rounded-md p-2 flex items-center justify-start gap-2">
          <AlertCircle />
          <p>{message}</p>
        </div>
      )}

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-950">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-1" size={20} />
          <div>
            <p className="font-semibold">Local demo checkout</p>
            <p className="mt-1 text-sm leading-6 text-blue-950/80">
              This order is processed entirely inside the app and stored in the
              local MySQL database. No real card is charged.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 bg-secondary border-border border rounded-md md:p-6 p-4 md:pb-7 pb-5">
        <Heading size="h4">Contact Info</Heading>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            id="name"
            label="Full name"
            value={formValues.name}
            onChange={(value) =>
              setFormValues((current) => ({ ...current, name: value }))
            }
          />
          <Field
            id="email"
            label="Email"
            type="email"
            value={formValues.email}
            onChange={(value) =>
              setFormValues((current) => ({ ...current, email: value }))
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 bg-secondary border-border border rounded-md md:p-6 p-4 md:pb-7 pb-5">
        <Heading size="h4">Shipping</Heading>
        <Field
          id="line1"
          label="Address line 1"
          value={formValues.line1}
          onChange={(value) =>
            setFormValues((current) => ({ ...current, line1: value }))
          }
        />
        <Field
          id="line2"
          label="Address line 2"
          value={formValues.line2}
          onChange={(value) =>
            setFormValues((current) => ({ ...current, line2: value }))
          }
          required={false}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            id="city"
            label="City"
            value={formValues.city}
            onChange={(value) =>
              setFormValues((current) => ({ ...current, city: value }))
            }
          />
          <Field
            id="state"
            label="Province / State"
            value={formValues.state}
            onChange={(value) =>
              setFormValues((current) => ({ ...current, state: value }))
            }
          />
          <Field
            id="postalCode"
            label="Postal / ZIP code"
            value={formValues.postalCode}
            onChange={(value) =>
              setFormValues((current) => ({ ...current, postalCode: value }))
            }
          />
          <Field
            id="country"
            label="Country"
            value={formValues.country}
            onChange={(value) =>
              setFormValues((current) => ({ ...current, country: value }))
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 bg-secondary border-border border rounded-md md:p-6 p-4 md:pb-7 pb-5">
        <div className="flex items-center justify-between gap-3">
          <Heading size="h4">Payment</Heading>
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-muted-foreground">
            <CreditCard size={14} />
            Demo card prefilled
          </div>
        </div>
        <Field
          id="cardName"
          label="Name on card"
          value={formValues.cardName}
          onChange={(value) =>
            setFormValues((current) => ({ ...current, cardName: value }))
          }
        />
        <Field
          id="cardNumber"
          label="Card number"
          value={formValues.cardNumber}
          onChange={(value) =>
            setFormValues((current) => ({
              ...current,
              cardNumber: value.replace(/\s+/g, ""),
            }))
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            id="expiry"
            label="Expiry"
            value={formValues.expiry}
            onChange={(value) =>
              setFormValues((current) => ({ ...current, expiry: value }))
            }
          />
          <Field
            id="cvc"
            label="CVC"
            value={formValues.cvc}
            onChange={(value) =>
              setFormValues((current) => ({ ...current, cvc: value }))
            }
          />
        </div>
        <div className="rounded-xl border border-dashed border-border bg-white p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Ordering from {props.storeName}</p>
          <p className="mt-1">
            Total charged in demo mode:{" "}
            <span className="font-semibold text-foreground">{props.orderTotal}</span>
          </p>
        </div>
      </div>

      <Button disabled={isLoading} className="w-fit min-w-[180px]">
        <div className="flex items-center justify-center gap-2">
          {!!isLoading && <Loader2 size={18} className="animate-spin" />}
          <p>Place Order</p>
        </div>
      </Button>
    </form>
  );
}

function Field(props: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input
        id={props.id}
        type={props.type ?? "text"}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        required={props.required ?? true}
      />
    </div>
  );
}
