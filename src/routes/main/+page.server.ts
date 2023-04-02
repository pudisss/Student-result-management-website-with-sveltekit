import type { PageServerLoad} from "./$types";
import { userProfileImageLink, userStudentId, username, role, comeToStudy, absent, sick } from "$lib/local/user.js";
import { get } from "svelte/store";
import { initializeApp } from "firebase/app";
import * as dotenv from "dotenv";
import { getDatabase, ref, get as getDb, child } from "firebase/database";

// Essential Credential

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig);



    


export const load: PageServerLoad = async() => {
    const userRole = get(role);

    let studentList;

    if (userRole == "teacher") {
        const dbRef = ref(getDatabase());
            await getDb(child(dbRef, `students/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                studentList = data;

            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });

    }
    return {
       userStudentId: get(userStudentId),
       username: get(username),
       role: get(role),
       userProfileImageLink: get(userProfileImageLink),
       comeToStudy: get(comeToStudy),
       absent: get(absent),
       sick: get(sick),
       studentList: studentList

      

    }
};