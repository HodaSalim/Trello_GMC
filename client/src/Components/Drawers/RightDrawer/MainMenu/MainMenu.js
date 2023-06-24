import React from "react";
import { Container, ButtonContainer } from "./styled";
import MenuButton from "./MenuButton";
import { Hr } from "../../styled";
import { Dashboard, Wallpaper } from "@mui/icons-material";
import ActivitySection from "./ActivitySection/ActivitySection";

const MainMenu = (props) => {
  return (
    <Container>
      <ButtonContainer>
        <MenuButton
          icon={<Dashboard fontSize="small" color="inherit" />}
          title="About this board"
          description="Add a description to your board"
          clickCallback={() => props.menuCallback("About this board")}
        />
        <MenuButton
          icon={<Wallpaper fontSize="small" color="inherit" />}
          title="Change background"
          description="Change the background of your board"
          clickCallback={() => props.menuCallback("Change background")}
        />
      </ButtonContainer>
      <Hr />
      <ActivitySection />
    </Container>
  );
};

export default MainMenu;
