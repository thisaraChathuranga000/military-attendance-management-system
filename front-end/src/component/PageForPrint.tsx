import {
  Box,
  Button,
  Dialog,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useRef } from "react";
import { listProps } from "./ParticipantTable";

interface PageForPrint {
  open: boolean;
  closePrint: () => void;
  total: number;
  onPerad: number;
  notOnPerad: number;
  absent: number;
  date: string;
  onPeradList: listProps[];
  notOnPeradList: listProps[];
  absentOnPeradList: listProps[];
  absentNotOnPeradList: listProps[];
}

function PageForPrint({
  open,
  closePrint,
  total,
  onPerad,
  notOnPerad,
  absent,
  date,
  onPeradList,
  notOnPeradList,
  absentOnPeradList,
  absentNotOnPeradList,
}: PageForPrint) {
  const printRef = useRef<HTMLDivElement | HTMLTableElement>(null);


  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open("", "", "height=800,width=800");
  
      if (printWindow) {
        const styles = `
          <style>
            body {
              font-family: Roboto, Arial, sans-serif;
              margin: 0;
              padding: 0;
              margin: 40px
            }
            .MuiTableCell-root {
              padding: 4px;
              border: none;
            }
            .MuiTableRow-root {
              height: 24px;
            }
          </style>
        `;
  
        printWindow.document.write(`
          <html>
            <head>
              <title>Print</title>
              ${styles}
            </head>
            <body>
              ${printRef.current.outerHTML}
            </body>
          </html>
        `);
  
        printWindow.document.close();
        printWindow.print();
      } else {
        console.error("Failed to open the print window.");
      }
    }
  };
  return (
    <div>
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={closePrint}
      >
        <Box
          sx={{ width: 500, maxHeight: 600, p: 2, pl: 10, marginBottom: 10 }}
          ref={printRef}
        >
          <Grid container>
            <Grid lg={6} md={6}>
              <h4>Attendance Report</h4>
              <p>Date:- {date}</p>
            </Grid>
          </Grid>

          <TableContainer sx={{ width: 400 }}>
            <Table
              sx={{
                "& .MuiTableCell-root": {
                  padding: "4px",
                  border: "none",
                },
                "& .MuiTableRow-root": {
                  height: "24px",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>{total}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>On Parade</TableCell>
                  <TableCell>{onPerad}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Not on Parade</TableCell>
                  <TableCell>{notOnPerad}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Absent</TableCell>
                  <TableCell>{absent}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {onPeradList.length > 0 && (
            <div>
              <p style={{ fontWeight: "600" }}>On Parade</p>
              <TableContainer sx={{ width: 400 }}>
                <Table
                  sx={{
                    "& .MuiTableCell-root": {
                      padding: "4px",
                    },
                    "& .MuiTableRow-root": {
                      height: "24px",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Svc No</TableCell>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {onPeradList.map((i, index) => (
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{i.svcNo}</TableCell>
                        <TableCell>{i.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {notOnPeradList.length > 0 && (
            <div>
              <p style={{ fontWeight: "600" }}>Not on Parade</p>
              <TableContainer sx={{ width: 400 }}>
                <Table
                  sx={{
                    "& .MuiTableCell-root": {
                      padding: "4px",
                    },
                    "& .MuiTableRow-root": {
                      height: "24px",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Svc No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notOnPeradList.map((i, index) => (
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{i.svcNo}</TableCell>
                        <TableCell>{i.name}</TableCell>
                        <TableCell>{i.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {absentOnPeradList.length > 0 && (
            <div>
              <p style={{ fontWeight: "600" }}>Non respondents - On Parade</p>
              <TableContainer sx={{ width: 400 }}>
                <Table
                  sx={{
                    "& .MuiTableCell-root": {
                      padding: "4px",
                    },
                    "& .MuiTableRow-root": {
                      height: "24px",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Svc No</TableCell>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {absentOnPeradList.map((i, index) => (
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{i.svcNo}</TableCell>
                        <TableCell>{i.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {absentNotOnPeradList.length > 0 && (
            <div>
              <p style={{ fontWeight: "600" }}>
                Non respondents - Not on Parade
              </p>
              <TableContainer sx={{ width: 400 }}>
                <Table
                  sx={{
                    "& .MuiTableCell-root": {
                      padding: "4px",
                    },
                    "& .MuiTableRow-root": {
                      height: "24px",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Svc No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {absentNotOnPeradList.map((i, index) => (
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{i.svcNo}</TableCell>
                        <TableCell>{i.name}</TableCell>
                        <TableCell>{i.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </Box>

        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Grid lg={6} md={6}></Grid>
          <Grid lg={6} md={6}>
            <Button
              variant="contained"
              sx={{
                width: 150,
                backgroundColor: "#C68D4D",
                alignContent: "flex-end",
                marginTop: 2,
                marginBottom: 2,
              }}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

export default PageForPrint;
