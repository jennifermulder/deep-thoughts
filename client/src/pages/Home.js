// useQuery hook from Apollo's react hooks library, allow use of GraphyQL from App.js
import { useQuery } from '@apollo/react-hooks';
import ThoughtList from '../components/ThoughtList';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';
//check loggedin status of the user
import Auth from '../utils/auth';

import React from 'react';

const Home = () => {
  // use useQuery hook to make query request, loadiing property
  // when Home component is loaded, execute the query for thought data
  // when req completes, data returned is stored in the destructured { data } property
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  //if data exists, store in const "thoughts". If undefined, save an empty array to the thoughts component.
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  // logged in = "true"
  const loggedIn = Auth.loggedIn();
  // use ternary operator to conditionally render ThoughtList component
  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
              <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
