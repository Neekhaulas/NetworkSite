import React from "react";
import styled from "styled-components";
import AppBar from "../components/AppBar";
import PostList from "../components/PostList";

const StyledHome = styled.div``;

function Home() {
  return (
    <StyledHome>
      <AppBar />
      <PostList />
    </StyledHome>
  );
}

export default Home;
