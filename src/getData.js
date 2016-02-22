
const baseURI = "https://registry.npmjs.cf";
const modules = {};
const promises = [];

function getDependencies(name, version) {

  return new Promise(function(resolve, reject) {

    fetch(`${baseURI}/${name}`)
      .then(response => response.json())
      .then((data) => {
        version =
          data.versions[version]
            ? version
            : (data['dist-tags'][version]
              || data['dist-tags']['next']
              || data['dist-tags']['latest']);

        const deps = data.versions[version].dependencies || {};

        // Initialise module object if it doesn't exist
        if (!modules[name])
          modules[name] = {};

        const dependancyPromises = [];

        // Add dependencies to module
        if (Object.keys(deps).length) {
          modules[name].dependencies = [];

          for (let d in deps) {
            modules[name].dependencies.push(d);
            dependancyPromises.push(getDependencies(d));
          }
        }

        // If there are any dependencies wait for all of those promises
        // to resolve then resolve the main promise
        Promise
          .all(dependancyPromises)
          .then(() => resolve(modules));
      });
    });

    return promise;
}

export default getDependencies;
