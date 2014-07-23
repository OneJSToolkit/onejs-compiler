var TypeScriptViewModelGenerator = require('../dist/TypeScriptViewModelGenerator');
var TypeScriptGenerator = require('../dist/TypeScriptGenerator');
var fs = require('fs');
var path = require('path');

if (process.argv.length < 3) {
    console.log('usage: node generate.js template.html');
} else {
    var filePath = process.argv[2];
    var fileName = path.basename(filePath);
    var fileContent = fs.readFileSync(filePath, 'utf8').toString();

    var tsGenerator = new TypeScriptGenerator();
    var interfaceGenerator = new TypeScriptViewModelGenerator();

    fs.writeFileSync(fileName + '.ts', tsGenerator.generate(fileContent));
    fs.writeFileSync('I' + fileName + 'Model.ts', interfaceGenerator.generate(fileContent));
}
