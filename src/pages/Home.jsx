import Workstreams from '@/components/sections/Workstreams';
import PreventionPackage from '@/components/sections/PreventionPackage';
import ImpactSnapshot from '@/components/sections/ImpactSnapshot';
import CommunityStory from '@/components/sections/CommunityStory';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import GetInvolved from '@/components/sections/GetInvolved';
import LatestBlog from '@/components/sections/LatestBlog';

import BackgroundElements from '@/components/shared/BackgroundElements';
import Layout from '@/components/shared/Layout';
import Hero from '@/components/Hero';

const Home = () => {
  return (
    <Layout>
      <main className="relative bg-[#F7FBFC]">
        {/* BackgroundElements is now global in App.jsx */}
        <Hero />

        <div className="max-w-7xl mx-auto px-6 -mt-20 space-y-12">
          <CommunityStory />
          <ImpactSnapshot />
          <PreventionPackage />
          <Workstreams />
          <GetInvolved />
          <UpcomingEvents />
          <LatestBlog />
        </div>
      </main>
    </Layout>
  );
};

export default Home;


