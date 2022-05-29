import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGithubAPI } from "../github-api/GithubAPIProvider";

type Repo = {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
};

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
  justify-content: space-between;
  padding: 5px 10px;
  border: 1px solid gray;
`;

const RepoTitle = styled.div``;

const RepoInfo = styled.div``;

type ProfileRepoViewProps = {
  readonly repos: readonly Repo[]
}

export const ProfileReposView: React.FC<ProfileRepoViewProps> = ({ repos }) => {
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
              <RepoInfo>⭐ {repo.stargazers_count}</RepoInfo>
            </RepoItem>
          ))}
        </ReposList>
      )}
    </div>
  )
}

export const ProfileRepos: React.FC = () => {
  const { profile } = useParams();
  const { getUserRepos } = useGithubAPI();
  const [repos, setRepos] = useState<readonly Repo[]>([]);

  useEffect(() => {
    if (!profile) return;

    getUserRepos(profile).then((result) => setRepos(result));
  }, [profile]);

  return <ProfileReposView repos={repos} />;
};
