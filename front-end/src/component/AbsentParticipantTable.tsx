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
import { useState } from "react";

export interface AbsentAttendedParticipantListProps {
  svcNo: string;
  name: string;
}

export interface AbsentNotAttendedParticipantListProps {
  svcNo: string;
  name: string;
  reason: string;
  image?:string;
}

interface AbsentParticipantTableProps {
  open: boolean;
  showReason?: boolean;
  handleClose: () => void;
  attendedList: AbsentAttendedParticipantListProps[];
  notAttendedList: AbsentNotAttendedParticipantListProps[];
}

function AbsentParticipantTable({
  open,
  showReason,
  handleClose,
  attendedList,
  notAttendedList,
}: AbsentParticipantTableProps) {
  const [showImage, setShowImage] = useState<boolean>(false);
  const [displayImage, setDisplayImage] = useState<string | undefined>("");

  const handleImageShow = (image: string | undefined) => {
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ minWidth: 800, py: 4, pl: 4 }}>
          <div>
            <p style={{ fontSize: "20px", fontWeight: "600", margin: "0" }}>
              On Parade Participants
            </p>
          </div>
          <TableContainer sx={{ width: 500, py: 4, pl: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Svc Number</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendedList.map((i, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{i.svcNo}</TableCell>
                    <TableCell>{i.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div>
            <p style={{ fontSize: "20px", fontWeight: "600", margin: "0" }}>
              Not On Parade Participants
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
                {notAttendedList.map((i, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{i.svcNo}</TableCell>
                    <TableCell>{i.name}</TableCell>
                    {showReason && <TableCell>{i.reason}</TableCell>}
                    {showReason &&  <Link onClick={() =>{handleImageShow(i.image)}}>Image</Link>}
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

export default AbsentParticipantTable;
