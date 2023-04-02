<script lang="ts">

    
    // Essentials credentials
    const date = new Date();

    const stringDate = date.toLocaleDateString();
    const dateTimeString = date.toLocaleTimeString();


    export let comeToStudy: string;
    export let absent: string;
    export let sick: string;

    // Change the clock all the time
    let a;
    let time;
    setInterval(() => {
      a = new Date();
      time = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
      const timeObject = document.getElementById("time") as HTMLObjectElement;
      timeObject!.innerHTML = time;
    }, 1000);



    
</script>

<section class="dashboard-page">
    <div class="dashboard-container">
        <div class="date-container">
            <h1 class="today-header">Today</h1>
            <h3 class="date">{stringDate} <span id="time" class="time"></span></h3>

        </div>

        <div class="activity-row">
            <div class="come-to-study-container">
                <div class="header-row">
                    <h1 class="header">Come to Study</h1>
                    <img src="twodots.svg" alt="">
                </div>
                <div class="row">
                    <h1 class="come-to-study-number">{comeToStudy}</h1>
                    <div class="icon-container">
                        <img src="user.png" alt="">
                    </div>
                </div>
            </div>
            <div class="absent-container">
                <div class="header-row">
                    <h1 class="header">Absent</h1>

                    <img src="twodots.svg" alt="">
                </div>
                <div class="row">
                    <h1 class="absent-number">{absent}</h1>
                    <div class="icon-container">
                        <img src="absent.png" alt="">
                    </div>
                </div>

            </div>
            <div class="sick-container">
                <div class="header-row">
                    <h1 class="header">Sick</h1>
                    <img src="twodots.svg" alt="">
                </div>
                <div class="row">
                    <h1 class="sick-number">{sick}</h1>
                    <div class="icon-container">
                        <img src="sick.png" alt="">
                    </div>
                </div>

            </div>
        </div>

       
    </div>

</section>

<style lang="scss">
    .dashboard-page{
        width: 100%;
        height: 100%;

        .dashboard-container {
            width: 100%;
            height: 100%;
            margin: 2.5rem;

            .more-activity-grid {
                margin-top: 3.5rem;
                margin-bottom: 3.5rem;
                width: 100%;
                display: grid;
                grid-template-columns: 50% 50%;
                grid-template-rows: 501px 387px;
                grid-template-areas: 
                "col1 col2"
                "col3 col4";
                grid-gap: 2rem;

                div {
                    background-color: white;
                    border: none;
                    border-radius: 1rem;
                }
                .col1 {
                    grid-area: col1;
                    
                }
                .col2 {
                    
                    grid-area: col2;
                }
                .col3 {
                    
                    grid-area: col3;

                }
                .col4 {
                    grid-area: col4;
                }
            }
            

            .date-container {
                margin-left: 2.5rem;
                display: flex;
                flex-flow: column nowrap;
                .today-header {
                    font-size: 54px;
                    font-weight: 600;
                }
                .date {
                    font-size: 20px;
                    font-weight: 500;
                }
            }
            .activity-row {
                margin-top: 3.5rem;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                column-gap: 2.5rem;
                margin-right: 3.5rem;
                

                .come-to-study-container{
                    background: #FFFFFF;
                    box-shadow: 0px 16px 31px rgba(0, 0, 0, 0.01);
                    border-radius: 34px;
                    border: none;
                    width: 325px;
                    height: 200px;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    padding-left: 2rem;
                    display: flex;
                    flex-flow: column nowrap;

                    .header-row {
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: center;
                        justify-content: space-between;

                        .header {
                            font-size: 25px;
                            font-weight: 500;
                        }

                        img {
                            margin-right: 1.5rem;
                            cursor: pointer;
                        }
                    }

                    .row {
                        display: flex;
                        align-items: center;
                        margin-top: 2rem;
                        justify-content: space-between;

                        h1 {
                            font-size: 44px;
                            font-weight: 600;
                        }
                        .icon-container {
                            width: 125px;
                            height: 125px;
                            background: rgba(250, 187, 24, 0.1);
                            border-radius: 38px;
                            margin-right: 1rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            
                            img {
                                width: 60px;
                                height: 60px;
                            }
                        }
                        
                    }
                }
                .absent-container {
                    @extend .come-to-study-container;
                }
                .sick-container {
                    @extend .come-to-study-container;
                }
            }
        }
    }

</style>