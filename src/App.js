import "./App.css";
import axios from "axios";

const converterUrl = "http://localhost:81/ConvertService.ashx";


async function onSend(e) {

e.preventDefault();

const uploadedFile = e.target.file.files[0];
const formData = new FormData();
formData.append("file", uploadedFile);

const remoteFileUrl = await axios.post("http://localhost:4000/send/",     formData, { headers: { "Content-Type": "multipart/form-data" },})
    .then(response => response.data.file)
    .catch(e => console.log(e));
    console.log("Uploaded file: " + remoteFileUrl)

const fileToConverting = {
    title: "Converting" + new Date().toISOString(),
    outputtype: "pdf",
    key: Math.floor(Math.random() * 100000),
    url:remoteFileUrl,
};
  
const convertedFile = await axios.post(
    converterUrl, JSON.stringify(fileToConverting))
    .then(response => response.data.fileUrl).catch(e => console.log(e));
console.log("Converted file " + convertedFile);

const links = document.getElementById("links");
const link = document.createElement("a");
link.innerHTML = `<a href="${convertedFile}">${convertedFile}</a><br><br>`;
convertedFile ? links?.appendChild(link) : console.log("File error!");

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>This is a demo project of using OnlyOffice documentserver API</h2>
        <hr />
      </header>
      <article>
        <form method="POST" onSubmit={(e) => onSend(e)}>
          <p>
            <input type="file" id="file" />
          </p>
          <button type="submit">Send file</button>
        </form>
        <p>Links to converted files:</p>
        <p id="links"/>
      </article>
    </div>
  );
}

export default App;
