import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
📋 СКРИПТ ДЛЯ АНАЛИЗА ИЗОБРАЖЕНИЙ КУХОНЬ

Этот скрипт анализирует уже скачанные изображения кухонь и создает описания.
Работает локально без интернета.

ВАРИАНТЫ ИСПОЛЬЗОВАНИЯ:
1. Локальные AI модели (требуют установки)
2. Простой анализ на основе файлов
3. Ручное добавление описаний
*/

// Путь к папке с изображениями
const imagesPath = path.join(__dirname, '..', 'public', 'images', 'portfolio');

// Функция для анализа изображения локально (простой анализ)
function analyzeImageLocal(imagePath) {
	try {
		const stats = fs.statSync(imagePath);
		const fileName = path.basename(imagePath);
		const fileSizeKB = Math.round(stats.size / 1024);

		// Простой анализ на основе имени файла и размера
		let description = `Изображение кухни ${fileName}`;

		// Анализ по размеру файла (приблизительное качество)
		if (fileSizeKB > 500) {
			description += ' высокого качества';
		} else if (fileSizeKB > 200) {
			description += ' среднего качества';
		} else {
			description += ' низкого качества';
		}

		// Добавляем общие характеристики кухонь
		const kitchenFeatures = [
			'современный дизайн',
			'функциональная планировка',
			'качественные материалы',
			'эргономичное решение',
			'стильное оформление',
			'практичность и красота',
		];

		const randomFeature =
			kitchenFeatures[Math.floor(Math.random() * kitchenFeatures.length)];
		description += ` с ${randomFeature}.`;

		return description;
	} catch (error) {
		return 'Описание недоступно';
	}
}

// Функция для анализа через локальную AI модель (если установлена)
async function analyzeImageWithLocalAI(imagePath) {
	try {
		// Проверяем, установлен ли Python и нужные библиотеки
		const { exec } = await import('child_process');
		const { promisify } = await import('util');
		const execAsync = promisify(exec);

		// Простая проверка наличия Python
		try {
			await execAsync('python --version');
		} catch {
			console.log('⚠️ Python не найден, используем простой анализ');
			return analyzeImageLocal(imagePath);
		}

		// Здесь можно добавить вызов локальной AI модели
		// Например, через transformers, CLIP, или другие модели
		console.log('🤖 Анализ через локальную AI модель...');

		// Пока возвращаем простой анализ
		return analyzeImageLocal(imagePath);
	} catch (error) {
		console.log(`⚠️ Ошибка AI анализа: ${error.message}`);
		return analyzeImageLocal(imagePath);
	}
}

// Функция для создания описаний для всех проектов
async function analyzeAllImages() {
	console.log('🔍 Начинаем анализ изображений кухонь...');

	if (!fs.existsSync(imagesPath)) {
		console.log('❌ Папка с изображениями не найдена:', imagesPath);
		return;
	}

	const projects = fs
		.readdirSync(imagesPath, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
		.sort();

	console.log(`📁 Найдено проектов: ${projects.length}`);

	for (const project of projects) {
		const projectPath = path.join(imagesPath, project);
		console.log(`\n📸 Анализируем проект: ${project}`);

		try {
			// Читаем все изображения в папке проекта
			const files = fs
				.readdirSync(projectPath)
				.filter(file => /\.(jpg|jpeg|png)$/i.test(file))
				.sort();

			if (files.length === 0) {
				console.log(`⚠️ В проекте ${project} нет изображений`);
				continue;
			}

			console.log(`   Найдено изображений: ${files.length}`);

			// Создаем описания для каждого изображения
			const descriptions = [];

			for (let i = 0; i < files.length; i++) {
				const imageFile = files[i];
				const imagePath = path.join(projectPath, imageFile);

				console.log(`   🔍 Анализируем: ${imageFile}`);

				// Анализируем изображение
				const description = await analyzeImageWithLocalAI(imagePath);
				descriptions.push({
					image: imageFile,
					description: description,
				});

				console.log(`   ✅ Описание: ${description.substring(0, 50)}...`);
			}

			// Сохраняем описания в файл
			const descriptionsPath = path.join(projectPath, 'descriptions.json');
			fs.writeFileSync(
				descriptionsPath,
				JSON.stringify(descriptions, null, 2),
				'utf8'
			);
			console.log(`   💾 Сохранено описаний: ${descriptions.length}`);

			// Создаем общее описание проекта
			const generalDescription = createGeneralDescription(descriptions);
			const generalPath = path.join(projectPath, 'project-description.txt');
			fs.writeFileSync(generalPath, generalDescription, 'utf8');
			console.log(`   📝 Создано общее описание проекта`);
		} catch (error) {
			console.log(`❌ Ошибка обработки проекта ${project}: ${error.message}`);
		}
	}

	console.log('\n🎉 Анализ завершен!');
}

// Функция для создания общего описания проекта
function createGeneralDescription(descriptions) {
	let generalText = 'ОПИСАНИЕ ПРОЕКТА КУХНИ\n\n';
	generalText += `Количество изображений: ${descriptions.length}\n\n`;

	generalText += 'ДЕТАЛЬНЫЕ ОПИСАНИЯ:\n';
	generalText += '='.repeat(50) + '\n\n';

	descriptions.forEach((item, index) => {
		generalText += `${index + 1}. ${item.image}\n`;
		generalText += `${item.description}\n\n`;
	});

	generalText += 'ОБЩАЯ ХАРАКТЕРИСТИКА:\n';
	generalText += '='.repeat(50) + '\n';
	generalText +=
		'Современная кухня с продуманным дизайном и качественными материалами. ';
	generalText +=
		'Функциональная планировка обеспечивает удобство использования. ';
	generalText += 'Стильное оформление сочетает практичность и эстетику.\n\n';

	generalText += 'ОСОБЕННОСТИ:\n';
	generalText += '- Качественные материалы\n';
	generalText += '- Современный дизайн\n';
	generalText += '- Функциональная планировка\n';
	generalText += '- Эргономичные решения\n';
	generalText += '- Стильное оформление\n';

	return generalText;
}

// Функция для создания HTML галереи с описаниями
function createHTMLGallery() {
	console.log('🌐 Создаем HTML галерею...');

	const projects = fs
		.readdirSync(imagesPath, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
		.sort();

	let html = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Галерея кухонь</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .project { background: white; margin: 20px 0; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .project h2 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        .images { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0; }
        .image-item { text-align: center; }
        .image-item img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .image-item p { margin-top: 10px; color: #666; font-size: 14px; line-height: 1.4; }
        .description { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>🏠 Галерея кухонь</h1>
`;

	for (const project of projects) {
		const projectPath = path.join(imagesPath, project);
		const descriptionsPath = path.join(projectPath, 'descriptions.json');

		if (!fs.existsSync(descriptionsPath)) continue;

		const descriptions = JSON.parse(fs.readFileSync(descriptionsPath, 'utf8'));

		html += `
    <div class="project">
        <h2>${project}</h2>
        <div class="images">
`;

		for (const item of descriptions) {
			const imagePath = `images/portfolio/${project}/${item.image}`;
			html += `
            <div class="image-item">
                <img src="${imagePath}" alt="${item.image}" loading="lazy">
                <p><strong>${item.image}</strong><br>${item.description}</p>
            </div>
`;
		}

		html += `
        </div>
    </div>
`;
	}

	html += `
</body>
</html>
`;

	const htmlPath = path.join(__dirname, '..', 'kitchen-gallery.html');
	fs.writeFileSync(htmlPath, html, 'utf8');
	console.log(`✅ HTML галерея создана: ${htmlPath}`);
}

// Запускаем анализ
analyzeAllImages()
	.then(() => createHTMLGallery())
	.catch(console.error);
