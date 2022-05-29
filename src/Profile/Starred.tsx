import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Repo = {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
  description: string;
};

const queryRepos = async (profile: string): Promise<Repo[]> => {
  if (!profile) {
    return Promise.resolve([]);
  }

  const result = await fetch(`https://api.github.com/users/${profile}/starred`);

  return await result.json();
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
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  padding: 5px 10px;
  border: 1px solid gray;
`;

const RepoTitle = styled.div``;

const RepoDesc = styled.div``;

export const ProfileStarred: React.FC = () => {
  const { profile } = useParams();
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    if (!profile) return;

    queryRepos(profile).then((result: Repo[]) => setRepos(result));
  }, [profile]);

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
  );
};
