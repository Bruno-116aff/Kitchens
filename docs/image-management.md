# Система управления изображениями

## Обзор

Все ссылки на изображения в проекте централизованы в файле `src/data/images.ts` для удобного управления и обновления.

## Структура

### Основной файл изображений

- `src/data/images.ts` - централизованное хранение всех путей к изображениям

### Переводы alt-текстов

- `src/locales/en/images.json` - английские alt-тексты
- `src/locales/ru/images.json` - русские alt-тексты

### Компоненты

- `src/components/common/OptimizedImage/OptimizedImage.tsx` - оптимизированный компонент изображений
- `src/hooks/useImages.ts` - хук для работы с изображениями

## Использование

### 1. Импорт изображений

```typescript
import { images } from '../data/images';

// Использование
<img src={images.hero.main} alt="Hero Image" />
<img src={images.portfolio.kitchen1} alt="Kitchen 1" />
```

### 2. Использование хука useImages

```typescript
import { useImages } from '../hooks/useImages';

const MyComponent = () => {
	const { getImagePath, getImageAlt, getOptimizedImageProps } = useImages();

	return (
		<img
			src={getImagePath('portfolio.kitchen1')}
			alt={getImageAlt('portfolio.kitchen1')}
		/>
	);
};
```

### 3. Использование OptimizedImage

```typescript
import OptimizedImage from '../components/common/OptimizedImage/OptimizedImage';

<OptimizedImage
	src={images.portfolio.kitchen1}
	alt='Kitchen Design'
	className='my-image'
	width={400}
	height={300}
	lazy={true}
/>;
```

## Структура изображений

### Категории изображений

- **logo** - логотипы и брендинг
- **hero** - главные изображения
- **portfolio** - портфолио проектов
- **services** - изображения услуг
- **materials** - материалы (фасады, столешницы, фурнитура)
- **team** - команда
- **process** - процесс работы
- **quiz** - изображения для квиза
- **planner** - планировщик
- **finance** - финансы
- **about** - о компании
- **contact** - контакты
- **icons** - иконки
- **social** - социальные сети
- **placeholders** - заглушки

### Пример структуры

```typescript
export const images = {
	portfolio: {
		kitchen1: '/images/portfolio/kitchen-1.jpg',
		kitchen2: '/images/portfolio/kitchen-2.jpg',
		// ...
	},
	services: {
		modular: '/images/services/modular-kitchen.jpg',
		custom: '/images/services/custom-kitchen.jpg',
		// ...
	},
	// ...
} as const;
```

## Функции-помощники

### getImage(imagePath, fallback?)

Возвращает путь к изображению с возможностью fallback.

### getWebPImage(basePath, fallback?)

Возвращает объект с WebP версией и fallback.

### getResponsiveImage(basePath, sizes?)

Генерирует srcset для responsive изображений.

## Переводы alt-текстов

Alt-тексты хранятся в файлах переводов и автоматически подставляются через хук `useImages`:

```typescript
// В images.json
{
  "images": {
    "alt": {
      "portfolio": {
        "kitchen1": "Modern Linear Kitchen Design"
      }
    }
  }
}

// Использование
const alt = getImageAlt('portfolio.kitchen1'); // "Modern Linear Kitchen Design"
```

## Обновление изображений

### Добавление нового изображения

1. Добавьте путь в `src/data/images.ts`:

```typescript
portfolio: {
  kitchen13: '/images/portfolio/kitchen-13.jpg',
  // ...
}
```

2. Добавьте alt-текст в файлы переводов:

```json
// en/images.json
"kitchen13": "New Kitchen Design"

// ru/images.json
"kitchen13": "Новый дизайн кухни"
```

### Изменение существующего изображения

Просто обновите путь в `src/data/images.ts` - все компоненты автоматически получат новое изображение.

### Массовое обновление

Для изменения всех изображений определенного типа используйте поиск и замену по ключу:

```typescript
// Заменить все изображения портфолио
portfolio: {
  kitchen1: '/new-path/portfolio/kitchen-1.jpg',
  kitchen2: '/new-path/portfolio/kitchen-2.jpg',
  // ...
}
```

## Преимущества системы

1. **Централизованное управление** - все пути в одном месте
2. **Типобезопасность** - TypeScript проверяет существование ключей
3. **Автоматические переводы** - alt-тексты подставляются автоматически
4. **Оптимизация** - поддержка WebP, responsive изображений
5. **Fallback** - автоматические заглушки при ошибках
6. **Легкое обновление** - изменение одного файла обновляет весь сайт

## Рекомендации

1. Всегда используйте ключи из `images` объекта
2. Добавляйте alt-тексты для всех изображений
3. Используйте `OptimizedImage` для важных изображений
4. Группируйте изображения по логическим категориям
5. Используйте осмысленные имена ключей
6. Регулярно проверяйте, что все изображения существуют
