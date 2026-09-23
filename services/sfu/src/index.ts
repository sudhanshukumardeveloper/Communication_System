import { getRouter } from "./router";

async function main() {
  const router = await getRouter();
  console.log(`SFU router ready: ${router.id}`);
  // Production integration should expose authenticated transport,
  // producer and consumer signaling through the control plane.
}
main().catch(err => { console.error(err); process.exit(1); });
