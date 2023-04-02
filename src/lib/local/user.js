import { writable } from "svelte/store";

let userStudentId = writable("");
let username = writable("");
let role = writable("");
let userProfileImageLink = writable("");
let comeToStudy = writable("");
let absent = writable("");
let sick =writable("");


export { userStudentId, username, role, userProfileImageLink, comeToStudy, absent, sick};

