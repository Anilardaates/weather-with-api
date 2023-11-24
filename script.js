const wrapper = document.querySelector(".wrapper")
let select = document.getElementById('sehir')
let iller = ["Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
]
iller.forEach(il =>{
    let option = document.createElement('option')
    option.textContent=il
    select.append(option)
})
async function getWeather(city) {
let key = 'bb2caf87815a197b04f622213928eca4'
let api=''
if(typeof(city)=='string'){
     api= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=tr`
}else{
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${key}&units=metric&lang=tr`
} 
    let res = await fetch(api)
    if (res.ok) {
        let data = await res.json()
        ekranaYazdir(data)
    } else {
        console.log(res)
    }
}
select.addEventListener('change',function sehirSec(){
    getWeather(select.value)
})
function ekranaYazdir(param){
    wrapper.innerHTML=''
    console.log(param)
    let sehirAdı=param.name
    let hissedilenSicaklik=param.main.feels_like
    let sicaklik = param.main.temp
    let nem = param.main.humidity

    let icon = param.weather[0].icon
    let havaDurumu = param.weather[0].description
    let card = document.createElement('div')
    card.classList.add('card','m-auto','p-0','mt-3')
    card.innerHTML=`
    <div class="card-header d-flex align-items-center justify-content-between bg-danger-subtle">
            <p class="card-title">${sehirAdı}</p>
            <img src="./img/${icon}.png" width="60" alt="">
        </div>
        <div class="card-body">
            <p class="card-text">Hissedilen Sıcaklık: ${hissedilenSicaklik}</p>
             <p class="card-text">Sıcaklık: ${sicaklik}</p>
             <p class="card-text">Nem: % ${nem}</p>
             <p class="card-text">Hava Durumu : ${havaDurumu}</p>
         </div>
     `
wrapper.append(card)
}
navigator.geolocation.getCurrentPosition(showPosition,showError)
function showPosition(position){
    getWeather(position.coords)
}
function showError(error){
    console.log(error)
}