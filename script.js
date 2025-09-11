function animate(element, startDelay, inAnims = {}, outAnims = {}) {
  const el = document.querySelector(element);
  const cycle = 12500;

  function buildAnimations(anims) {
    const parts = [];

    for (const [name, val] of Object.entries(anims)) {
      let duration = val;
      let easing = "ease";
      let startAt = null;

      if (typeof val === "object") {
        duration = val.duration;
        easing = val.easing || "ease";
        startAt = val.startAt || null;
      }

      parts.push({ str: `${name} ${duration}ms forwards ${easing}`, startAt, duration });
    }
    return parts;
  }

  function getMaxDuration(anims) {
    let max = 0;
    for (const val of Object.values(anims)) {
      const dur = typeof val === "object" ? val.duration : val;
      if (dur > max) max = dur;
    }
    return max;
  }

  function runOnce() {
    const inParts = buildAnimations(inAnims);
    const outParts = buildAnimations(outAnims);

    if (Object.keys(inAnims).length) {
      setTimeout(() => {
        el.style.animation = inParts.map((a) => a.str).join(", ");
      }, startDelay);
    }

    if (Object.keys(outAnims).length) {
      for (const anim of outParts) {
        let outDelay;
        if (anim.startAt != null) {
          outDelay = anim.startAt;
        } else {
          outDelay = cycle - anim.duration;
        }

        setTimeout(() => {
          el.style.animation = outParts.map((a) => a.str).join(", ");
        }, outDelay);
      }
    }

    setTimeout(() => {
      el.style.animation = "";
    }, cycle);
  }

  runOnce();
  setInterval(runOnce, cycle);
}

animate(".banner", 200, { fadeIn: 300 });
animate(".claim", 700, { fadeIn: 700 });
animate(".logo", 700, { fadeIn: 700 }, { fadeOut: 400 });
animate(".burger", 900, { fadeIn: { duration: 900, easing: "cubic-bezier(0.1, 0, 0.2, 1)" }, slideRight: 1150 });
animate(".txt-1", 1500, { wipeRight: 800 }, { fadeOut: { duration: 250, startAt: 4300 } });
animate(".txt-2", 2200, { fadeIn: 300 }, { fadeOut: { duration: 250, startAt: 4300 } });
animate(".x", 4450, { rotateIn: 650 });
animate(".mce", 4745, { rotateScaleIn: { duration: 650, easing: "cubic-bezier(0.25,0.1,0.25,1)" } });
animate(".stroerer", 5800, { popIn: 500 });
animate(".outro", 7350, { expandIn: 650 });
animate(".circle-1", 7350, { expand: { duration: 1000, easing: "ease-in" } });
animate(".circle-2", 7650, { expand: { duration: 600, easing: "ease-in" } });
animate(".circle-3", 7650, { expand2: { duration: 1200, easing: "cubic-bezier(0, 0, 0.4, 1)" }, expandHole: { duration: 1200, easing: "cubic-bezier(0, 0, 0.4, 1)" } });
animate(".circle-4", 7800, { expand2: { duration: 900, easing: "ease-out" } });
animate(".big-logo", 8750, { wipeDown: { duration: 750, easing: "cubic-bezier(0.25,0.1,0.25,1)" } }, { fadeOut: 400 });
animate(".mcextreme", 9500, { fadeIn: 300 }, { fadeOut: 400 });

// :)