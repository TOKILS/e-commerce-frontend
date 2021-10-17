import { createSlice } from "@reduxjs/toolkit";
import superagent from "superagent";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        users: [],
        products: {},
        support: {},
    },

    reducers: {
        addUserToList(state, action) {
            state.users.push(action.payload);
            // console.log("~ action", action);
        },
    },
});

export const { addUserToList } = dashboardSlice.actions;

export const getUsers = () => async (dispatch) => {
    try {
        // const response = await superagent.get(`https://mid-project-01.herokuapp.com/users`).set("Authorization", "Bearer " + `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlicmFoZW0iLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzE1Mjg2NTd9.zDeGCvqnCGcuX7u76YDfC6nx2KEPmeDjuanDlKjzPVQ`);
        // // console.log(`${process.env.BACKEND}/users`)
        // // console.log("~ response.text", response.text);
        // const users = await response.text;

        // console.log("~ users ", typeof users, " ", users);
        // let parsedUsers = JSON.parse(users);
        const parsedUsers = [
            { id: 1, username: "ibrahem", firstname: "ibrahem", lastname: "sarayrah", email: "ibrahem@gmail.com", role: "admin", createdAt: "2021-09-15T10:00:22.762Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJpYnJhaGVtIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiLCJ1cGRhdGUiLCJkZWxldGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.QADZEPQUYTZZPZSrWjb8ygtK67t7dIncRSDBCPCiqOI" },
            { id: 3, username: "kztahat", firstname: "khaled", lastname: "tahat", email: "kztahat96@gmail.com", role: "user", createdAt: "2021-09-15T14:59:45.353Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJrenRhaGF0IiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.MO-T2fjplBGZUZAFPIaGNTMPzRQJ0sUw38lXELzyqFE" },
            { id: 4, username: "omx", firstname: "omar", lastname: "Al-azaizeh", email: "ironman97@gmail.com", role: "vendor", createdAt: "2021-09-15T15:02:57.411Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvbXgiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.NwIdNVQcQlfoqYL9k0i5CF_GZf_vpE-AN_VDs1PTe_I" },
            { id: 5, username: "laith2016", firstname: "laith", lastname: "Hayajneh", email: "laith1616@hotmail.com", role: "admin", createdAt: "2021-09-15T15:04:35.953Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJsYWl0aDIwMTYiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.kv81Z5--I565aHma-hg6PbhMSZXvYZe48OMpRTQBE8c" },
            { id: 6, username: "Suhaib", firstname: "Suhaib", lastname: "ersan", email: "suhaib.e.anything@gmail.com", role: "user", createdAt: "2021-09-15T15:05:55.245Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJTdWhhaWIiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.NlVLkpvMzG2TzDE1Dq9YLADTO1Q3K_w7TUmJTCALN_8" },
            { id: 7, username: "tariq", firstname: "Tariq", lastname: "Abu-Laben", email: "tariq.z.Abu-laben@gmail.com", role: "user", createdAt: "2021-09-15T15:06:53.899Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJ0YXJpcSIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIl0sImlhdCI6MTYzNDQ3MzM1MX0.cDAXVDnkVE6jhHhY9k0A4OUCSP6ljZAGph1tF9QZ7VE" },
            { id: 12, username: "kztahat2", firstname: "khaled", lastname: "tahat", email: "kztahat@gmail.com", role: "admin", createdAt: "2021-09-28T12:37:20.157Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoia3p0YWhhdDIiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.e-eQzYF17BRWI6_TVcTQsgEgmYZUk-xtkCoAgsbREy8" },
            { id: 13, username: "ibrahem2", firstname: "1234", lastname: "Ibrahem", email: "test2@gmail.com", role: "user", createdAt: "2021-09-28T14:25:34.759Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoiaWJyYWhlbTIiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.7cOTX-UC-aR9TVYpX3G3s0kFT0Djsrc8ppG_ll7hXkw" },
            { id: 15, username: "admin", firstname: "test", lastname: "test", email: "test@gmail.com", role: "admin", createdAt: "2021-09-28T14:27:45.526Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoiYWRtaW4iLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.XM-M8piwC69MDSGEs5r9fdvG8asSeqnQ6gEei0ZkP84" },
            { id: 19, username: "ibrahem22", firstname: "Ibrahem", lastname: "Sarayrah", email: "test22@gmail.com", role: "user", createdAt: "2021-09-28T14:32:13.663Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInVzZXJuYW1lIjoiaWJyYWhlbTIyIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.CdeEZwc5nY6YtlKemCSIp3RXyEMuSZR-JsAg6QUPszc" },
            { id: 27, username: "user", firstname: "test", lastname: "test", email: "test21@gmail.com", role: "user", createdAt: "2021-09-28T14:38:21.279Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInVzZXJuYW1lIjoidXNlciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIl0sImlhdCI6MTYzNDQ3MzM1MX0.UghxVTzxq8GVUV_hZLOatotKuhQ8P4BzIjkp04V7SW8" },
            { id: 28, username: "mahmoudkhader", firstname: "mahmoud", lastname: "khader", email: "mahmoudkhader2010@gmail.com", role: "user", createdAt: "2021-09-28T15:53:04.872Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsInVzZXJuYW1lIjoibWFobW91ZGtoYWRlciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIl0sImlhdCI6MTYzNDQ3MzM1MX0.f9uRZrVPtWeDLQXX1tA5zlAFTYRbq5OxoHIrWNJ6b9s" },
            { id: 29, username: "mahm", firstname: "mahmoud", lastname: "khader", email: "mahmoud@hotmail.com", role: "user", createdAt: "2021-09-28T15:55:46.572Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInVzZXJuYW1lIjoibWFobSIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIl0sImlhdCI6MTYzNDQ3MzM1MX0.ZMssobLV6A00UPl9voF0DHC2Q4zCaSgcHown_S-mHxc" },
            { id: 31, username: "www", firstname: "www", lastname: "www", email: "www@gmail.com", role: "admin", createdAt: "2021-09-29T10:32:54.570Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInVzZXJuYW1lIjoid3d3IiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiLCJ1cGRhdGUiLCJkZWxldGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.hegbERe5dF7KyOVHdIADkNxWxBSo5X_nfBo-QKHM65Y" },
            { id: 32, username: "ww", firstname: "ww", lastname: "ww", email: "ww@gmail.com", role: "user", createdAt: "2021-09-29T10:46:48.673Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoid3ciLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.CusElveJ4LrfwOWgmnmWK2ZM_kAk9oYQ5gVkSoMDbXE" },
            { id: 33, username: "mmmmm", firstname: "mmmm", lastname: "nnn", email: "wijdankhaled178@gmail.com", role: "admin", createdAt: "2021-09-29T10:55:27.890Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInVzZXJuYW1lIjoibW1tbW0iLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.W3LU4n0uXsjy8Uc1w_TD4nX0ba5BKNbvg6l7d21spvo" },
            { id: 35, username: "wwwm", firstname: "mmmm", lastname: "nnn", email: "wijdankhaled1782@gmail.com", role: "admin", createdAt: "2021-09-29T10:59:39.478Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsInVzZXJuYW1lIjoid3d3bSIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIiwidXBkYXRlIiwiZGVsZXRlIl0sImlhdCI6MTYzNDQ3MzM1MX0.rndEve25TZCo2yeSTbncFDUrpO-Pc6PNE5i8G1kh-Yg" },
            { id: 38, username: "qqq", firstname: "mmmm", lastname: "nnn", email: "wijdankhaled00@gmail.com", role: "admin", createdAt: "2021-09-29T11:14:58.809Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsInVzZXJuYW1lIjoicXFxIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiLCJ1cGRhdGUiLCJkZWxldGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.1Xt1zUuJFiULUpyaeJpz0kDW2rew1USdrJKphJbs990" },
            { id: 40, username: "ttt", firstname: "mmmm", lastname: "nnn", email: "ttt@gmail.com", role: "admin", createdAt: "2021-09-29T11:16:50.466Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsInVzZXJuYW1lIjoidHR0IiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiLCJ1cGRhdGUiLCJkZWxldGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.sFW9397JAe8WWiY97DPQNLWaYHwBThLa23dK0J2SEK0" },
            { id: 44, username: "23232", firstname: "test", lastname: "test", email: "test2111@gmail.com", role: "user", createdAt: "2021-09-29T14:10:51.655Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsInVzZXJuYW1lIjoiMjMyMzIiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.DvK_e62CFWF9E0t7Sa1S_mL4LYdbbamEq6c75x3kWyw" },
            { id: 45, username: "SuadTalafha", firstname: "Suad", lastname: "Talafha", email: "suadhusam@yahoo.com", role: "admin", createdAt: "2021-09-29T14:46:48.849Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsInVzZXJuYW1lIjoiU3VhZFRhbGFmaGEiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.RnJb8LVSoinpp-u9CbIglaZoB3LdCGsBpfIwoGRahJQ" },
            { id: 48, username: "dena", firstname: "dena", lastname: "denakof", email: "dena@gmail.com", role: "admin", createdAt: "2021-09-29T15:00:46.346Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsInVzZXJuYW1lIjoiZGVuYSIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIiwidXBkYXRlIiwiZGVsZXRlIl0sImlhdCI6MTYzNDQ3MzM1MX0.hY-cdnAgIxVw-ee7tojoyBKK5_gBxpSXWhLA3Ocu2fA" },
            { id: 49, username: "dena1", firstname: "denakof", lastname: "denakof", email: "denakofahi@yahoo.com", role: "admin", createdAt: "2021-09-29T15:04:34.250Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksInVzZXJuYW1lIjoiZGVuYTEiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.0KpDWWpKsIkERIJcaYLqKBt6SlACQTOAOXFlMf0HZsE" },
            { id: 51, username: "dena22", firstname: "denakof", lastname: "denakof", email: "denakof@yahoo.com", role: "admin", createdAt: "2021-09-29T15:11:50.419Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInVzZXJuYW1lIjoiZGVuYTIyIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiLCJ1cGRhdGUiLCJkZWxldGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.f3lJ6gzkFiSHCVQ1_kd6ouwAgI7ChDcuSFPu56dl3fI" },
            { id: 52, username: "teeesttt", firstname: "t", lastname: "t", email: "tessst@jjj.com", role: "user", createdAt: "2021-09-29T15:41:34.779Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsInVzZXJuYW1lIjoidGVlZXN0dHQiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.22FjynHgNxfi51jWNdYPQLyFrSNVfBwy6euU6iHi148" },
            { id: 53, username: "dena222", firstname: "de", lastname: "de", email: "denak2of@yahoo.com", role: "admin", createdAt: "2021-09-29T15:52:57.492Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsInVzZXJuYW1lIjoiZGVuYTIyMiIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIiwidXBkYXRlIiwiZGVsZXRlIl0sImlhdCI6MTYzNDQ3MzM1MX0.WZi3sVBOknFEzPZwYJht2zmbaAXopdCw2nRuN1YAnys" },
            { id: 54, username: "denaa", firstname: "de", lastname: "de", email: "denako11f@yahoo.com", role: "admin", createdAt: "2021-09-29T15:54:47.649Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInVzZXJuYW1lIjoiZGVuYWEiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.YyyuX5PVI908IBqv122_uKgpQ4sMT-UJ3TcyofT2V-E" },
            { id: 56, username: "jackss", firstname: "jackss", lastname: "jackss", email: "jackss@jackss.com", role: "admin", createdAt: "2021-09-30T06:16:31.026Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTYsInVzZXJuYW1lIjoiamFja3NzIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiLCJ1cGRhdGUiLCJkZWxldGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.jDkWBrz0rwkHcy7ELS6iamhl0vC7tBfGv5xlVEE9lzc" },
            { id: 57, username: "test", firstname: "test", lastname: "", email: "test@yahoo.com", role: "admin", createdAt: "2021-10-05T11:21:57.152Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTcsInVzZXJuYW1lIjoidGVzdCIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIiwidXBkYXRlIiwiZGVsZXRlIl0sImlhdCI6MTYzNDQ3MzM1MX0.MTiPzmSidFun3xuVlCRQq9qJY5hkPzOZQlu-OpIBHsY" },
            { id: 59, username: "ibrahem4", firstname: "Ibrahem", lastname: "Sarayrah", email: "test4@gmail.com", role: "user", createdAt: "2021-10-12T17:23:02.960Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTksInVzZXJuYW1lIjoiaWJyYWhlbTQiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.oiQMP37jgBPsKOb7M_Sws4u-8Q4Gu8u3mcsEhD6zWL8" },
            { id: 60, username: "test12", firstname: "test", lastname: "test", email: "test12@gmail.com", role: "user", createdAt: "2021-10-12T17:42:57.832Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAsInVzZXJuYW1lIjoidGVzdDEyIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.UlbWfWmvxNx1scVbDNL6TrC1YwAH86ULhom91P4gXwk" },
            { id: 61, username: "test5", firstname: "test", lastname: "test", email: "test5@gmail.com", role: "user", createdAt: "2021-10-13T08:07:19.024Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsInVzZXJuYW1lIjoidGVzdDUiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.mX5G90Q6XeI9qePT4obylvxjVlbFPLqu65tcDNvnSlQ" },
            { id: 62, username: "test20", firstname: "test20", lastname: "test20", email: "test20@gmail.com", role: "user", createdAt: "2021-10-14T14:29:47.509Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjIsInVzZXJuYW1lIjoidGVzdDIwIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.AAKtSA6DfqU8HJcOdHD3wUjb5BpBe-xU5SuZCVSXbbo" },
            { id: 63, username: "om4rr", firstname: "OMAR", lastname: "Az", email: "jackzzzz@gmail.com", role: "user", createdAt: "2021-10-14T15:13:05.447Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInVzZXJuYW1lIjoib200cnIiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.AHwFaJqsAbzOpv9cBUIrRaKfQ1pGxk1TEL4I12QiOvw" },
            { id: 66, username: "om4rrza", firstname: "OMAR", lastname: "Az", email: "jadckzzzz@gmail.com", role: "user", createdAt: "2021-10-14T15:13:54.921Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjYsInVzZXJuYW1lIjoib200cnJ6YSIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIl0sImlhdCI6MTYzNDQ3MzM1MX0.RNp38ekbRC5d6nRJN7uDPEfgXbLhIQwpfGkNElaVryk" },
            { id: 67, username: "ioamd1", firstname: "asdasd", lastname: "asdasd", email: "asdasd@asads.com", role: "user", createdAt: "2021-10-14T15:15:31.689Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsInVzZXJuYW1lIjoiaW9hbWQxIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.kedgAxdn9NRtUnVbzb3FhDZ5JuS2ATbFJ0eYew2U_dk" },
            { id: 68, username: "wwwzasddfs", firstname: "OMAR", lastname: "Az", email: "asdasd21@gmail.com", role: "user", createdAt: "2021-10-14T15:17:08.288Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgsInVzZXJuYW1lIjoid3d3emFzZGRmcyIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIl0sImlhdCI6MTYzNDQ3MzM1MX0.U9f9C0Dm-isknJ6Y9slTXzIekzTN5z4hhKCSqsvrTGI" },
            { id: 69, username: "om4rrzzzzzs", firstname: "OMAR", lastname: "Az", email: "zzex20333310@gmail.com", role: "user", createdAt: "2021-10-14T15:18:27.050Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoib200cnJ6enp6enMiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.ZeBK2d9DfWzj1G5CGBtAalXiuZoOwG6BGfOi97BCYkE" },
            { id: 70, username: "asdasdfgsadg", firstname: "OMAR", lastname: "Az", email: "sadfasdf@sdfsf.con", role: "user", createdAt: "2021-10-14T15:37:19.496Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAsInVzZXJuYW1lIjoiYXNkYXNkZmdzYWRnIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiXSwiaWF0IjoxNjM0NDczMzUxfQ.igb3N2uD6BwbRS9sqrzx7jcsHSF2tzX-lqun7D9L1I0" },
            { id: 72, username: "test2021", firstname: "tariqtest", lastname: "testtariq", email: "test@tariq.com", role: "user", createdAt: "2021-10-15T17:59:28.431Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIsInVzZXJuYW1lIjoidGVzdDIwMjEiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.Ou1rMeH5p1IdlKqBwITLVGmHEM6_VV9HjXOjf0LrKho" },
            { id: 74, username: "ibrahem1234", firstname: "ibrahim", lastname: "sarayrah", email: "ibrahem123@gmail.com", role: "user", createdAt: "2021-10-16T15:58:02.861Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsInVzZXJuYW1lIjoiaWJyYWhlbTEyMzQiLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSJdLCJpYXQiOjE2MzQ0NzMzNTF9.H-Hl8IsVtSbeRltGyTgsDIvNoN7Rp-x4_FKAJuyxxzI" },
        ];
        parsedUsers.forEach((user) => {
            let { id, username, firstname, lastname, email, role, createdAt, token } = user;
            dispatch(
                addUserToList({
                    id,
                    username,
                    firstname,
                    lastname,
                    email,
                    role,
                    createdAt,
                    token,
                })
            );
        });
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};

export const updateUser = (user) => async (dispatch) => {
    let oldToken = user.token;
    const response = await superagent
        .put(`https://mid-project-01.herokuapp.com/updateAccount`)
        .send(user)
        .set("Authorization", "Bearer " + `${oldToken}`);

    // maybe response.data instead?
    let newUser = response.text;
    
};
export const DeleteUser = () => async (dispatch) => {};

export default dashboardSlice.reducer;
