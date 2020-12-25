const DEF_SCORE = (title, content) => {
  const STR = "cheezbuzz"
  if (!title.length || !content.length) {
    return 0
  }
  let titleCount = 0
  for (let i = 0; i < title.length; i++) {
    if ((STR).includes(title.charAt(i).toLowerCase())) {
      titleCount++;
    }
  }
  let contentCount = 0
  for (let i = 0; i < content.length; i++) {
    if ((STR).includes(content.charAt(i).toLowerCase())) {
      contentCount++;
    }
  }
  let titleCalc = (1 - Math.pow(1 - (titleCount / title.length), Math.PI))
  let contentCalc = (1 - Math.pow(1 - (contentCount / content.length), Math.PI))
  let calc = ((((titleCalc * 2) + contentCalc) / 3) * 100)
  return calc
}
