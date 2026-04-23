/** Formats AR-style pesos: $ 24.000 */
export function formatCurrency(value: number): string {
  const abs = Math.abs(Math.round(value));
  const formatted = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$ ${formatted}`;
}
