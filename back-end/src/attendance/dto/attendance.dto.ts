
export class CreateAttendanceDto {
  
  onPerad: boolean;
   notOnPerad: boolean;
  absent: boolean;
  reason: String;
   date: string;
  userId: number;
  image:string;
}


export class newAttendance{
  onPerad: string;
   notOnPerad: string;
  absent: string;
  reason: String;
   date: string;
  userId: string;
  image:string;
}

export class NewAttendanceByUdc{
  onPerad: string;
  notOnPerad: string;
  absent: string;
  reason: String;
  date: string;
  image:string;
  svcNo:string;
  intake:string;
  platoon:string;
}
 