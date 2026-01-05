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
      <main className="relative bg-unda-bg/30">
        {/* BackgroundElements is now global in App.jsx */}
        <Hero />
        <CommunityStory />
        <ImpactSnapshot />
        <PreventionPackage />
        <Workstreams />
        <GetInvolved />
        <UpcomingEvents />
        <LatestBlog />
      </main>
    </Layout>
  );
};

export default Home;


