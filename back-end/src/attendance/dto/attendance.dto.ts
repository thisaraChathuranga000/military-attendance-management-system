export class CreateAttendanceDto {
  readonly onPerad: boolean;
  readonly notOnPerad: boolean;
  readonly absent: boolean;
  readonly reason: String;
  readonly date: string;
  readonly userId: number;
}