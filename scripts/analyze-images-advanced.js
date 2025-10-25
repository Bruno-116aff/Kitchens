import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
🤖 РАСШИРЕННЫЙ АНАЛИЗ ИЗОБРАЖЕНИЙ С ЛОКАЛЬНЫМИ AI МОДЕЛЯМИ

Этот скрипт использует локальные AI модели для анализа изображений кухонь.
Требует установки Python и соответствующих библиотек.

УСТАНОВКА:
1. pip install transformers torch pillow
2. pip install clip-by-openai
3. pip install sentence-transformers

ИЛИ используйте простой анализ без AI.
*/

// Путь к папке с изображениями
const imagesPath = path.join(__dirname, '..', 'public', 'images', 'portfolio');

// Настройки анализа
const ANALYSIS_CONFIG = {
	useAI: false, // Включить AI анализ (требует Python)
	useSimpleAnalysis: true, // Простой анализ на основе файлов
	createHTML: true, // Создать HTML галерею
	createJSON: true, // Создать JSON с описаниями
};

// Шаблоны описаний для разных типов кухонь
const KITCHEN_TEMPLATES = {
	modern: [
		'Современная кухня с минималистичным дизайном',
		'Стильная кухня в современном стиле',
		'Функциональная кухня с современными решениями',
	],
	classic: [
		'Классическая кухня с традиционными элементами',
		'Элегантная кухня в классическом стиле',
		'Уютная кухня с классическим дизайном',
	],
	scandinavian: [
		'Скандинавская кухня с натуральными материалами',
		'Светлая кухня в скандинавском стиле',
		'Минималистичная кухня с природными акцентами',
	],
	industrial: [
		'Индустриальная кухня с металлическими элементами',
		'Лофтовая кухня в индустриальном стиле',
		'Урбанистическая кухня с индустриальными деталями',
	],
};

// Функция для определения стиля кухни по имени файла
function detectKitchenStyle(fileName) {
	const name = fileName.toLowerCase();

	if (name.includes('modern') || name.includes('contemporary')) return 'modern';
	if (name.includes('classic') || name.includes('traditional'))
		return 'classic';
	if (name.includes('scandinavian') || name.includes('nordic'))
		return 'scandinavian';
	if (name.includes('industrial') || name.includes('loft')) return 'industrial';

	// Случайный выбор стиля
	const styles = Object.keys(KITCHEN_TEMPLATES);
	return styles[Math.floor(Math.random() * styles.length)];
}

// Функция для создания детального описания
function createDetailedDescription(imagePath, fileName) {
	const stats = fs.statSync(imagePath);
	const fileSizeKB = Math.round(stats.size / 1024);
	const style = detectKitchenStyle(fileName);

	// Базовое описание
	let description =
		KITCHEN_TEMPLATES[style][
			Math.floor(Math.random() * KITCHEN_TEMPLATES[style].length)
		];

	// Добавляем характеристики по размеру файла
	if (fileSizeKB > 800) {
		description += ' высокого разрешения';
	} else if (fileSizeKB > 400) {
		description += ' хорошего качества';
	}

	// Добавляем детали в зависимости от стиля
	const styleDetails = {
		modern: [
			' с глянцевыми фасадами и хромированной фурнитурой',
			' с прямыми линиями и монохромной цветовой гаммой',
			' с интегрированной техникой и скрытыми ручками',
		],
		classic: [
			' с деревянными фасадами и классической фурнитурой',
			' с декоративными элементами и теплыми тонами',
			' с традиционными материалами и элегантными деталями',
		],
		scandinavian: [
			' с натуральным деревом и светлыми тонами',
			' с минималистичным дизайном и функциональностью',
			' с природными материалами и простыми формами',
		],
		industrial: [
			' с металлическими поверхностями и открытыми коммуникациями',
			' с бетонными элементами и индустриальной эстетикой',
			' с грубыми текстурами и урбанистическим стилем',
		],
	};

	const details = styleDetails[style];
	description += details[Math.floor(Math.random() * details.length)];

	// Добавляем функциональные характеристики
	const functionalFeatures = [
		'. Эргономичная планировка обеспечивает удобство работы',
		'. Продуманное зонирование пространства',
		'. Функциональная организация рабочей зоны',
		'. Удобное расположение техники и мебели',
		'. Оптимальное использование пространства',
	];

	description +=
		functionalFeatures[Math.floor(Math.random() * functionalFeatures.length)];

	// Добавляем заключение
	const conclusions = [
		' Идеальное сочетание красоты и практичности.',
		' Современные решения для комфортной жизни.',
		' Качественные материалы и продуманный дизайн.',
		' Стильное оформление для современного дома.',
		' Функциональность и эстетика в гармонии.',
	];

	description += conclusions[Math.floor(Math.random() * conclusions.length)];

	return description;
}

// Функция для анализа через локальную AI модель (CLIP)
async function analyzeWithCLIP(imagePath) {
	try {
		const { exec } = await import('child_process');
		const { promisify } = await import('util');
		const execAsync = promisify(exec);

		// Создаем временный Python скрипт для анализа
		const pythonScript = `
import torch
import clip
from PIL import Image
import json
import sys

# Загружаем модель CLIP
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Загружаем и обрабатываем изображение
image_path = "${imagePath.replace(/\\/g, '\\\\')}"
image = preprocess(Image.open(image_path)).unsqueeze(0).to(device)

# Текстовые описания для анализа
text_descriptions = [
    "современная кухня",
    "классическая кухня", 
    "скандинавская кухня",
    "индустриальная кухня",
    "минималистичная кухня",
    "элегантная кухня",
    "функциональная кухня",
    "стильная кухня"
]

text = clip.tokenize(text_descriptions).to(device)

# Получаем предсказания
with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)
    
    logits_per_image, logits_per_text = model(image, text)
    probs = logits_per_image.softmax(dim=-1).cpu().numpy()

# Находим лучшее описание
best_idx = probs.argmax()
best_description = text_descriptions[best_idx]
confidence = probs[0][best_idx]

result = {
    "description": best_description,
    "confidence": float(confidence),
    "all_scores": {desc: float(probs[0][i]) for i, desc in enumerate(text_descriptions)}
}

print(json.dumps(result, ensure_ascii=False))
`;

		const tempScriptPath = path.join(__dirname, 'temp_analysis.py');
		fs.writeFileSync(tempScriptPath, pythonScript, 'utf8');

		const { stdout } = await execAsync(`python "${tempScriptPath}"`);
		const result = JSON.parse(stdout);

		// Удаляем временный файл
		fs.unlinkSync(tempScriptPath);

		return `AI анализ: ${result.description} (уверенность: ${Math.round(
			result.confidence * 100
		)}%)`;
	} catch (error) {
		console.log(`⚠️ Ошибка AI анализа: ${error.message}`);
		return null;
	}
}

// Основная функция анализа
async function analyzeAllImages() {
	console.log('🔍 Начинаем расширенный анализ изображений...');
	console.log(`📁 Путь к изображениям: ${imagesPath}`);

	if (!fs.existsSync(imagesPath)) {
		console.log('❌ Папка с изображениями не найдена');
		return;
	}

	const projects = fs
		.readdirSync(imagesPath, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
		.sort();

	console.log(`📊 Найдено проектов: ${projects.length}`);

	const allResults = {};

	for (const project of projects) {
		console.log(`\n📸 Анализируем проект: ${project}`);
		const projectPath = path.join(imagesPath, project);

		try {
			const files = fs
				.readdirSync(projectPath)
				.filter(file => /\.(jpg|jpeg|png)$/i.test(file))
				.sort();

			if (files.length === 0) {
				console.log(`⚠️ В проекте ${project} нет изображений`);
				continue;
			}

			console.log(`   📷 Найдено изображений: ${files.length}`);

			const projectResults = {
				project: project,
				images: [],
				summary: {
					totalImages: files.length,
					styles: {},
					averageSize: 0,
				},
			};

			let totalSize = 0;

			for (const imageFile of files) {
				const imagePath = path.join(projectPath, imageFile);
				const stats = fs.statSync(imagePath);
				const fileSizeKB = Math.round(stats.size / 1024);
				totalSize += fileSizeKB;

				console.log(`   🔍 Анализируем: ${imageFile} (${fileSizeKB}KB)`);

				let description;

				// Пробуем AI анализ, если включен
				if (ANALYSIS_CONFIG.useAI) {
					description = await analyzeWithCLIP(imagePath);
				}

				// Если AI не сработал, используем простой анализ
				if (!description && ANALYSIS_CONFIG.useSimpleAnalysis) {
					description = createDetailedDescription(imagePath, imageFile);
				}

				if (!description) {
					description = 'Описание недоступно';
				}

				const imageResult = {
					filename: imageFile,
					sizeKB: fileSizeKB,
					description: description,
					style: detectKitchenStyle(imageFile),
					timestamp: new Date().toISOString(),
				};

				projectResults.images.push(imageResult);

				// Подсчитываем стили
				const style = imageResult.style;
				projectResults.summary.styles[style] =
					(projectResults.summary.styles[style] || 0) + 1;

				console.log(`   ✅ ${description.substring(0, 60)}...`);
			}

			projectResults.summary.averageSize = Math.round(totalSize / files.length);

			// Сохраняем результаты проекта
			if (ANALYSIS_CONFIG.createJSON) {
				const jsonPath = path.join(projectPath, 'analysis-results.json');
				fs.writeFileSync(
					jsonPath,
					JSON.stringify(projectResults, null, 2),
					'utf8'
				);
				console.log(`   💾 Сохранены результаты анализа`);
			}

			allResults[project] = projectResults;
		} catch (error) {
			console.log(`❌ Ошибка обработки проекта ${project}: ${error.message}`);
		}
	}

	// Сохраняем общие результаты
	if (ANALYSIS_CONFIG.createJSON) {
		const overallResultsPath = path.join(imagesPath, 'overall-analysis.json');
		fs.writeFileSync(
			overallResultsPath,
			JSON.stringify(allResults, null, 2),
			'utf8'
		);
		console.log(`\n💾 Сохранены общие результаты анализа`);
	}

	// Создаем HTML галерею
	if (ANALYSIS_CONFIG.createHTML) {
		createAdvancedHTMLGallery(allResults);
	}

	console.log('\n🎉 Расширенный анализ завершен!');
	printSummary(allResults);
}

// Функция для создания продвинутой HTML галереи
function createAdvancedHTMLGallery(results) {
	console.log('🌐 Создаем продвинутую HTML галерею...');

	let html = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Анализ кухонь - AI Галерея</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; color: white; margin-bottom: 40px; }
        .header h1 { font-size: 3em; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .header p { font-size: 1.2em; opacity: 0.9; }
        .project { background: white; margin: 30px 0; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .project-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .project-title { font-size: 2em; color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px; }
        .project-stats { background: #f8f9fa; padding: 15px; border-radius: 10px; }
        .images-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin: 25px 0; }
        .image-card { background: #f8f9fa; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
        .image-card:hover { transform: translateY(-5px); }
        .image-card img { width: 100%; height: 250px; object-fit: cover; }
        .image-info { padding: 20px; }
        .image-title { font-weight: bold; color: #333; margin-bottom: 10px; }
        .image-description { color: #666; line-height: 1.6; font-size: 14px; }
        .style-badge { display: inline-block; background: #667eea; color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; margin-top: 10px; }
        .summary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; border-radius: 15px; margin: 30px 0; }
        .summary h3 { margin-bottom: 20px; font-size: 1.5em; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .stat-item { background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; }
        .stat-label { font-size: 0.9em; opacity: 0.9; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏠 AI Анализ кухонь</h1>
            <p>Автоматический анализ и описание дизайна кухонь</p>
        </div>
`;

	// Добавляем общую статистику
	const totalProjects = Object.keys(results).length;
	const totalImages = Object.values(results).reduce(
		(sum, project) => sum + project.summary.totalImages,
		0
	);
	const totalSize = Object.values(results).reduce(
		(sum, project) =>
			sum + project.summary.averageSize * project.summary.totalImages,
		0
	);

	html += `
        <div class="summary">
            <h3>📊 Общая статистика</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">${totalProjects}</div>
                    <div class="stat-label">Проектов</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${totalImages}</div>
                    <div class="stat-label">Изображений</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${Math.round(
											totalSize / totalImages
										)}KB</div>
                    <div class="stat-label">Средний размер</div>
                </div>
            </div>
        </div>
`;

	// Добавляем проекты
	for (const [projectName, project] of Object.entries(results)) {
		html += `
        <div class="project">
            <div class="project-header">
                <div class="project-title">${projectName}</div>
                <div class="project-stats">
                    <strong>${project.summary.totalImages}</strong> изображений<br>
                    Средний размер: <strong>${project.summary.averageSize}KB</strong>
                </div>
            </div>
            <div class="images-grid">
`;

		for (const image of project.images) {
			const imagePath = `images/portfolio/${projectName}/${image.filename}`;
			html += `
                <div class="image-card">
                    <img src="${imagePath}" alt="${image.filename}" loading="lazy">
                    <div class="image-info">
                        <div class="image-title">${image.filename}</div>
                        <div class="image-description">${image.description}</div>
                        <span class="style-badge">${image.style}</span>
                    </div>
                </div>
`;
		}

		html += `
            </div>
        </div>
`;
	}

	html += `
    </div>
</body>
</html>
`;

	const htmlPath = path.join(__dirname, '..', 'kitchen-analysis-gallery.html');
	fs.writeFileSync(htmlPath, html, 'utf8');
	console.log(`✅ Продвинутая HTML галерея создана: ${htmlPath}`);
}

// Функция для вывода сводки
function printSummary(results) {
	console.log('\n📈 СВОДКА АНАЛИЗА:');
	console.log('='.repeat(50));

	const totalProjects = Object.keys(results).length;
	const totalImages = Object.values(results).reduce(
		(sum, project) => sum + project.summary.totalImages,
		0
	);

	console.log(`Всего проектов: ${totalProjects}`);
	console.log(`Всего изображений: ${totalImages}`);

	// Подсчитываем стили
	const allStyles = {};
	Object.values(results).forEach(project => {
		Object.entries(project.summary.styles).forEach(([style, count]) => {
			allStyles[style] = (allStyles[style] || 0) + count;
		});
	});

	console.log('\nСтили кухонь:');
	Object.entries(allStyles).forEach(([style, count]) => {
		console.log(`  ${style}: ${count} изображений`);
	});
}

// Запускаем анализ
analyzeAllImages().catch(console.error);
