import Typography from "@mui/material/Typography";
import * as React from "react";
import {FC, memo} from "react";
import {Box, Button} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {Path} from "../../../pages/Routes";
import {Search} from "../../../pages/cardsList/Search";

type EnhancedTableToolbar = {
    title: string
}


export const EnhancedTableToolbar: FC<EnhancedTableToolbar> = memo(({title}) => {
        const navigate = useNavigate()

        return (
            <BoxToolBar>
                <BoxRight>
                    <GoBack onClick={() => {
                        navigate(Path.packsList)
                    }}>
                        <ArrowBack/>
                        go back
                    </GoBack>
                    <Title>
                        {title}
                    </Title>
                    <SearchCard>
                        <div>Search</div>
                        <Search/>
                    </SearchCard>
                </BoxRight>
                <Button> Add new card</Button>
            </BoxToolBar>
        );
    }
)
const BoxToolBar = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  padding: 2% 2% 2% 4%;
  background-color: #282c34;
`
const BoxRight = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
`

const GoBack = styled(Typography)`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`
const Title = styled(Typography)`
  display: flex;
  flex-direction: row;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
`

const SearchCard = styled(Typography)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;



`



