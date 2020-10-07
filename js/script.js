/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

/*
const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};


const adv = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre'),
    movieList = document.querySelector('.promo__interactive-list');

// 1)
adv.forEach(item => {
    item.remove();
});
/*
adv.forEach(function (item) {
    item.remove();
});
*/

// 2)
/*
genre.textContent = 'драма';

// 3)
poster.style.backgroundImage = 'url("img/bg.jpg")';

// 4)
movieList.innerHTML = "";

movieDB.movies.sort();

//console.log(poster.innerHTML);

movieDB.movies.forEach((film, i) => {
    movieList.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${film}
             <div class="delete"></div>
        </li>
    `;
});

/*
a = a + 1;
a += 1;
*/


/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

document.addEventListener('DOMContentLoaded', () => { //снач-а DOM структура загружаеться, затем все остальное
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };


    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    //обработчик события нашей формы
    addForm.addEventListener('submit', (event) => {
        event.preventDefault(); //страница не перезагружается

        let newFilm = addInput.value; //что ввел пользователь
        const favorite = checkbox.checked;

        //если фильм не вписан (пустая строка)
        if (newFilm) {

            if (newFilm.length > 21) { // 2)
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавляем любимый фильм"); // 4)
            }

            movieDB.movies.push(newFilm); //добав-ли нов фильм
            sortArr(movieDB.movies); //отсортировали

            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset(); //сбросили данные в окошке

    });


    const deleteAdv = (arr) => { //arr аргумент
        arr.forEach(item => {
            item.remove();
        });
    }; //удаление рекламы


    const makeChanges = () => {
        genre.textContent = 'драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';
    }; //измен-е на стр


    const sortArr = (arr) => {
        arr.sort();
    }; // cортирует массив


    function createMovieList(films, parent) {
        parent.innerHTML = ""; // очищ-м родительский элем-т
        sortArr(films); // 5)

        films.forEach((film, i) => { //помещ-м нов фильмы
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film}
                 <div class="delete"></div>
            </li>
        `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => { // 3)
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent); //нумерация меняе-я после удал-я
            });
        });

    }

    //вызывать функции будем по очереди
    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);

});