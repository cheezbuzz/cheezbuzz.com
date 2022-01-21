BUZZ.routines.init = () => {
  BUZZ.routines.get(() => {
    let active = window.location.pathname.toString().replace(/\//g,"").trim()
    if (active.length) {
      if (BUZZ.state.ids.includes(active)) {
        BUZZ.focus = active
      }
      else {
        location.href = BUZZ.ORIGIN
      }
    }
  })
}

BUZZ.routines.get = (callback = () => {}) => {
  $.ajax({
    url: (BUZZ.API + "/live/get"),
    success: (data) => {
      BUZZ.state = data
      BUZZ.routines.order()
      callback()
      BUZZ.routines.ui()
    }
  })
}

BUZZ.routines.put = (callback = () => {}) => {
  $.post((BUZZ.API + "/live/put"), JSON.stringify({
    state: BUZZ.state
  })).done((data) => {
    BUZZ.state = data
    BUZZ.routines.order()
    callback()
    BUZZ.routines.ui()
  })
}

BUZZ.routines.order = () => {
  BUZZ.state.stories.sort((a,b) => {
    return (b.date - a.date)
  })
}

BUZZ.routines.add = (title, content) => {
  title = BUZZ.routines.clean(title)
  content = BUZZ.routines.clean(content)
  const id = BUZZ.routines.id(title)
  let story = {
    title, content, id,
    score: BUZZ.routines.score(title, content),
    date: (Date.now())
  }
  BUZZ.state.stories.push(story)
  BUZZ.state.ids.push(id)
  BUZZ.routines.put(() => {
    location.href = (BUZZ.ORIGIN + "/" + id).toString()
  })
}

BUZZ.routines.remove = (id) => {
  for (let i = 0; i < BUZZ.state.stories.length; i++) {
    if (BUZZ.state.stories[i].id === id) {
      BUZZ.state.stories.splice(i,1)
      for (let j = 0; j < BUZZ.state.ids.length; j++) {
        if (BUZZ.state.ids[j] === id) {
          BUZZ.state.ids.splice(j,1)
        }
      }
      BUZZ.routines.put(() => {
        location.href = BUZZ.ORIGIN
      })
    }
  }
}

BUZZ.routines.score = (title, content) => {
  return (DEF_SCORE(title,content))
}

BUZZ.routines.clean = (string) => {
  //return string.toString().trim().replace(/[^a-zA-Z0-9_\- ]+/g, "")
  return string
}

BUZZ.routines.id = (string) => {
  let temp = string.toString().trim().toLowerCase().replace(/[^a-zA-Z0-9_\- ]+/g, "").split(" ").join("-")
  while (BUZZ.state.ids.includes(temp)) {
    temp = (temp + "-")
  }
  return temp
}

BUZZ.routines.ui = () => {
  if (BUZZ.LOADED) {
    BUZZ.CONTAINER.innerHTML = ""
    if (BUZZ.focus === null) {
      for (let story of BUZZ.state.stories) {
        const time = moment(story.date).fromNow()
        const container = document.createElement("div")
        container.className = "story"
        const left = document.createElement("div")
        left.className = "left"
        const right = document.createElement("div")
        right.className = "right"
        const subtitle = document.createElement("p")
        subtitle.className = "subtitle"
        subtitle.innerHTML = time
        const title = document.createElement("h3")
        title.className = "title"
        title.innerHTML = story.title
        const content = document.createElement("p")
        content.className = "content"
        content.innerHTML = story.content
        const score = document.createElement("h1")
        score.className = "score"
        score.innerHTML = (story.score / 10).toFixed(1)
        const score2 = document.createElement("p")
        score2.className = "score-sub"
        score2.innerHTML = "CHEEZ SCORE"
        left.appendChild(subtitle)
        left.appendChild(title)
        left.appendChild(content)
        right.appendChild(score)
        right.appendChild(score2)
        container.appendChild(left)
        container.appendChild(right)
        container.id = ("story-" + story.id).toString()
        left.onclick = () => {
          location.href = (BUZZ.ORIGIN + "/" + story.id).toString()
        }
        if (story.score >= 64) {
          right.className += " special"
        }
        BUZZ.CONTAINER.appendChild(container)
      }
    }
    else {
      let story = null
      for (let s of BUZZ.state.stories) {
        if (s.id === BUZZ.focus) {
          story = s;
          break;
        }
      }
      const time = moment(story.date).fromNow()
      const score = document.createElement("div")
      score.className = "i-score"
      for (let i = 0; i < 10; i++) {
        const wedge = document.createElement("img")
        wedge.src = "assets/icons/wedge.png"
        wedge.className = "wedge"
        score.appendChild(wedge)
      }
      score.style.width = ((story.score * 0.84).toFixed(0) + "vmin")
      const subtitle = document.createElement("p")
      subtitle.className = "i-subtitle"
      subtitle.innerHTML = time
      const title = document.createElement("h3")
      title.className = "i-title"
      title.innerHTML = story.title
      const content = document.createElement("p")
      content.className = "i-content"
      content.innerHTML = story.content
      BUZZ.CONTAINER.appendChild(score)
      BUZZ.CONTAINER.appendChild(subtitle)
      BUZZ.CONTAINER.appendChild(title)
      BUZZ.CONTAINER.appendChild(content)
    }
  }
}

BUZZ.routines.input = () => {
  const title = BUZZ.routines.clean(document.getElementById("title-input").value)
  const content = BUZZ.routines.clean(document.getElementById("content-input").value)
  let score = BUZZ.routines.score(title, content)
  document.getElementById("live-score-value").innerHTML = (score / 10).toFixed(1)
}

BUZZ.routines.submit = () => {
  const title = BUZZ.routines.clean(document.getElementById("title-input").value)
  const content = BUZZ.routines.clean(document.getElementById("content-input").value)
  if (
    title.length &&
    content.length &&
    title.length <= BUZZ.TITLE_MAX_LENGTH &&
    content.length <= BUZZ.CONTENT_MAX_LENGTH
  ) {
    BUZZ.routines.add(title, content)
  }
}

let ADD_UI = false;

BUZZ.routines.toggle = () => {
  ADD_UI = !(ADD_UI)
  const INPUT = document.getElementById("input")
  if (ADD_UI) {
    input.style.display = ""
    setTimeout(() => {
      input.className = "out"
    }, 0)
  }
  else {
    input.className = ""
    setTimeout(() => {
      input.style.display = "none"
    }, 600)
  }
}

/*============================================================================*/

BUZZ.routines.init()
