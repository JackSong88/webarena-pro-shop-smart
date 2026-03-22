"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { routes } from "@/lib/routes";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Orchard Market",
    href: "/products?seller=orchard-market",
    description:
      "Seasonal produce, fruit bags, peppers, onions, and fresh weekly staples.",
  },
  {
    title: "Pantry Lane",
    href: "/products?seller=pantry-lane",
    description:
      "Pantry refills, breakfast basics, drinks, and everyday grocery essentials.",
  },
  {
    title: "FreshMart",
    href: "/products?seller=freshmart",
    description:
      "Neighborhood grocery staples with bananas, milk, eggs, and fresh bread.",
  },
  {
    title: "GreenBasket",
    href: "/products?seller=greenbasket",
    description:
      "Organic produce and pantry picks like spinach, avocados, tomatoes, and rice.",
  },
];

export function MenuItems() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Products
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md no-underline outline-none focus:shadow-md bg-sport overflow-hidden"
                    href="/"
                  >
                    <div className="relative top-0 bg-secondary border border-border w-full h-full p-6 pt-24">
                      <div className="mb-2 mt-4 text-lg font-medium text-primary">
                        Here to help
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground text-gray-100">
                        Contact our customer support team 24/7
                      </p>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href={routes.products} title="New Arrivals">
                Shop this week&apos;s produce, deli meals, and pantry picks.
              </ListItem>
              <ListItem href={routes.products} title="Pantry Staples">
                Build a basket with rice, milk, coffee, and breakfast basics.
              </ListItem>
              <ListItem href={routes.products} title="Ready Meals">
                Find pasta trays, curry bowls, salads, and grab-and-go dinners.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/* <NavigationMenuTrigger>Featured Sellers</NavigationMenuTrigger> */}
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
