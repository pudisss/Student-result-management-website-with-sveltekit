<script lang="ts">
    import type { PageServerData } from "./$types";
    import DashBoard from "$lib/Components/DashBoard.svelte";
    import Setting from "$lib/Components/Setting.svelte";
    import Result from "$lib/Components/Result.svelte";
    import TeacherDashboard from "$lib/Components/TeacherDashboard.svelte";
    export let data: PageServerData;



    let dashBoardActive = true;
    let resultActive = false;
    let settingActive = false;
    let adminActive = false;
    

    let dashBoardIcon = "action-dashboard-icon.svg";
    let resultIcon = "result.svg"
    let settingIcon = "setting-icon.svg";
    let adminIcon = "admin-icon.svg";

    
    

    
    

    const columnControl = (event: string) => {
        if (event == "dashboard") {
            // Change Tabs
            settingActive = false;
            dashBoardActive = true;
            resultActive = false;
            adminActive = false;

            // Change icon
            dashBoardIcon = "action-dashboard-icon.svg";
            resultIcon = "result.svg"
            settingIcon = "setting-icon.svg";
            adminIcon = "admin-icon.svg";

        } else if (event == "setting") {
            
            // Change Tabs
            settingActive = true;
            dashBoardActive = false;
            resultActive = false;
            adminActive = false;

            // Change icon
            settingIcon = "action-setting-icon.svg";
            dashBoardIcon = "dashboard-icon.svg";
            resultIcon = "result.svg";
            adminIcon = "admin-icon.svg";

        } else  if (event == "result") {
            // Change tabs
            settingActive = false;
            dashBoardActive = false;
            resultActive = true;
            adminActive = false;

            // Change icon
            settingIcon = "setting-icon.svg";
            dashBoardIcon = "dashboard-icon.svg";
            resultIcon = "active-result-icon.svg";
            adminIcon = "admin-icon.svg";


        } else if (event == "admin") {
            // Change tabs
            settingActive = false;
            dashBoardActive = false;
            resultActive = false;
            adminActive = true;
        
            // Change icon
            settingIcon = "setting-icon.svg";
            dashBoardIcon = "dashboard-icon.svg";
            resultIcon = "result.svg";
            adminIcon = "active-admin-icon.svg";
        }
       

    }
    

</script>

<section class="main-page">
    <header class="header">
        <div class="dashboard">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_10_53)">
                <path d="M22.5 21H1.50001C0.671548 21 0 20.3284 0 19.5C0 18.6716 0.671548 18 1.50001 18H22.5C23.3285 18 24.0001 18.6716 24.0001 19.5C24 20.3284 23.3285 21 22.5 21Z" fill="black"/>
                <path d="M22.5 13.5H1.50001C0.671548 13.5 0 12.8284 0 12C0 11.1716 0.671548 10.5 1.50001 10.5H22.5C23.3285 10.5 24.0001 11.1715 24.0001 12C24.0001 12.8285 23.3285 13.5 22.5 13.5Z" fill="black"/>
                <path d="M22.5 6.00002H1.50001C0.671548 6.00002 0 5.32847 0 4.50001C0 3.67155 0.671548 3 1.50001 3H22.5C23.3285 3 24.0001 3.67155 24.0001 4.50001C24.0001 5.32847 23.3285 6.00002 22.5 6.00002Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_10_53">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
            <h2 class="dashboard-text">Dashboard</h2>                
        </div>
        <div class="column2">
            <input type="text" class="search-project" placeholder="Search Project">

            <img src="ic_bell.svg" alt="" class="bell" width="28px" height="28px">
            
            <div class="profile">
                <div class="info">
                    <h3 class="username">{data?.username}</h3>
                    <p class="role">{data?.role}</p>
                </div>
                <img src={data?.userProfileImageLink} alt="" class="profile-image" width="57px" height="57px">
            </div>
        </div>
    </header>
    <aside class="aside">
        <h1 class="logo">Re<span>Stu</span></h1>
        <div class="column">
            <div class="dashboard-row" class:active={dashBoardActive} on:click={() => columnControl("dashboard")}>
                <img src={dashBoardIcon} alt="" class="dashboard-icon" id="dashboard-icon">
                <p class="description">Dashboard</p>
            </div>
            {#if data?.role == "student"}
                
                <div class="result-row" class:active={resultActive} on:click={() => columnControl("result")}>
                    <img src={resultIcon} alt="">
                    <p class="description">Result</p>
                </div>

                {:else if data?.role == "teacher"}
                    <div class="admin-row" class:active={adminActive} on:click={() => columnControl("admin")}>
                        <img src={adminIcon} alt="">
                        <p class="description">Admin</p>
                    </div>

            {/if}
            <div class="setting-row" class:active={settingActive} on:click={() => columnControl("setting")}>
                <img src={settingIcon} alt="" class="setting-icon" id="setting-icon">
                <p class="description">Setting</p>
            </div>
        </div>
    </aside>
    <main class="main-section">
        {#if dashBoardActive }
            {#if data?.role == "teacher"}
                <TeacherDashboard studentList={data?.studentList}></TeacherDashboard>
                {:else if data?.role == "student"}
                    <DashBoard comeToStudy={data?.comeToStudy} absent={data?.absent} sick={data?.sick}></DashBoard>
            {/if}
            
            {:else if resultActive}
                <Result></Result>
            {:else if settingActive}
                <Setting></Setting>

        {/if}
    </main>
</section>



<style lang="scss">
    .main-page {

        width: 100vw;
        height: 100vh;
        background-color: white;
        display: grid;
        grid-template-columns: 15% 1fr;
        grid-template-rows: 10vh 1fr;
        grid-template-areas: 
        "aside header"
        "aside main";
         
        .header {
            grid-area: header;
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            .dashboard {
                display: flex;
                align-items: center;
                column-gap: 2.5rem;
                

                svg {
                    cursor: pointer;
                }
                .dashboard-text {
                    font-size: 20px;
                    font-weight: 600;
                }
            }
            .column2 {
                width: 70%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;

            .search-project {
                height: 50px;
                width: 400px;
                background: rgba(239, 239, 239, 0.47);
                border-radius: 18px;
                border: none;
                padding-left: 2rem;
                background-image: url("search-icon.svg");
                background-repeat: no-repeat;
                background-position: 95% 50%;
            }
            .search-project::placeholder {
                font-size: 14px;
                font-weight: 400;
                color: #757575;
            }

            .profile {
                display: flex;
                align-items: center;
                column-gap: 1rem;

                .info {
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: flex-start;

                    .username {
                        font-size: 16px;
                        font-weight: 600;
                        color: black;
                    }
                    .role {
                        font-size: 12px;
                        font-weight: 400;
                        color: #8F8F8F;
                    }
                }
              
            }

        }

        }
        
        .aside {
            grid-area: aside;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;

            .logo {
                margin-top: 1rem;
                font-size: 30px;
                font-weight: 800;

                span {
                    color: #FABB18;
                }

            }

            .column {
                margin-top: 4.5rem;
                display: flex;
                flex-flow: column nowrap;
                width: 80%;
                row-gap: 1rem;
                .dashboard-row {
                    transition: 0.3s;
                    width: 80%;
                    padding-top: 1rem;
                    padding-bottom: 1rem;
                    padding-right: 2rem;
                    padding-left: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    
                    
                    img {
                        width: 26px;
                        height: 26px;
                    }
                    .description {
                        font-size: 18px;
                        font-weight: 500;
                        color: black;
                        margin-left: 1.5rem;
                    }


                     
                }
                .admin-row {
                    @extend .dashboard-row;
                }
                .result-row {
                    @extend .dashboard-row;
                }

                .setting-row {
                    @extend .dashboard-row;
                }
                .active {
                    background-color: black;
                    border-radius: 18px;
                    border: none;
                    
                    .description {
                        color: white;
                    }
                }
            }
            
            
        }
        .main-section {
           overflow-x: hidden;
            grid-area: main;
            background: #F9F9F9;
            border-radius: 38px 0px 0px 38px;
            
        }

        
    }

</style>