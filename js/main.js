window.addEventListener('DOMContentLoaded', function() {

//Задаем опции для анимации
function jsAnimate(options) {

    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        //Задаем timeFraction от 0 до 1
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        //Определяем текущее состояние анимации
        var progress = options.timing(timeFraction);

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
};

//Функции timing
function linear(timeFraction) {
    return timeFraction;
};

//ease in
function easeInQuad(timeFraction) {
    return Math.pow(timeFraction, 2);
};

function easeInCirc(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction));
};

function easeInBack(timeFraction) {
    return Math.pow(timeFraction, 2) * ((3 + 1) * timeFraction - 3);
};

function easeInBounce(timeFraction) {
    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
};

function easeInElastic(timeFraction) {
    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * timeFraction);
};

//ease out
function makeEaseOut(timing) {
    return function (timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
};

easeOutQuad = makeEaseOut(easeInQuad);
easeOutCirc = makeEaseOut(easeInCirc);
easeOutBack = makeEaseOut(easeInBack);
easeOutBounce = makeEaseOut(easeInBounce);
easeOutElastic = makeEaseOut(easeInElastic);

//ease in out
function makeEaseInOut(timing) {
    return function (timeFraction) {
        if (timeFraction < .5)
            return timing(2 * timeFraction) / 2;
        else
            return (2 - timing(2 * (1 - timeFraction))) / 2;
    }
};

easeInOutQuad = makeEaseInOut(easeInQuad);
easeInOutCirc = makeEaseInOut(easeInCirc);
easeInOutBack = makeEaseInOut(easeInBack);
easeInOutBounce = makeEaseInOut(easeInBounce);
easeInOutElastic = makeEaseInOut(easeInElastic);


let container = document.getElementById('container'),
	plus = document.getElementById('plus'),
	minus = document.getElementById('minus'),
	ball,
	x,
	y,
	r,
	g,
	b;

plus.addEventListener('click', function (e) {
    ball = document.createElement('div');//Создаем новый элемент
    ball.classList.add('ball');//Присваиваем ему класс 'ball'
    //Случайным образом устанавливаем координаты
    x = (container.offsetWidth - 40) * Math.random() + 20;
    y = (container.offsetHeight - 40) * Math.random() + 20;
    //Задаем полученные координаты элементу
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
    //Задаем ширину элемента случайным образом в диапазоне от 10 до 50px
    ball.style.width = Math.floor((Math.random() * (50 - 10) + 10)) + 'px';
    w = ball.style.width;//Присваиваем переменной ширину элемента
    ball.style.height = w;//Устанавливаем высоту элемента равной его ширине
    ball.style.borderRadius = `50%`;//Создаем окружность из элемента
    //Задаем случайным образом прозрачность
    ball.style.opacity = Math.random() * (1 - 0.2) + 0.2;
    
    //Задаем случайным образом числа в диапазоне до 256 для цветовой гаммы
    let r = Math.floor(Math.random() * (256)),
	    g = Math.floor(Math.random() * (256)),
	    b = Math.floor(Math.random() * (256));

	//Переводим полученные числа в строки
    let objR = {
        toString: function () {
            return r;
        }
    };
    let objG = {
		toString: function () {
            return g;
        }
    };
    let objB = {
        toString: function () {
            return b;
        }
    };

    //Задаем цвет окружности
    rgb = `rgb(${r}, ${g}, ${b})`;
    ball.style.backgroundColor = rgb;
    ball.id = 'b';//Задаем id каждой окружности
    container.appendChild(ball);//Добавляем новый элемент в контейнер

//Устанавливаем предел падения окружности по высоте в зависимости от доступной высоты экрана
    let screenHeight;
	    screenHeight = screen.availHeight;
	    endY = screenHeight - y - 130;

//Запускаем функцию анимации с заданными опциями и указываем действия для элементов анимации
    jsAnimate({
        duration: 2000,
        timing: easeOutBounce,
        draw: function (progress) {
        ball.style.transform = 'translateY(' + endY * progress + 'px)';
        }
    });
});

//Привязываем функцию удаления последней окружности к кнопке через обработчик событий
	minus.addEventListener('click', function (e) {
    	container.removeChild(container.children[container.childElementCount - 1]);

	});
});