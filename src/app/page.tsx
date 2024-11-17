import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elite Service Hub - Home',
  description: 'Welcome to Elite Service Hub - Your Premium Turf Service Provider',
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Elite Service Hub</h1>
        <p className="text-xl">Premium Turf Services</p>
      </div>
    </main>
  )
}
