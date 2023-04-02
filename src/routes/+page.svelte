<script lang="ts">
    import type { ActionData } from "./$types";
    import { enhance } from "$app/forms";
   

    export let form: ActionData;


    // Essential Credentials
    let studentLogin = true;
    let teacherLogin = false;

    // Front-end function to control front-end
    const controlLogin = (event: string) => {
        if (event == "student") {
            // Change tab 
            studentLogin = true;
            teacherLogin = false;
        } else if (event == "teacher") {
            // Change tab
            studentLogin = false;
            teacherLogin = true;
        }

    }

</script>


<section class="login-page-section">
    <img src="background.svg" alt="" class="background-image">
    <div class="login-container">

        <div class="choose-row">
            <div class="student" on:click={() => controlLogin("student")} class:active={studentLogin}>
                <h2 class="choose-header">Student</h2>
            </div>
            <div class="teacher" on:click={() => controlLogin("teacher")} class:active={teacherLogin}>
                <h2 class="choose-header">Teacher</h2>
            </div>
        </div>

        {#if studentLogin}
            <h1 class="header">Welcome Back</h1>
            <p class="paragraph">Login to your student account</p>
            <form action="?/studentLogin" method="POST" class="form" use:enhance>
                <input type="text" class="student-id" name="studentId" placeholder="Student Id" autocomplete="off" value={form?.studentId ?? ""}>
                <input type="password" class="password-input" name="password" placeholder="Password">

                {#if form?.error}
                    <p class="errortext">{form?.errorText}</p>
                {/if}
                
                <div class="remember-me-row">
                    <input type="checkbox" class="remember-me" name="rememberMe">
                    <p class="remember-me-text">Remember Me</p>
                </div>
                <button data-sveltekit-preload-data class="sign-in-button">Sign in</button>
            </form>

            {:else if teacherLogin}
                <h1 class="header">Welcome Back</h1>
                <p class="paragraph">Login to your teacher account</p>
                <form action="?/teacherLogin" method="POST" class="form" use:enhance>
                    <input type="text" class="teacher-id" name="teacherId" placeholder="Teacher Id" autocomplete="off" value={form?.studentId ?? ""}>
                    <input type="password" class="password-input" name="password" placeholder="Password">
        
                    {#if form?.error}
                        <p class="errortext">{form?.errorText}</p>
                    {/if}
                    
                    <div class="remember-me-row">
                        <input type="checkbox" class="remember-me" name="rememberMe">
                        <p class="remember-me-text">Remember Me</p>
                    </div>
                    <button data-sveltekit-preload-data class="sign-in-button">Sign in</button>
                </form>
        {/if}

    </div>
</section>

<style lang="scss">
    .login-page-section {
        width: 100vw;
        height: 100vh;
        z-index: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(0deg, #FDF8F8 2.13%, #EBACAC 143.86%);
        .background-image {
            width: 100vw;
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 1;
        }

        .login-container {
            z-index: 3;
            width: 350px;
           
            background: #FFFFFF;
            box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            padding: 2rem;


            .choose-row {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: center;
                column-gap: 2rem;
                transition: 0.3s ease-in;

                .choose-header {
                    font-size: 20px;
                    font-weight: 400;
                    color: #EA5F76;
                    cursor: pointer;
                    transition: 0.3s ease-in;
                }
            }
            .active {
                border-bottom: 2px solid #EA5F76;
                .choose-header {
                    font-size: 20px;
                    font-weight: 600;

                }
            }
            .header {
                margin-top: 1rem;
                font-size: 24px;
                font-weight: 700;
                color: #2B2B2B;
            }
            .paragraph {
                font-size: 12px;
                font-weight: 300;
                color: #B9B9B9;
            }

            .form {

                display: flex;
                margin-top: 1.5rem;
                flex-flow: column nowrap;

                .teacher-login {
                    font-size: 15px;
                    font-weight: 500;
                    color: #EA5F76;;
                }
                .errortext {
                    font-size: 15px;
                    font-weight: 500;
                    color:#EA5F76;
                }

                input {
                    width: 80%;
                    margin-bottom: 1.5rem;
                    height: 50px;
                    background: #F6F6F6;
                    border-radius: 5px;
                    border: none;
                    padding-left: 3.5rem;
                   
                   
                    
                }

                input:nth-child(1) {
                    background-image: url("studentId-icon.svg");
                    background-repeat: no-repeat;
                    background-position: 10% 50%;

                }
                input:nth-child(2) {
                    background-image: url("password.svg");
                    background-repeat: no-repeat;
                    background-position: 10% 50%;

                }
                input::placeholder {
                    font-size: 12px;
                    font-weight: 400;
                    color: #D9D9D9;
                }

                .remember-me-row {
                    display: flex;
                    align-items: center;
                    column-gap: .5rem;


                    .remember-me {
                        border: 1px solid #D9D9D9;
                        background-color: white;
                        border-radius: 3px;
                        width: 16px;
                        height: 16px;
                        margin-top: 1.5rem;
                    }
                    .remember-me-text {
                        font-size: 12px;
                        font-weight: 400;
                        color: #B9B9B9;
                    }
                }
                .sign-in-button {
                    background-color: #EA5F76;
                    border-radius: 5px;
                    border: none;
                    font-size: 12px;
                    font-weight: 700;
                    color: white;
                    height: 40px;
                    cursor: pointer;
                    transition: 0.3s ease-in;
                }
                .sign-in-button:hover {
                    background-color: transparent;
                    border: 2px solid #EA5F76;
                    color: #EA5F76;
                }
              
            }
        }
    }

</style>