import Workstreams from '@/components/sections/Workstreams';
import PreventionPackage from '@/components/sections/PreventionPackage';
import ImpactSnapshot from '@/components/sections/ImpactSnapshot';
import CommunityStory from '@/components/sections/CommunityStory';

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
      </main>
    </Layout>
  );
};

export default Home;


