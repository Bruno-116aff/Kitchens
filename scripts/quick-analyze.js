import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
🚀 БЫСТРЫЙ АНАЛИЗ ИЗОБРАЖЕНИЙ КУХОНЬ

Простой скрипт для создания описаний уже скачанных изображений.
Работает без интернета и дополнительных зависимостей.
*/

const imagesPath = path.join(__dirname, '..', 'public', 'images', 'portfolio');

// Шаблоны описаний
const DESCRIPTIONS = {
	modern: [
		'Современная кухня с минималистичным дизайном и глянцевыми фасадами',
		'Стильная кухня в современном стиле с интегрированной техникой',
		'Функциональная кухня с современными решениями и прямыми линиями',
	],
	classic: [
		'Классическая кухня с деревянными фасадами и традиционными элементами',
		'Элегантная кухня в классическом стиле с декоративными деталями',
		'Уютная кухня с классическим дизайном и теплыми тонами',
	],
	scandinavian: [
		'Скандинавская кухня с натуральным деревом и светлыми тонами',
		'Минималистичная кухня в скандинавском стиле с природными акцентами',
		'Светлая кухня с простыми формами и функциональным дизайном',
	],
	industrial: [
		'Индустриальная кухня с металлическими элементами и грубыми текстурами',
		'Лофтовая кухня в индустриальном стиле с бетонными поверхностями',
		'Урбанистическая кухня с индустриальными деталями и открытыми коммуникациями',
	],
};

// Функция для определения стиля по имени файла
function getStyleFromFileName(fileName) {
	const name = fileName.toLowerCase();
	if (name.includes('modern')) return 'modern';
	if (name.includes('classic')) return 'classic';
	if (name.includes('scandinavian')) return 'scandinavian';
	if (name.includes('industrial')) return 'industrial';

	// Случайный выбор
	const styles = Object.keys(DESCRIPTIONS);
	return styles[Math.floor(Math.random() * styles.length)];
}

// Функция для создания описания
function createDescription(fileName, fileSizeKB) {
	const style = getStyleFromFileName(fileName);
	const templates = DESCRIPTIONS[style];
	const baseDescription =
		templates[Math.floor(Math.random() * templates.length)];

	// Добавляем качество по размеру файла
	let quality = '';
	if (fileSizeKB > 800) quality = ' высокого разрешения';
	else if (fileSizeKB > 400) quality = ' хорошего качества';
	else if (fileSizeKB < 200) quality = ' сжатого размера';

	// Добавляем функциональные характеристики
	const features = [
		' с эргономичной планировкой',
		' с продуманным зонированием',
		' с функциональной организацией',
		' с удобным расположением техники',
		' с оптимальным использованием пространства',
	];

	const feature = features[Math.floor(Math.random() * features.length)];

	// Добавляем заключение
	const conclusions = [
		' Идеальное сочетание красоты и практичности.',
		' Современные решения для комфортной жизни.',
		' Качественные материалы и продуманный дизайн.',
		' Стильное оформление для современного дома.',
	];

	const conclusion =
		conclusions[Math.floor(Math.random() * conclusions.length)];

	return `${baseDescription}${quality}${feature}.${conclusion}`;
}

// Основная функция
async function quickAnalyze() {
	console.log('🚀 Быстрый анализ изображений кухонь...');

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
		console.log(`\n📸 Обрабатываем: ${project}`);
		const projectPath = path.join(imagesPath, project);

		const files = fs
			.readdirSync(projectPath)
			.filter(file => /\.(jpg|jpeg|png)$/i.test(file))
			.sort();

		if (files.length === 0) {
			console.log(`⚠️ Нет изображений в ${project}`);
			continue;
		}

		const descriptions = [];

		for (const file of files) {
			const filePath = path.join(projectPath, file);
			const stats = fs.statSync(filePath);
			const sizeKB = Math.round(stats.size / 1024);

			const description = createDescription(file, sizeKB);
			descriptions.push({
				file: file,
				sizeKB: sizeKB,
				description: description,
			});

			console.log(`   ✅ ${file}: ${description.substring(0, 50)}...`);
		}

		// Сохраняем описания
		const descriptionsPath = path.join(projectPath, 'descriptions.json');
		fs.writeFileSync(
			descriptionsPath,
			JSON.stringify(descriptions, null, 2),
			'utf8'
		);

		// Создаем текстовый файл с описаниями
		const textPath = path.join(projectPath, 'descriptions.txt');
		let textContent = `ОПИСАНИЯ ИЗОБРАЖЕНИЙ КУХНИ\n`;
		textContent += `Проект: ${project}\n`;
		textContent += `Количество изображений: ${descriptions.length}\n\n`;

		descriptions.forEach((item, index) => {
			textContent += `${index + 1}. ${item.file} (${item.sizeKB}KB)\n`;
			textContent += `${item.description}\n\n`;
		});

		fs.writeFileSync(textPath, textContent, 'utf8');

		console.log(`   💾 Сохранено ${descriptions.length} описаний`);
	}

	console.log('\n🎉 Быстрый анализ завершен!');
	console.log(
		'📁 Проверьте папки проектов - там созданы файлы descriptions.json и descriptions.txt'
	);
}

// Запуск
quickAnalyze().catch(console.error);
