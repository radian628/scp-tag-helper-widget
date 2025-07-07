console.log("helelo");

declare function getTagData(): string;

const tagdata = getTagData();
const lines = tagdata.split("\n");

type Categories = Record<
  string,
  {
    name?: string;
    description?: string;
    requires?: (string | string[])[];
    max?: number;
    sections: {
      name?: string;
      description?: string;
      default?: boolean;
      requires?: (string | string[])[];
      items: {
        name?: string;
        description?: string;
        requires?: (string | string[])[];
        displayName?: string;
        section: Categories[string]["sections"][number];
        category: Categories[string];
        categoryName: string;
      }[];
    }[];
  }
>;

const categories: Categories = {};

let currentCategory;
let mode;

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
    categories[currentCategory].sections.at(-1)!.items.push({
      name: line.slice(1, -1),
      category: categories[currentCategory],
      categoryName: currentCategory,
      section: categories[currentCategory].sections.at(-1)!,
    });
    mode = "item";
    continue;
  }

  let match = line.match(/^\s*(\w+)\s+\=\s+(.+)$/);

  if (!match) continue;

  let [_, key, value] = match;

  if (!key || !value) continue;

  value = value.replace(/^"+/g, "").replace(/"+$/g, "");

  if (key === "requires") value = JSON.parse(value);

  if (mode == "category") {
    categories[currentCategory][key] = value;
  } else if (mode == "section") {
    categories[currentCategory].sections.at(-1)![key] = value;
  } else {
    categories[currentCategory].sections.at(-1)!.items.at(-1)![key] = value;
  }
}

console.log(categories);

const categoryElements: {
  element: HTMLElement;
  category: (typeof categories)[string];
}[] = [];
const sectionElements: {
  element: HTMLElement;
  section: (typeof categories)[string]["sections"][number];
}[] = [];
const itemElements: {
  element: HTMLElement;
  item: (typeof categories)[string]["sections"][number]["items"][number];
}[] = [];

const itemDescElements: HTMLElement[] = [];

const enabledTags = new Set<string>();

document.body.appendChild(
  makeHTMLTree({
    tag: "h1",
    innerText: `Tag Helper Widget`,
  })
);
document.body.appendChild(
  makeHTMLTree({
    tag: "p",
    innerText: `Select tags to create a tag list for your article that will appear on the bottom of the page. Tags that are marked in red can still be selected, but have unfulfilled requirements.`,
  })
);

for (const [_, cat] of Object.entries(categories)) {
  const sections: HTMLSpec[] = cat.sections.map((sec) => ({
    tag: "div",
    className: "section-container",
    onLoad: (e) => sectionElements.push({ element: e, section: sec }),
    children: [
      ...(sec.default
        ? []
        : [
            {
              tag: "h3",
              innerText: sec.name,
            },
            ...(sec.requires && sec.requires.length > 0
              ? [
                  {
                    tag: "p",
                    className: "requirements-text",
                    innerText: requirementsText(sec.requires),
                  },
                ]
              : []),
            {
              tag: "p",
              innerHTML: jankAssParseWikitext(sec.description),
            },
          ]),
      {
        tag: "div",
        className: "section-contents-container",
        children: [
          ...sec.items.map((it) => ({
            tag: "div",
            className: "item-container",
            onLoad: (e) => {
              const displayName = (it.name ?? "No Name").replace(
                /^section\./g,
                ""
              );
              itemElements.push({ element: e, item: { ...it, displayName } });
              e.addEventListener("click", () => {
                toggleTag(displayName);
              });
            },
            children: [
              {
                tag: "h4",
                innerText: (it.name ?? "No Name").replace(/^section\./g, ""),
              },
              {
                tag: "div",
                className: "item-description",
                onLoad: (e) => itemDescElements.push(e),
                children: [
                  {
                    tag: "p",
                    className: "requirements-text",
                    innerText: requirementsText(it.requires ?? []),
                  },
                  {
                    tag: "p",
                    innerHTML: jankAssParseWikitext(it.description ?? ""),
                  },
                ],
              },
            ],
          })),
        ],
      },
    ],
  }));

  document.body.appendChild(
    makeHTMLTree({
      tag: "div",
      className: "category-container",
      onLoad: (e) => categoryElements.push({ element: e, category: cat }),
      children: [
        {
          tag: "h2",
          innerText: cat.name,
        },
        ...(cat.requires && cat.requires.length > 0
          ? [
              {
                tag: "p",
                className: "requirements-text",
                innerText: requirementsText(cat.requires),
              },
            ]
          : []),
        {
          tag: "p",
          innerHTML: jankAssParseWikitext(cat.description),
        },
        ...sections,
      ] satisfies HTMLSpec[],
    })
  );
}

const requirementsMap = new Map(
  itemElements.map((e) => [
    e.item.name as string,
    [
      ...(e.item.requires ?? []),
      ...(e.item.category.requires ?? []),
      ...(e.item.section.requires ?? []),
    ],
  ])
);

const tagMap = new Map(
  itemElements.map((ie) => [ie.item.displayName as string, ie])
);

resize();

window.addEventListener("resize", resize);

function resize() {
  for (const e of itemDescElements) {
    e.style.transform = "";
    const rect = e.getBoundingClientRect();

    const distPastRight = rect.right - window.innerWidth;

    if (distPastRight > 0) {
      e.style.transform = `translateX(-${distPastRight}px)`;
    }
  }
}

type HTMLSpec = {
  onLoad?: (e: HTMLElement) => any;
  tag: string;
  style?: CSSStyleDeclaration;
  children?: HTMLSpec[];
  _raw?: HTMLElement;
  ref?: { current: HTMLElement | undefined };
  className?: string;
  innerText?: string;
  innerHTML?: string;
};

function makeHTMLTree(tree: HTMLSpec): HTMLElement {
  const elem = document.createElement(tree.tag);
  if (tree.onLoad) tree.onLoad(elem);
  for (const [key, value] of Object.entries(tree)) {
    if (key === "tag") continue;
    if (key === "style") continue;
    if (key === "children") continue;
    if (key === "ref") continue;
    if (key === "onLoad") continue;
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
}

function jankAssParseWikitext(s) {
  return (s ?? "")
    .replaceAll(/\@\@.*?\@\@/g, (s) => `@@${btoa(s.slice(2, -2))}@@`)
    .replaceAll(
      /\[([^ ]+)([^\]]*?)\]/g,
      (s, link, text) => `<a href="@@${btoa(link)}@@">${text}</a>`
    )
    .replaceAll(/\*\*.*?\*\*/g, (s) => `<strong>${s.slice(2, -2)}</strong>`)
    .replaceAll(
      /\/\/.*?\/\//g,
      (s) => `<span style="font-style: italic;">${s.slice(2, -2)}</span>`
    )
    .replaceAll(
      /\{\{.*?\}\}/g,
      (s) => `<span style="font-family: monospace;">${s.slice(2, -2)}</span>`
    )
    .replaceAll(/\@\@.*?\@\@/g, (s) => `${atob(s.slice(2, -2))}`);
}

const selectedTagsTitle = document.createElement("h2");
document.body.appendChild(selectedTagsTitle);
selectedTagsTitle.innerText = "Selected Tags";
const selectedTags = document.createElement("div");
document.body.appendChild(selectedTags);
selectedTags.id = "selected-tags";

function meetsRequirements(reqs: (string | string[])[]) {
  for (const req of reqs) {
    let match = false;
    for (const s of Array.isArray(req) ? req : [req]) {
      if (enabledTags.has(s)) {
        match = true;
        break;
      }
      if (s.endsWith("/")) {
        const s2 = s === "object-class/" ? "object-classes/" : s;
        for (const et of enabledTags) {
          const tag = tagMap.get(et);
          if (tag?.item.categoryName === s2.slice(0, -1)) {
            match = true;
            break;
          }
        }
      }
    }
    if (!match) return false;
  }
  return true;
}

function requirementsText(reqs: (string | string[])[]) {
  if (reqs.length === 0) return "";
  return (
    "Requires the following tags: " +
    reqs
      .map((req) =>
        Array.isArray(req)
          ? reqs.length > 1
            ? `(${req.join(" or ")})`
            : req.join(" or ")
          : req
      )
      .join(" and ")
  );
}

function refreshTags() {
  // let removedTags = true;
  // while (removedTags) {
  //   removedTags = false;
  //   for (const et of enabledTags) {
  //     if (!meetsRequirements(requirementsMap.get(et) ?? [])) {
  //       removedTags = true;
  //       enabledTags.delete(et);
  //     }
  //   }
  // }

  for (const it of itemElements) {
    const e = it.element;
    if (enabledTags.has(it.item.displayName ?? "No Name")) {
      if (
        meetsRequirements(requirementsMap.get(it.item.name ?? "No Name") ?? [])
      ) {
        e.style.outline = "5px solid green";
      } else {
        e.style.outline = "5px solid red";
      }
    } else {
      e.style.outline = "none";
    }
  }

  for (const cat of categoryElements) {
    const reqsElem = cat.element.querySelector(
      "& > .requirements-text"
    ) as HTMLElement;
    if (!reqsElem) continue;
    if (meetsRequirements(cat.category.requires ?? [])) {
      reqsElem.style.color = "black";
    } else {
      reqsElem.style.color = "#cc0000";
    }
  }

  for (const sec of sectionElements) {
    const reqsElem = sec.element.querySelector(
      "& > .requirements-text"
    ) as HTMLElement;
    if (!reqsElem) continue;
    if (meetsRequirements(sec.section.requires ?? [])) {
      reqsElem.style.color = "black";
    } else {
      reqsElem.style.color = "#cc0000";
    }
  }

  for (const item of itemElements) {
    const reqsElem = item.element.querySelector(
      "& > .requirements-text"
    ) as HTMLElement;
    if (reqsElem) {
      if (meetsRequirements(item.item.requires ?? [])) {
        reqsElem.style.color = "black";
      } else {
        reqsElem.style.color = "#cc0000";
      }
    }
    if (
      meetsRequirements(requirementsMap.get(item.item.name ?? "No Name") ?? [])
    ) {
      item.element.style.backgroundColor = "#eee";
    } else {
      item.element.style.backgroundColor = "#ffcccc";
    }
  }

  selectedTags.innerText = [...enabledTags].join(", ");
}

function toggleTag(s) {
  if (enabledTags.has(s)) {
    enabledTags.delete(s);
  } else {
    enabledTags.add(s);
  }

  refreshTags();
}

refreshTags();
