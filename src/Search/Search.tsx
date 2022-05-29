import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import debounce from "debounce";
import { useGithubAPI } from "../github-api/GithubAPIProvider";
import { useServerSideLoadingComponent } from "../server/ServerReadyStateProvider";

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;

const ListItem = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  border: 1px solid gray;
`;

type User = {
  readonly id: number;
  readonly login: string;
  readonly stars: number;
  readonly avatar_url: string;
}; 

type SearchResults = {
  readonly isLoaded: boolean;
  readonly list: readonly User[]
  readonly count: number;
}

type SearchViewProps = {
    readonly onQueryChange: (value: string) => void;
    readonly searchResults: SearchResults;
};

export const SearchView: React.FC<SearchViewProps> = ({ onQueryChange, searchResults }) => {
  return (
    <div>
      <h1>Search</h1>

      <div>
        <div>
          <input
            type="text"
            placeholder={"Username...."}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>

        <div>
          <List>
            {searchResults.list.map((user) => (
              <ListItem key={user.id} to={`/profile/${user.login}`}>
                <img
                  width={40}
                  height={40}
                  alt={user.login}
                  src={user.avatar_url}
                />{" "}
                {user.login}
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

const initial_state: SearchResults = {
  isLoaded: false,
  count: 0,
  list: []
}

export const Search: React.FC = () => {
  const { findUsers } = useGithubAPI();
  const [state, setState] = useState(initial_state);
  const [queryFn] = useState(() =>
      debounce(
        (query: string) => {
          findUsers(query).then((searchResponse) => {
            setState({
              isLoaded: true,
              count: searchResponse.total_count,
              list: searchResponse.items
            });
          });
        },
        1000,
        false
      )
    );
    

  useServerSideLoadingComponent("Search", state.isLoaded);
  
  return <SearchView
    onQueryChange={queryFn}
    searchResults={state}
  />
};

export default React.memo(Search);
