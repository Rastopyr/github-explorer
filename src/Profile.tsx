import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import { ProfileRepos } from "./Profile/Repos";
import { ProfileStarred } from "./Profile/Starred";

type User = {
  id: number;
  login: string;
  stars: number;
  avatar_url: string;
  followers: number;
};

const queryUser = async (profile: string): Promise<User | null> => {
  if (!profile) {
    return Promise.resolve(null);
  }

  const result = await fetch(`https://api.github.com/users/${profile}`);

  return await result.json();
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

export const Profile: React.FC = () => {
  const { profile } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!profile) {
      return;
    }

    queryUser(profile).then((user) => {
      setUser(user);
    });
  }, [profile]);

  if (!profile) {
    return null;
  }

  return (
    <div>
      <h1>Profile {profile}</h1>

      {!user ? <LoadingUser profile={profile} /> : <UserView user={user} />}
    </div>
  );
};

export default React.memo(Profile);
