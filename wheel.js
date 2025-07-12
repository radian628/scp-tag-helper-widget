// wheel.ts
for (const [catname, cat] of Object.entries(categories)) {
  let tagdisplay;
  const tags = cat.sections.flatMap((s) => s.items);
  document.body.appendChild(makeHTMLTree({
    tag: "div",
    style: {
      marginBottom: "10px"
    },
    children: [
      {
        tag: "button",
        innerText: cat.name ?? "NO NAME",
        style: {
          marginRight: "20px"
        },
        onLoad(e) {
          e.addEventListener("click", () => {
            const index = Math.floor(Math.random() * tags.length);
            console.log(tags);
            tagdisplay.innerText += " " + (tags[index].name?.replace(/section\./, "") ?? "NO NAME");
          });
        }
      },
      {
        tag: "div",
        onLoad(e) {
          tagdisplay = e;
        }
      }
    ]
  }));
}
