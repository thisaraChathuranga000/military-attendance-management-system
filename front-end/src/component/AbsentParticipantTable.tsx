import { Box, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export interface AbsentAttendedParticipantListProps{
    svcNo : string;
    name : string;
}

export interface AbsentNotAttendedParticipantListProps{
    svcNo : string;
    name : string;
    reason : string;
}

interface AbsentParticipantTableProps{
    open: boolean;
    showReason?: boolean;
    handleClose: () => void;
    attendedList: AbsentAttendedParticipantListProps[];
    notAttendedList: AbsentNotAttendedParticipantListProps[];
}

function AbsentParticipantTable({open, showReason, handleClose, attendedList, notAttendedList }:AbsentParticipantTableProps) {
    return (
        <div>
            <Dialog
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" 
                open={open}
                onClose={handleClose}
            >
                <Box sx={{minWidth:800, py:4, pl:4}}>
                    <div>
                        <p style={{fontSize:"20px", fontWeight:"600", margin:"0"}}>On Parade Participants</p>
                    </div>
                    <TableContainer sx={{width:500, py:4, pl:4}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell sx={{fontWeight:"600"}}>Svc Number</TableCell>
                                    <TableCell sx={{fontWeight:"600"}}>Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendedList.map((i, index) =>(
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
                        <p style={{fontSize:"20px", fontWeight:"600", margin:"0"}}>Not On Parade Participants</p>
                    </div>
                    <TableContainer sx={{width:500, py:4, pl:4}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell sx={{fontWeight:"600"}}>Svc Number</TableCell>
                                    <TableCell sx={{fontWeight:"600"}}>Name</TableCell>
                                    {showReason && (<TableCell sx={{fontWeight:"600"}}>Reason</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {notAttendedList.map((i, index) =>(
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{i.svcNo}</TableCell>
                                        <TableCell>{i.name}</TableCell>
                                        {showReason && (<TableCell>{i.reason}</TableCell>)}
                                    </TableRow>
                                ))}   
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Dialog>
        </div>
    )
}

export default AbsentParticipantTable