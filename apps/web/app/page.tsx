import { type Band } from "@repo/database";

export default async function Home() {
  const bands: Band[] = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/band`)).json();

  return (
    <main >
      {
        bands.map(b => <p key={b.id}>{b.name}</p>)
      }
    </main>
  );
}