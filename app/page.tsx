import { Metadata } from "next"
import AddZerosOnCPFs from "components/RemoveDotsPage/AddZerosOnCPFs"
import RemoveDotsPage from "components/RemoveDotsPage/RemoveDotsPage"

export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center gap-12 bg-white pt-12 dark:bg-gray-900">
      <h1 className="text-4xl text-white">Utilitarios por que não sei usar EXCEL</h1>
      <RemoveDotsPage />
      <AddZerosOnCPFs />
    </main>
  )
}
