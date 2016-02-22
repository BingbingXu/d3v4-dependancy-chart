
import { layout } from 'd3';
import data from '../data/data.json';

console.log("HI", data);

const width = 960;
const height = 500;

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

console.log(links);

console.log(nodes);

const svg = d3.select("#graph")
  .attr("width", width)
  .attr("height", height);

const force = layout.force()
  .nodes(nodes)
  .links(links)
  .size([width, height])
  .linkStrength(0.1)
  .friction(0.9)
  .linkDistance(20)
  .charge(-400)
  .gravity(0.1)
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

node.append("image")
  .attr("xlink:href", "https://github.com/favicon.ico")
  .attr("x", -10)
  .attr("y", -10)
  .attr("width", 20)
  .attr("height", 20);


node.append("text")
  .attr("dx", 20)
  .attr("dy", ".35em")
  .text(function(d) { return d.name });


force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});
