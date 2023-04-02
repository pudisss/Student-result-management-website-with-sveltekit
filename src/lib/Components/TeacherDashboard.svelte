<script lang="ts">

    // IMport section
    
    // Data props
    export let studentList;

    // Essential Credentials
    let showStudentInfoPage = false;


    // Get student list info
    let studentInfo: any = [];


    for (const [key, value] of Object.entries(studentList)) {
        studentInfo.push(value);
    }


    // Functions

    const controlShowStudentInfoPage = () => {
        showStudentInfoPage = !showStudentInfoPage;
    }


    

</script>


<section class="teacher-dashboard-section">
    <aside class="aside">
        {#each studentInfo as student}
            <div class="student-container" on:click={controlShowStudentInfoPage}>
                <img src={student.userProfile} width="100px" height="100px" alt="" class="student-profile">
                <div class="info">
                    <h2 class="student-name">{student.firstName}</h2>
                    <p class="role">{student.role}</p>
                </div>
            </div>
        {/each}
    </aside>
    <div class="col1">
        <div class="container">
            <h1 class="header">Over all statistic</h1>

            <div class="statistic-row">
                <div class="come-student">
                    <h2 class="sub-header">Come to school</h2>
                    <div class="row">
                        <h2 class="number">{studentInfo.length}</h2>
                        <h2 class="student-header">Students</h2>
                    </div>
                </div>
                <div class="sick-student">
                    <h2 class="sub-header">Sick Student</h2>
                    <div class="row">
                        <h2 class="number">234</h2>
                        <h2 class="student-header">Students</h2>
                    </div>

                </div>
                <div class="absent-student">
                    <h2 class="sub-header">Absent Student</h2>
                    <div class="row">
                        <div class="number">23</div>
                        <div class="student-header">Students</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="col2">
        <div class="container"></div>
    </div>

    
</section>

<style lang="scss">
    .teacher-dashboard-section {
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        margin: 1rem;
        display: grid;
        grid-template-columns: 30% 1fr;
        grid-template-rows: auto auto;
        grid-template-areas: 
        "aside col1"
        "aside col2";
        grid-gap: 1rem;
        
        

        aside.aside {
            overflow-y: scroll;
            grid-area: aside;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
         
            row-gap: 1.25rem;

            .student-container {
                width: 100%;
                height: 200px;
                background-color: white;
                border: none;
                border-radius: 0.5rem;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                .student-profile {
                    margin-left: 1rem;
                }
                .info {
                    margin-right: 1rem;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: flex-start;
                    .student-name {
                        font-size: 20px;
                        font-weight: 500;


                    }
                    .role {
                        font-size: 15px;
                        font-weight: 400;

                    }
                }

                
            }
            
           
        }

        .col1 {
            grid-area: col1;
            background-color: white;
            border: none;
            margin-right: 1rem;
            border-radius: 0.5rem;

            .container {
                margin: 2rem;
                width: 100%;
                height: 100%;
                display: flex;
                flex-flow: column nowrap;
                align-items: flex-start;

                .header {
                    font-size: 30px;
                    font-weight: 500;
                    color: black;
                }

                .statistic-row {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    margin-top: 3.5rem;
                    column-gap: 1rem;

                    .come-student {
                        padding: 1rem;
                        background-color: white;
                        border-radius: 0.5rem;
                        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: center;
                        
                        .sub-header {
                            font-size: 25px;
                            font-weight: 500;
                            color: black;
                        }
                        .row {
                            display: flex;
                            flex-flow: row nowrap;
                            align-items: center;

                            .number {
                                font-size: 24px;
                                font-weight: 600;
                                color: black;
                            }

                            .student-header {
                                font-size: 20px;
                                font-weight: 400;
                                margin-left: 10px;
                            }
                        }
                    }
                    .sick-student {
                        @extend .come-student;
                    }
                    .absent-student {
                        @extend .come-student;
                    }
                }
                
            }
            
            
        }
        .col2 {
            grid-area: col2;
            background-color: white;
            border: none;
            margin-right: 1rem;
            border-radius: 0.5rem;

            .container {
                margin: 2rem;
            }
        }

        
    }

</style>