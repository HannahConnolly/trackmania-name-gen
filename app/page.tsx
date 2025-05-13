import Tool from "@/components/Tool"

export const metadata = {
  title: "Trackmania Name Colors Generator",
  description: "Generate colorful, styled Trackmania names easily!",
}

export default function Home() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Trackmania Tag Generator</h1>
      <Tool />
    </main>
  )
}
