// useQuery hook from Apollo's react hooks library, allow use of GraphyQL from App.js
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

import React from 'react';

const Home = () => {
  // use useQuery hook to make query request, loadiing property
  // when Home component is loaded, execute the query for thought data
  // when req completes, data returned is stored in the destructured { data } property
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  //if data exists, store in const "thoughts". If undefined, save an empty array to the thoughts component.
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  // use ternary operator to conditionally render ThoughtList component
  return (
    <main>
      <div className='flex-row justify-space-between'>
      <div className="col-12 mb-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
      )}
    </div>
      </div>
    </main>
  );
};

export default Home;
