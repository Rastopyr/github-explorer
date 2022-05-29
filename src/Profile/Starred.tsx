import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGithubAPI } from "../github-api/GithubAPIProvider";
import { useServerSideLoadingComponent } from "../server/ServerReadyStateProvider";

type Repo = {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
  description: string;
};

type State = {
  readonly repos: readonly Repo[];
  readonly isLoaded: boolean;
}

const ReposList = styled.div`
  height: 150px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 5px 10px;
`;

const RepoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  padding: 5px 10px;
  border: 1px solid gray;
`;

const RepoTitle = styled.div``;

const RepoDesc = styled.div``;

type ProfileStarredViewProps = {
  readonly repos: readonly Repo[];
}

const ProfileStarredView: React.FC<ProfileStarredViewProps> = ({ repos }) => {
  return (
    <div>
      <h2>Repos</h2>
      {!repos.length && <h1>Loading...</h1>}

      {repos.length && (
        <ReposList>
          {repos.map((repo) => (
            <RepoItem key={repo.id}>
              <RepoTitle>
                <a target="_blank" href={repo.html_url}>
                  {repo.name}
                </a>
              </RepoTitle>

              <RepoDesc>{repo.description}</RepoDesc>
            </RepoItem>
          ))}
        </ReposList>
      )}
    </div>
  )
}

const initialState: State = {
  isLoaded: false,
  repos: []
}

export const ProfileStarred: React.FC = () => {
  const { profile } = useParams();
  const [state, setState] = useState<State>(initialState);
  const { getUserStarredRepos } = useGithubAPI();

  useServerSideLoadingComponent("ProfileStarred", state.isLoaded);
  
  useEffect(() => {
    if (!profile) return;

    getUserStarredRepos(profile).then((result) => setState({
      isLoaded: true,
      repos: result
    }));
  }, [profile]);

  return <ProfileStarredView repos={state.repos} />;
};
