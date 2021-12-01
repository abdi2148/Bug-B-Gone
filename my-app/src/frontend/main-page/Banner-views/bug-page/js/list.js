
test();


async function test(){

const isDarkMode = await window.api.send("toMain", "some data");


for (i = 0; i < isDarkMode.length; i++)
document.getElementById("something").innerHTML += (i+1) + ": " + array[i];
}
