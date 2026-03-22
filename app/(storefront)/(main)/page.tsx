import { ContentWrapper } from "@/components/content-wrapper";
import { SlideShow } from "@/components/slideshow";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db/db";
import { products, stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PropsWithChildren } from "react";
import { ProductAndStore } from "./products/page";
import { ProductCard } from "@/components/storefront/product-card";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { FeatureBanner } from "../components/feature-banner";
import {
  AlarmClock,
  DollarSign,
  FastForward,
  Phone,
  Truck,
  User,
  Wind,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { TextInputWithLabel } from "@/components/text-input-with-label";

export default async function Home() {
  const storeAndProduct = (await db
    .select({
      product: products,
      store: {
        id: stores.id,
        name: stores.name,
        slug: stores.slug,
      },
    })
    .from(products)
    .leftJoin(stores, eq(products.storeId, stores.id))
    .limit(8)) as ProductAndStore[];

  return (
    <div>
      <SlideShow />
      <ContentWrapper>
        <Tabs defaultValue="for-buyers">
          <div className="flex items-center justify-center mt-2 mb-8">
            <TabsList>
              <TabsTrigger value="for-buyers">For Buyers</TabsTrigger>
              <TabsTrigger value="for-sellers">For Sellers</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="for-sellers">
            <HomePageLayout
              heading={<Heading size="h1">Sell food online with ease.</Heading>}
              subheading={
                <Heading size="h2">
                  Launch a grocery, deli, bakery, or prepared-meals shop with
                  local-first checkout and inventory built in.
                </Heading>
              }
            >
              <div className="md:grid md:grid-cols-3 gap-4 flex flex-col mt-12">
                <FeatureBanner
                  heading="No monthly fees"
                  subheading="List your grocery catalog, update inventory quickly, and test the full order flow without any hosted platform setup."
                  icon={<DollarSign size={32} />}
                />
                <FeatureBanner
                  heading="Built for food sellers"
                  subheading="Run a produce market, pantry shop, bakery, or ready-meal counter from the same seller dashboard."
                  icon={<User size={32} />}
                />
                <FeatureBanner
                  heading="Quick and easy setup"
                  subheading="Seeded demo data, local auth, and local checkout make this environment easy to spin up and reset."
                  icon={<AlarmClock size={32} />}
                />
              </div>
              <div className="flex items-center justify-center mt-12">
                <Link href={routes.signUp}>
                  <Button size="lg">Create account</Button>
                </Link>
              </div>
            </HomePageLayout>
          </TabsContent>
          <TabsContent value="for-buyers">
            <HomePageLayout
              heading={<Heading size="h1">Grocery shopping made simple.</Heading>}
              subheading={
                <Heading size="h2">
                  Browse produce, pantry staples, deli meals, and bakery picks
                  from independent food sellers.
                </Heading>
              }
            >
              <Heading size="h3">Top Picks</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-auto mt-4">
                {storeAndProduct.map((item) => (
                  <ProductCard
                    key={item.product.id}
                    storeAndProduct={item}
                    hideButtonActions={true}
                  />
                ))}
              </div>
              <div className="mt-12 grid place-content-center">
                <Link href={routes.products}>
                  <Button variant="default">View All Products</Button>
                </Link>
              </div>
              <div className="bg-blue-900 text-white w-full p-12 rounded-md mt-12 flex items-center flex-col gap-2 justify-center text-center">
                <p className="uppercase tracking-wide text-sm font-medium">
                  Featured seller
                </p>
                <p className="text-3xl font-bold">Orchard Market</p>
                <p>
                  Fresh fruit, peppers, onions, and daily produce essentials for
                  fast weekly basket building.
                </p>
                <Link
                  href={routes.products + "?seller=orchard-market"}
                  className="mt-6"
                >
                  <Button variant="secondary">Explore seller</Button>
                </Link>
              </div>
              <div className="md:grid md:grid-cols-3 gap-4 flex flex-col mt-12">
                <FeatureBanner
                  heading="One streamlined checkout"
                  subheading="Mix produce, pantry staples, and prepared foods in a single local demo order."
                  icon={<Truck size={32} />}
                />
                <FeatureBanner
                  heading="Fresh picks every visit"
                  subheading="Discover quick dinners, deli bowls, and bakery items alongside grocery basics."
                  icon={<Phone size={32} />}
                />
                <FeatureBanner
                  heading="Everyday food variety"
                  subheading="Six food-first shops give the storefront a more realistic Instacart-style mix."
                  icon={<DollarSign size={32} />}
                />
              </div>
            </HomePageLayout>
          </TabsContent>
        </Tabs>
      </ContentWrapper>
    </div>
  );
}

const HomePageLayout = (
  props: PropsWithChildren<{
    heading: React.ReactNode;
    subheading: React.ReactNode;
  }>
) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 text-center mb-12 pt-2">
        {props.heading}
        <div className="text-slate-600">{props.subheading}</div>
      </div>
      {props.children}
    </>
  );
};
