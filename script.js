const searchInput = document.querySelector(".root section .search input")
const card = document.querySelector("section .characters .innerCharacter")
document.addEventListener("DOMContentLoaded",contentLoaded)
debounce = (fn,d)=>{
    let timer;
    return function(){
        let context = this,args = arguments
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(context,args);
            console.log("hello")
        },d)
    }
}
const better = debounce(inputResult,300)
searchInput.addEventListener("keyup",better)

function contentLoaded()
{
    fetch("https://www.breakingbadapi.com/api/characters").then((response)=>{
        return response.json()
    }).then((data)=>{
        manipulate(data);
    })
}
function inputResult(e)
{
    fetchData(e.target.value).then(a=>{
        manipulate(a);
    })
}
async function fetchData(input){
    const response = await fetch(`https://www.breakingbadapi.com/api/characters?name=${input}`)
    const data = response.json()
    return data;
}

function manipulate(a)
{
    const d = a
        let m = d.map((e)=>{
            return `<div class = "card popup">
            <div>
            <img src = ${e.img} loading = "lazy">
            </div>
            <div class = "characterName">
            <h1>${e.name}</h1>
            <h5>portrayed:  ${e.portrayed}</h5>
            <button>More Info</button>
            </div>
            <div class = "moreInfo">
            <p>${e.name} appeared in season ${e.appearance.map(e =>e).join(",")} and his occupation is ${e.occupation.map(e=>e).join(",")} and his ${e.status}</p>
            </div>
            </div>`
        })
        m = m.join("")
        card.innerHTML = m
        const moreInfo = document.querySelectorAll(".card .characterName button")
        const moreInfoContent = document.querySelectorAll(".card .moreInfo")
        moreInfo.forEach((e)=>{
            e.addEventListener("click",(e)=>{
                let moreInfo =e.target.parentElement.parentElement.children[2]
                moreInfo.classList.toggle("down")
            })
        })
}