////Not in use
import { useContext, useState } from "react";
import { Stack, Box, Drawer, List, ListItem, ListItemText, Avatar } from "@mui/material";
import { UserContext } from "../../context/UserReducer";
import React from "react";

const gradients = [
  "linear-gradient(45deg, #009688, #4DB6AC, #80CBC4)",
  "linear-gradient(45deg, #00796B, #26A69A, #64B5F6)",
  "linear-gradient(45deg, #004D40, #009688, #4DB6AC)",
];

const ProfileAvatar = () => {
  const { user, userDispatch } = useContext(UserContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // ניהול מצב המודל

  let f: string = "";

  if (user) {
    const nameParts = user.name.split(" ");
    if (nameParts.length > 1) {
      f = nameParts[0][0] + nameParts[1][0];
    } else {
      f = user.name[0];
    }
  }

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Box position="absolute" top={0} left={0} sx={{ padding: "16px" }}>
          <Avatar
            sx={{
              background: gradients[0],
              transition: "0.8s",
              cursor: "pointer", // מצביע עכבר
              "&:hover": {
                background: gradients[1],
              },
            }}
            onClick={toggleDrawer(true)} // פתיחת המודל בלחיצה
          >
            {f}
          </Avatar>
        </Box>
      </Stack>

      {/* Drawer צדדי */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: 250, padding: 16 }}>
          <h3>פרטי משתמש</h3>
          <List>
            <ListItem>
              <ListItemText primary="שם" secondary={user?.name || "לא זמין"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="מייל" secondary={user?.email || "לא זמין"} />
            </ListItem>
            {/* <ListItem>
              <ListItemText primary="בית ספר" secondary={currentUser?.school || "לא זמין"} />
            </ListItem> */}
            <ListItem>
              <ListItemText primary="משתמש" secondary={user?.role || "לא זמין"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default ProfileAvatar;

