let myLeads = []
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el")

let leadFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadFromLocalStorage) {
    myLeads = leadFromLocalStorage
    render(myLeads)
}



function render(lead) {
    let listItem = ''
    for (let lead of myLeads) {
        listItem += `
        <li>
            <a target="_blank" href="${lead}">
                ${lead}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItem
}

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener('click', () => {
    if (inputEl.value === '') return
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

tabBtn.addEventListener('click', () => {
   
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        console.log(tabs);
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
    
   
})





