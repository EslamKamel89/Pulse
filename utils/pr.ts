export default function pr<T>(value: T, title: string = ""): T {
  console.log("\n\n");
  console.log(` ======${title}====== `);
  console.log(value);
  console.log("\n\n");
  return value;
}
