/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"wNxbtQn4CxWV0O26","label":"Socials","bookmarks":[{"id":"9A6RSVLX43tSl67a","label":"Reddit","url":"https://www.reddit.com/"},{"id":"MqGwCSaIn8ngQjim","label":"Football","url":"https://www.reddit.com/r/soccer/"},{"id":"WRDKgnFSxPtlkp2Z","label":"Twitter","url":"https://twitter.com/"}]},{"id":"bB9vczySrtGbCbmS","label":"Entertainment","bookmarks":[{"id":"fYR1FYBKfW776vbV","label":"YT","url":"https://www.youtube.com/feed/subscriptions"},{"id":"6Q7bpiAYoNtdB25A","label":"Twitch","url":"https://www.twitch.tv/directory/following"},{"id":"NKU8S1LXYsNmVY7i","label":"Netflix","url":"https://www.netflix.com/browse"}]},{"id":"jSHdj5Fq7naTPa9l","label":"Dev","bookmarks":[{"id":"uLUzsUlxbiaKMQy7","label":"GitHub","url":"https://github.com/"},{"id":"tFSmmXfUbeyIy1so","label":"DIB","url":"https://www.reddit.com/r/dataisbeautiful/"},{"id":"PB3iRt1h83H9EDXm","label":"CodeBeautify","url":"https://codebeautify.org/csv-tools"}]},{"id":"Y3dk7DPBPSICa8Yr","label":"Data","bookmarks":[{"id":"N6W7A34XvkLWnibZ","label":"WorldBank","url":"https://data.worldbank.org/"},{"id":"l9g0iJqTU2YXz3yt","label":"IIB","url":"https://informationisbeautiful.net/"},{"id":"mg8H1uspq9ghneyC","label":"Google Public","url":"https://www.google.com/publicdata/directory"}]},{"id":"hrufJcIzznjCgs2Y","label":"Tools","bookmarks":[{"id":"irnLeLyFVCbZ8AOn","label":"AngryTools","url":"https://angrytools.com/"},{"id":"jxsRuQhIPn3WlGtO","label":"CyberChef","url":"https://gchq.github.io/CyberChef/"},{"id":"3wPvTfWG4R8BPidz","label":"Colour Picker","url":"https://imagecolorpicker.com/en"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
