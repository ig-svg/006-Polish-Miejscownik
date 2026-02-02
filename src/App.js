import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Check,
  X,
  ArrowRight,
  RefreshCw,
  Trophy,
  Brain,
  ChevronRight,
  ChevronLeft,
  List,
  ExternalLink,
} from "lucide-react";

/**
 * ⚙️ НАЛАШТУВАННЯ ДЛЯ КОРИСТУВАЧА
 */
const GOOGLE_DOC_URL = "#"; // Посилання на ваші правила
const NEXT_APP_URL = "#"; // Посилання на ТЕМУ 7
const PREV_APP_URL = "#"; // Посилання на ТЕМУ 5 (Dopełniacz)
const MENU_APP_URL = "#"; // Посилання на ГОЛОВНЕ МЕНЮ

// --- БАЗА ПИТАНЬ (50 шт) - MIEJSCOWNIK ---
const QUESTIONS_DB = [
  // --- Чоловічий/Середній: Закінчення -E (Чергування) ---
  {
    text: "Jestem w ______ (biuro).",
    options: ["biurze", "biuru", "biurze"],
    correct: 0,
    explanation: "r змінюється на rz + e.",
  },
  {
    text: "Mieszkam w ______ (Kraków).",
    options: ["Krakowie", "Krakówie", "Krakowu"],
    correct: 0,
    explanation: "w змінюється на wie.",
  },
  {
    text: "Jesteśmy w ______ (teatr).",
    options: ["teatrze", "teatru", "teatrze"],
    correct: 0,
    explanation: "tr змінюється на trz + e.",
  },
  {
    text: "Klucze są na ______ (stół).",
    options: ["stole", "stóle", "stołu"],
    correct: 0,
    explanation: "ł змінюється на l (ó -> o).",
  },
  {
    text: "Siedzę na ______ (krzesło).",
    options: ["krześle", "krzesłu", "krzesłie"],
    correct: 0,
    explanation: "ł змінюється на l + e.",
  },
  {
    text: "Jestem w ______ (miasto).",
    options: ["mieście", "miastu", "miaście"],
    correct: 0,
    explanation: "st змінюється на ść + e (a -> e).",
  },
  {
    text: "On jest w ______ (świat).",
    options: ["świecie", "światu", "światcie"],
    correct: 0,
    explanation: "t змінюється на ci + e (a -> e).",
  },
  {
    text: "Mówimy o ______ (brat).",
    options: ["bracie", "bratu", "bratcie"],
    correct: 0,
    explanation: "t змінюється на ci + e.",
  },
  {
    text: "Mieszkam w ______ (Gdańsk).",
    options: ["Gdańsku", "Gdańszcze", "Gdańsce"],
    correct: 0,
    explanation: "ВИНЯТОК! Міста на -sk мають закінчення -u.",
  },
  {
    text: "Spotkajmy się w ______ (sklep).",
    options: ["sklepie", "sklepu", "sklepze"],
    correct: 0,
    explanation: "p змінюється на pi + e.",
  },
  {
    text: "Jesteśmy w ______ (kino).",
    options: ["kinie", "kinu", "kine"],
    correct: 0,
    explanation: "n змінюється на ni + e.",
  },
  {
    text: "On siedzi w ______ (samochód).",
    options: ["samochodzie", "samochodu", "samochódzie"],
    correct: 0,
    explanation: "d змінюється на dzi + e.",
  },
  {
    text: "Rozmawiamy o ______ (sąsiad).",
    options: ["sąsiedzie", "sąsiadu", "sąsiadzie"],
    correct: 0,
    explanation: "d змінюється на dzi + e (a -> e).",
  },
  {
    text: "Mieszkam w ______ (Londyn).",
    options: ["Londynie", "Londynu", "Londyniu"],
    correct: 0,
    explanation: "n змінюється на ni + e.",
  },
  {
    text: "Jestem na ______ (obiad).",
    options: ["obiedzie", "obiadu", "obiadzie"],
    correct: 0,
    explanation: "d змінюється на dzi + e (a -> e).",
  },

  // --- Чоловічий/Середній: Закінчення -U (K, G, CH + М'які + Винятки) ---
  {
    text: "Jestem w ______ (park).",
    options: ["parku", "parce", "parkie"],
    correct: 0,
    explanation: "Після K завжди -u.",
  },
  {
    text: "Mieszkam w ______ (hotel).",
    options: ["hotelu", "hotele", "hotelie"],
    correct: 0,
    explanation: "М'яка основа l -> -u.",
  },
  {
    text: "Jestem w ______ (dom).",
    options: ["domu", "domie", "dome"],
    correct: 0,
    explanation: "ВИНЯТОК! Dom -> w domu.",
  },
  {
    text: "Myślę o ______ (syn).",
    options: ["synu", "synie", "syna"],
    correct: 0,
    explanation: "ВИНЯТОК! Syn -> o synu.",
  },
  {
    text: "Rozmawiamy o ______ (Pan).",
    options: ["Panu", "Panie", "Pana"],
    correct: 0,
    explanation: "ВИНЯТОК! Pan -> o Panu.",
  },
  {
    text: "Jadę w ______ (pociąg).",
    options: ["pociągu", "pociądze", "pociągie"],
    correct: 0,
    explanation: "Після G завжди -u.",
  },
  {
    text: "Kot jest na ______ (dach).",
    options: ["dachu", "dasze", "dachie"],
    correct: 0,
    explanation: "Після CH завжди -u.",
  },
  {
    text: "Jestem w ______ (pokój).",
    options: ["pokoju", "pokóju", "pokoje"],
    correct: 0,
    explanation: "Закінчення на -j -> -u.",
  },
  {
    text: "Mieszkam w ______ (kraj).",
    options: ["kraju", "kraje", "krajie"],
    correct: 0,
    explanation: "Закінчення на -j -> -u.",
  },
  {
    text: "Jestem w ______ (mieszkanie).",
    options: ["mieszkaniu", "mieszkanie", "mieszkanu"],
    correct: 0,
    explanation: "Середній рід на -e (м'яке ni) -> -u.",
  },
  {
    text: "Leżę na ______ (łóżko).",
    options: ["łóżku", "łóżce", "łóżkie"],
    correct: 0,
    explanation: "Після K -> -u.",
  },
  {
    text: "Jajko w ______ (majonez).",
    options: ["majonezie", "majonezu", "majoneze"],
    correct: 1,
    explanation:
      "Слова іншомовного походження на -ez часто мають -u (але буває і -ie). Тут норма -u.",
  },
  {
    text: "Rozmawiamy o ______ (Bóg).",
    options: ["Bogu", "Bodze", "Bógie"],
    correct: 0,
    explanation: "Після G -> -u.",
  },
  {
    text: "Jestem na ______ (lotnisko).",
    options: ["lotnisku", "lotnisce", "lotniskie"],
    correct: 0,
    explanation: "Після K -> -u.",
  },
  {
    text: "Mieszkam w ______ (akademik).",
    options: ["akademiku", "akademice", "akademikie"],
    correct: 0,
    explanation: "Після K -> -u.",
  },

  // --- Жіночий рід: Закінчення -E (Чергування) ---
  {
    text: "Jestem w ______ (szkoła).",
    options: ["szkole", "szkoły", "szkołu"],
    correct: 0,
    explanation: "ł змінюється на l + e.",
  },
  {
    text: "Cukier jest w ______ (kawa).",
    options: ["kawie", "kawy", "kawu"],
    correct: 0,
    explanation: "w змінюється на wi + e.",
  },
  {
    text: "Ryba jest w ______ (woda).",
    options: ["wodzie", "wody", "wodze"],
    correct: 0,
    explanation: "d змінюється на dzi + e.",
  },
  {
    text: "Mieszkam w ______ (Polska).",
    options: ["Polsce", "Polskie", "Polski"],
    correct: 0,
    explanation: "ВАЖЛИВО! Жіночий рід K змінюється на C + e.",
  },
  {
    text: "Książka jest w ______ (biblioteka).",
    options: ["bibliotece", "biblioteki", "bibliotekie"],
    correct: 0,
    explanation: "K змінюється на C + e.",
  },
  {
    text: "Lampa stoi na ______ (podłoga).",
    options: ["podłodze", "podłogi", "podłogie"],
    correct: 0,
    explanation: "ВАЖЛИВО! Жіночий рід G змінюється на DZ + e.",
  },
  {
    text: "Jadę na ______ (droga).",
    options: ["drodze", "drogi", "drogie"],
    correct: 0,
    explanation: "G змінюється на DZ + e.",
  },
  {
    text: "Myślę o ______ (mama).",
    options: ["mamie", "mamy", "mami"],
    correct: 0,
    explanation: "m змінюється на mi + e.",
  },
  {
    text: "Rozmawiamy o ______ (kobieta).",
    options: ["kobiecie", "kobiety", "kobieterze"],
    correct: 0,
    explanation: "t змінюється на ci + e.",
  },
  {
    text: "Jestem w ______ (praca).",
    options: ["pracy", "prace", "pracie"],
    correct: 0,
    explanation: "ВИНЯТОК! Основа на c (м'яка/затверділа) -> -y.",
  },

  // --- Жіночий рід: Закінчення -Y/-I (М'які) ---
  {
    text: "Jestem w ______ (restauracja).",
    options: ["restauracji", "restauracje", "restauracjy"],
    correct: 0,
    explanation: "М'яка основа -ja -> -ji (-i).",
  },
  {
    text: "Mieszkam przy ______ (ulica).",
    options: ["ulicy", "ulice", "ulicie"],
    correct: 0,
    explanation: "Основа на c -> -y.",
  },
  {
    text: "Myślę o ______ (babcia).",
    options: ["babci", "babcie", "babcy"],
    correct: 0,
    explanation: "М'яка основа ci -> -i.",
  },
  {
    text: "Spotkajmy się w ______ (kawiarnia).",
    options: ["kawiarni", "kawiarnie", "kawiarniu"],
    correct: 0,
    explanation: "М'яка основа ni -> -i.",
  },
  {
    text: "Jestem w ______ (sypialnia).",
    options: ["sypialni", "sypialnie", "sypialniu"],
    correct: 0,
    explanation: "М'яка основа ni -> -i.",
  },
  {
    text: "Spaceruję po ______ (plaża).",
    options: ["plaży", "plaże", "plażie"],
    correct: 0,
    explanation: "Затверділа основа ż -> -y.",
  },
  {
    text: "Myślę o mojej ______ (siostra).",
    options: ["siostrze", "siostry", "sioszcze"],
    correct: 0,
    explanation:
      "УВАГА! Це група -E (tr -> trz). Повернулися до складної групи.",
  },
  {
    text: "W nocy (Noc -> W nocy).",
    options: ["nocy", "noce", "nocie"],
    correct: 0,
    explanation: "М'яка основа -> -y.",
  },
  {
    text: "Mowa o ______ (Pani).",
    options: ["Pani", "Panie", "Paniu"],
    correct: 0,
    explanation: "Pani не змінюється.",
  },
  {
    text: "Jesteśmy w ______ (sala).",
    options: ["sali", "sale", "saly"],
    correct: 0,
    explanation: "l - м'який звук -> -i.",
  },

  // --- Прийменники: W vs NA ---
  {
    text: "Jestem ______ (uniwersytet).",
    options: ["na uniwersytecie", "w uniwersytecie", "przy uniwersytecie"],
    correct: 0,
    explanation: "Заклади освіти часто 'Na'.",
  },
  {
    text: "Jestem ______ (basen).",
    options: ["na basenie", "w basenie", "o basenie"],
    correct: 0,
    explanation: "Спорт/Відпочинок -> Na.",
  },
  {
    text: "Jestem ______ (poczta).",
    options: ["na poczcie", "w poczcie", "o poczcie"],
    correct: 0,
    explanation: "Установи -> Na.",
  },
  {
    text: "Jestem ______ (dworzec).",
    options: ["na dworcu", "w dworcu", "przy dworcu"],
    correct: 0,
    explanation: "Вокзал -> Na.",
  },
  {
    text: "Mieszkam ______ (Ukraina).",
    options: ["na Ukrainie", "w Ukrainie", "o Ukrainie"],
    correct: 0,
    explanation:
      "Традиційно 'Na', хоча 'W' стає популярним. Для тесту беремо класику 'Na'.",
  },
  {
    text: "Obraz wisi ______ (ściana).",
    options: ["na ścianie", "w ścianie", "przy ścianie"],
    correct: 0,
    explanation: "Поверхня -> Na.",
  },
  {
    text: "Siedzę ______ (fotel).",
    options: ["w fotelu", "na fotelu", "przy fotelu"],
    correct: 0,
    explanation:
      "Всередині крісла (глибокого) -> W. (Хоча на стільці - na krześle).",
  },
  {
    text: "Jestem ______ (rynek).",
    options: ["na rynku", "w rynku", "przy rynku"],
    correct: 0,
    explanation: "Площа/Відкритий простір -> Na.",
  },
  {
    text: "Mieszkam ______ (Polska).",
    options: ["w Polsce", "na Polsce", "przy Polsce"],
    correct: 0,
    explanation: "Країни -> W.",
  },
  {
    text: "Jestem ______ (kuchnia).",
    options: ["w kuchni", "na kuchni", "o kuchni"],
    correct: 0,
    explanation: "Приміщення -> W.",
  },
];

const PolishTrainerT6 = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showTheory, setShowTheory] = useState(true);

  // Ініціалізація
  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    const shuffled = [...QUESTIONS_DB].sort(() => 0.5 - Math.random());
    setShuffledQuestions(shuffled);
    setCurrentQIndex(0);
    setScore(0);
    setCompleted(false);
    setShowFeedback(false);
    setSelectedOption(null);
  };

  const handleOptionClick = (index) => {
    if (showFeedback) return;

    const question = shuffledQuestions[currentQIndex];
    const correct = index === question.correct;

    setSelectedOption(index);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < shuffledQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      setCompleted(true);
    }
  };

  // --- RENDERERS ---

  if (shuffledQuestions.length === 0)
    return <div className="p-10 text-center">Завантаження...</div>;

  const question = shuffledQuestions[currentQIndex];
  const progressPercentage = Math.round(
    (currentQIndex / shuffledQuestions.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* 1. HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              A1
            </span>
            <h1 className="font-bold text-slate-800 truncate">
              Тема 6: Miejscownik
            </h1>
          </div>

          <div className="flex items-center gap-1">
            {/* Назад */}
            <a
              href={PREV_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                PREV_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Попередня тема"
            >
              <ChevronLeft size={24} />
            </a>

            {/* МЕНЮ */}
            <a
              href={MENU_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                MENU_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Усі теми"
            >
              <List size={24} />
            </a>

            {/* Вперед */}
            <a
              href={NEXT_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                NEXT_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Наступна тема"
            >
              <ChevronRight size={24} />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-xl mx-auto w-full p-4 md:p-6 flex flex-col">
        {/* 2. THEORY BLOCK (Collapsible) */}
        <div className="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div
            onClick={() => setShowTheory(!showTheory)}
            className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2 font-semibold text-blue-700">
              <BookOpen size={20} />
              <span>Експрес-правила</span>
            </div>
            <span className="text-xs text-slate-400">
              {showTheory ? "Згорнути" : "Показати"}
            </span>
          </div>

          {showTheory && (
            <div className="p-5 text-sm leading-relaxed text-slate-700 space-y-4">
              <p>
                <b>Miejscownik (Місцевий відмінок)</b> — Де? Про кого? Про що?
                (Gdzie? O kim?). Прийменники: <i>w, na, przy, o, po</i>.
              </p>

              <div className="grid grid-cols-1 gap-2">
                <div className="p-2 bg-blue-50 rounded border border-blue-100">
                  <strong className="block text-blue-800">
                    1. Чоловічий та Середній:
                  </strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      Тверда основа &rarr; <b>-e</b> (змінюємо звук! r&rarr;rz,
                      t&rarr;ci, d&rarr;dzi, ł&rarr;l).
                    </li>
                    <li>
                      М'яка, K, G, CH &rarr; <b>-u</b> (w parku, w hotelu).
                    </li>
                    <li>
                      <span className="text-xs text-red-500">
                        Винятки: w domu, o synu, o Panu.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-2 bg-red-50 rounded border border-red-100">
                  <strong className="block text-red-800">
                    2. Жіночий (Żeński):
                  </strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      Тверда, K, G &rarr; <b>-e</b> (w kawie, w Polsce, na
                      podłodze).
                    </li>
                    <li>
                      М'яка &rarr; <b>-y / -i</b> (w pracy, w restauracji).
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <a
                  href={GOOGLE_DOC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                    GOOGLE_DOC_URL === "#"
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-blue-600 hover:underline"
                  }`}
                >
                  <ExternalLink size={14} />
                  {GOOGLE_DOC_URL === "#"
                    ? "Детальні правила (Скоро)"
                    : "Відкрити повні правила"}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 3. GAME ZONE */}
        {!completed ? (
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center mb-6 min-h-[160px] flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Питання {currentQIndex + 1} з {shuffledQuestions.length}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
                {question.text}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {question.options.map((opt, idx) => {
                let btnClass =
                  "p-4 rounded-xl font-semibold text-lg transition-all border-2 text-left relative ";

                if (showFeedback) {
                  if (idx === question.correct) {
                    btnClass += "bg-green-100 border-green-500 text-green-800";
                  } else if (selectedOption === idx) {
                    btnClass += "bg-red-100 border-red-500 text-red-800";
                  } else {
                    btnClass += "bg-white border-slate-100 text-slate-300";
                  }
                } else {
                  btnClass +=
                    "bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 shadow-sm active:scale-[0.98]";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={showFeedback}
                    className={btnClass}
                  >
                    {opt}
                    {showFeedback && idx === question.correct && (
                      <Check
                        size={20}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      />
                    )}
                    {showFeedback &&
                      idx !== question.correct &&
                      selectedOption === idx && (
                        <X
                          size={20}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        />
                      )}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                {!isCorrect && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-xl mb-4 text-sm border border-red-100 flex gap-3 items-start">
                    <Brain size={20} className="shrink-0 mt-0.5" />
                    <div>
                      <strong>Підказка:</strong> {question.explanation}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className={`w-full p-4 rounded-xl font-bold text-lg text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                    isCorrect
                      ? "bg-green-600 hover:bg-green-700 shadow-green-200"
                      : "bg-slate-800 hover:bg-slate-900 shadow-slate-300"
                  }`}
                >
                  {currentQIndex < shuffledQuestions.length - 1
                    ? "Далі"
                    : "Завершити"}{" "}
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <div className="mb-6">
              {score === shuffledQuestions.length ? (
                <Trophy size={80} className="text-yellow-500 mx-auto" />
              ) : score >= shuffledQuestions.length * 0.8 ? (
                <Trophy size={80} className="text-blue-500 mx-auto" />
              ) : (
                <RefreshCw size={80} className="text-slate-300 mx-auto" />
              )}
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {score === shuffledQuestions.length
                ? "Ідеально!"
                : "Тренування завершено!"}
            </h2>
            <p className="text-slate-500 mb-8 text-lg">
              Ваш результат: <strong className="text-slate-800">{score}</strong>{" "}
              з {shuffledQuestions.length}
            </p>

            <button
              onClick={restartGame}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
            >
              <RefreshCw size={20} />
              Почати знову
            </button>
          </div>
        )}
      </main>

      {!completed && (
        <footer className="bg-white border-t border-slate-100 p-4">
          <div className="max-w-xl mx-auto">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Прогрес</span>
              <span>
                {Math.round((score / (currentQIndex + 1)) * 100) || 0}% Успіху
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PolishTrainerT6;
