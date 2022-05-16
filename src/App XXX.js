import React from 'react';
import { Router } from '@reach/router';
import { MicroStacksProvider, useSession, useAuth } from '@micro-stacks/react';
import Auth from './components/Auth';
import LandingCat from './pages/LandingCat';
import Intro from './pages/Intro';

import Tac from './pages/Tac';
import StacksSwaps from './pages/StacksSwaps';
import { ProfileSmall } from './components/ProfileSmall';
import LandingAtomic from './pages/LandingAtomic';
import Landing from './pages/Landing';
import UnlistStacksPunks from './pages/special/UnlistStacksPunks';
import { atomicSwaps } from './lib/constants';
import BitcoinMonkeys from './pages/BitcoinMonkeys';

const authOptions = {
  appDetails: {
    name: 'Catamaran Swaps',
    icon: 'https://catamaranswaps.org/android-icon-192x192.png',
  },
};

export default function App() {
  return (
    <MicroStacksProvider authOptions={authOptions}>
      <header className="d-flex flex-wrap justify-content-between align-items-center mx-3 py-3 mb-4 border-bottom">
        <div>
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
          >
            <img src="/android-icon-72x72.png" width="75" alt="Catamaran Swaps Logo" />
          </a>
        </div>
        <div className="text-center">
          <span className="h1">Catamaran Swaps</span>
          <br />
          <span className="p">Trustless exchange of digital assets</span>
        </div>
        <div className="btn-group btn-group-lg" role="group" aria-label="Basic outlined example">
          <ProfileSmall />
          <a
            href="https://docs.catamaranswaps.org"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-primary"
          >
            Docs
          </a>
          <Auth />
        </div>
      </header>
      <Content />
    </MicroStacksProvider>
  );
}
function Content() {
  const [userSession] = useSession();
  const { isSignedIn } = useAuth();

  const authenticated = userSession && isSignedIn;
  const decentralizedID = authenticated && userSession.decentralizedID;
  const swap = atomicSwaps[0];
  return (
    <>
      <Router>
        <>
          <Intro path="/" default />
          {authenticated && <Intro path="/atomic" hideCatamaran />}
          {authenticated && <Intro path="/catamaran" hideAtomic />}

          <Tac path="/tac" />
          <BitcoinMonkeys path="/bitcoin-monkeys" />
          <StacksSwaps
            path="/:swapPath/swap/:id"
            decentralizedID={decentralizedID}
            userSession={userSession}
          />
          <StacksSwaps
            path="/:swapPath/:trait/:nftId"
            type={swap.type}
            decentralizedID={decentralizedID}
            userSession={userSession}
            trait={swap.trait}
          />
          <StacksSwaps
            path="/:swapPath/:trait/"
            type={swap.type}
            decentralizedID={decentralizedID}
            userSession={userSession}
            trait={swap.trait}
          />
          <StacksSwaps
            path="/:swapPath"
            decentralizedID={decentralizedID}
            userSession={userSession}
          />

          {authenticated && (
            <UnlistStacksPunks path="/unlist-stacks-punks" userSession={userSession} />
          )}
        </>
        {!authenticated && <Landing path="/" exact default />}
        {!authenticated && <LandingCat path="/catamaran" />}
        {!authenticated && <LandingAtomic path="/atomic" />}
      </Router>
    </>
  );
}
