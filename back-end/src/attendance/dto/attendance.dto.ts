export class CreateAttendanceDto {
  readonly onPerad: boolean;
  readonly notOnPerad: boolean;
  readonly absent: boolean;
  readonly date: string;
  readonly userId: number;
}