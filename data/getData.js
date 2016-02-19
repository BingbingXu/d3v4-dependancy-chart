
const fetch = require('node-fetch');
const fs = require('fs')
const baseURI = "https://registry.npmjs.cf";

console.log('\nSTARTING DEPENDENCY SEARCH');
console.log('--------------------------\n');

const modules = {};
const promises = [];

var fileOut = './data.json';

getDependencies('d3', 'next')
  .then(() => {
    console.log("\nDone");
    fs.writeFile(fileOut, JSON.stringify(modules, null, 2), function (err) {
      if (err) {
        console.error(err);
      } else {
        console.info(`
          --------------------------------
           JSON file successfully created
          --------------------------------
        `);
        console.log(modules);
      }
    });
  });

function getDependencies(package, version) {

  return new Promise(function(resolve, reject) {

    fetch(`${baseURI}/${package}`)
      .then(response => response.json())
      .then((data) => {
        version =
          data.versions[version]
            ? version
            : (data['dist-tags'][version]
              || data['dist-tags']['next']
              || data['dist-tags']['latest']);

        const deps = data.versions[version].dependencies || {};

        console.log(`${package}: ${Object.keys(deps).length} dependencies`);

        // Initialise module object if it doesn't exist
        if (!modules[package])
          modules[package] = {};

        const dependancyPromises = [];

        // Add dependencies to module
        if (Object.keys(deps).length) {
          modules[package].dependencies = [];

          for (name in deps) {
            modules[package].dependencies.push(name);
            dependancyPromises.push(getDependencies(name));
          }
        }

        // If there are any dependencies wait for all of those promises
        // to resolve then resolve the main promise
        Promise
          .all(dependancyPromises)
          .then(resolve);
      });
    });

    return promise;
}
