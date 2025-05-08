export default function pr<T>(
  value: T,
  title: string = "",
  options: { encode: boolean } = {
    encode: false,
  },
): T {
  console.log("\n\n");
  console.log(` ======${title}====== `);
  if (options.encode) {
    console.log(JSON.stringify(value));
  } else {
    console.log(value);
  }
  console.log("\n\n");
  return value;
}
