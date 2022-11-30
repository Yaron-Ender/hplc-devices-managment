
const hplcContainer = document.querySelector(".hplc-container");
const summerySection = document.querySelector('.summery-section')
const dashboardOpenBtn = document.querySelector(
  ".hplc-devices-header .open-dashboard"
); 
const dashboardClosedBtn = document.querySelector(
  ".summery-section .open-dashboard"
); 
  let run = summerySection.querySelector(".run");
  let stop = summerySection.querySelector(".stop");
  let issue = summerySection.querySelector(".issue");
let statusObj = {
  run:[],
  stop:[],
  issue:[]
}
//Functions
//1.local storage
const updateLocalStorage = (id)=>{
  const getStatusObj = JSON.parse(localStorage.getItem("statusObj"));
  let getProject = localStorage.getItem(`project ${id}`);
  const device = document.querySelector(`[data-id='${id}']`);
      const cardImg = device.querySelector(".card-img");
    const boxTitle = cardImg.querySelector(".box-title");
    const issueTag = cardImg.querySelector("i");
  if (getStatusObj !== null) {
    //up date the dashbord panel
    statusObj = getStatusObj;
    statusObj["run"].forEach((hplc) => {
      devicesSummery("run", hplc);
    });
    statusObj["stop"].forEach((hplc) => {
      devicesSummery("stop", hplc);
    });
    statusObj["issue"].forEach((hplc) => {
      devicesSummery("issue", hplc);
    });
  } //end of if not null
  //local storage for current project
  if (getProject !== null && getProject!=='') {
    device.classList.remove("stop-animation");
    boxTitle.classList.remove("none");
    boxTitle.querySelector("h5").innerText = getProject;
  }
  if(getProject=='stop'){    
    boxTitle.classList.remove("none");
    boxTitle.classList.add("ready");
    device.classList.add("stop-animation");
     boxTitle.innerHTML = `<h5>ready</h5>`;
  }
  if(getProject=='issue'){
    device.classList.add("stop-animation");
    boxTitle.classList.add("none");
    issueTag.classList.add("issue-tag");
  }
}
//2.open-close the dashboard
dashboardOpenBtn.addEventListener('click',()=>{
 dashboardOpenBtn.parentElement.classList.toggle("none");
 dashboardClosedBtn.parentElement.classList.toggle("none");
  summerySection.classList.toggle("insert-in");
})
dashboardClosedBtn.addEventListener('click',()=>{
  dashboardOpenBtn.parentElement.classList.toggle("none");
 dashboardClosedBtn.parentElement.classList.toggle("none");
  summerySection.classList.toggle("insert-in");
})


//3.flip the card and activate the back content
const flipSide =(e)=>{
  const id= e.target.getAttribute('data-id');
  const deviceCard = document.querySelector(`.device-card[data-id='${id}']`);
  const cardBack = document.querySelector(`.card-back[data-id='${id}']`);
  const radio = deviceCard.querySelectorAll(`[type='radio'][name='status']`);
  if (e.target.classList.contains('det')){
    deviceCard.classList.add("flip-180");
    cardBack.classList.add("card-back-active");  
    //the reverse turn  
  }else if (e.target.classList.contains("go-back")) {
    deviceCard.classList.remove("flip-180");
    cardBack.classList.remove("card-back-active");
    deviceCard.querySelector(".card-img i").classList.remove('issue-tag');
     (deviceCard.querySelector(".proj-det #project").value==="")?
     deviceCard.querySelector(".btn.det").classList.remove('shaking-btn'):false
    radio.forEach((radio)=>{
      radio.checked=false;
    })
  }  
}

//4.update the status object arrays and update the UI
const devicesSummery = (state,hplc)=>{

  //run
  if (state !== "run") {
    run.innerHTML = `<h4>run</h4>`;
    statusObj["run"] = statusObj["run"].filter((item) => item !== hplc);
    statusObj["run"].forEach((hplc) => {
      run.innerHTML += `<li>${hplc}</li>`;
    });
  } else {
    run.innerHTML = `<h4>run</h4>`;
    statusObj["run"].forEach((hplc) => {
      run.innerHTML += `<li>${hplc}</li>`;
    });
  }
  //stop
  if (state !== "stop") {
    stop.innerHTML = `<h4>stop</h4>`;
    statusObj["stop"] = statusObj["stop"].filter((item) => item !== hplc);
    statusObj["stop"].forEach((hplc) => {
      stop.innerHTML += `<li>${hplc}</li>`;
    })
  } else {
    stop.innerHTML = `<h4>stop</h4>`;
    statusObj["stop"].forEach((hplc) => {
      stop.innerHTML += `<li>${hplc}</li>`;
    });
  }
  //issue
    if(state!=='issue'){
      issue.innerHTML = `<h4>issue</h4>`;
      statusObj["issue"] = statusObj["issue"].filter((item) => item !== hplc);
      statusObj["issue"].forEach(hplc=>{
        issue.innerHTML+=`<li>${hplc}</li>`
      })
    }else{
      issue.innerHTML = `<h4>issue</h4>`;
      statusObj["issue"].forEach(hplc=>{
      issue.innerHTML+=`<li>${hplc}</li>`
      })
    }
  }
//  5.media Query
const media = ()=>{
  if(  window.matchMedia("(max-width: 600px)").matches){
     summerySection.style.position='absolute'
  }
}
// CLASS 
class Hplc {
  constructor(id, brand, injVol) {
    this.id = id;
    this.brand = brand;
    this.injVol = injVol;
    this.currentProj = "";
    this.projects = [];
    this.status = "";
  }
  // build the UI
  hplcUI() {
    const device = document.createElement("div");
    device.setAttribute("data-id", this.id);
    device.classList = `device-card stop-animation`;
    hplcContainer.appendChild(device);
    device.innerHTML = ` 
  <div class="card-front">
           <div class="card-img">
           <div class='device-num'><h6>${this.id}</h6></div>
           <div class='box-title none' data-id='${this.id}'>
               <h5></h5>
               </div>
             <i></i>
           </div>
           <div class="card-det">
           <div class="status">
               <div class="run-stop">
        <label for="">run</label>
        <input type="radio" name="status" id="run" value='run'data-id='${this.id}'>
         <label for="">stop</label>
         <input type="radio" name="status" id="stop" value='stop'data-id='${this.id}'>
          </div>
          <div class="issue">
          <label for="">issue</label>
          <input type="radio" name="status" id="issue" value='issue' data-id='${this.id}'>
          </div>
          </div>
          <div class="det-box">
          <button class="btn det"data-id='${this.id}'>fill details</button>
          </div>
          </div>
          </div>
              <!--END of front card -->
              
               <!-START of back card -->
         <div class='card-back'data-id='${this.id}'>
           <div class="back-card-content">
        <h4>${this.id}</h4>
   <p> brand:<span> ${this.brand}</span></p>
   <p> injection vol : <span>${this.injVol}</span></p>  

<form class="proj-det" data-id='${this.id}' >
  <label for="project">Project name:</label>
  <input type="text" id="project" disabled><br><br>
  <label for="analyst">performance by:</label> <br>
  <select id="analyst"disabled>
  <option style="display:none">
  <option value="Limor">Limor</option>
  <option value="Nofar">Nofar</option>
  <option value="Natalya">Natalya</option>
  <option value="Sveta">Sveta</option>
  <option value="Tanya">Tanya</option>
  <option value="Olga">Olga</option>
  <option value="Olga-Berman">Olga-Berman</option>
  <option value="Igor">Igor</option>
  <option value="Jeni">Jeni</option>
  <option value="Polina">Polina</option>
  <option value="Yaron">Yaron</option>
  </select><br><br>
  <input type="submit" value="Update" class=" btn btn-update">
</form>
        <button class="btn go-back"data-id='${this.id}'>go back</button>
  </div>
       </div>
       `;
    const btnDet = device.querySelector(".det");
    const btnGoBack = device.querySelector(".go-back");
    const subProj = device.querySelector("form.proj-det");
    const subProjBtn = subProj.querySelector("[type=submit]");
    const boxTitle = device.querySelector('.box-title')
    // EVENTS
    //fliping events
    btnDet.addEventListener("click", flipSide);
    btnGoBack.addEventListener("click", flipSide);
    // 7. fill up the form
    subProj.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = e.target.getAttribute("data-id");
      const analystName = e.target.analyst;
      const projectName = e.target.project;
      const titleBox = document.querySelector(`.box-title[data-id='${id}']`);
      const title = titleBox.querySelector("h5");
      titleBox.classList.remove("ready");
      //the active class doesnt exsist- it just for here(i think)
      subProjBtn.classList.toggle("active");
      if (subProjBtn.classList.contains("active")) {
        subProjBtn.value = "SAVE";
        subProjBtn.style.backgroundColor = "var(--teva-blue-darker)";
        analystName.removeAttribute("disabled");
        projectName.removeAttribute("disabled");
        titleBox.classList.remove("none");
      } else {
        subProjBtn.value = "UPDATE";
        subProjBtn.style.backgroundColor = "var(--middle-green)";
        analystName.setAttribute("disabled", true);
        projectName.setAttribute("disabled", true);
        if (projectName.value == "") {
          titleBox.classList.add("none");
        } else {
          title.innerText = projectName.value;
          this.currentProj = title.innerText;
       
        }
      }
    });
    return this;
  }
  //5.
  listenRadio() {
    const radio = document.querySelectorAll(
      `[type='radio'][name='status'][data-id='${this.id}']`
    );
    radio.forEach((r) => {
      r.addEventListener("input", () => {
        if (r.checked) {
           this.updateDeviceStatus(r.value);
        }
      });
    });
    return this;
  }
  //8.this invoked by the radio btn
  updateDeviceStatus(value) {
    const id = this.id;
    const device = document.querySelector(`[data-id='${id}']`);
    const detBtn = device.querySelector(".btn.det"); //fill-details btn
    const cardImg = device.querySelector(".card-img");
    const boxTitle = cardImg.querySelector(".box-title");
    const issueTag = cardImg.querySelector("i");
    this.status = value;

    switch (value) {
      case "run":
        issueTag.classList.remove("issue-tag");
        // boxTitle.classList.remove('ready')
        if (this.currentProj !== "" && !boxTitle.classList.contains("ready")) {
          device.classList.remove("stop-animation");
          cardImg.style.backgroundImage = "url(../images/hplc.png)";
          boxTitle.classList.remove("none");
          this.projects.push(this.currentProj);
          //add the device to the array and oparate the func.
          statusObj["run"].includes(`${id}`)
            ? false
            : statusObj["run"].push(`${id}`);
          devicesSummery("run", `${id}`);
        } else {
          detBtn.classList.add("shaking-btn");
        }
        break;
      case "stop":
        this.currentProj = 'stop';
        detBtn.classList.remove("shaking-btn");
        device.classList.add("stop-animation");
        issueTag.classList.remove("issue-tag");
        cardImg.style.backgroundImage =
        "linear-gradient(to bottom, rgba(0,0,0,0)10%,rgba(0,0,0,.3) 100%),url(../images/hplc.png)";
        boxTitle.classList.remove("none");
        boxTitle.classList.add("ready");
        boxTitle.innerHTML = `<h5>ready</h5>`;
        //add the the device to the array and oprate the func.
        statusObj["stop"].includes(`${id}`)
          ? false
          : statusObj["stop"].push(`${id}`);
          devicesSummery("stop", `${id}`);
          break;
          case "issue":
        this.currentProj = 'issue';
        detBtn.classList.remove("shaking-btn");
        device.classList.add("stop-animation");
        boxTitle.classList.add("none");
        issueTag.classList.add("issue-tag");
        //add the the device to the array and oprate the func.
        statusObj["issue"].includes(`${id}`)
          ? false
          : statusObj["issue"].push(`${id}`);
        devicesSummery("issue", `${id}`);
        break;
    }
    //local storage
    localStorage.setItem(`project ${this.id}`, this.currentProj);
    //local storage for the status object
    localStorage.setItem("statusObj", JSON.stringify(statusObj));
    return this;
  }
  updateLocalStorage(){
    updateLocalStorage(this.id)
    return this;
  }
  
}
const hplc100 = new Hplc('hplc 100', "shimatzue","10&#181;l - 100&#181;l");
const hplc125 = new Hplc(' hplc 125', "shimatzue","10&#181;l - 100&#181;l");
const hplc75 = new Hplc('hplc 75', "hp","10&#181;l - 100&#181;l");
const hplc164 = new Hplc('hplc 164', "shimatzue","10&#181;l - 100&#181;l");
const hplc45 = new Hplc('hplc 45', "hp","10&#181;l - 100&#181;l");
const hplc19 = new Hplc('hplc 19', "shimatzue","10&#181;l - 100&#181;l");
const hplc55 = new Hplc('hplc 55', "water","10&#181;l - 100&#181;l");
const huplc32 = new Hplc('huplc 32', "water","10&#181;l - 100&#181;l");
const huplc33 = new Hplc('huplc 33', "water","10&#181;l - 100&#181;l");
const huplc34 = new Hplc('huplc 34', "water","10&#181;l - 100&#181;l");
const huplc35 = new Hplc('huplc 35', "water","10&#181;l - 100&#181;l");
const huplc36 = new Hplc('huplc 36', "water","10&#181;l - 100&#181;l");
const huplc37 = new Hplc('huplc 37', "water","10&#181;l - 100&#181;l");
const huplc38 = new Hplc('huplc 38', "water","10&#181;l - 100&#181;l");
const huplc39 = new Hplc('huplc 39', "water","10&#181;l - 100&#181;l");
const huplc70 = new Hplc('huplc 70', "water","10&#181;l - 100&#181;l");
const huplc80 = new Hplc('huplc 80', "water","10&#181;l - 100&#181;l");


hplc100.hplcUI().listenRadio().updateLocalStorage();
hplc125.hplcUI().listenRadio().updateLocalStorage();
hplc75.hplcUI().listenRadio().updateLocalStorage();
hplc164.hplcUI().listenRadio().updateLocalStorage();
hplc45.hplcUI().listenRadio().updateLocalStorage();
hplc19.hplcUI().listenRadio().updateLocalStorage();
hplc55.hplcUI().listenRadio().updateLocalStorage();
huplc32.hplcUI().listenRadio().updateLocalStorage();
huplc33.hplcUI().listenRadio().updateLocalStorage();
huplc34.hplcUI().listenRadio().updateLocalStorage();
huplc35.hplcUI().listenRadio().updateLocalStorage();
huplc36.hplcUI().listenRadio().updateLocalStorage();
huplc37.hplcUI().listenRadio().updateLocalStorage();
huplc38.hplcUI().listenRadio().updateLocalStorage();
huplc39.hplcUI().listenRadio().updateLocalStorage();
huplc70.hplcUI().listenRadio().updateLocalStorage();
huplc80.hplcUI().listenRadio().updateLocalStorage();

console.log( hplc100);

media()




