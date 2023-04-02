import type { PageServerLoad, Actions } from "./$types";
import { initializeApp } from "firebase/app";
import * as dotenv from "dotenv";
import { getDatabase, ref, get, child } from "firebase/database";
import { redirect } from "@sveltejs/kit";
import { userStudentId,username, role, userProfileImageLink, comeToStudy, absent,  sick} from "$lib/local/user.js";

// Essential Credential
dotenv.config();

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


// Load function
export const load: PageServerLoad = ({ cookies }) => {
    const userLogin = cookies.get('userLogin');
    console.log(userLogin);
    if (userLogin != undefined) {
        throw redirect(303, "/main");
    }
}


// Actions function
export const actions: Actions = {
    teacherLogin: async({ request, cookies }) => {
        const formData = await request.formData();

        const teacherId = formData.get("teacherId") as string;
        const password = formData.get("password") as string;
        const rememberMe = formData.get('rememberMe');


        // Form Validation 
        if (teacherId == "") {
            return {
                error: true,
                status: 404,
                errorText: "Please enter your Teacher Id"
            }
        }

        if (password == "") {
            return {
                error: true,
                status: 404,
                errorText: "Please enter your password",
            }
        }

        if (teacherId.length != 5) {
            return {
                error: true,
                status: 404,
                errorText: "Teacher Id must be in 5 characters",
            }
        }

        if (password.length < 6) {
            return {
                error: true,
                status: 404,
                errorText: "Password must be more than 6 characters in length;"
            }
        }
        let loginError = false;
        let errorReason = "";
        let login = false;

        // login function
        const dbRef = ref(getDatabase(app));
        await get(child(dbRef, `teachers/`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const keys = Object.keys(data);

              for (const key of keys) {
                if (data[key].teacherId === teacherId) {
                    if (data[key].password == password) {
                        login = true;
                        username.set(`${data[key].firstName} ${data[key].lastName}`);
                        role.set(data[key].role);
                        userProfileImageLink.set(data[key].userProfile);
                        
                        
                        
                        
                    } else {
                        loginError = true;
                        errorReason = "password not correct";
                        break;
                    }
                }
              }
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

        if (loginError) {
            if (errorReason == "password not correct") {
                return {
                    error: true,
                    status: 404,
                    errorText: "Password not correct",
                    teacherId,
                }
            }
        }

        if (login) {

            if (rememberMe != null) {

                const date = new Date();

                date.setHours(date.getHours() + 1);
                cookies.set("userLogin", crypto.randomUUID(), {
                    path: "/",
                    expires: date,
                });


            }

            userStudentId.set(teacherId);
            
            
            

            
           

            throw redirect(303, "/main");
            
            
        }

    },
    studentLogin: async({ request, cookies, locals }) => {
        const formData = await request.formData();

        const studentId = formData.get("studentId") as string;
        const password = formData.get("password") as string;
        const rememberMe = formData.get("rememberMe");

        // Form validation

        if (studentId == "") {
            return {
                error: true,
                status: 404,
                errorText: "Please enter your Student Id",
            }
        }

        if (password == "") {
            return {
                error: true,
                status: 404,
                errorText: "Please enter your password",
            }
        }

        if (studentId.length != 5) {
            return {
                error: true,
                status: 404,
                errorText: "Student Id must be 5 in length of number",
            }
        }
        
        if (password.length < 6) {
            return {
                error: true,
                status: 404,
                errorText: "Password needs to be more than 6 characters in length",
            }
        }

        let loginError = false;
        let errorReason = "";
        let login = false;

        // login function
        const dbRef = ref(getDatabase(app));
        await get(child(dbRef, `students/`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const keys = Object.keys(data);

              for (const key of keys) {
                if (data[key].studentId === studentId) {
                    if (data[key].password == password) {
                        login = true;
                        username.set(`${data[key].firstName} ${data[key].lastName}`);
                        role.set(data[key].role);
                        userProfileImageLink.set(data[key].userProfile);
                        comeToStudy.set(data[key].comeToStudy);
                        absent.set(data[key].absent);
                        sick.set(data[key].sick);
                        
                        
                        
                    } else {
                        loginError = true;
                        errorReason = "password not correct";
                        break;
                    }
                }
              }
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

        if (loginError) {
            if (errorReason == "password not correct") {
                return {
                    error: true,
                    status: 404,
                    errorText: "Password not correct",
                    studentId,
                }
            }
        }

        if (login) {

            if (rememberMe != null) {

                const date = new Date();

                date.setHours(date.getHours() + 1);
                cookies.set("userLogin", crypto.randomUUID(), {
                    path: "/",
                    expires: date,
                });


            }

            userStudentId.set(studentId);
            
            
            

            
           

            throw redirect(303, "/main");
            
            
        }




    }
}