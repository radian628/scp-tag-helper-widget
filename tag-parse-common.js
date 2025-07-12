// tag-parse-common.ts
var tagdata = getTagData();
var lines = tagdata.split("\n");
var categories = {};
var currentCategory;
var mode;
for (const line of lines) {
  if (line.startsWith('["') && line.endsWith('/"]')) {
    currentCategory = line.slice(2, -3);
    categories[currentCategory] = { sections: [] };
    mode = "category";
    continue;
  } else if (line.startsWith("[[")) {
    categories[currentCategory].sections.push({ items: [] });
    mode = "section";
    continue;
  } else if (line.startsWith("[")) {
    if (categories[currentCategory].sections.length == 0) {
      categories[currentCategory].sections.push({ default: true, items: [] });
    }
    categories[currentCategory].sections.at(-1).items.push({
      name: line.slice(1, -1),
      category: categories[currentCategory],
      categoryName: currentCategory,
      section: categories[currentCategory].sections.at(-1)
    });
    mode = "item";
    continue;
  }
  let match = line.match(/^\s*(\w+)\s+\=\s+(.+)$/);
  if (!match)
    continue;
  let [_, key, value] = match;
  if (!key || !value)
    continue;
  value = value.replace(/^"+/g, "").replace(/"+$/g, "");
  if (key === "requires")
    value = JSON.parse(value);
  if (mode == "category") {
    categories[currentCategory][key] = value;
  } else if (mode == "section") {
    categories[currentCategory].sections.at(-1)[key] = value;
  } else {
    categories[currentCategory].sections.at(-1).items.at(-1)[key] = value;
  }
}
console.log(categories);
window.makeHTMLTree = function makeHTMLTree(tree) {
  const elem = document.createElement(tree.tag);
  if (tree.onLoad)
    tree.onLoad(elem);
  for (const [key, value] of Object.entries(tree)) {
    if (key === "tag")
      continue;
    if (key === "style")
      continue;
    if (key === "children")
      continue;
    if (key === "ref")
      continue;
    if (key === "onLoad")
      continue;
    elem[key] = value;
  }
  for (const [key, value] of Object.entries(tree.style ?? {})) {
    if (key.startsWith("--")) {
      elem.style.setProperty(key, value);
      continue;
    }
    elem.style[key] = value;
  }
  for (const child of tree.children ?? []) {
    elem.appendChild(child._raw ? child._raw : makeHTMLTree(child));
  }
  if (tree.ref) {
    tree.ref.current = elem;
  }
  return elem;
};
window.jankAssParseWikitext = function jankAssParseWikitext(s) {
  return (s ?? "").replaceAll(/\@\@.*?\@\@/g, (s2) => `@@${btoa(s2.slice(2, -2))}@@`).replaceAll(/\[([^ ]+)([^\]]*?)\]/g, (s2, link, text) => `<a href="@@${btoa(link)}@@">${text}</a>`).replaceAll(/\*\*.*?\*\*/g, (s2) => `<strong>${s2.slice(2, -2)}</strong>`).replaceAll(/\/\/.*?\/\//g, (s2) => `<span style="font-style: italic;">${s2.slice(2, -2)}</span>`).replaceAll(/\{\{.*?\}\}/g, (s2) => `<span style="font-family: monospace;">${s2.slice(2, -2)}</span>`).replaceAll(/\@\@.*?\@\@/g, (s2) => `${atob(s2.slice(2, -2))}`);
};
