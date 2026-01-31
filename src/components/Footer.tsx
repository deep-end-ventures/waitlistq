import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="font-bold text-xl text-gray-900">WaitlistQ</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              Viral waitlists with built-in referral tracking. Launch your next product with a bang.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-sm text-gray-500 hover:text-gray-700">Features</Link></li>
              <li><Link href="/#pricing" className="text-sm text-gray-500 hover:text-gray-700">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              <li><a href="https://deep-end-ventures-site-amber.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-700">A Deep End Ventures company</a></li>
              <li><a href="mailto:hello@waitlistq.com" className="text-sm text-gray-500 hover:text-gray-700">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} WaitlistQ. A{' '}
          <a href="https://deep-end-ventures-site-amber.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">Deep End Ventures</a>{' '}
          company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
