import fs from 'fs/promises'

async function fileGenerator () {
    try {
        const data = await fs.readFile('instrukce.txt', 'utf8');
        const number = Number(data.trim());

        if (!Number.isInteger(number) || number < 0) {
            console.error("Error: instrukce.txt must contain a non-negative integer");
            return;
        }
        if (number > 100) {
            console.error("Too many files requested");
            return;
        }
        console.log(`Creating ${number + 1} files`);
        const promises = [];

        for (let i = 0; i <= number; i++) {
            const fileName = `${i}.txt`;
            const fileContent = `Soubor ${i}`;

            promises.push(fs.writeFile(fileName, fileContent, 'utf8'));
        }

        await Promise.all(promises)
        console.log(`All files (0.txt  ${number}.txt) were created!.`);

    } catch (err) {
        console.error("Unexpected error:", err.message);
    }
}

fileGenerator();