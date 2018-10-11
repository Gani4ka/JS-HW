"use strict";

/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 1",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-1.com"
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-2.com"
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-3.com"
  }
];

/*
  Создайте функцию createPostCard(), которая 
  создает и возвращает DOM-узел карточки поста.
  
  Разметка с классами есть на вкладке HTML.
  Стили на вкладке CSS.
  
  Используйте createElement для создания узлов.
  Добавьте классы и атрибуты.
*/

let arrayWithPosts = [];

const createPostCard = function(postObj) {

  const post = document.createElement("div");
  const image = document.createElement("img");
  const title = document.createElement("h2");
  const text = document.createElement("p");
  const button = document.createElement("a");

  image.setAttribute("src", postObj.img);
  title.textContent = postObj.title;
  text.textContent = postObj.text;
  button.setAttribute("href", postObj.link);

  post.classList.add("post");
  image.classList.add("post__image");
  title.classList.add("post__title");
  text.classList.add("post__text");
  button.classList.add("button");

  image.setAttribute("alt", "post image");
  button.setAttribute("href", "#");

  button.textContent = "Read more";

  post.appendChild(image);
  post.appendChild(title);
  post.appendChild(text);
  post.appendChild(button);
  
  return arrayWithPosts.push(post);
};

function createCards(postsArr) {
  postsArr.forEach(postObj => createPostCard(postObj));

document.body.append(...arrayWithPosts);
};

createCards(posts);