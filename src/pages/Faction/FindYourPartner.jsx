import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HackerLogo } from '../../blob/svg/Hacker.svg';
import { ReactComponent as HipsterLogo } from '../../blob/svg/Hipster.svg';
import { ReactComponent as HustlerLogo } from '../../blob/svg/Hustler.svg';
import Text from "../../components/shared/Text";
import { BACKEND_URL } from '../../controller';

const RolesWrapper = styled.div`
  display:flex;
  justify-content: center;
  gap: 5rem;
`

const RoleChoice = styled.div`
  display: inline-block;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  margin: 1rem;
  min-width: 15rem;
  height: 15rem;
  cursor:pointer;
  border-radius:15px;
  & * {
    margin: 0 auto;
  }
`

const UserCard = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  margin: 1rem;
`


const SearchWrapper = styled.div`
  font-family:'Manifold';
  & .search-box{
    width: fit-content;
    height: fit-content;
    position: relative;
  }
  & .search-box .input-search{
    height: 50px;
    width: 50px;
    border-style: none;
    padding: 10px;
    font-size: 18px;
    letter-spacing: 2px;
    outline: none;
    border-radius: 25px;
    transition: all .5s ease-in-out;
    background-color: white;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    padding-right: 40px;
    color: black;
  }
  & .search-box .input-search::placeholder{
    color:rgba(0,0,0,.5);
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 100;
  }
  & .search-box .btn-search{
    width: 50px;
    height: 50px;
    border-style: none;
    font-size: 20px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    color: black;
    background-color:transparent;
    pointer-events: painted;  
  }
  & .search-box .btn-search:focus ~ .input-search{
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom:1px solid rgba(0,0,0,.5);
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    box-shadow: none;
  }
  & .search-box .input-search:focus{
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom:1px solid rgba(0,0,0,.5);
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    box-shadow: none;
  }
`

const FindYourPartner = () => {
  const [users, setUsers] = React.useState()
  const [searchedName, setSearchedName] = React.useState("")
  const [picker, setPicker] = React.useState(true)
  const [roles, setRoles] = React.useState()
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
 
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      setUsers(res.data);
    };
    console.log(user.id);
    const toLogo = (title, Component) => ({ title, component: <Component /> })
   setRoles([
      toLogo("Hipster", HipsterLogo),
      toLogo("Hacker", HackerLogo),
      toLogo("Hustler", HustlerLogo),
    ].filter(logo => logo.title.toLowerCase() !== 'hacker'))
    getData();
  }, []);


  const variants = {
    scale: { scale: 1.25 },
    shrink: { scale: 1 }
  };
  return <>
    <RolesWrapper >
      {
        roles?.map((role, index) =>
          <motion.div
            variants={variants}
            animate={(index ? !picker : picker) ? "scale" : "shrink"}
          >
            <RoleChoice onClick={() => setPicker(!picker)}>
              <Text type="secondary" color="black" align='center' style={{ padding: "0.5rem" }}>
                {role.title}
              </Text>
              <div style={{ width: "fit-content", margin: "0 auto" }}>
                {role.component}
              </div>
            </RoleChoice>
          </motion.div>
        )
      }
    </RolesWrapper>
    <br />
    <br />
    <div style={{ margin: "0 1rem", padding: "1rem", display: "flex", justifyContent: "space-between" }}>
      <Text type="secondary" color="black" style={{ margin: "auto 0" }}>People</Text>
      <SearchWrapper>
        <div class="search-box">
          <button class="btn-search"><SearchIcon /></button>
          <input type="text" class="input-search" placeholder="Search partner" onChange={e => setSearchedName(e.target.value)} />
        </div>
      </SearchWrapper>
    </div>
    {
      users?.filter((_, index) => (picker ? index % 2 : !(index % 2))).filter(user => user.name.toLowerCase().includes(searchedName.toLowerCase())).map(user => <>
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <UserCard>
              {user.name}
            </UserCard>
          </motion.div>
        </AnimatePresence>
      </>)
    }
  </>
}

export default FindYourPartner
