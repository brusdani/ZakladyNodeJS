import fs from 'fs';

try {
    if (!fs.existsSync('instrukce.txt')) {
        console.error("Error: File 'instrukce.txt' was not found.");
        process.exit(1);
    }

    const instructions = fs.readFileSync('instrukce.txt', 'utf8').trim();

    const [vstup,vystup] = instructions.split(' ');

    if (!vstup || !vystup) {
        console.error("Error: Incorrect instruction format");
        process.exit(1);
    }
    if (!fs.existsSync(vstup)) {
        console.error(`Input file '${vstup}' doesn't exist`);
        process.exit(1);
    }
    const data = fs.readFileSync(vstup, 'utf8');
    fs.writeFileSync(vystup, data);

    console.log(`Completed! Data were successfully copied from '${vstup}' to '${vystup}'.`);

} catch (err) {
    console.error("Unexpected error:", err.message);
}