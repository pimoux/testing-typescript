type Post = {userId: number, id: number, title: string, body: string};

const postsContainerElt = <HTMLDivElement>document.querySelector('#posts');
const fetchButtonElt = <HTMLButtonElement>document.querySelector("#fetch-button");
const noRemainingPostsElt = <HTMLParagraphElement>document.querySelector("#no-remaining-posts");
const usernames: string[] = ["Pimoux", "Auraah", "Eliminate", "Swarmsii", "Lothus", "DaZeRo", "AMDuskia", "Hikanari", "Cribob", "Lochie"];
let data: Array<Post> = [];
let showingData: Array<Post> = [];
let postsDisplayed: number = 0;
let isPostsFetched: boolean = false;

const fetchPosts = async () =>  {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await res.json();
}

const updatePosts = (data: Post[]) => {
    data.forEach(obj => {
        let div = <HTMLDivElement>document.createElement('div');
        div.classList.add("post");
        let titleElement = <HTMLHeadingElement>document.createElement('h2');
        let bodyParagraph = <HTMLParagraphElement>document.createElement('p');
        let spanElt = <HTMLSpanElement>document.createElement("span");
        let title = <Text>document.createTextNode(obj.title);
        let body = <Text>document.createTextNode(obj.body);
        let spanText = <Text>document.createTextNode(`written by ${usernames[obj.userId - 1]}`)
        spanElt.appendChild(spanText);
        titleElement.appendChild(title);
        bodyParagraph.appendChild(body);
        div.appendChild(titleElement);
        div.appendChild(bodyParagraph);
        div.appendChild(spanElt);
        postsContainerElt.appendChild(div);
    })
}

const concatPosts = () => {
    if (postsDisplayed < 100) {
        const nextPosts = data.slice(postsDisplayed, postsDisplayed + 10);
        postsDisplayed += 10;
        updatePosts(nextPosts);
    } else {
        noRemainingPostsElt.classList.remove("hidden");
        noRemainingPostsElt.classList.add("inline");
    }
}

fetchButtonElt.addEventListener("click", () => {
    fetchPosts().then(res => {
        isPostsFetched = true;
        postsDisplayed += 10;
        data = res;
        showingData = res.slice(0, postsDisplayed);
        updatePosts(showingData);
    });
});

window.addEventListener("scroll", () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(isPostsFetched && scrollTop + clientHeight === scrollHeight) {
        concatPosts();
    }
})