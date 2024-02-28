let data
const trash = document.querySelector('.delete')
async function fetchData() {
    try {
        const response = await fetch('/blogs');
        const res = await response.json();
        console.log(res)
    } catch (err) {
        console.log(err);
    }
    
    }
fetchData();     