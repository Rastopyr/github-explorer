import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGithubAPI } from "./github-api/GithubAPIProvider";
import { ProfileRepos } from "./Profile/Repos";
import { ProfileStarred } from "./Profile/Starred";

type User = {
  readonly id: number;
  readonly login: string;
  readonly stars: number;
  readonly avatar_url: string;
  readonly followers: number;
};

type LoadingUserProps = {
  profile: string;
};

const LoadingUser: React.FC<LoadingUserProps> = ({ profile }) => {
  return <h1>Loading {profile}</h1>;
};

type UserViewProps = {
  user: User;
};

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  row-gap: 15px;
  grid-template-areas:
    "navigation navigation"
    "profile outlet";
`;

const NavigationMenu = styled.div`
  display: flex;
  padding: 5px 10px;
  gap: 10px;
  grid-area: navigation;
  border-bottom: 1px solid gray;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  gap: 15px;
  grid-area: profile;

  border-right: 1px solid gray;
`;

const Outlet = styled.div`
  grid-area: outlet;
`;

const UserView: React.FC<UserViewProps> = ({ user }) => {
  return (
    <ProfileContainer>
      <NavigationMenu>
        <div>
          <Link replace to={`/profile/${user.login}`}>
            Repos
          </Link>
        </div>
        <div>
          <Link replace to={`/profile/${user.login}/starred`}>
            Starred
          </Link>
        </div>
      </NavigationMenu>

      <ProfileInfo>
        <img alt={user.login} src={user.avatar_url} width={100} height={100} />
        <span>{user.login}</span>
      </ProfileInfo>

      <Outlet>
        <Routes>
          <Route path="/" element={<ProfileRepos />} />
          <Route path="/starred" element={<ProfileStarred />} />
        </Routes>
      </Outlet>
    </ProfileContainer>
  );
};

const ProfileView: React.FC<{ readonly user: User | undefined } & LoadingUserProps> = ({ profile, user }) => {
  return <div>
    <h1>Profile {profile}</h1>

    {!user ? <LoadingUser profile={profile} /> : <UserView user={user} />}
  </div>
};

export const Profile: React.FC = () => {
  const { profile } = useParams();
  const [user, setUser] = useState<User | undefined>(undefined);
  const { getProfile } = useGithubAPI();

  useEffect(() => {
    if (!profile) return;

    getProfile(profile).then((user) => setUser(user));
  }, [profile]);

  if (!profile) {
    return null;
  }

  return <ProfileView user={user} profile={profile} />;
};

export default React.memo(Profile);
