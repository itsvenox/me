document.querySelectorAll('#page-content > section').forEach(node => {
    if (node.id !== 'home' && node.classList.contains('active-section')) node.classList.remove('active-section')
})


var typewriter = (element, text, finishedCallback, speed = 90) => {
    const textArray = text.split('')
    let index = 0

    clearInterval(typewriterInterval)
    var typewriterInterval = window.setInterval(() => {
        if (textArray[index]) element.textContent += textArray[index] // weird bug where it infinitely prints undefined, seems like the if loop is being skipped somehow?

        if (index === textArray.length) {
            clearInterval(typewriterInterval)
            finishedCallback()
        }

        index++
    }, speed)
}

const typeWriterAll = () => {
    const toTypeNodes = document.querySelectorAll('.active-section .type-contents')

    toTypeNodes.forEach(node => node.hidden = true)
    let index = 0
    const typeNode = () => {
        if (index === toTypeNodes.length) return

        const node = toTypeNodes[index]
        const texttoType = node.textContent

        node.textContent = ''
        node.hidden = false

        index++
        typewriter(node, texttoType, typeNode, texttoType.length / 165)
    }

    typeNode()
}

const hashAndLinkedSection = {}
document.querySelectorAll('#page-content > section').forEach(node => hashAndLinkedSection[node.id] = node)

const updatePageContent = () => {
    const key = window.location.hash.substring(1)
    if (hashAndLinkedSection[key]) {
        document.querySelector('#page-content > section.active-section').classList.remove('active-section')
        hashAndLinkedSection[key].classList.add('active-section')
    } else {
        document.querySelector('#page-content > section.active-section').classList.remove('active-section')
        hashAndLinkedSection['404'].classList.add('active-section')
    }

}

window.addEventListener('hashchange', () => {
    updatePageContent()
    typeWriterAll()
})

window.addEventListener('load', () => {
    updatePageContent()
    typeWriterAll()
    document.getElementById('footer-year').textContent = new Date().getFullYear()
})



const projects = [
    {
        repoLink: "https://github.com/itsvenox/GevoxAPI",
        discordImageLink: "https://raw.githubusercontent.com/itsvenox/GevoxAPI/refs/heads/main/image.png"
    },
    {
        repoLink: "https://github.com/itsvenox/AMONG-FIGHTER",
        discordImageLink: "https://raw.githubusercontent.com/itsvenox/AMONG-FIGHTER/refs/heads/main/screenshots/splash_screen.png"
    },
    {
        repoLink: "https://github.com/itsvenox/AMONG-FIGHTER",
        discordImageLink: "https://raw.githubusercontent.com/itsvenox/alhendawi/refs/heads/main/alhendawi.png"
    },
];


function extractRepoName(repoLink) {
    const parts = repoLink.split("/");
    return parts[parts.length - 1];
}

function createProjectCards() {
    const projectContainer = document.getElementById("project-container");

    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.href = project.repoLink;

        const image = document.createElement("img");
        image.className = "repo-image";
        image.src = project.discordImageLink;
        image.alt = "Project Image";

        const repoLink = document.createElement("a");
        repoLink.className = "repo-title";
        repoLink.textContent = extractRepoName(project.repoLink);

        card.appendChild(image);
        card.appendChild(repoLink);
        projectContainer.appendChild(card);
        image.addEventListener('click', () => {
            const websiteURL = project.repoLink;
            window.open(websiteURL, '_blank');
        });
    });
}

createProjectCards();
