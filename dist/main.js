(()=>{class t{constructor(t){this.city=t}getWeather(){fetch(`https://api.weatherapi.com/v1/current.json?key=4d938dec5b23489c878182327232911&q=${this.city}&aqi=no`,{mode:"cors"}).then((t=>t.json())).then((t=>{console.log(t),new e(t.current.temp_c,t.current.feelslike_c,t.current.condition.text,t.current.condition.icon,t.current.wind_kph,t.location.name)}))}}class e{constructor(t,e,n,i,c,o){this.tempC=t,this.feelsC=e,this.conditionText=n,this.iconSrc=i,this.windKPH=c,this.city=o,this.buildDom()}buildDom(){this.buildTitle(),this.buildTemperature(),this.buildCondition(),this.buildWind()}buildTitle(){document.querySelector("#title").textContent=this.city}buildTemperature(){const t=document.querySelector("#temperature");t.innerHTML="";const e=document.createElement("p"),n=document.createElement("p");e.textContent=`Current: ${this.tempC} Celsius`,n.textContent=`Feels Like: ${this.feelsC} Celsius`,t.appendChild(e),t.appendChild(n)}buildCondition(){const t=document.querySelector("#conditions");t.innerHTML="";const e=document.createElement("p"),n=document.createElement("img");n.src=`https:${this.iconSrc}`,e.textContent=this.conditionText,t.appendChild(e),t.appendChild(n)}buildWind(){const t=document.querySelector("#wind");t.innerHTML="",t.textContent=`Wind: ${this.windKPH} KM/H`}}class n{constructor(t){this.city=t,this.inputField=document.querySelector("#selected_city"),this.button=document.querySelector("#searchButton"),this.button.addEventListener("click",(t=>{t.preventDefault(),i(this.inputField.value)}))}}function i(e){const i=new t(e);new n(e),i.getWeather()}i("Athens")})();