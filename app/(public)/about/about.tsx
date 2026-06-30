'use client'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#001740] text-white">

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-[#fbc816]">
          About Knowledge Chain
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          The Knowledge Chain NFT Collection is a Web3-native system designed to reframe NFTs as instruments of learning, participation, and communal progress rather than speculative assets.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          Rooted in African intellectual history and adapted for modern blockchain ecosystems, the collection positions knowledge as infrastructure: something that is built collectively, accessed through effort, and strengthened through contribution.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed mb-12">
         Each NFT functions as a verified link in a growing chain of participants who are learning, applying, questioning, and distributing knowledge within a decentralized ecosystem.
        </p>

        {/* Mission / Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#002766] rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-[#fbc816]">Our Mission</h3>
            <p className="text-gray-300">
              The mission of Knowlege Chain is to make blockchain knowledge clear, practical, and accessible
              by breaking down complex ideas into meaningful conversations that educate, challenge
              perspectives, and empower informed participation in the digital economy.
              We exist to move blockchain discussions beyond hype, helping audiences understand not just
              what the technology is, but why it matters and how it can be used responsibly and effectively.
            </p>
          </div>

          <div className="bg-[#002766] rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-[#fbc816]">Our Vision</h3>
            <p className="text-gray-300">
              The vision of The TKC Show is to become a trusted reference point for blockchain education and
              insight, recognized for clarity, depth, and intellectual honesty.
              We aim to shape a future where blockchain knowledge is not exclusive to insiders, but
              understood, questioned, and applied by a broader, informed community, fostering long-term
              value, innovation, and trust in decentralized systems.
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}
