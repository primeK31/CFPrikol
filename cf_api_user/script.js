const handle = document.getElementsByClassName('handle');
const comment = document.getElementsByClassName('rating');
const error = document.getElementById('error');
var container = document.getElementById('container');

function getTextInput() {
    var inputValue = document.getElementById("textInput").value;
    console.log("Text Input Value:", inputValue);
    var apiUrl = `https://codeforces.com/api/user.info?handles=${inputValue}`;
    container.innerHTML = '';

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        if (response.status === 404) {
            error.innerHTML = `There's no user in database, maybe there's mistake`;
            throw new Error('Data not found');
        } else if (response.status === 500) {
            error.innerHTML = `Server Error`;
            throw new Error('Server error');
        } else {
            error.innerHTML = `Network is not ok`;
            throw new Error('Network response was not ok');
        }
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        var arr = [];
        var k = [];
        const name = data.result[0].handle;
        const text = data.result[0].rating;
        console.log(data.result[0].length);
        Object.keys(data.result[0]).forEach(function(key) {
            k.push(key);
        });
        console.log(k);
        j = 0;
        for (var i in data.result[0]) {
            arr.push(`${k[j]}: ${data.result[0][i]}`);
            j++;
        }
        arr.forEach(function(arr) {
            var paragraph = document.createElement('p');
            paragraph.textContent = arr;
            container.appendChild(paragraph);
        });

    })
    .catch(error => {
        console.error('Error:', error);
    });

}
