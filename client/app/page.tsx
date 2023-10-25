'use client';

import type {NextPage} from 'next'
import Head from 'next/head'
import styles from './styles/page.module.css'
import {AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from "@azure/msal-react";
import React from "react";
import {loginRequest, msalConfig} from "./config/authConfig";
import {callMsGraph} from "./config/graph";
import {ProfileData} from "@/components/Authentication/ProfileData";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Home: NextPage = () => {
  /**
   * Renders information about the signed-in user or a button to retrieve data about the user
   */
  const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = React.useState(null);

    function RequestProfileData() {
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance
          .acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          })
          .then((response) => {
            callMsGraph(response.accessToken).then((response) => setGraphData(response));
          });
    }

    return (
        <>
          <h5 className="card-title">Welcome  {accounts[0] ? accounts[0].name: ''}</h5>
          <br/>
          {graphData ? (
              <ProfileData graphData={graphData} />
          ) : (
              <Button onClick={RequestProfileData}>
                Request Profile Information
              </Button>
          )}
        </>
    );
  };

  /**
   * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
   */
  const MainContent = () => {
    return (
        <div className="App">
          <h5>
            <center>
              Welcome to the Microsoft Authentication Library For TypeScript -
              React/MUI SPA Tutorial
            </center>
          </h5>
          <br />
          <AuthenticatedTemplate>
            <ProfileContent />
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <h5>
              <center>
                Please sign-in to see your profile information.
              </center>
            </h5>
          </UnauthenticatedTemplate>
        </div>
    );
  };
  return (
      <div className={styles.container}>
        <Head>
          <title>MacID Authentication Example</title>
          <meta
              name="description"
              content="Generated by create next app"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Box>
            <MainContent />
          </Box>
        </main>
      </div>
  )
}

export default Home
