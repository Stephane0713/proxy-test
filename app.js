function app() {
  // States
  const proxy = new Proxy(
    {
      tab: "lines", // lines | prices
      page: 1,
    },
    {
      set: (target, property, value) => {
        target[property] = value;
        render();
      },
    }
  );

  const anchor = document.querySelector("#app");

  const render = async () => {
    anchor.innerHTML = "";

    ["lines", "prices"].forEach((elt) => {
      const btn = document.createElement("button");
      btn.textContent = elt;
      btn.className = "tab_btn";
      btn.onclick = () => (proxy.tab = elt);
      if (elt === proxy.tab) btn.disabled = true;
      anchor.append(btn);
    });

    const content = document.createElement("div");

    const json = await (await fetch(`/mockups/${proxy.tab}${proxy.page}.json`)).json();
    json.forEach((elt) => {
      const div = document.createElement("div");
      div.textContent = elt.label;
      div.className = "content";
      content.append(div);
    });

    anchor.append(content);

    [1, 2, 3].forEach((elt) => {
      const btn = document.createElement("button");
      btn.textContent = elt;
      btn.className = "page_btn";
      btn.onclick = () => (proxy.page = elt);
      if (elt === proxy.page) btn.disabled = true;
      anchor.append(btn);
    });
  };

  render();
}

app();
