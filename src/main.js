
import { layout } from 'd3';
import getDependencies from './getData';

// Import styles
import '../sass/main.scss';

// Fixes webpacks stupid issue with setting iFrame to display: none before code has run
setTimeout(() => {

  const loader = document.getElementById('loader');
  const svg = document.getElementById('graph');

  getDependencies('d3', 'next')
    .then((data) => {
      console.log(data);
      loader.remove();
      graph.style.opacity = 1;
      renderGraph(data);
    });

}, 0);

function renderGraph(data) {

  const container = document.getElementById('svg-container');
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  const nodes =
    Object.keys(data)
    .filter(k => k !== 'd3')
    .map(k => ({ name: k }));

  const lookup = {};
  nodes.forEach((n) => lookup[n.name] = n);

  const links = Object.keys(data)
    .filter(k => k !== 'd3')
    .map((source) =>
      (data[source].dependencies || [])
        .map(target => ({ source: lookup[source], target: lookup[target] }))
    )
    .reduce((a, b) => a.concat(b), []);

  console.log('LINKS', links);
  console.log('NODES', nodes);

  const svg = d3.select("#graph")
    .attr("width", width)
    .attr("height", height);

  const force = layout.force()
    .nodes(nodes)
    .links(links)
    .size([width, height])
    .linkStrength(0.4)
    .friction(0.9)
    .linkDistance(80)
    .charge(-400)
    .gravity(0.06)
    .theta(0.8)
    .alpha(0.1)
    .start();

  const link = svg.selectAll(".link")
    .data(links)
    .enter()
      .append("line")
      .attr("class", "link")
      .attr("marker-end", "url(#triangle)");

  const node = svg.selectAll(".node")
    .data(nodes)
    .enter()
      .append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("circle")
    .attr("x", -14)
    .attr("y", -14)
    .attr("r", 14)
    .attr("fill", 'white')
    .attr("filter", 'url(#shadow)');

  // Get d3 organisation image to use as the nodes 
  fetch('https://api.github.com/orgs/d3')
    .then(response => response.json())
    .then(data => {
      node.append("image")
        .attr("xlink:href", data.avatar_url)
        .attr("x", -9)
        .attr("y", -9)
        .attr("width", 18)
        .attr("height", 18);
    });

  node.append("text")
    .attr("dx", 20)
    .attr("dy", 10)
    .text(function(d) { return d.name });


  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
}
