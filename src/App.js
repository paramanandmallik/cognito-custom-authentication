import React, { useState } from 'react';
// import { Amplify, Auth } from 'aws-amplify';
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react';
// import awsconfig from './aws-exports';
import awsmobile from './aws-exports';
import CustomSignIn from './CustomLogin';

Amplify.configure(awsmobile);

// function App() {
//   return (
//     // <Authenticator>
//     //   {({ signOut, user }) => (
//     //     <main>
//     //       <h1>Hello {user.username} !!</h1>
//     //       <button onClick={signOut}>Sign out</button>
//     //     </main>
//     //   )}
//     // </Authenticator>
//     <div className="App">
//       <CustomSignIn />
//     </div>
//   );
// }


function App() {
  return (
    <div className="App">
      <CustomSignIn />
    </div>
  );
}

export default App;
