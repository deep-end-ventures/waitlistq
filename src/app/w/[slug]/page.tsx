import { createServiceClient } from '@/lib/supabase';
import WaitlistWidget from '@/components/WaitlistWidget';
import Navbar from '@/components/Navbar';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ref?: string }>;
}

async function getWaitlist(slug: string) {
  const supabase = createServiceClient();
  const { data: waitlist } = await supabase
    .from('waitlists')
    .select('id, name, slug, description, is_active, branding')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!waitlist) return null;

  const { count } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true })
    .eq('waitlist_id', waitlist.id);

  return { ...waitlist, subscriberCount: count || 0 };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const waitlist = await getWaitlist(slug);
  if (!waitlist) {
    return { title: 'Waitlist Not Found' };
  }
  return {
    title: `${waitlist.name} — Join the Waitlist`,
    description: waitlist.description || `Join the waitlist for ${waitlist.name}`,
    openGraph: {
      title: `${waitlist.name} — Join the Waitlist`,
      description: waitlist.description || `Join the waitlist for ${waitlist.name}`,
    },
  };
}

export default async function WaitlistPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { ref } = await searchParams;
  const waitlist = await getWaitlist(slug);

  if (!waitlist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Waitlist Not Found</h1>
            <p className="text-gray-600">This waitlist doesn&apos;t exist or has been closed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      <div className="flex items-center justify-center pt-16 pb-32 px-4">
        <div className="w-full max-w-md">
          <WaitlistWidget
            waitlistId={waitlist.id}
            slug={waitlist.slug}
            name={waitlist.name}
            description={waitlist.description}
            subscriberCount={waitlist.subscriberCount}
            referralCode={ref || null}
          />
          <p className="text-center mt-6 text-xs text-gray-400">
            Powered by{' '}
            <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              WaitlistQ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
