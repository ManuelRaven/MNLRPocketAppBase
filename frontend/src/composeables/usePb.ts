import type { TypedPocketBase } from "@/types/pocketbase-types";
import PocketBase from "pocketbase";
const pb = new PocketBase("/") as TypedPocketBase;
// vue 3 composeable returning a pocketbase instance

export function usePb(): TypedPocketBase {
  return pb;
}
