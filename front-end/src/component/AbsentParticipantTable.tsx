import { Box, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export interface AbsentParticipantListProps{
    svcNo : string;
    name : string;
    reason?: string;
}

interface AbsentParticipantTableProps{
    open: boolean;
    title:string;
    showReason?: boolean;
    handleClose: () => void;
    list: AbsentParticipantListProps[];
}

function AbsentParticipantTable({open, title, showReason, handleClose, list}:AbsentParticipantTableProps) {
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
                        <p style={{fontSize:"20px", fontWeight:"600", margin:"0"}}>On Parade Participant</p>
                    </div>
                    <TableContainer sx={{width:500, py:4, pl:4}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell sx={{fontWeight:"600"}}>Svc Number</TableCell>
                                    <TableCell sx={{fontWeight:"600"}}>Name</TableCell>
                                    {showReason && (<TableCell>Reason</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((i, index) =>(
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

                    <div>
                        <p style={{fontSize:"20px", fontWeight:"600", margin:"0"}}>On Parade Participant</p>
                    </div>
                    <TableContainer sx={{width:500, py:4, pl:4}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell sx={{fontWeight:"600"}}>Svc Number</TableCell>
                                    <TableCell sx={{fontWeight:"600"}}>Name</TableCell>
                                    {showReason && (<TableCell>Reason</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((i, index) =>(
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