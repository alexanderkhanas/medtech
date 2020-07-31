import React from "react";
import s from "./Politics.module.css";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";

const Politics = () => {
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Політика конфіденційності", path: "/politics" },
  ];
  return (
    <div>
      <div className={s.title__container}>
        <h4 className={s.title}>ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ</h4>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <div className={s.public__offer}>
        <p>
          На нашу думку, захист інформації про користувачів нашого веб-сайту має
          першорядне значення, тому ми докладаємо всіх зусиль, щоб ви відчували
          себе в безпеці, надаючи свої дані при використанні наших веб-сайтів. У
          цій Політиці конфіденційності розкрито правила та мету, порядок
          обробки персональних даних, права власників персональних даних та наші
          обов’язки як контролера даних. Ми застосовуємо найсучасніші технічні й
          організаційні заходи для забезпечення високого рівня захисту
          оброблюваних персональних даних від несанкціонованого доступу.
        </p>
        <h3>
          1. Нижче наведені деякі терміни, які використовуються в цій Політиці
          конфіденційності:
        </h3>
        <p>
          Користувач Веб-сайту (Покупець) – Суб’єкт персональних даних Фізична
          особа, яка відвідує Веб-сайт Інтернет-магазину для придбання,
          замовлення продукції або яка має намір придбати чи замовити продукцію
          та персональні дані якої обробляються. Така фізична особа повинна
          володіти необхідним обсягом дієздатності. Компанія LPP S.A. не може
          збирати та обробляти інформацію від фізичної особи, яка не досягла 18
          років. Згода на обробку персональних даних таких осіб повинна
          надаватися законними представниками такої неповнолітньої/малолітньої
          особи. Персональні дані – означає будь-яку інформацію, що стосується
          фізичної особи, яку ідентифіковано чи можна ідентифікувати («суб’єкт
          даних»); фізична особа, яку можна ідентифікувати, є такою особою, яку
          можна ідентифікувати, прямо чи опосередковано, зокрема, за такими
          ідентифікаторами як ім’я, ідентифікаційний номер, дані про
          місцеперебування, онлайн-ідентифікатор або за одним чи декількома
          факторами, що є визначальними для фізичної, фізіологічної, генетичної,
          розумової, економічної, культурної чи соціальної сутності такої
          фізичної особи. Згода – суб’єкта даних означає будь-яке вільно надане,
          конкретне, поінформоване та однозначне зазначення бажань суб’єкта
          даних, яким він або вона, шляхом оформлення заяви чи проявом чітких
          ствердних дій, підтверджує згоду на опрацювання своїх персональних
          даних. Обліковий запис Користувача – це відомості про Користувача
          надані ним під час заповнення полів на Веб-сайті Інтернет-магазину,
          які дозволяють однозначно ідентифікувати Користувача в процесі
          використання ним веб-сайту Інтернет-магазину. Обліковий запис
          створюється Користувачем під час реєстрації на веб-сайті Інтернет-
          магазину. Для отримання доступу до свого Облікового запису Користувач
          використовує повідомлені ним при реєстрації адресу електронної пошти
          та пароль.
        </p>
        <h3>2. Контролер даних</h3>
        <p>
          Компанія LPP S.A. з офісом, зареєстрованим за адресою: Gdańsk, u l.
          Łąkowa 39/44, внесена в Реєстр національних судів, який веде Окружний
          суд Gdańsk-Północ у м. Гданську, 7-й комерційний відділ реєстру
          Національного суду, за KRS № 778 (далі «LPP S.A.»), з REGON
          №:190852164, NIP №: 583-10-14-898, статутний капітал: 3 704 846
          злотих, сплачено повністю.
        </p>
        <h3>3. Мета та цілі обробки Ваших персональних даних</h3>
        <p>
          Компанія LPP S.A. обробляє персональні дані Користувачів Веб-сайту для
          належного виконання договорів, укладених через веб-сайт medtech.com
          (далі «Веб-сайт», «Веб-сайт Інтернет магазину») та опрацювання
          замовлення Користувача. Це означає, що такі дані потрібні, зокрема,
          для наведеного нижче: - Реєстрації та авторизації Користувача на
          Веб-сайті Інтернет – магазину; - Забезпечення створення облікового
          запису Користувача; - Оформлення та розміщення замовлення на товари; -
          Виконання Продавцем умов договору купівлі-продажу товару на відстані;
          - Оплати товарів, обробки та отримання платежів, виставлення рахунків,
          видачі супровідних документів; - Доставки товарів, що замовив
          Користувач; - Встановлення зворотнього зв’язку з Користувачем,
          включаючи направлення повідомлень, запитів, що стосуються використання
          веб-сайту Інтернет-магазину, обробки запитів, замовлень, заявок від
          Користувача; - Для підтвердження достовірності та повноти персональних
          даних, наданих Користувачем. - Маркетингових цілей. - Аналіз зручності
          користування Веб-сайтом Інтернет-магазину. Якщо ви погодилися
          отримувати інформацію про нові продукти й спеціальні пропозиції,
          компанія LPP S.A. обробляє ваші дані, щоб надіслати вам свою
          комерційну (рекламну) інформацію, наприклад, щодо поточних модних
          тенденцій, спеціальних пропозицій або розпродажів.
        </p>
        <h3>4. Склад персональних даних, які підлягають обробці</h3>
        <p>
          Компанія LPP S.A. обробляє ті або інші персональні дані, залежно від
          мети та цілей обробки, які, загалом, будуть такими: - Ім’я та
          прізвище. - Адреса електронної пошти.. - Стать (обравши форму
          звертання пані/пан). - Адреса доставки. - Номер телефону. - Адреса
          електронної пошти. - Дата народження (надається за бажанням
          Користувача). - Інформація про ваші придбання, замовлення, повернення.
          - Комерційна інформація (у випадку, якщо ви підписались на нашу
          розсилку). - Інформацію про підключення, географічне положення,
          перегляди (якщо ви взаємодієте з нами з мобільного телефону чи
          будь-якого іншого пристрою). У випадку, якщо ви розриваєте договір та
          повертаєте товар належної якості або ми задовольняємо вашу скаргу щодо
          повернення товару неналежної якості і здійснюємо повернення коштів
          безпосередньо на ваш банківський рахунок, Ви, також, повинні зазначити
          відповідний номер банківського рахунку, на який LPP S.A. може
          перерахувати розмір такого повернення.
        </p>
        <h3>5. Правові підстави обробки даних</h3>
        <p>
          Персональні дані обробляються відповідно до Регламенту 2016/679
          Європейського парламенту та Ради (ЄС) від 27 квітня 2016 року. Для
          забезпечення захисту персональних даних Користувачів на території
          України повною мірою, ця Політика конфіденційності розроблена з
          урахуванням положень законодавства України, зокрема: Закону України
          «Про захист персональних даних», Закону України «Про електронну
          комерцію», Закону України «Про інформацію» та інших
          нормативно-правових актів. Ми обробляємо ваші персональні дані лише у
          випадку наявності вашої згоди, наданої під час реєстрації на Веб-сайті
          Інтернет-магазину та створення Користувачем Облікового запису. Під час
          створення Облікового запису, натиснувши позначку «Створити обліковий
          запис» Ви погоджуєтесь з Політикою конфіденційності та надаєте згоду
          на обробку персональних даних. Згода на обробку персональних даних
          може відбиратися шляхом проставлення відповідної відмітки у графі «Я
          надаю згоду на обробку персональних даних та погоджуюсь з Політикою
          конфіденційності». Ваша згода на обробку персональних даних є повністю
          добровільною. Відсутність згоди на обробку персональних даних не дає
          можливості зареєструватися на Веб-сайті Інтернет-магазину,
          користуватися своїм Обліковим записом, оформляти замовлення, купувати
          на Веб-сайті Інтернет-магазину. LPP S.A. не перевіряє достовірність
          наданої Користувачем персональної інформації і не здійснює контроль за
          її актуальністю. LPP S.A. виходить з того, що Користувач надає
          достовірну інформацію і підтримує цю інформацію в актуальному стані.
          Всю відповідальність, а також можливі наслідки за надання
          недостовірної, неточної, неповної, помилкової чи неактуальної
          інформації несе Користувач.
        </p>
        <h3>
          6. Права Користувача у зв’язку з передачею та обробкою персональних
          даних:
        </h3>
        <p>
          У зв’язку з обробкою ваших персональних даних Ви маєте, зокрема,
          наведені нижче права. - Ви маєте право знати про місцезнаходження
          своїх персональних даних, мету їх обробки, місцезнаходження або місце
          проживання (перебування) контролера чи процесора персональних даних.
          Цю інформацію Ви можете отримати звернувшись до нас із відповідним
          запитом. - Ви маєте право відкликати свою згоду на збір та обробку
          персональних даних в будь-який час без зазначення причин. Запит може
          бути про відкликання згоди на обробку частково, наприклад відкликання
          згоди на отримання комерційної інформації, або про відкликання згоди
          на обробку повністю. У разі відкликання згоди на обробку персональних
          даних повністю ваш Обліковий запис користувача на Веб-сайті
          Інтернет-магазину видаляється, а ваші дані більше не обробляються.
          Відкликання згоди не вплине на жодну здійснену раніше діяльність. - Ви
          маєте право в будь-який час вимагати видалення або знищення своїх
          персональних даних без зазначення причини. Запит на видалення або
          знищення персональних даних не вплине на здійснені раніше дії.
          Видалення даних означає, що ваш Обліковий запис користувача на
          Веб-сайті Інтернет-магазину буде видалено, а ваші дані ми більше не
          оброблятимемо. - У будь-який час Ви маєте право пред’являти вимогу із
          запереченням проти повної обробки своїх персональних даних або обробки
          з певною метою. Таке заперечення не вплине на будь-які виконані раніше
          дії. Заперечення означає, що ваш Обліковий запис користувача на
          Веб-сайті Інтернет-магазину буде видалено, а ваші дані ми більше не
          оброблятимемо. - Ви маєте право звернутися до нас із запитом на
          обмеження обробки ваших персональних даних з точки зору часу або
          обсягу, і ми виконаємо ваші побажання. Такий запит не вплине на
          будь-які виконані раніше дії. - Ви маєте право пред’являти вимогу щодо
          зміни, виправлення або уточнення ваших персональних даних. Це також
          можна зробити самостійно, виконавши вхід у систему та перейшовши на
          Веб-сайті Інтернет-магазину на вкладку: МОЇ ДАНІ. У будь-якому
          випадку, звертаємо вашу увагу, що надаючи нам свої персональні дані,
          ви гарантуєте їхню точність та достовірність, а також зобов’язуєтесь
          повідомляти нам про будь-які їх зміни. - Ви маєте право звернутися до
          нас із запитом про передачу іншій стороні будь-яких ваших персональних
          даних, які обробляються нами. Для цього зверніться до нас через
          контактну форму, зазначивши назву та адресу суб’єкта, якому ми маємо
          передавати ваші дані, а також обсяг даних - тобто, які саме дані ми
          маємо передавати. Передача відбудеться в електронному вигляді після
          підтвердження запиту. Підтвердження запиту необхідне для нас, щоб
          забезпечити захист ваших даних і переконатися, що запит надходить від
          уповноваженої особи. - Ви маєте право в будь-який час звернутися до
          нас із запитом про отримання від нас інформації про те, які ваші
          персональні дані ми обробляємо, зміст таких персональних даних, умови
          надання доступу до персональних даних. Ми зобов’язані інформувати вас
          про вжиті нами дії не пізніше, ніж протягом 1 (одного) календарного
          місяця з дати отримання кожного з ваших запитів.
        </p>
        <h3>7. Період зберігання персональних даних</h3>
        <p>
          Строк дії згоди на обробку персональних даних необмежений. У
          будь-якому випадку, тривалість зберігання персональних даних буде
          залежати від цілей та мети обробки, які наводяться у цій Політиці
          конфіденційності. Ми зберігаємо ваші дані до моменту видалення
          Облікового запису Користувача на Веб-сайті Інтернет-магазину.
          Обліковий запис Користувача може видалятися за вашим запитом, а також
          у разі відкликання вашої згоди на обробку персональних даних,
          заперечення проти обробки персональних даних або вимоги про їх
          видалення. У наших системах зберігатиметься тільки архівна інформація,
          яка пов’язана зі збереженням даних про, наприклад, ваші транзакції,
          будь-які претензії, які ви можете мати, зокрема протягом встановленого
          нормативно-правовими актами гарантійного строку або у зв’язку із
          законодавством, яким регламентується наша діяльність.
        </p>
        <h3>8. Спілкування щодо персональних даних</h3>
        <p>
          Будь-які повідомлення або запити, пов’язані з персональними даними,
          нам можна надсилати зручним для вас способом. Електронною поштою:
          medtech.com. Телефоном: 044 354 52 63. За допомогою контактної форми
          на Веб-сайті. Поштою на адресу: LPP S.A. ul. Łąkowa 39/44, 80-769
          Gdańsk.
        </p>
        <h3>9. Довіреність на обробку персональних даних</h3>
        <p>
          Компанія LPP S.A. може доручити обробку персональних даних діловим
          партнерам LPP S.A., якщо це необхідно для здійснення транзакцій,
          наприклад для підготовки товарів, що ви замовили, а також для
          відправлення товарів або передачі комерційної інформації, що надходить
          із LPP S.A. (останнє стосується тих користувачів, які погодилися
          отримувати комерційну інформацію), або для інших цілей, досягнення
          яких потрібно для належного виконання замовлень Користувачем.
          Персональні дані Користувачів можуть передаватися на вимогу
          компетентних органів та організацій, які, зокрема, займаються
          питаннями виявлення і попередження випадків шахрайства, корупції,
          порушення прав людини. Персональні дані Користувачів у жодному разі не
          передаються третім сторонам, крім цілей, зазначених у Політиці
          конфіденційності.
        </p>
        <h3>10. Комерційна інформація - розсилка</h3>
        Ви можете підписатися на нашу розсилку, зазначивши свою адресу
        електронної пошти або номер телефону й погодившись на обробку
        персональних даних із метою отримання комерційної та маркетингової
        інформації електронною поштою або в текстових повідомленнях. Ми
        використовуємо розсилку новин і текстових повідомлень для інформування
        про останні пропозиції (наприклад, про нові продукти, спеціальні
        пропозиції або розпродажі). Ви можете в будь-який час відмовитися від
        підписки на розсилку новин і текстових повідомлень, клацнувши посилання,
        що міститься в розсилці, або надіславши електронного листа за адресою:
        medtech.com.
        <h3>11. Повідомлення про наявність товару</h3>
        <p>
          За вашим запитом, надісланим електронними засобами комунікації,
          компанія LPP S.A. повідомить вас про наявність потрібних товарів. Таке
          повідомлення можна надіслати тільки за умови, що ви погодилися
          отримувати комерційну інформацію (розсилку) про продукти
          інтернет-магазину на вказану адресу електронної пошти та на обробку
          ваших персональних даних компанією LPP S.A. Ви надаєте свої дані на
          добровільній основі, але відсутність Вашої згоди на обробку
          персональних даних позбавляє нас можливості повідомляти вас про
          наявність продукту.
        </p>
        <h3>12. Файли cookies</h3>
        <p>
          Для роботи Веб-сайту Інтернет-магазину використовуються файли cookies.
          Файли cookies - це невеликі файли, які дозволяють пристроям, які
          застосовується Користувачами для перегляду веб-сторінок (наприклад,
          комп’ютер, смартфон), зберігати деяку інформацію про ваш пристрій.
          Інформація, яка записана в файлах cookies, використовується,
          наприклад, з рекламною та статистичною метою та для адаптації нашого
          Веб-сайту до ваших індивідуальних потреб. Ви можете змінити
          налаштування файлів cookies у своєму веб-браузері. Якщо налаштування
          залишаться незмінними, файли cookies зберігатимуться на пристрої.
          Зміна налаштувань cookies може обмежити функціональність веб-сайту.
        </p>
        <h3>13. Плагін Facebook</h3>
        <p>
          Наш сайт містить плагін для Facebook (Facebook Inc., 1601 Willow Road,
          Menlo Park, California, 94025, США). Плагін Facebook на нашому сайті
          позначений логотипом Facebook. Цей плагін дозволяє вам напряму
          з’єднатися зі своїм профілем у Facebook. У такому випадку, Facebook
          зможе дізнатися, що ви відвідали наш сайт зі своєї IP-адреси. Якщо ви
          відвідуєте наш сайт, не виходячи зі свого профілю у Facebook, Facebook
          запише інформацію про відвідування. Навіть якщо ви не виконали вхід,
          Facebook може отримати інформацію про IP-адресу. Зверніть увагу, що
          Facebook не інформує нас про зібрані дані та про те, як ці дані
          використовуються. Ми не знаємо обсяг зібраної Facebook інформації та
          мету такого збору. Для отримання додаткової інформації про
          конфіденційність у Facebook радимо зв’язатися безпосередньо з Facebook
          або ознайомитися з Політикою конфіденційності Facebook за посиланням
          https://www.facebook.com/about/privacy/. Якщо ви не бажаєте, щоб у
          Facebook отримували інформацію про ваші відвідування наших сайтів,
          радимо спочатку вийти зі свого облікового запису Facebook.
        </p>
        <h3>14. Декларація Google Analytics про захист даних</h3>
        <p>
          На наших сайтах використовуються механізми аналізу веб-служб Google
          Inc. (Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043,
          США): Google Analytics, Google Doubleclick і Менеджер тегів Google. У
          Google Analytics, Google Doubleclick і Менеджері тегів Google
          використовуються файли cookies для аналізу способів роботи з
          веб-сайтами. Інформація, зібрана файлами cookies, передається на
          сервери Google у США та зберігається в архіві. Якщо функцію
          анонімності IP-адреси активовано під час відвідування нашого
          веб-сайту, ваша IP-адреса користувача скорочується Google. Це
          стосується країн - членів Європейського Союзу та інших держав,
          перелічених в Угоді про Європейський економічний простір. Лише в
          окремих випадках повна IP-адреса надсилається на сервер Google у США,
          де вона скорочується. Таким чином, функція анонімізації IP-адреси
          працюватиме на нашому веб-сайті. На прохання оператора веб-сайту
          Google використовує зібрану інформацію для аналізу роботи з веб-сайтом
          і підготовки звітів про відвідування веб-сайту й інших сервісів,
          пов’язаних із роботою в Інтернеті. IP-адреса, яку з браузера
          Користувача передано в Google Analytics, не зберігається разом з
          іншими даними Google. Користувач може заблокувати збереження файлів
          cookies у веб-браузері. Однак це призведе до неможливості повного
          використання всіх функцій Веб-сайту. Крім того, Користувач може
          заблокувати збереження даних про використання Веб-сайту (зокрема й
          IP-адреси), зібраних файлами cookies, та їх передачу та спільне
          використання в Google, завантаживши та встановивши плагін, доступний
          на сайті https://tools.google.com/dlpage/gaoptout?hl = en
        </p>
      </div>
    </div>
  );
};

export default Politics;
