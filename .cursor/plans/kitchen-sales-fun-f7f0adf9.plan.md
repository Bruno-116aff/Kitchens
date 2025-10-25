<!-- f7f0adf9-c670-4b12-bf20-2a5a4d83150b f70bb050-fe5b-4238-a02b-85528a62f50a -->
# Глубокая разработка продающего сайта для кухонь

## Фаза 1: Рефакторинг и улучшение базы (1-2 недели)

### 1.1 Миграция React Router на объектный формат

Переделать routing из JSX компонентов (`<Routes>`, `<Route>`) на новый формат с `createBrowserRouter` и объектной конфигурацией:

```typescript
// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout seo={{...}}><HomePage /></PageLayout>,
    errorElement: <NotFoundPage />
  },
  // ... остальные маршруты
]);
```

**Преимущества**: улучшенная типизация, поддержка data loaders, actions, лучшая производительность.

### 1.2 Улучшение дизайн-системы

- Добавить CSS переменные для финансовых элементов (цвета для цен, акций)
- Создать компоненты: `<PriceTag>`, `<Badge>`, `<ProgressBar>`, `<Stepper>`
- Добавить анимации для quiz transitions

### 1.3 Настройка API layer

Создать структуру для работы с API:

```typescript
// src/services/api.ts
class APIService {
  async submitLead(data: LeadFormData) { /* заглушка */ }
  async submitQuiz(data: QuizData) { /* заглушка */ }
  async bookAppointment(data: BookingData) { /* заглушка */ }
  async getProjects(filters: ProjectFilters) { /* mock data */ }
}
```

**Пока**: все методы возвращают mock-данные или выводят в консоль, готовы к подключению реального API.

---

## Фаза 2: Квиз-калькулятор цены (2-3 недели) 🎯 ПРИОРИТЕТ

### 2.1 Структура квиза (7 шагов)

**URL**: `/calculator` или встроен на главной

**Шаги**:

1. **Тип кухни**: Модульная / Под заказ / Премиум / Индивидуальный проект
2. **Планировка**: Линейная / Угловая / П-образная / Островная / Двухрядная
3. **Размеры**: Ширина (м) × Высота (м) × Глубина (м) - ползунки или input
4. **Стиль**: Современный / Классический / Скандинавский / Лофт / Минимализм / Прованс
5. **Столешница**: Ламинат / Акрил / Кварц / Натуральный камень / Дерево
6. **Техника**: Базовая / Средний класс / Премиум / Без техники
7. **Бюджет**: До €5k / €5-10k / €10-20k / €20-30k / €30k+

### 2.2 Компоненты квиза

**Создать**:

- `<QuizFlow>` - основной контейнер с логикой
- `<QuizStep>` - обертка для каждого шага
- `<QuizProgressBar>` - прогресс 0-100%
- `<QuizOption>` - кликабельные карточки выбора
- `<QuizSlider>` - для размеров и бюджета
- `<QuizResult>` - экран результата

### 2.3 Логика калькуляции

```typescript
// src/utils/priceCalculator.ts
interface QuizAnswers {
  kitchenType: string;
  layout: string;
  dimensions: { width: number; height: number; depth: number };
  style: string;
  countertop: string;
  appliances: string;
  budget: string;
}

function calculatePriceRange(answers: QuizAnswers): {
  min: number;
  max: number;
  recommended: PresetConfig[];
} {
  // Алгоритм расчета на основе:
  // - базовая цена по типу
  // - коэффициент планировки
  // - площадь * цена за м²
  // - надбавка за материалы
  // - стоимость техники
}
```

### 2.4 Экран результата

После 7-го шага показываем:

- **Диапазон цен**: "€8,500 - €12,300"
- **3 готовых пресета**: Эконом / Оптимальный / Премиум с фото примеров
- **CTA**: "Записаться на бесплатный замер" (переход к форме)
- **Сохранение**: данные квиза передаются в форму лида

### 2.5 UX квиза

- Сбор контакта (имя + телефон/email) на **80% прогресса** (после 6-го шага)
- Автопереход на следующий шаг при выборе (без кнопки "Next")
- Кнопка "Назад" для редактирования ответов
- Сохранение состояния в localStorage (можно вернуться позже)
- Анимации переходов между шагами (Framer Motion)

---

## Фаза 3: Система записи на консультацию (2 недели)

### 3.1 Страница записи

**URL**: `/book` или `/appointment`

**Формат записи** (4 шага):

1. **Тип услуги**: Замер / Онлайн-консультация / Визит в шоурум
2. **Контактные данные**: Имя, телефон, email
3. **Дата и время**: календарь + доступные слоты
4. **Подтверждение**: резюме + кнопка "Confirm Booking"

### 3.2 Компоненты

- `<BookingFlow>` - мастер записи
- `<CalendarPicker>` - выбор даты (библиотека `react-day-picker`)
- `<TimeSlots>` - доступные временные слоты (mock данные пока)
- `<BookingSummary>` - итоговое резюме перед подтверждением

### 3.3 Интеграция с квизом

После завершения квиза сразу предложить:

- "Забронировать замер" - автозаполнение данных из квиза
- "Записаться на консультацию 45 минут"

### 3.4 API mock

```typescript
// src/services/api.ts
async getAvailableSlots(date: Date, serviceType: string): Promise<TimeSlot[]> {
  // Mock: доступные слоты с 9:00 до 18:00 с шагом 1 час
  // В будущем: реальный API с проверкой занятости
}

async bookAppointment(data: BookingData): Promise<BookingConfirmation> {
  console.log('Booking data:', data);
  // Заглушка: возвращаем номер брони
  return { bookingId: 'BK-' + Date.now(), status: 'confirmed' };
}
```

### 3.5 Email/SMS подтверждение (готовность)

Структура данных готова для отправки:

- Клиенту: подтверждение с деталями встречи
- Менеджеру: уведомление о новой записи

---

## Фаза 4: Улучшенное портфолио с фильтрами (1 неделя)

### 4.1 Фильтрация проектов

**На странице `/portfolio`**:

```typescript
interface ProjectFilters {
  layout?: string[];      // Линейная, Угловая, П-образная...
  style?: string[];       // Современный, Классический...
  budget?: string[];      // До €10k, €10-20k...
  material?: string[];    // МДФ, Массив, ЛДСП...
  appliances?: string[];  // С техникой, Без техники
}
```

### 4.2 Компоненты фильтров

- `<FilterSidebar>` - боковая панель с фильтрами
- `<FilterChip>` - активные фильтры (с кнопкой удаления)
- `<ProjectGrid>` - адаптивная сетка проектов
- `<ProjectCard>` - улучшенная карточка с hover эффектами

### 4.3 Отдельные страницы кейсов

**URL**: `/portfolio/[slug]`

**Контент**:

- 6-10 фото (галерея с увеличением)
- План кухни "До / После"
- Список материалов и комплектации
- Сроки реализации
- Бюджет (диапазон)
- Отзыв клиента с фото
- CTA: "Хочу похожую кухню" → форма с автозаполнением типа

### 4.4 Mock данные

Создать 12-15 проектов в `src/data/projects.ts` с разными характеристиками для демонстрации фильтров.

---

## Фаза 5: 3D Планировщик (базовая версия) (3-4 недели)

### 5.1 Выбор решения

**Вариант 1** (рекомендуется для MVP):

- **Простой 2.5D планировщик** на Canvas/SVG
- Drag & drop модулей кухни
- Расстановка техники и мебели
- Расчет общей стоимости

**Вариант 2** (продвинутый):

- Three.js для настоящего 3D
- Библиотека типа `@react-three/fiber`
- Реалистичная визуализация

### 5.2 Страница планировщика

**URL**: `/planner`

**Функционал MVP**:

- Загрузка фото существующей кухни или плана
- Выбор размеров помещения
- Расстановка модулей из каталога (шкафы, столешницы, техника)
- Сохранение проекта локально (localStorage)
- Экспорт в PDF или изображение
- **CTA**: "Получить бесплатный 3D-проект от дизайнера" → форма

### 5.3 Компоненты

- `<PlannerCanvas>` - основное рабочее пространство
- `<ModuleCatalog>` - каталог элементов
- `<PlannerToolbar>` - инструменты (выбор, удаление, поворот)
- `<PlannerSidebar>` - свойства выбранного элемента
- `<PlannerSaveDialog>` - сохранение/загрузка проекта

### 5.4 Интеграция

- Из квиза: "Попробовать спроектировать онлайн"
- На главной: большая кнопка "3D Kitchen Planner"
- В процессе планирования: постоянный CTA для записи

---

## Фаза 6: Финансовый калькулятор (1 неделя)

### 6.1 Страница финансирования

**URL**: `/financing`

**Разделы**:

- Условия рассрочки 0%
- Партнерские банки
- Калькулятор платежа
- FAQ по финансам

### 6.2 Калькулятор рассрочки

```typescript
// Компонент <FinanceCalculator>
interface FinanceParams {
  totalPrice: number;
  downPayment: number;
  months: number; // 6, 12, 18, 24, 36
  interestRate: number; // 0% или банковский %
}

function calculateMonthlyPayment(params: FinanceParams): {
  monthlyPayment: number;
  totalPayment: number;
  overpayment: number;
}
```

### 6.3 Визуализация

- Ползунки для суммы и срока
- График платежей
- Сравнение вариантов рассрочки
- CTA: "Оформить рассрочку" → форма заявки

### 6.4 Интеграция с квизом

В результатах квиза добавить:

- "Или от €XXX/месяц в рассрочку" (расчет автоматический)
- Ссылка на калькулятор финансов

---

## Фаза 7: Продвинутые страницы (1-2 недели)

### 7.1 Страница Services - детальная

**Улучшения**:

- Раскладка по типам кухонь с ценами
- Галерея материалов (фасады, столешницы, фурнитура)
- Конфигуратор "Выберите материалы" → расчет базовой цены
- Сравнительная таблица пакетов (Старт / Оптима / Премиум)

### 7.2 Страница Process - интерактивная

**Добавить**:

- Интерактивная временная шкала 6 этапов
- Для каждого этапа: что делаем, SLA, чеклист, фото/видео
- Блок "Гарантии на каждом этапе"

### 7.3 FAQ - продвинутый

**Улучшения**:

- 20-25 вопросов по категориям (Заказ / Материалы / Доставка / Установка / Оплата)
- Поиск по вопросам
- Счетчик полезности ответа ("Helpful? Yes/No")
- Schema.org разметка для SEO

---

## Фаза 8: SEO и производительность (1 неделя)

### 8.1 Schema.org разметка

Добавить на страницы:

- **Organization**: контакты компании, логотип, соцсети
- **LocalBusiness**: адрес, часы работы, geo
- **FAQPage**: структурированные вопросы
- **Review**: отзывы клиентов (если есть рейтинг)
- **Product**: для страниц проектов портфолио

### 8.2 Оптимизация изображений

- Конвертация всех фото в WebP + fallback
- Responsive images с `srcset`
- Lazy loading (native + Intersection Observer)
- Preload критичных изображений (hero)

### 8.3 Core Web Vitals

**Цели**:

- LCP ≤ 2.0s (Hero image оптимизирован)
- CLS ≤ 0.1 (зарезервировано пространство для динамического контента)
- INP ≤ 200ms (дебаунс для фильтров, оптимизация квиза)

### 8.4 Генерация sitemap.xml и robots.txt

```xml
<!-- public/sitemap.xml -->
<urlset>
  <url><loc>https://site.com/</loc><priority>1.0</priority></url>
  <url><loc>https://site.com/calculator</loc><priority>0.9</priority></url>
  <url><loc>https://site.com/planner</loc><priority>0.9</priority></url>
  <!-- ... все страницы -->
</urlset>
```

---

## Фаза 9: Аналитика и отслеживание (3-5 дней)

### 9.1 Расширенные события

```typescript
// src/utils/analytics.ts
export function trackEvent(event: AnalyticsEvent, data?: any) {
  // Пока console.log, готово к GA4/FB Pixel
  console.log(`[Analytics] ${event}`, data);
  
  // Будущая интеграция:
  // window.gtag('event', event, data);
  // window.fbq('track', event, data);
}

// События квиза
trackQuizStart()
trackQuizStepComplete(stepNumber)
trackQuizComplete(results)

// События планировщика
trackPlannerOpen()
trackPlannerSave()
trackPlannerExport()

// Финансы
trackFinanceCalculate(params)

// Бронирование
trackBookingStart()
trackBookingComplete(bookingId)
```

### 9.2 Конверсионные точки

Отслеживать:

- Начало квиза
- Завершение квиза
- Отправка формы лида
- Бронирование встречи
- Открытие планировщика
- Сохранение проекта в планировщике
- Клики по телефону/WhatsApp
- Просмотр 3+ проектов портфолио

---

## Фаза 10: Русский язык (1 неделя)

### 10.1 Переводы

Создать `src/locales/ru/` с полными переводами:

- `common.json` - UI элементы
- `home.json` - главная
- `calculator.json` - квиз
- `planner.json` - планировщик
- `booking.json` - запись
- `financing.json` - финансы
- `services.json`, `about.json`, `faq.json` и т.д.

### 10.2 Языковой переключатель

В Header:

```tsx
<LanguageSwitcher>
  <button onClick={() => changeLanguage('en')}>EN</button>
  <button onClick={() => changeLanguage('ru')}>RU</button>
</LanguageSwitcher>
```

### 10.3 URL стратегия

**Вариант 1** (рекомендуется):

- `/` - автоопределение языка или EN по умолчанию
- `/ru/` - русская версия
- Сохранение выбора в localStorage

**Вариант 2**:

- Без префиксов, только переключатель
- Meta-теги с hreflang для SEO

---

## Фаза 11: Тестирование и полировка (1-2 недели)

### 11.1 Функциональное тестирование

- ✅ Все формы работают и валидируются
- ✅ Квиз проходится полностью, результаты корректны
- ✅ Фильтры портфолио работают
- ✅ Планировщик сохраняет/загружает проекты
- ✅ Финансовый калькулятор считает правильно
- ✅ Бронирование записывает данные
- ✅ Переключение языков корректно

### 11.2 Адаптивность

Проверить на:

- iPhone (Safari iOS)
- Android (Chrome)
- iPad (Safari)
- Desktop (Chrome, Firefox, Safari, Edge)

### 11.3 Производительность

- Lighthouse audit для всех ключевых страниц
- Performance ≥85, Accessibility ≥90, SEO ≥90
- Проверка Core Web Vitals на production

### 11.4 Кросс-браузерность

- Chrome/Edge (последние 2 версии)
- Firefox (последние 2 версии)
- Safari 15+
- Без критичных багов

---

## Структура файлов (итоговая)

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Textarea/
│   │   ├── Select/
│   │   ├── PriceTag/
│   │   ├── Badge/
│   │   ├── ProgressBar/
│   │   └── Stepper/
│   ├── forms/
│   │   ├── ContactForm/
│   │   └── LeadCaptureForm/
│   ├── quiz/
│   │   ├── QuizFlow/
│   │   ├── QuizStep/
│   │   ├── QuizOption/
│   │   ├── QuizProgressBar/
│   │   └── QuizResult/
│   ├── booking/
│   │   ├── BookingFlow/
│   │   ├── CalendarPicker/
│   │   ├── TimeSlots/
│   │   └── BookingSummary/
│   ├── planner/
│   │   ├── PlannerCanvas/
│   │   ├── ModuleCatalog/
│   │   ├── PlannerToolbar/
│   │   └── PlannerSidebar/
│   ├── portfolio/
│   │   ├── FilterSidebar/
│   │   ├── ProjectGrid/
│   │   ├── ProjectCard/
│   │   └── ProjectGallery/
│   ├── finance/
│   │   └── FinanceCalculator/
│   ├── sections/
│   │   ├── HeroSection/
│   │   ├── QuizPreviewSection/
│   │   ├── PortfolioSection/
│   │   └── CTASection/
│   └── layout/
│       ├── Header/
│       ├── Footer/
│       ├── PageLayout/
│       └── LanguageSwitcher/
├── pages/
│   ├── HomePage/
│   ├── CalculatorPage/
│   ├── PlannerPage/
│   ├── BookingPage/
│   ├── FinancingPage/
│   ├── ServicesPage/
│   ├── AboutPage/
│   ├── PortfolioPage/
│   ├── ProjectDetailPage/
│   ├── ProcessPage/
│   ├── FAQPage/
│   ├── ContactPage/
│   ├── PrivacyPage/
│   ├── ThankYouPage/
│   └── NotFoundPage/
├── router/
│   └── index.tsx          # createBrowserRouter config
├── services/
│   └── api.ts             # API service с заглушками
├── utils/
│   ├── analytics.ts       # Трекинг событий
│   ├── priceCalculator.ts # Логика квиза
│   ├── financeCalculator.ts
│   ├── validation.ts      # Zod schemas
│   └── i18n.ts
├── data/
│   ├── projects.ts        # Mock данные портфолио
│   ├── faq.ts
│   └── materials.ts
├── locales/
│   ├── en/
│   │   ├── common.json
│   │   ├── calculator.json
│   │   ├── planner.json
│   │   └── ...
│   └── ru/
│       └── ...
├── types/
│   └── index.ts
└── styles/
    ├── variables.css
    └── base.css
```

---

## Ключевые метрики успеха

**Конверсия**:

- CR посетитель → начало квиза ≥ 15%
- CR завершение квиза → лид ≥ 60%
- CR посетитель → лид ≥ 8-12%
- CR лид → запись на встречу ≥ 35%

**Производительность**:

- LCP ≤ 2.0s
- CLS ≤ 0.1
- INP ≤ 200ms
- Lighthouse Performance ≥ 85

**Engagement**:

- Время на сайте ≥ 3 минуты
- Просмотр страниц/сессия ≥ 4
- Bounce rate ≤ 50%

---

## Приоритеты разработки

### Критичные для MVP (обязательно):

1. ✅ Миграция React Router на объектный формат
2. ✅ Квиз-калькулятор (7 шагов + результат)
3. ✅ Улучшенное портфолио с фильтрами
4. ✅ Система записи (4 шага)
5. ✅ API layer с заглушками
6. ✅ SEO оптимизация

### Важные (желательно):

7. ✅ 3D Планировщик (базовая версия)
8. ✅ Финансовый калькулятор
9. ✅ Русский язык
10. ✅ Расширенная аналитика

### Опциональные (можно отложить):

- Блог
- Видео-отзывы
- Live chat интеграция
- AR примерка (мобильное приложение)

---

## Следующие шаги

1. Начать с Фазы 1: миграция роутинга + API layer
2. Фаза 2: полноценный квиз (самое важное для конверсии)
3. Параллельно: улучшение портфолио и система записи
4. Финальная полировка и тестирование

**Готовы начинать разработку?**

### To-dos

- [ ] Настроить структуру проекта, установить зависимости (React Router, React Hook Form, Zod, React Helmet, Framer Motion, react-i18next)
- [ ] Создать дизайн-систему: цвета, типографика, spacing, компоненты UI (Button, Input, Card)
- [ ] Настроить мультиязычность (i18next), создать структуру переводов, языковой переключатель
- [ ] Создать Layout компоненты: Header, Footer, PageLayout с навигацией
- [ ] Создать переиспользуемые компоненты: Button, Card, Input, Textarea, Select, ContactForm
- [x] Создать главную страницу (Landing): Hero, Trust Bar, USP Block, Portfolio Showcase, Process, Social Proof, FAQ
- [ ] Создать страницу Services с описанием типов кухонь, материалов, процессов
- [ ] Создать страницу About Us с историей, командой, преимуществами
- [ ] Создать страницу Portfolio с сеткой проектов, фильтрами и отдельными страницами кейсов
- [ ] Создать страницы Process и FAQ с детальным описанием этапов и вопросами
- [ ] Создать страницу Contacts с формой, картой, контактными данными
- [x] Создать служебные страницы: Privacy Policy, Thank You, 404
- [ ] Настроить SEO: meta-теги через React Helmet, Schema.org разметка, sitemap, robots.txt
- [ ] Оптимизировать производительность: lazy loading, code splitting, image optimization, проверка Core Web Vitals
- [ ] Подготовить структуру для аналитики: типы событий, логирование, готовность к интеграции GA4/FB Pixel
- [ ] Тестирование: адаптивность, кросс-браузерность, accessibility, формы, Lighthouse scores
- [x] Обновить README.md на русском языке с полной документацией проекта