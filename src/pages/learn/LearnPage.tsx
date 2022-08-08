import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, Grid} from "@mui/material";

export const LearnPage = () => {

    return (
        <Box display='flex' justifyContent='center'>
            <LearnBoxStyled container >
                <LearnTitleBox item xs={2}>
                    Learn
                </LearnTitleBox>
                <LearnQuestionContentBox item xs={10}>
                    <Box>
                        <Typography>questionaafsdfgsdgdfgdfgdfgdfgdfgdfgdfgdfg</Typography>
                        <Typography>Shots</Typography>
                    </Box>
                    <LightStyledButton variant='contained'>show answer</LightStyledButton>
                </LearnQuestionContentBox>
            </LearnBoxStyled>

        </Box>

    )
}
const LightStyledButton = styled(Button)`
  border-radius: 50px;
  
`

const LearnTitleBox = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`
const LearnQuestionContentBox = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const LearnBoxStyled = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 1% 1% 1% 1%;
  padding: 1% 1% 0% 1%;
  color: black;
  width: 439px;
  height: 284px;

  border-radius: 5px;
  background-color: #f0f0f3;
  //  box-shadow: 10px 10px 21px #d3d3d6;,
  //-10px -10px 21px #fff
`


