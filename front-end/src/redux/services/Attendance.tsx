import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { listProps } from '../../component/ParticipantTable'
import { AbsentAttendedParticipantListProps, AbsentNotAttendedParticipantListProps } from '../../component/AbsentParticipantTable';

interface statProps {
    total: number;
    onPerad: number;
    notOnPerad: number;
    absent: number;
}

export const attendanceApi = createApi({
    reducerPath: 'attendanceApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/attendance/'}),
    endpoints: (builder) => ({
      getAttendanceStats: builder.query<statProps, string>({
        query: (date) => `stats/${date}`,
      }),
      getAttendedUserData: builder.query<listProps[], string>({
        query: (date) => `attended-users/${date}`,
      }),
      getNotAttendedUserData: builder.query<listProps[], string>({
        query: (date) => `not-attended-users/${date}`,
      }),
      getNotAttendedUserDataReason: builder.query<any[], string>({
        query: (date) => `not-attended-users/reason/${date}`,
      }),
      getAbsentAttendedUserData: builder.query<AbsentAttendedParticipantListProps[], string>({
        query: (date) => `absent/attended-users/${date}`,
      }),
      getAbsentNotAttendedUserData: builder.query<AbsentNotAttendedParticipantListProps[], string>({
        query: (date) => `absent/not-attended-users/${date}`,
      }),
      getAbsentNotAttendedUserDataReason: builder.query<any[], string>({
        query: (date) => `absent/not-attended-users/reason/${date}`,
      }),
    }),
})
  
export const { 
    useGetAttendanceStatsQuery, 
    useGetAttendedUserDataQuery, 
    useGetNotAttendedUserDataQuery, 
    useGetNotAttendedUserDataReasonQuery,
    useGetAbsentAttendedUserDataQuery,
    useGetAbsentNotAttendedUserDataQuery,
    useGetAbsentNotAttendedUserDataReasonQuery
} = attendanceApi