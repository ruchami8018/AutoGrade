// import { useContext } from "react";
// import { Stack, Box } from "@mui/material";
// import { UserContext } from "../../store/UserStore";
// import { Avatar } from "@mui/material";
// const gradients = [
//   "linear-gradient(45deg, #009688, #4DB6AC, #80CBC4)",
//   "linear-gradient(45deg, #00796B, #26A69A, #64B5F6)",
//   "linear-gradient(45deg, #004D40, #009688, #4DB6AC)",
// ];
// const ProfileAvatar = () => {
//   const {currentUser}=useContext(UserContext)
//   let f: string = ''
  
//   if (currentUser) {
//     // f = currentUser?.name?.[0] || '';
//     const nameParts = currentUser.name.split(' ');
//     if (nameParts.length > 1) {
//       f = nameParts[0][0] + nameParts[1][0];
//     } else {
//       f = currentUser.name[0];
//     }
//   }
// return (
//   <Stack direction="row" spacing={2}>
//          <Box 
//           position="absolute" 
//           top={0} 
//           left={0} 
//           sx={{ padding: '16px' }} 
//       >
//           <Avatar 
//             sx={{ 
//               background: gradients[0],
//               transition: '0.8s',
//               '&:hover': {
//                 background: gradients[1]
//               }
//             }} 
//           >
//             {f}
//           </Avatar>
//       </Box>
    
//   </Stack>
//   );
// };
//   export default ProfileAvatar


import { useContext, useState } from "react";
import { Stack, Box, Drawer, List, ListItem, ListItemText, Avatar } from "@mui/material";
import { UserContext } from "../../store/UserStore";

const gradients = [
  "linear-gradient(45deg, #009688, #4DB6AC, #80CBC4)",
  "linear-gradient(45deg, #00796B, #26A69A, #64B5F6)",
  "linear-gradient(45deg, #004D40, #009688, #4DB6AC)",
];

const ProfileAvatar = () => {
  const { currentUser } = useContext(UserContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // ניהול מצב המודל

  let f: string = "";

  if (currentUser) {
    const nameParts = currentUser.name.split(" ");
    if (nameParts.length > 1) {
      f = nameParts[0][0] + nameParts[1][0];
    } else {
      f = currentUser.name[0];
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
              <ListItemText primary="שם" secondary={currentUser?.name || "לא זמין"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="מייל" secondary={currentUser?.mail || "לא זמין"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="בית ספר" secondary={currentUser?.school || "לא זמין"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="משתמש" secondary={currentUser?.roles || "לא זמין"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default ProfileAvatar;