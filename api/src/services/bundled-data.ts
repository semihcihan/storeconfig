import type { TerritoryData } from "./pricing-strategy";
import currencies from "../data/currencies.json";

export function loadBundledCurrencies(): TerritoryData[] {
  return JSON.parse(JSON.stringify(currencies)) as TerritoryData[];
}
