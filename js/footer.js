var marcus = {
  saveData: (e, t) => {
		localStorage.setItem(e, JSON.stringify({
			time: Date.now(),
			data: t
		}))
	},
	loadData: (e, t) => {
		let n = JSON.parse(localStorage.getItem(e));
		if (n) {
			let e = Date.now() - n.time;
			if (-1 < e && e < 6e4 * t) return n.data
		}
		return 0
	},
  runtime: () => {
    var e = function (e) {
      return e > 9 ? e : "0" + e
    };
    let t = new Date("2023/03/01 00:00:00")
      .getTime(),
      n = (new Date)
        .getTime(),
      o = Math.round((n - t) / 1e3),
      l = "本站已运行：";
    o >= 86400 && (l += e(parseInt(o / 86400)) + " 天 ", o %= 86400), o >= 3600 && (l += e(parseInt(o / 3600)) + " 时 ", o %= 3600), o >= 60 && (l += e(parseInt(o / 60)) + " 分 ", o %= 60), o >= 0 && (l += e(o) + " 秒");
    let a = document.getElementById("runtime");
    a && (a.innerHTML = l), setTimeout(marcus.runtime, 1e3)
  },
  randomLink: () => {
    let e = marcus.loadData("links", 30);
    if (e) {
      let t = document.querySelectorAll("#friend-links-in-footer .footer-item");
      if (!t.length) return;
      for (let n = 0; n < 5; n++) {
        let o = parseInt(Math.random() * e.length);
        t[n].innerText = e[o].name, t[n].href = e[o].link, e.splice(o, 1)
      }
    } else fetch("/link.json")
      .then((e => e.json()))
      .then((e => {
        marcus.saveData("links", e.link_list), marcus.randomLink()
      }))
  }
}
//如果开启pjax
function whenDOMReady() {
  marcus.randomLink();
}
marcus.runtime();
//没有开启pjax
// marcus.randomLink();
// marcus.runtime();