"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const postsContainerElt = document.querySelector('#posts');
const fetchButtonElt = document.querySelector("#fetch-button");
const noRemainingPostsElt = document.querySelector("#no-remaining-posts");
const usernames = ["Pimoux", "Auraah", "Eliminate", "Swarmsii", "Lothus", "DaZeRo", "AMDuskia", "Hikanari", "Cribob", "Lochie"];
let data = [];
let showingData = [];
let postsDisplayed = 0;
let isPostsFetched = false;
const fetchPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('https://jsonplaceholder.typicode.com/posts');
    return yield res.json();
});
const updatePosts = (data) => {
    data.forEach(obj => {
        let div = document.createElement('div');
        div.classList.add("post");
        let titleElement = document.createElement('h2');
        let bodyParagraph = document.createElement('p');
        let spanElt = document.createElement("span");
        let title = document.createTextNode(obj.title);
        let body = document.createTextNode(obj.body);
        let spanText = document.createTextNode(`written by ${usernames[obj.userId - 1]}`);
        spanElt.appendChild(spanText);
        titleElement.appendChild(title);
        bodyParagraph.appendChild(body);
        div.appendChild(titleElement);
        div.appendChild(bodyParagraph);
        div.appendChild(spanElt);
        postsContainerElt.appendChild(div);
    });
};
const concatPosts = () => {
    if (postsDisplayed < 100) {
        const nextPosts = data.slice(postsDisplayed, postsDisplayed + 10);
        postsDisplayed += 10;
        updatePosts(nextPosts);
    }
    else {
        noRemainingPostsElt.classList.remove("hidden");
        noRemainingPostsElt.classList.add("inline");
    }
};
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
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (isPostsFetched && scrollTop + clientHeight === scrollHeight) {
        concatPosts();
    }
});
