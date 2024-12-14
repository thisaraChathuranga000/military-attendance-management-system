import {
  Box,
  Dialog,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState, forwardRef  } from "react";

export interface listProps {
  svcNo: string;
  name: string;
  reason?: string;
  image?:string;
}

interface ParticipantTable {
  open: boolean;
  title: string;
  showReason?: boolean;
  handleClose: () => void;
  list: listProps[];
  
}

function ParticipantTable({
  open,
  title,
  showReason,
  handleClose,
  list,
  
}: ParticipantTable) {
  const [showImage, setShowImage] = useState<boolean>(false);
  const [displayImage, setDisplayImage] = useState<string|undefined>("")

  const handleImageShow = (image:string|undefined) => {
    setShowImage(true);
    setDisplayImage(image);
  };

  const handleCloseImage = () => {
    setShowImage(false);
    setDisplayImage("");
  };
  return (
    <div>
      <Dialog
        // ref={ref}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ minWidth: 800, py: 4, pl: 4 }}>
          <div>
            <p style={{ fontSize: "20px", fontWeight: "600", margin: "0" }}>
              {title}
            </p>
          </div>
          <TableContainer sx={{ width: 500, py: 4, pl: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Svc Number</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Name</TableCell>
                  {showReason && (
                    <TableCell sx={{ fontWeight: "600" }}>Reason</TableCell>
                  )}
                  {showReason && (
                    <TableCell sx={{ fontWeight: "600" }}>Image</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((i, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{i.svcNo}</TableCell>
                    <TableCell>{i.name}</TableCell>
                    {showReason && <TableCell>{i.reason}</TableCell>}
                    {showReason && (
                      <TableCell>
                        <Link onClick={() =>{handleImageShow(i.image)}}>Image</Link>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Dialog>

      {showImage && (
        <Dialog
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={open}
          onClose={handleCloseImage}
        >
          <img src={displayImage} alt="" />
        </Dialog>
      )}
    </div>
  );
}

export default ParticipantTable;
