import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { heroAssets, stores } from "./catalog-config.mjs";

const root = process.cwd();

const assets = [
  ...heroAssets,
  ...stores.flatMap((store) =>
    store.products.map((product) => ({
      assetPath: product.assetPath,
      sourceUrl: product.sourceUrl,
    }))
  ),
];

const vendorAsset = async ({ assetPath, sourceUrl }) => {
  const response = await fetch(sourceUrl);

  if (!response.ok) {
    throw new Error(`Failed to download ${sourceUrl}: ${response.status}`);
  }

  const destination = join(root, "public", assetPath.replace(/^\//, ""));
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  console.log(`Saved ${assetPath}`);
};

await Promise.all(assets.map(vendorAsset));
