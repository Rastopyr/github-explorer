import React, { useEffect, useState } from "react";
import styled from "styled-components";
import debounce from "debounce";
import { Link } from "react-router-dom";

type User = {
  id: number;
  login: string;
  stars: number;
  avatar_url: string;
};

type State = {
  count: number;
  list: User[];
};

const initialState: State = {
  count: 0,
  list: []
};

const queryUsers = async (userQuery: string) => {
  if (!userQuery) {
    return Promise.resolve(initialState);
  }

  const result = await fetch(
    `https://api.github.com/search/users?q=${userQuery}`
  );

  const parsed = await result.json();

  return {
    count: parsed.total_count,
    list: parsed.items
  };
};

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

export const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState(initialState);

  const [debounced] = useState(() =>
    debounce(
      (query: string) => {
        const r = queryUsers(query);

        r.then((searchResponse) => {
          console.log(searchResponse);

          setSearchResults(searchResponse);
        });
      },
      1000,
      false
    )
  );

  useEffect(() => debounced(inputValue), [inputValue]);

  return (
    <div>
      <h1>Search</h1>

      <div>
        <div>
          <input
            type="text"
            value={inputValue}
            placeholder={"Username...."}
            onChange={(e) => setInputValue(e.target.value)}
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
};

export default React.memo(Search);
