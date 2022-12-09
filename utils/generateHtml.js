
function generateEmployeeCards(objArray) {
    let resultStr = '';
    for (obj of objArray) {
        resultStr += `<div>
        <div>
            <div class="bg-info p-1 rounded">
                <h2 class="card-title">${obj.getName()}</h2>
                <h3 class="card-subtitle mb-2 text-light">${obj.getRole()}</h3>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${obj.getId()}</li>
                <li class="list-group-item">
                    Email: <a href="mailto:${obj.getEmail()}" class="card-link">${obj.getEmail()}</a>
                </li>
                <li class="list-group-item">
                    ${generateOptField(obj)}
                </li>
            </ul>
        </div>
    </div>\n`;
    }
    return resultStr;
}


function generateHtml(objArray) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Team</title>
    </head>
    <body>
        <header>
            <h1>Team List</h1>
        </header>
        <main class="d-flex flex-wrap justify-content-around p-1">
            ${generateEmployeeCards(objArray)}
        </main>
    </body>
    </html>`
};

module.exports = generateHtml;